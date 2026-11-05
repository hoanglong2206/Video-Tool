from uuid import uuid4
from fastapi import APIRouter, status
from server.backend.src.api.dtos.project import (
    BriefCheckRequestDTO,
    BriefCheckResponseDTO,
    CreateProjectRequestDTO,
    ProjectResponseDTO,
)
from server.backend.src.domain.entities.project import Project, ProjectStatus

router = APIRouter(prefix="/api/v1/projects", tags=["Projects"])

_PROJECTS_STORAGE: list[Project] = [
    Project(
        id="proj-1",
        name="Aurora X1 Launch",
        stage_description="Stage 06 · Motion design",
        progress=25,
        status=ProjectStatus.IN_PROGRESS,
    ),
    Project(
        id="proj-2",
        name="Nova Watch Teaser",
        stage_description="Stage 03 · Asset generation",
        progress=18,
        status=ProjectStatus.IN_PROGRESS,
    ),
    Project(
        id="proj-3",
        name="Halo Speaker Promo",
        stage_description="Stage 09 · Render",
        progress=85,
        status=ProjectStatus.IN_PROGRESS,
    ),
    Project(
        id="proj-4",
        name="Kite Sneaker Reveal",
        stage_description="Completed",
        progress=100,
        status=ProjectStatus.COMPLETED,
    ),
    Project(
        id="proj-5",
        name="Brew Coffee Ad",
        stage_description="Stage 01 · Brief analysis",
        progress=8,
        status=ProjectStatus.IN_PROGRESS,
    ),
    Project(
        id="proj-6",
        name="Asset library",
        stage_description="412 assets · 18 templates",
        progress=0,
        status=ProjectStatus.LIBRARY,
        asset_count=412,
        template_count=18,
    ),
]


@router.get("", response_model=list[ProjectResponseDTO])
async def list_projects() -> list[ProjectResponseDTO]:
    """List recent video production projects."""
    return [ProjectResponseDTO.from_domain(p) for p in _PROJECTS_STORAGE]


@router.post("", response_model=ProjectResponseDTO, status_code=status.HTTP_201_CREATED)
async def create_project(payload: CreateProjectRequestDTO) -> ProjectResponseDTO:
    """Initialize a new video project."""
    new_project = Project(
        id=f"proj-{uuid4().hex[:8]}",
        name=payload.name,
        stage_description="Stage 01 · Brief analysis",
        progress=0,
        status=ProjectStatus.IN_PROGRESS,
    )
    _PROJECTS_STORAGE.insert(0, new_project)
    return ProjectResponseDTO.from_domain(new_project)


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
