from uuid import uuid4
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy.orm.attributes import flag_modified

from server.backend.src.api.dtos.storyboard import (
    CreateSceneVersionRequestDTO,
    SceneVersionItemDTO,
    StoryboardSceneDTO,
)
from server.backend.src.infrastructure.database.models import SceneModel, SceneVersionModel

DEMO_SCENE_THUMBNAILS = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
]


def build_scene_dto(s: SceneModel, idx: int = 0) -> StoryboardSceneDTO:
    props = s.properties_data or {}
    cam_params = s.camera_3d_params or {}
    lighting = s.lighting_rig or {}

    visual_prompt = props.get("visualPrompt") or s.description or ""
    voiceover = s.voiceover_text or props.get("voiceover") or s.creative_direction or ""

    versions_dto: list[SceneVersionItemDTO] = []
    versions_raw = s.__dict__.get("versions")
    if versions_raw and isinstance(versions_raw, (list, tuple)):
        for v in versions_raw:
            created_label = "Đã lưu"
            if hasattr(v, "created_at") and v.created_at:
                try:
                    created_label = v.created_at.strftime("%H:%M %d/%m")
                except Exception:
                    created_label = str(v.created_at)[:16]
            versions_dto.append(
                SceneVersionItemDTO(
                    id=getattr(v, "id", None) or f"ver-{v.version_number}",
                    versionNumber=v.version_number,
                    title=v.title,
                    visualPrompt=v.visual_prompt,
                    voiceover=v.voiceover,
                    cameraMovement=v.camera_movement,
                    createdAt=created_label,
                    role=v.created_by_role or "ai_llm",
                )
            )
    if not versions_dto:
        versions_dto = [
            SceneVersionItemDTO(
                id=f"ver-{s.id}-1",
                versionNumber=1,
                title=s.title,
                visualPrompt=visual_prompt,
                voiceover=voiceover,
                cameraMovement=s.camera_movement,
                createdAt="Bản gốc",
                role="ai_llm",
            )
        ]

    fallback_thumb = DEMO_SCENE_THUMBNAILS[(s.scene_number - 1) % len(DEMO_SCENE_THUMBNAILS)]
    thumb_url = props.get("thumbnailUrl") or fallback_thumb

    dof_val = cam_params.get("dof")
    dof_float = float(dof_val) if dof_val is not None else 1.8

    return StoryboardSceneDTO(
        id=s.id,
        sceneNumber=s.scene_number,
        title=s.title,
        durationSeconds=s.duration_seconds,
        cameraMovement=s.camera_movement,
        transitionType=s.transition_type,
        description=s.description or "",
        creativeDirection=s.creative_direction or "",
        hasVisualDraft=True,
        visualPrompt=visual_prompt,
        voiceover=voiceover,
        thumbnailUrl=thumb_url,
        cameraLens=cam_params.get("lens") or "85mm",
        cameraFov=cam_params.get("fov") or 35,
        cameraDof=dof_float,
        lightingRimColor=lighting.get("rimLight") or "#06B6D4",
        activeVersion=len(versions_dto),
        versions=versions_dto,
    )


async def save_scene_version_snapshot(
    session: AsyncSession,
    scene: SceneModel,
    payload: CreateSceneVersionRequestDTO,
) -> SceneModel:
    stmt = (
        select(SceneVersionModel)
        .where(SceneVersionModel.scene_id == scene.id)
        .order_by(SceneVersionModel.version_number.asc())
    )
    existing_versions = list((await session.scalars(stmt)).all())

    props = dict(scene.properties_data or {})
    cur_title = payload.title or scene.title
    cur_prompt = payload.visualPrompt if payload.visualPrompt is not None else (props.get("visualPrompt") or scene.description or "")
    cur_voiceover = payload.voiceover if payload.voiceover is not None else (scene.voiceover_text or props.get("voiceover") or scene.creative_direction or "")
    cur_camera = payload.cameraMovement or scene.camera_movement

    if not existing_versions:
        orig_prompt = props.get("visualPrompt") or scene.description or ""
        orig_voiceover = scene.voiceover_text or props.get("voiceover") or scene.creative_direction or ""
        v1 = SceneVersionModel(
            id=f"ver-{uuid4().hex[:8]}",
            scene_id=scene.id,
            version_number=1,
            title=scene.title,
            visual_prompt=orig_prompt,
            voiceover=orig_voiceover,
            camera_movement=scene.camera_movement,
            created_by_role="ai_llm",
        )
        session.add(v1)
        await session.flush()
        existing_versions.append(v1)

    next_num = max(v.version_number for v in existing_versions) + 1
    new_v = SceneVersionModel(
        id=f"ver-{uuid4().hex[:8]}",
        scene_id=scene.id,
        version_number=next_num,
        title=cur_title,
        visual_prompt=cur_prompt,
        voiceover=cur_voiceover,
        camera_movement=cur_camera,
        created_by_role=payload.role or "user",
    )
    session.add(new_v)

    # Persist the current snapshot attributes onto the scene model in DB
    scene.title = cur_title
    scene.description = cur_prompt
    scene.voiceover_text = cur_voiceover
    scene.camera_movement = cur_camera
    props["visualPrompt"] = cur_prompt
    props["voiceover"] = cur_voiceover
    scene.properties_data = props
    flag_modified(scene, "properties_data")

    await session.commit()

    reload_stmt = (
        select(SceneModel)
        .options(selectinload(SceneModel.versions))
        .where(SceneModel.id == scene.id)
    )
    return (await session.scalar(reload_stmt)) or scene


async def delete_scene_version_snapshot(
    session: AsyncSession,
    scene_id: str,
    version_id: str,
) -> SceneModel:
    version_condition = SceneVersionModel.id == version_id
    if version_id.isdigit():
        version_condition = version_condition | (SceneVersionModel.version_number == int(version_id))

    stmt = select(SceneVersionModel).where(
        SceneVersionModel.scene_id == scene_id,
        version_condition,
    )
    ver = await session.scalar(stmt)
    if ver:
        await session.delete(ver)
        await session.commit()

    reload_stmt = (
        select(SceneModel)
        .options(selectinload(SceneModel.versions))
        .where(SceneModel.id == scene_id)
    )
    res = await session.scalar(reload_stmt)
    if not res:
        raise HTTPException(status_code=404, detail="Scene not found")
    return res
