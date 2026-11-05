from datetime import datetime, timezone
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.workflow import (
    ExecutionLogEntryDTO,
    PipelineStageDTO,
    ProjectWorkflowResponseDTO,
)
from server.backend.src.infrastructure.database.models import (
    ExecutionLogModel,
    ProjectModel,
    WorkflowStageModel,
)
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/projects", tags=["Workflow"])


@router.get("/{project_id}/workflow", response_model=ProjectWorkflowResponseDTO)
async def get_project_workflow(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> ProjectWorkflowResponseDTO:
    """Return the 10-stage execution DAG and logs persisted in Supabase."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    project_name = project.name if project else f"Project {project_id}"

    # Stages query
    stages_stmt = (
        select(WorkflowStageModel)
        .where(WorkflowStageModel.project_id == target_id)
        .order_by(WorkflowStageModel.stage_number.asc())
    )
    stages_db = (await session.scalars(stages_stmt)).all()

    # Logs query
    logs_stmt = (
        select(ExecutionLogModel)
        .where(ExecutionLogModel.project_id == target_id)
        .order_by(ExecutionLogModel.created_at.desc())
    )
    logs_db = (await session.scalars(logs_stmt)).all()

    stages = [
        PipelineStageDTO(
            id=s.id,
            stageNumber=s.stage_number,
            name=s.name,
            status=s.status,
            progressPercent=s.progress_percent,
            dependsOn=s.depends_on,
            approvalHistory=s.approval_history,
            hasPreview=s.has_preview,
        )
        for s in stages_db
    ]

    logs = [
        ExecutionLogEntryDTO(
            id=l.id,
            timestamp=l.timestamp_label,
            stageLabel=l.stage_label,
            message=l.message,
        )
        for l in logs_db
    ]

    return ProjectWorkflowResponseDTO(
        projectName=project_name,
        overallProgress=project.progress if project else 0,
        stages=stages,
        logs=logs,
    )


@router.post("/{project_id}/stages/{stage_id}/approve")
async def approve_workflow_stage(
    project_id: str,
    stage_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> dict[str, str]:
    """Emit Human-In-The-Loop approval signal and log event into Supabase."""
    stage = await session.get(WorkflowStageModel, stage_id)
    if not stage:
        # Search by stage_number if stage_id is like 'stage-05'
        stmt = select(WorkflowStageModel).where(
            WorkflowStageModel.project_id == project_id,
            WorkflowStageModel.id == stage_id,
        )
        stage = await session.scalar(stmt)

    stage_name = stage.name if stage else stage_id
    if stage:
        stage.status = "approved"

    # Append execution log
    log = ExecutionLogModel(
        id=f"log-{uuid4().hex[:8]}",
        project_id=project_id,
        timestamp_label=datetime.now(timezone.utc).strftime("%H:%M"),
        stage_label=stage.stage_number if stage else "Approval",
        message=f"{stage_name} approved by Creative Director",
    )
    session.add(log)
    await session.commit()

    return {
        "status": "approved",
        "projectId": project_id,
        "stageId": stage_id,
        "message": f"Stage {stage_name} approved. Downstream activities unblocked.",
    }


@router.post("/{project_id}/stages/{stage_id}/revision")
async def request_stage_revision(
    project_id: str,
    stage_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> dict[str, str]:
    """Emit HITL revision request signal and record audit log in Supabase."""
    stage = await session.get(WorkflowStageModel, stage_id)
    stage_name = stage.name if stage else stage_id
    if stage:
        stage.status = "waiting_approval"

    log = ExecutionLogModel(
        id=f"log-{uuid4().hex[:8]}",
        project_id=project_id,
        timestamp_label=datetime.now(timezone.utc).strftime("%H:%M"),
        stage_label=stage.stage_number if stage else "Revision",
        message=f"Revision requested for {stage_name}",
    )
    session.add(log)
    await session.commit()

    return {
        "status": "revision_requested",
        "projectId": project_id,
        "stageId": stage_id,
        "message": f"Revision requested for stage {stage_name}.",
    }
