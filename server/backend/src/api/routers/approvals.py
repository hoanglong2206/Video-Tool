from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.approval import (
    ApprovalCenterResponseDTO,
    ApprovalDecisionRequestDTO,
    ApprovalGateItemDTO,
)
from server.backend.src.infrastructure.database.models import ApprovalModel, ProjectModel
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/projects", tags=["Approvals"])


@router.get("/{project_id}/approvals", response_model=ApprovalCenterResponseDTO)
async def get_project_approvals(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> ApprovalCenterResponseDTO:
    """Return pending HITL approval items, diff comparison versions, and AI summaries."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    project_name = project.name if project else f"Project {project_id}"

    stmt = (
        select(ApprovalModel)
        .where(
            ApprovalModel.project_id == target_id,
            ApprovalModel.status == "pending",
        )
        .order_by(ApprovalModel.created_at.asc())
    )
    result = await session.scalars(stmt)
    approvals_db = result.all()

    items = [
        ApprovalGateItemDTO(
            id=a.id,
            stageName=a.stage_name,
            title=a.title,
            versionLabel=a.version_label,
            previousVersionLabel=a.previous_version_label,
            previousDescription=a.previous_description,
            currentVersionLabel=a.current_version_label,
            currentDescription=a.current_description,
            aiSummary=a.ai_summary,
        )
        for a in approvals_db
    ]

    return ApprovalCenterResponseDTO(
        projectName=project_name,
        pendingCount=len(items),
        items=items,
    )


@router.post("/{project_id}/approvals/{item_id}/decision")
async def record_approval_decision(
    project_id: str,
    item_id: str,
    payload: ApprovalDecisionRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> dict[str, str]:
    """Emit Human-In-The-Loop signoff, revision, or rejection signal into Supabase."""
    approval = await session.get(ApprovalModel, item_id)
    if not approval:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Approval item not found")

    approval.status = payload.decision
    approval.reviewer_comment = payload.comment
    approval.decided_at = datetime.now(timezone.utc)

    await session.commit()

    return {
        "status": "success",
        "projectId": project_id,
        "itemId": item_id,
        "decision": payload.decision,
        "message": f"Decision '{payload.decision}' successfully processed for {item_id}.",
    }
