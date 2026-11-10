from server.backend.src.api.dtos.storyboard import (
    SceneVersionItemDTO,
    StoryboardSceneDTO,
)
from server.backend.src.infrastructure.database.models import SceneModel

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
            versions_dto.append(
                SceneVersionItemDTO(
                    versionNumber=v.version_number,
                    title=v.title,
                    visualPrompt=v.visual_prompt,
                    voiceover=v.voiceover,
                    cameraMovement=v.camera_movement,
                    createdAt="Đã lưu",
                    role=v.created_by_role or "ai_llm",
                )
            )
    if not versions_dto:
        versions_dto = [
            SceneVersionItemDTO(
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
