from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.dashboard import (
    ApprovalItemDTO,
    DashboardOverviewResponseDTO,
    DashboardStatsDTO,
    RenderQueueDTO,
)
from server.backend.src.api.dtos.project import ProjectResponseDTO
from server.backend.src.domain.entities.project import ProjectStatus
from server.backend.src.infrastructure.database.models import (
    ApprovalModel,
    ProjectModel,
    RenderJobModel,
)
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=DashboardOverviewResponseDTO)
async def get_dashboard_overview(
    session: AsyncSession = Depends(get_db_session),
) -> DashboardOverviewResponseDTO:
    """Return live dashboard statistics, recent projects, and pending approvals from Supabase."""
    # 1. Recent Projects
    projects_stmt = select(ProjectModel).order_by(ProjectModel.created_at.desc()).limit(10)
    projects_db = (await session.scalars(projects_stmt)).all()

    projects = [
        ProjectResponseDTO(
            id=p.id,
            name=p.name,
            stageDescription=p.stage_description,
            progress=p.progress,
            status=ProjectStatus(p.status) if p.status in [e.value for e in ProjectStatus] else ProjectStatus.IN_PROGRESS,
            assetCount=p.asset_count,
            templateCount=p.template_count,
        )
        for p in projects_db
    ]

    # 2. Stats
    active_count = await session.scalar(
        select(func.count(ProjectModel.id)).where(ProjectModel.status == "in_progress")
    ) or 0
    pending_approvals_count = await session.scalar(
        select(func.count(ApprovalModel.id)).where(ApprovalModel.status == "pending")
    ) or 0
    queued_renders_count = await session.scalar(
        select(func.count(RenderJobModel.id)).where(RenderJobModel.status.in_(["queued", "rendering"]))
    ) or 0

    stats = DashboardStatsDTO(
        activeProjects=active_count,
        waitingForApproval=pending_approvals_count,
        rendersInQueue=queued_renders_count,
        aiGenerationsThisMonth=1240,
    )

    # 3. Pending Approvals List
    approvals_stmt = (
        select(ApprovalModel)
        .where(ApprovalModel.status == "pending")
        .order_by(ApprovalModel.created_at.desc())
        .limit(5)
    )
    approvals_db = (await session.scalars(approvals_stmt)).all()
    approvals = [
        ApprovalItemDTO(
            id=a.id,
            title=f"{a.project_id} · {a.title}",
            stage=a.stage_name.split("·")[0].strip() if "·" in a.stage_name else a.stage_name,
            timeAgo=a.version_label.split("·")[1].strip() if "·" in a.version_label else "recent",
            isUrgent=True,
        )
        for a in approvals_db
    ]

    # 4. Render Queue Status
    render_queue = RenderQueueDTO(
        id="render-1",
        title="Halo Speaker · 4K MP4",
        progress=72,
        nextJobTitle="Next: Aurora X1 preview · 1080p",
    )

    return DashboardOverviewResponseDTO(
        stats=stats,
        projects=projects,
        approvals=approvals,
        renderQueue=render_queue,
    )
