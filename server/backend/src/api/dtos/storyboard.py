from pydantic import BaseModel, ConfigDict


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

    model_config = ConfigDict(from_attributes=True)


class StoryboardResponseDTO(BaseModel):
    projectName: str
    approvalStatus: str
    version: str
    totalDurationSeconds: int
    scenes: list[StoryboardSceneDTO]

    model_config = ConfigDict(from_attributes=True)


class UpdateSceneRequestDTO(BaseModel):
    description: str | None = None
    durationSeconds: int | None = None
    transitionType: str | None = None
