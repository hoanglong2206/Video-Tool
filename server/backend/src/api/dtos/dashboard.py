from pydantic import BaseModel, ConfigDict
from server.backend.src.api.dtos.project import ProjectResponseDTO


class DashboardStatsDTO(BaseModel):
    activeProjects: int
    waitingForApproval: int
    rendersInQueue: int
    aiGenerationsThisMonth: int


class ApprovalItemDTO(BaseModel):
    id: str
    title: str
    stage: str
    timeAgo: str
    isUrgent: bool = False


class RenderQueueDTO(BaseModel):
    id: str
    title: str
    progress: int
    nextJobTitle: str | None = None


class DashboardOverviewResponseDTO(BaseModel):
    stats: DashboardStatsDTO
    projects: list[ProjectResponseDTO]
    approvals: list[ApprovalItemDTO]
    renderQueue: RenderQueueDTO

    model_config = ConfigDict(from_attributes=True)

