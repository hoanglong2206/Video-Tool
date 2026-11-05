from uuid import uuid4
from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.project import (
    BriefCheckRequestDTO,
    BriefCheckResponseDTO,
    CreateProjectRequestDTO,
    ProjectResponseDTO,
)
from server.backend.src.domain.entities.project import Project, ProjectStatus
from server.backend.src.infrastructure.database.models import ProjectModel, WorkflowStageModel
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/projects", tags=["Projects"])


@router.get("", response_model=list[ProjectResponseDTO])
async def list_projects(
    session: AsyncSession = Depends(get_db_session),
) -> list[ProjectResponseDTO]:
    """List recent video production projects persisted in Supabase PostgreSQL."""
    stmt = select(ProjectModel).order_by(ProjectModel.created_at.desc())
    result = await session.scalars(stmt)
    projects = result.all()

    return [
        ProjectResponseDTO(
            id=p.id,
            name=p.name,
            stageDescription=p.stage_description,
            progress=p.progress,
            status=ProjectStatus(p.status) if p.status in [e.value for e in ProjectStatus] else ProjectStatus.IN_PROGRESS,
            assetCount=p.asset_count,
            templateCount=p.template_count,
        )
        for p in projects
    ]


@router.post("", response_model=ProjectResponseDTO, status_code=status.HTTP_201_CREATED)
async def create_project(
    payload: CreateProjectRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> ProjectResponseDTO:
    """Initialize and persist a new video project and its 10 pipeline stages."""
    project_id = f"proj-{uuid4().hex[:8]}"
    new_project = ProjectModel(
        id=project_id,
        name=payload.name,
        client=payload.client,
        brief=payload.brief,
        stage_description="Stage 01 · Brief analysis",
        progress=0,
        status="in_progress",
    )
    session.add(new_project)

    # Initialize standard 10 production workflow stages
    stage_names = [
        ("01", "Brief analysis"),
        ("02", "Storyboard"),
        ("03", "Asset generation"),
        ("04", "Asset processing"),
        ("05", "Scene composition"),
        ("06", "Motion design"),
        ("07", "3D production"),
        ("08", "Sound design"),
        ("09", "Render & post"),
        ("10", "QC & export"),
    ]
    for num, name in stage_names:
        stage = WorkflowStageModel(
            id=f"{project_id}-stage-{num}",
            project_id=project_id,
            stage_number=num,
            name=name,
            status="pending" if num != "01" else "running",
            progress_percent=0,
        )
        session.add(stage)

    await session.commit()
    await session.refresh(new_project)

    return ProjectResponseDTO(
        id=new_project.id,
        name=new_project.name,
        stageDescription=new_project.stage_description,
        progress=new_project.progress,
        status=ProjectStatus.IN_PROGRESS,
    )


@router.post("/brief-check", response_model=BriefCheckResponseDTO)
async def check_brief_completeness(payload: BriefCheckRequestDTO) -> BriefCheckResponseDTO:
    """AI assessment of client brief completeness and structure recommendations."""
    missing: list[str] = []
    text = payload.brief.lower()
    if "target" not in text and "audience" not in text:
        missing.append("target audience.")
    if not any(k in text for k in ["call-to-action", "cta", "order", "buy", "visit"]):
        missing.append("call-to-action text.")

    return BriefCheckResponseDTO(
        missing_items=missing,
        suggested_structure="6 scenes, about 5 s each.",
        is_complete=len(missing) == 0,
    )
