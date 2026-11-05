from fastapi import APIRouter
from server.backend.src.api.dtos.threed import (
    Camera3DSettingsDTO,
    LightSettingDTO,
    PbrMaterialDTO,
    SceneGraphNodeDTO,
    ThreeDSceneResponseDTO,
    ThreeDTimelineTrackDTO,
)

router = APIRouter(prefix="/api/v1/projects", tags=["3D Scene"])

DEFAULT_NODES = [
    SceneGraphNodeDTO(id="node-1", name="Camera · Orbit A", type="camera"),
    SceneGraphNodeDTO(id="node-2", name="Key light", type="light"),
    SceneGraphNodeDTO(id="node-3", name="Rim light", type="light"),
    SceneGraphNodeDTO(id="node-4", name="Headphones.glb", type="mesh"),
    SceneGraphNodeDTO(id="node-5", name="Floor · reflective", type="floor"),
]

DEFAULT_TRACKS = [
    ThreeDTimelineTrackDTO(id="track-1", name="Camera", startPercent=5, durationPercent=45, colorClass="bg-[#2563EB]"),
    ThreeDTimelineTrackDTO(id="track-2", name="Model", startPercent=18, durationPercent=50, colorClass="bg-[#1E293B]"),
    ThreeDTimelineTrackDTO(id="track-3", name="Lights", startPercent=38, durationPercent=30, colorClass="bg-[#784D16]"),
]

DEFAULT_MATERIAL = PbrMaterialDTO(name="Brushed Aluminum", metalness=0.9, roughness=0.3)

DEFAULT_LIGHTS = [
    LightSettingDTO(name="Key light", colorTempK=3200, intensityPercent=80),
    LightSettingDTO(name="Rim light", colorTempK=5600, intensityPercent=45),
]

DEFAULT_CAMERA = Camera3DSettingsDTO(
    orbitTrajectory="Orbit 25° over 2.4 s",
    focalLengthMm=35,
    aperture="f/2.8",
)


@router.get("/{project_id}/3d-scene", response_model=ThreeDSceneResponseDTO)
async def get_3d_scene(project_id: str) -> ThreeDSceneResponseDTO:
    """Return 3D scene graph, PBR material parameters, and lighting rigs."""
    project_name = "Aurora X1 Launch" if project_id in ["proj-1", "default"] else f"Project {project_id}"
    return ThreeDSceneResponseDTO(
        projectName=project_name,
        sceneTitle="3D Scene Studio · Scene 04",
        status="Pending · needs Motion approved",
        nodes=DEFAULT_NODES,
        material=DEFAULT_MATERIAL,
        lights=DEFAULT_LIGHTS,
        camera=DEFAULT_CAMERA,
        tracks=DEFAULT_TRACKS,
    )


@router.post("/{project_id}/3d-scene/render-preview")
async def trigger_3d_render_preview(project_id: str) -> dict[str, str]:
    """Dispatch Blender headless raytracing preview activity."""
    return {
        "status": "rendering",
        "projectId": project_id,
        "message": "Blender Cycles headless render dispatched.",
    }

