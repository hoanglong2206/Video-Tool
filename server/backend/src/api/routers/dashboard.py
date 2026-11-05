from fastapi import APIRouter
from server.backend.src.api.dtos.dashboard import (
    DashboardOverviewResponseDTO,
    DashboardStatsDTO,
    ApprovalItemDTO,
    RenderQueueDTO,
)
from server.backend.src.api.dtos.project import ProjectResponseDTO
from server.backend.src.domain.entities.project import ProjectStatus

router = APIRouter(prefix="/api/v1/dashboard", tags=["Dashboard"])

DEFAULT_PROJECTS = [
    ProjectResponseDTO(
        id="proj-1",
        name="Aurora X1 Launch",
        stage_description="Stage 06 · Motion design",
        progress=25,
        status=ProjectStatus.IN_PROGRESS,
    ),
    ProjectResponseDTO(
        id="proj-2",
        name="Nova Watch Teaser",
        stage_description="Stage 03 · Asset generation",
        progress=18,
        status=ProjectStatus.IN_PROGRESS,
    ),
    ProjectResponseDTO(
        id="proj-3",
        name="Halo Speaker Promo",
        stage_description="Stage 09 · Render",
        progress=85,
        status=ProjectStatus.IN_PROGRESS,
    ),
    ProjectResponseDTO(
        id="proj-4",
        name="Kite Sneaker Reveal",
        stage_description="Completed",
        progress=100,
        status=ProjectStatus.COMPLETED,
    ),
    ProjectResponseDTO(
        id="proj-5",
        name="Brew Coffee Ad",
        stage_description="Stage 01 · Brief analysis",
        progress=8,
        status=ProjectStatus.IN_PROGRESS,
    ),
    ProjectResponseDTO(
        id="proj-6",
        name="Asset library",
        stage_description="412 assets · 18 templates",
        progress=0,
        status=ProjectStatus.LIBRARY,
        asset_count=412,
        template_count=18,
    ),
]


@router.get("/stats", response_model=DashboardOverviewResponseDTO)
async def get_dashboard_overview() -> DashboardOverviewResponseDTO:
    """Return live dashboard statistics, recent projects, approvals, and render queue."""
    return DashboardOverviewResponseDTO(
        stats=DashboardStatsDTO(
            activeProjects=5,
            waitingForApproval=2,
            rendersInQueue=1,
            aiGenerationsThisMonth=1240,
        ),
        projects=DEFAULT_PROJECTS,
        approvals=[
            ApprovalItemDTO(
                id="appr-1",
                title="Aurora X1 · Scene composition",
                stage="Stage 05",
                timeAgo="4 min ago",
                isUrgent=True,
            ),
            ApprovalItemDTO(
                id="appr-2",
                title="Nova Watch · Asset variations",
                stage="Stage 03",
                timeAgo="1 h ago",
                isUrgent=False,
            ),
        ],
        renderQueue=RenderQueueDTO(
            id="render-1",
            title="Halo Speaker · 4K MP4",
            progress=72,
            nextJobTitle="Next: Aurora X1 preview · 1080p",
        ),
    )

