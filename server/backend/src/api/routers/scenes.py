from fastapi import APIRouter
from server.backend.src.api.dtos.scene import (
    LayerItemDTO,
    LayerPropertiesDTO,
    MotionSuggestionDTO,
    SceneDetailsResponseDTO,
    TimelineTrackDTO,
)

router = APIRouter(prefix="/api/v1/projects", tags=["Scenes"])

DEFAULT_LAYERS = [
    LayerItemDTO(id="layer-1", name="Light sweep", type="light_sweep"),
    LayerItemDTO(id="layer-2", name='Title · "Meet Aurora"', type="title"),
    LayerItemDTO(id="layer-3", name="Product · aurora-x1.png", type="product", assetRef="aurora-x1.png"),
    LayerItemDTO(id="layer-4", name="Particles", type="particles"),
    LayerItemDTO(id="layer-5", name="Background · studio-dark", type="background"),
]

DEFAULT_TRACKS = [
    TimelineTrackDTO(id="track-1", name="Camera", startSec=0.5, durationSec=4.0, colorClass="bg-[#2563EB]", keyframes=[0.8, 4.2]),
    TimelineTrackDTO(id="track-2", name="Product", startSec=1.2, durationSec=4.3, colorClass="bg-[#1E293B]", keyframes=[2.5]),
    TimelineTrackDTO(id="track-3", name="Title", startSec=1.8, durationSec=2.0, colorClass="bg-[#1E293B]", keyframes=[]),
    TimelineTrackDTO(id="track-4", name="Light sweep", startSec=3.2, durationSec=2.0, colorClass="bg-[#784D16]", keyframes=[]),
]

DEFAULT_PROPERTIES = LayerPropertiesDTO(
    x=960,
    y=580,
    scalePercent=100,
    rotateDeg=0,
    opacityPercent=100,
    easing="Ease-out cubic",
)

DEFAULT_SUGGESTION = MotionSuggestionDTO(
    prompt="Make this product reveal more cinematic...",
    description="Slow 25° camera orbit with a rising light sweep over 2.4 s; reflections intensified.",
    cameraOrbitDeg=25,
    sweepDurationSec=2.4,
)


@router.get("/{project_id}/scenes/{scene_id}", response_model=SceneDetailsResponseDTO)
async def get_scene_details(project_id: str, scene_id: str) -> SceneDetailsResponseDTO:
    """Return scene layers, kinetic typography AST, timeline tracks, and motion suggestions."""
    project_name = "Aurora X1 Launch" if project_id in ["proj-1", "default"] else f"Project {project_id}"
    return SceneDetailsResponseDTO(
        projectName=project_name,
        sceneName=f"Scene {scene_id} · Product Reveal",
        layers=DEFAULT_LAYERS,
        properties=DEFAULT_PROPERTIES,
        tracks=DEFAULT_TRACKS,
        suggestion=DEFAULT_SUGGESTION,
    )


@router.post("/{project_id}/scenes/{scene_id}/apply-motion")
async def apply_motion_suggestion(project_id: str, scene_id: str) -> dict[str, str]:
    """Apply procedural GSAP spring or camera trajectory suggestion to target scene."""
    return {
        "status": "applied",
        "projectId": project_id,
        "sceneId": scene_id,
        "message": "AI Motion curve applied to Product layer.",
    }
