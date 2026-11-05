from pydantic import BaseModel, ConfigDict


class PipelineStageDTO(BaseModel):
    id: str
    stageNumber: str
    name: str
    status: str
    progressPercent: int | None = None
    dependsOn: str | None = None
    approvalHistory: str | None = None
    hasPreview: bool = False

    model_config = ConfigDict(from_attributes=True)


class ExecutionLogEntryDTO(BaseModel):
    id: str
    timestamp: str
    stageLabel: str
    message: str

    model_config = ConfigDict(from_attributes=True)


class ProjectWorkflowResponseDTO(BaseModel):
    projectName: str
    overallProgress: int
    stages: list[PipelineStageDTO]
    logs: list[ExecutionLogEntryDTO]

    model_config = ConfigDict(from_attributes=True)
