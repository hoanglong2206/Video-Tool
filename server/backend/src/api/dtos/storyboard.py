from pydantic import BaseModel, ConfigDict


class SceneVersionItemDTO(BaseModel):
    versionNumber: int
    title: str
    visualPrompt: str | None = None
    voiceover: str | None = None
    cameraMovement: str | None = None
    createdAt: str | None = None
    role: str = "ai_llm"

    model_config = ConfigDict(from_attributes=True)


class StoryboardSceneDTO(BaseModel):
    id: str
    sceneNumber: int
    title: str
    durationSeconds: int
    cameraMovement: str
    transitionType: str
    description: str
    creativeDirection: str | None = None
    hasVisualDraft: bool = False

    # Enhanced Cinematic 3D & Audio Parameters
    visualPrompt: str | None = None
    voiceover: str | None = None
    thumbnailUrl: str | None = None
    cameraLens: str | None = "85mm"
    cameraFov: int | None = 35
    cameraDof: float | None = 1.8
    lightingRimColor: str | None = "#06B6D4"
    activeVersion: int = 1
    versions: list[SceneVersionItemDTO] = []

    model_config = ConfigDict(from_attributes=True)


class StoryboardResponseDTO(BaseModel):
    projectName: str
    approvalStatus: str
    version: str
    totalDurationSeconds: int
    scenes: list[StoryboardSceneDTO]

    model_config = ConfigDict(from_attributes=True)


class UpdateSceneRequestDTO(BaseModel):
    title: str | None = None
    description: str | None = None
    durationSeconds: int | None = None
    transitionType: str | None = None
    cameraMovement: str | None = None
    visualPrompt: str | None = None
    voiceover: str | None = None
    thumbnailUrl: str | None = None
    cameraLens: str | None = None
    cameraFov: int | None = None
    cameraDof: float | None = None
    lightingRimColor: str | None = None


class CreateSceneRequestDTO(BaseModel):
    title: str = "Phân cảnh mới"
    durationSeconds: int = 5
    cameraMovement: str = "Slow push-in 24fps"
    transitionType: str = "Cut"
    visualPrompt: str | None = None
    voiceover: str | None = None
    cameraLens: str = "85mm"
    thumbnailUrl: str | None = None


class ReorderScenesRequestDTO(BaseModel):
    sceneIds: list[str]
