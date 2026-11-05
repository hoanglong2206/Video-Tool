from pydantic import BaseModel, ConfigDict


class LayerItemDTO(BaseModel):
    id: str
    name: str
    type: str
    assetRef: str | None = None

    model_config = ConfigDict(from_attributes=True)


class LayerPropertiesDTO(BaseModel):
    x: int
    y: int
    scalePercent: int
    rotateDeg: int
    opacityPercent: int
    easing: str

    model_config = ConfigDict(from_attributes=True)


class TimelineTrackDTO(BaseModel):
    id: str
    name: str
    startSec: float
    durationSec: float
    colorClass: str
    keyframes: list[float]

    model_config = ConfigDict(from_attributes=True)


class MotionSuggestionDTO(BaseModel):
    prompt: str
    description: str
    cameraOrbitDeg: int
    sweepDurationSec: float

    model_config = ConfigDict(from_attributes=True)


class SceneDetailsResponseDTO(BaseModel):
    projectName: str
    sceneName: str
    layers: list[LayerItemDTO]
    properties: LayerPropertiesDTO
    tracks: list[TimelineTrackDTO]
    suggestion: MotionSuggestionDTO

    model_config = ConfigDict(from_attributes=True)
