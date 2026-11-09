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


class PerformanceDataPointDTO(BaseModel):
    label: str  # "T2", "T3", "T4", "T5", "T6", "T7", "CN"
    date: str
    throughput: int
    latency: float
    renderFps: int


class DashboardPerformanceDTO(BaseModel):
    weeklyData: list[PerformanceDataPointDTO]
    aiSpeed: str
    renderThroughput: str
    gpuName: str
    gpuVram: str
    completionRate: str
    trendPercentage: str


class DashboardOverviewResponseDTO(BaseModel):
    stats: DashboardStatsDTO
    projects: list[ProjectResponseDTO]
    approvals: list[ApprovalItemDTO]
    renderQueue: RenderQueueDTO
    performance: DashboardPerformanceDTO | None = None

    model_config = ConfigDict(from_attributes=True)

