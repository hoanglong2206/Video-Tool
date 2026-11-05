from fastapi import APIRouter, HTTPException, status
from server.backend.src.api.dtos.storyboard import (
    StoryboardResponseDTO,
    StoryboardSceneDTO,
    UpdateSceneRequestDTO,
)

router = APIRouter(prefix="/api/v1/projects", tags=["Storyboard"])

DEFAULT_SCENES = [
    StoryboardSceneDTO(
        id="scene-1",
        sceneNumber=1,
        title="Dark intro",
        durationSeconds=4,
        cameraMovement="Slow push-in",
        transitionType="Fade",
        description="Deep shadows cloak the headphones as an ambient glow slowly hints at the silhouette.",
        creativeDirection="Dark studio, slow and deliberate pacing, metallic highlights.",
    ),
    StoryboardSceneDTO(
        id="scene-2",
        sceneNumber=2,
        title="Product reveal",
        durationSeconds=6,
        cameraMovement="Orbit",
        transitionType="Light sweep",
        description="Headphones emerge from darkness as a soft light sweep crosses the metal surface.",
        creativeDirection="Dark studio, slow and deliberate pacing, metallic highlights.",
    ),
    StoryboardSceneDTO(
        id="scene-3",
        sceneNumber=3,
        title="Driver detail",
        durationSeconds=5,
        cameraMovement="Macro dolly",
        transitionType="Cut",
        description="Extreme close-up on the titanium acoustic driver diaphragm vibrating with precision sound waves.",
        creativeDirection="Dark studio, macro fidelity, crisp micro-contrast.",
    ),
    StoryboardSceneDTO(
        id="scene-4",
        sceneNumber=4,
        title="Materials",
        durationSeconds=5,
        cameraMovement="Slider",
        transitionType="Cross dissolve",
        description="Anodized aluminum band flexing effortlessly with leatherette ear cushion texture focus.",
        creativeDirection="Premium haptic feel, soft studio lighting.",
    ),
    StoryboardSceneDTO(
        id="scene-5",
        sceneNumber=5,
        title="Battery life",
        durationSeconds=5,
        cameraMovement="Typography",
        transitionType="Wipe",
        description="Kinetic typography reveal: '60 Hours Non-Stop Playback' integrated seamlessly onto the surface.",
        creativeDirection="Bold typography, fluid motion blur.",
    ),
    StoryboardSceneDTO(
        id="scene-6",
        sceneNumber=6,
        title="Logo end card",
        durationSeconds=5,
        cameraMovement="Static",
        transitionType="Fade out",
        description="Aurora Audio emblem centers on screen with launch date and call-to-action lockup.",
        creativeDirection="Clean branding, confident final hold.",
    ),
]


@router.get("/{project_id}/storyboard", response_model=StoryboardResponseDTO)
async def get_project_storyboard(project_id: str) -> StoryboardResponseDTO:
    """Return structured multi-scene storyboard for production."""
    project_name = "Aurora X1 Launch" if project_id in ["proj-1", "default"] else f"Project {project_id}"
    total_duration = sum(s.durationSeconds for s in DEFAULT_SCENES)
    return StoryboardResponseDTO(
        projectName=project_name,
        approvalStatus="Approved",
        version="v2",
        totalDurationSeconds=total_duration,
        scenes=DEFAULT_SCENES,
    )


@router.put("/{project_id}/storyboard/scenes/{scene_id}", response_model=StoryboardSceneDTO)
async def update_storyboard_scene(
    project_id: str,
    scene_id: str,
    payload: UpdateSceneRequestDTO,
) -> StoryboardSceneDTO:
    """Update scene description or pacing."""
    for scene in DEFAULT_SCENES:
        if scene.id == scene_id:
            if payload.description is not None:
                scene.description = payload.description
            if payload.durationSeconds is not None:
                scene.durationSeconds = payload.durationSeconds
            if payload.transitionType is not None:
                scene.transitionType = payload.transitionType
            return scene

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scene not found")
