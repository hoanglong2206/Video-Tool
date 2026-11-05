from pydantic import BaseModel, ConfigDict


class ApprovalGateItemDTO(BaseModel):
    id: str
    stageName: str
    title: str
    versionLabel: str
    previousVersionLabel: str
    previousDescription: str
    currentVersionLabel: str
    currentDescription: str
    aiSummary: str

    model_config = ConfigDict(from_attributes=True)


class ApprovalCenterResponseDTO(BaseModel):
    projectName: str
    pendingCount: int
    items: list[ApprovalGateItemDTO]

    model_config = ConfigDict(from_attributes=True)


class ApprovalDecisionRequestDTO(BaseModel):
    decision: str  # "approve" | "revision" | "reject"
    comment: str | None = None
