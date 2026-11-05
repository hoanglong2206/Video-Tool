from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from server.ai_engine.src.llm.service import llm_service
from server.backend.src.api.dtos.storyboard import (
    StoryboardResponseDTO,
    StoryboardSceneDTO,
    UpdateSceneRequestDTO,
)
from server.backend.src.infrastructure.database.models import ProjectModel, SceneModel
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/projects", tags=["Storyboard"])


@router.get("/{project_id}/storyboard", response_model=StoryboardResponseDTO)
async def get_project_storyboard(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardResponseDTO:
    """Return structured multi-scene storyboard for production from Supabase."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    project_name = project.name if project else f"Project {project_id}"

    # Query scenes
    stmt = (
        select(SceneModel)
        .where(SceneModel.project_id == target_id)
        .order_by(SceneModel.scene_number.asc())
    )
    result = await session.scalars(stmt)
    scenes_db = result.all()

    scenes = [
        StoryboardSceneDTO(
            id=s.id,
            sceneNumber=s.scene_number,
            title=s.title,
            durationSeconds=s.duration_seconds,
            cameraMovement=s.camera_movement,
            transitionType=s.transition_type,
            description=s.description or "",
            creativeDirection=s.creative_direction or "",
        )
        for s in scenes_db
    ]

    total_duration = sum(s.durationSeconds for s in scenes)
    return StoryboardResponseDTO(
        projectName=project_name,
        approvalStatus="Approved" if scenes else "Draft",
        version="v2",
        totalDurationSeconds=total_duration,
        scenes=scenes,
    )


@router.post("/{project_id}/storyboard/generate", response_model=StoryboardResponseDTO)
async def generate_project_storyboard(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardResponseDTO:
    """Trigger AI LLM to analyze brief and synthesize 6 broadcast-grade scenes."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    # 1. Synthesize scenes via AI Engine
    brief = project.brief or f"Cinematic Apple-style hardware launch trailer for {project.name}"
    generated_scenes = await llm_service.generate_storyboard_scenes(
        brief=brief,
        project_name=project.name,
        count=6,
    )

    # 2. Clear old scenes for this project
    await session.execute(delete(SceneModel).where(SceneModel.project_id == target_id))

    # 3. Insert newly generated scenes
    new_scene_models: list[SceneModel] = []
    for s in generated_scenes:
        model = SceneModel(
            id=f"scene-{uuid4().hex[:8]}",
            project_id=target_id,
            scene_number=s.scene_number,
            title=s.title,
            duration_seconds=s.duration_seconds,
            camera_movement=s.camera_movement,
            transition_type=s.transition_type,
            description=s.description,
            creative_direction=s.creative_direction,
        )
        new_scene_models.append(model)
        session.add(model)

    await session.commit()

    scenes = [
        StoryboardSceneDTO(
            id=s.id,
            sceneNumber=s.scene_number,
            title=s.title,
            durationSeconds=s.duration_seconds,
            cameraMovement=s.camera_movement,
            transitionType=s.transition_type,
            description=s.description or "",
            creativeDirection=s.creative_direction or "",
        )
        for s in new_scene_models
    ]

    total_duration = sum(s.durationSeconds for s in scenes)
    return StoryboardResponseDTO(
        projectName=project.name,
        approvalStatus="AI Generated · Ready for review",
        version="v3-ai",
        totalDurationSeconds=total_duration,
        scenes=scenes,
    )


@router.put("/{project_id}/storyboard/scenes/{scene_id}", response_model=StoryboardSceneDTO)
async def update_storyboard_scene(
    project_id: str,
    scene_id: str,
    payload: UpdateSceneRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> StoryboardSceneDTO:
    """Update scene description or pacing in Supabase."""
    scene = await session.get(SceneModel, scene_id)
    if not scene:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scene not found")

    if payload.description is not None:
        scene.description = payload.description
    if payload.durationSeconds is not None:
        scene.duration_seconds = payload.durationSeconds
    if payload.transitionType is not None:
        scene.transition_type = payload.transitionType

    await session.commit()
    await session.refresh(scene)

    return StoryboardSceneDTO(
        id=scene.id,
        sceneNumber=scene.scene_number,
        title=scene.title,
        durationSeconds=scene.duration_seconds,
        cameraMovement=scene.camera_movement,
        transitionType=scene.transition_type,
        description=scene.description or "",
        creativeDirection=scene.creative_direction or "",
    )
