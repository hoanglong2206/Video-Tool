from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, select, func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy.orm.attributes import flag_modified

from server.ai_engine.src.llm.service import llm_service
from server.backend.src.api.dtos.storyboard import (
    CreateSceneRequestDTO,
    CreateSceneVersionRequestDTO,
    ReorderScenesRequestDTO,
    SceneVersionItemDTO,
    StoryboardResponseDTO,
    StoryboardSceneDTO,
    UpdateSceneRequestDTO,
)
from server.backend.src.infrastructure.database.models import (
    ProjectModel,
    SceneModel,
    SceneVersionModel,
)
from server.backend.src.infrastructure.database.session import get_db_session
from server.backend.src.api.routers.storyboard_helpers import (
    build_scene_dto,
    DEMO_SCENE_THUMBNAILS,
    save_scene_version_snapshot,
    delete_scene_version_snapshot,
)

router = APIRouter(prefix="/api/v1/projects", tags=["Storyboard"])


@router.get("/{project_id}/storyboard", response_model=StoryboardResponseDTO)
async def get_project_storyboard(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardResponseDTO:
    """Return structured multi-scene storyboard with 3D and audio parameters from DB."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    project_name = project.name if project else f"Project {project_id}"

    stmt = (
        select(SceneModel)
        .options(selectinload(SceneModel.versions))
        .where(SceneModel.project_id == target_id)
        .order_by(SceneModel.scene_number.asc())
    )
    result = await session.scalars(stmt)
    scenes_db = result.all()

    scenes = [build_scene_dto(s, i) for i, s in enumerate(scenes_db)]
    total_duration = sum(s.durationSeconds for s in scenes)

    return StoryboardResponseDTO(
        projectName=project_name,
        approvalStatus="Sẵn sàng kiểm duyệt" if scenes else "Bản nháp",
        version="v2",
        totalDurationSeconds=total_duration,
        scenes=scenes,
    )


@router.post("/{project_id}/storyboard/scenes", response_model=StoryboardSceneDTO)
async def create_storyboard_scene(
    project_id: str,
    payload: CreateSceneRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardSceneDTO:
    """Add a new scene to project storyboard."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    stmt = select(func.coalesce(func.max(SceneModel.scene_number), 0)).where(SceneModel.project_id == target_id)
    current_max = (await session.scalar(stmt)) or 0
    next_num = current_max + 1

    new_scene = SceneModel(
        id=f"scene-{uuid4().hex[:8]}",
        project_id=target_id,
        scene_number=next_num,
        title=payload.title,
        duration_seconds=payload.durationSeconds,
        camera_movement=payload.cameraMovement,
        transition_type=payload.transitionType,
        description=payload.visualPrompt or payload.title,
        voiceover_text=payload.voiceover,
        properties_data={
            "visualPrompt": payload.visualPrompt or payload.title,
            "voiceover": payload.voiceover,
            "thumbnailUrl": payload.thumbnailUrl,
        },
        camera_3d_params={"lens": payload.cameraLens, "fov": 35, "dof": 1.8},
        lighting_rig={"rimLight": "#06B6D4", "style": "Studio Rim-light"},
    )
    session.add(new_scene)
    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        current_max = (await session.scalar(stmt)) or 0
        new_scene.scene_number = current_max + 1
        session.add(new_scene)
        await session.commit()

    await session.refresh(new_scene)
    return build_scene_dto(new_scene, new_scene.scene_number - 1)


@router.put("/{project_id}/storyboard/scenes/{scene_id}", response_model=StoryboardSceneDTO)
async def update_storyboard_scene(
    project_id: str,
    scene_id: str,
    payload: UpdateSceneRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardSceneDTO:
    """Update scene prompt, camera specs, voiceover or duration."""
    scene = await session.get(SceneModel, scene_id)
    if not scene:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scene not found")

    if payload.title is not None:
        scene.title = payload.title
    if payload.durationSeconds is not None:
        scene.duration_seconds = payload.durationSeconds
    if payload.transitionType is not None:
        scene.transition_type = payload.transitionType
    if payload.cameraMovement is not None:
        scene.camera_movement = payload.cameraMovement
    if payload.description is not None:
        scene.description = payload.description
    if payload.voiceover is not None:
        scene.voiceover_text = payload.voiceover

    props = dict(scene.properties_data or {})
    if payload.visualPrompt is not None:
        props["visualPrompt"] = payload.visualPrompt
    if payload.voiceover is not None:
        props["voiceover"] = payload.voiceover
    if payload.thumbnailUrl is not None:
        props["thumbnailUrl"] = payload.thumbnailUrl
    scene.properties_data = props
    flag_modified(scene, "properties_data")

    cam = dict(scene.camera_3d_params or {})
    if payload.cameraLens is not None:
        cam["lens"] = payload.cameraLens
    if payload.cameraFov is not None:
        cam["fov"] = payload.cameraFov
    if payload.cameraDof is not None:
        cam["dof"] = payload.cameraDof
    scene.camera_3d_params = cam
    flag_modified(scene, "camera_3d_params")

    rig = dict(scene.lighting_rig or {})
    if payload.lightingRimColor is not None:
        rig["rimLight"] = payload.lightingRimColor
    scene.lighting_rig = rig
    flag_modified(scene, "lighting_rig")

    await session.commit()
    await session.refresh(scene)
    return build_scene_dto(scene)


@router.delete("/{project_id}/storyboard/scenes/{scene_id}")
async def delete_storyboard_scene(
    project_id: str,
    scene_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> dict:
    """Delete a scene and re-sequence remaining scenes."""
    scene = await session.get(SceneModel, scene_id)
    if not scene:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scene not found")

    target_id = scene.project_id
    await session.delete(scene)
    await session.flush()

    # Re-sequence remaining using negative temporary indices to prevent unique constraint conflict
    stmt = select(SceneModel).where(SceneModel.project_id == target_id).order_by(SceneModel.scene_number.asc())
    remaining = (await session.scalars(stmt)).all()
    for idx, s in enumerate(remaining, 1):
        s.scene_number = -idx
    await session.flush()

    for idx, s in enumerate(remaining, 1):
        s.scene_number = idx

    await session.commit()
    return {"status": "deleted", "sceneId": scene_id, "remainingCount": len(remaining)}


@router.post("/{project_id}/storyboard/scenes/{scene_id}/versions", response_model=StoryboardSceneDTO)
async def create_scene_version(
    project_id: str,
    scene_id: str,
    payload: CreateSceneVersionRequestDTO | None = None,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardSceneDTO:
    """Create a historical snapshot version for a scene."""
    scene = await session.get(SceneModel, scene_id)
    if not scene:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scene not found")
    updated = await save_scene_version_snapshot(session, scene, payload or CreateSceneVersionRequestDTO())
    return build_scene_dto(updated)


@router.delete("/{project_id}/storyboard/scenes/{scene_id}/versions/{version_id}", response_model=StoryboardSceneDTO)
async def delete_scene_version(
    project_id: str,
    scene_id: str,
    version_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardSceneDTO:
    """Delete a specific historical snapshot version."""
    updated = await delete_scene_version_snapshot(session, scene_id, version_id)
    return build_scene_dto(updated)


@router.put("/{project_id}/storyboard/reorder")
async def reorder_storyboard_scenes(
    project_id: str,
    payload: ReorderScenesRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> dict:
    """Reorder scenes by new list of IDs and persist new scene_numbers."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    stmt = select(SceneModel).where(SceneModel.project_id == target_id)
    scenes = (await session.scalars(stmt)).all()
    scenes_map = {s.id: s for s in scenes}

    # Temporarily set scene_numbers to negative to avoid UniqueConstraint collision
    for idx, sid in enumerate(payload.sceneIds, 1):
        if sid in scenes_map:
            scenes_map[sid].scene_number = -idx
    await session.flush()

    for idx, sid in enumerate(payload.sceneIds, 1):
        if sid in scenes_map:
            scenes_map[sid].scene_number = idx

    await session.commit()
    return {"status": "reordered", "count": len(payload.sceneIds)}


@router.post("/{project_id}/storyboard/approve")
async def approve_storyboard(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> dict:
    """Approve storyboard and proceed project to Stage 02 (Asset Planning)."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    if project:
        project.stage_description = "Stage 02 · Asset Planning"
        project.progress = 22
        await session.commit()

    return {
        "status": "approved",
        "projectId": target_id,
        "nextStage": "asset-planning",
        "message": "Storyboard approved successfully. Ready for asset planning.",
    }
