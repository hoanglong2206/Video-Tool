from pydantic import BaseModel, ConfigDict


class SceneGraphNodeDTO(BaseModel):
    id: str
    name: str
    type: str

    model_config = ConfigDict(from_attributes=True)


class PbrMaterialDTO(BaseModel):
    name: str
    metalness: float
    roughness: float

    model_config = ConfigDict(from_attributes=True)


class LightSettingDTO(BaseModel):
    name: str
    colorTempK: int
    intensityPercent: int

    model_config = ConfigDict(from_attributes=True)


class Camera3DSettingsDTO(BaseModel):
    orbitTrajectory: str
    focalLengthMm: int
    aperture: str

    model_config = ConfigDict(from_attributes=True)


class ThreeDTimelineTrackDTO(BaseModel):
    id: str
    name: str
    startPercent: int
    durationPercent: int
    colorClass: str

    model_config = ConfigDict(from_attributes=True)


class ThreeDSceneResponseDTO(BaseModel):
    projectName: str
    sceneTitle: str
    status: str
    nodes: list[SceneGraphNodeDTO]
    material: PbrMaterialDTO
    lights: list[LightSettingDTO]
    camera: Camera3DSettingsDTO
    tracks: list[ThreeDTimelineTrackDTO]

    model_config = ConfigDict(from_attributes=True)
