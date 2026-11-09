from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.project import (
    BriefCheckRequestDTO,
    BriefCheckResponseDTO,
    CreateProjectRequestDTO,
    ProjectResponseDTO,
    UpdateProjectStatusRequestDTO,
)
from server.backend.src.domain.entities.project import Project, ProjectStatus
from server.backend.src.infrastructure.database.models import (
    ProjectModel,
    SceneModel,
    WorkflowStageModel,
)
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
        duration=payload.duration or "30s",
        aspect_ratio=payload.aspect_ratio or "16:9",
        style_preference=payload.style_preference or "3D Cinematic Minimal Tech",
        brand_colors=payload.brand_colors or [],
        stage_description="Stage 01 · Brief analysis",
        progress=0,
        status="in_progress",
    )
    session.add(new_project)

    # Persist all scenes provided by the frontend (e.g. 6 storyboard scenes)
    if payload.scenes:
        for s in payload.scenes:
            scene_model = SceneModel(
                id=f"scene-{uuid4().hex[:8]}",
                project_id=project_id,
                scene_number=s.scene_number,
                title=s.title,
                duration_seconds=s.duration_seconds,
                camera_movement=s.camera_movement,
                transition_type=s.transition_type,
                description=s.visual_prompt,
                creative_direction=s.voiceover,
                properties_data={
                    "visualPrompt": s.visual_prompt,
                    "voiceover": s.voiceover,
                },
            )
            session.add(scene_model)

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


from server.ai_engine.src.llm.service import llm_service


@router.post("/brief-check", response_model=BriefCheckResponseDTO)
async def check_brief_completeness(payload: BriefCheckRequestDTO) -> BriefCheckResponseDTO:
    """AI assessment of client brief completeness and structure recommendations using LLM reasoning."""
    result = await llm_service.check_brief_completeness(payload.brief)
    return BriefCheckResponseDTO(
        missing_items=result.missing_items,
        suggested_structure=result.suggested_structure or "6 scenes, about 5 s each.",
        is_complete=result.is_complete,
    )


@router.get("/{project_id}", response_model=ProjectResponseDTO)
async def get_project_by_id(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> ProjectResponseDTO:
    """Retrieve details for a specific video project."""
    stmt = select(ProjectModel).where(ProjectModel.id == project_id)
    project = await session.scalar(stmt)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found.")

    return ProjectResponseDTO(
        id=project.id,
        name=project.name,
        stageDescription=project.stage_description,
        progress=project.progress,
        status=ProjectStatus(project.status) if project.status in [e.value for e in ProjectStatus] else ProjectStatus.IN_PROGRESS,
        assetCount=project.asset_count,
        templateCount=project.template_count,
    )


@router.patch("/{project_id}", response_model=ProjectResponseDTO)
async def update_project_status(
    project_id: str,
    payload: UpdateProjectStatusRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> ProjectResponseDTO:
    """Update project status (e.g. stopped, in_progress, waiting_approval, completed) and stage."""
    stmt = select(ProjectModel).where(ProjectModel.id == project_id)
    project = await session.scalar(stmt)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found.")

    if payload.status is not None:
        project.status = payload.status
    if payload.stage_description is not None:
        project.stage_description = payload.stage_description
    if payload.progress is not None:
        project.progress = payload.progress

    await session.commit()
    await session.refresh(project)

    return ProjectResponseDTO(
        id=project.id,
        name=project.name,
        stageDescription=project.stage_description,
        progress=project.progress,
        status=ProjectStatus(project.status) if project.status in [e.value for e in ProjectStatus] else ProjectStatus.IN_PROGRESS,
        assetCount=project.asset_count,
        templateCount=project.template_count,
    )


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> None:
    """Permanently delete a project and all associated cascading models."""
    stmt = select(ProjectModel).where(ProjectModel.id == project_id)
    project = await session.scalar(stmt)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found.")

    await session.delete(project)
    await session.commit()
