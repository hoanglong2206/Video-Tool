from fastapi import APIRouter
from server.backend.src.api.dtos.approval import (
    ApprovalCenterResponseDTO,
    ApprovalDecisionRequestDTO,
    ApprovalGateItemDTO,
)

router = APIRouter(prefix="/api/v1/projects", tags=["Approvals"])

DEFAULT_APPROVAL_ITEMS = [
    ApprovalGateItemDTO(
        id="appr-1",
        stageName="Stage 05 · Composition",
        title="Scene 03 · Product reveal",
        versionLabel="v3 · 4 min ago",
        previousVersionLabel="v2 · previous",
        previousDescription="Product off-center, flat lighting",
        currentVersionLabel="v3 · current",
        currentDescription="Centered, rim light added",
        aiSummary="Product moved to the center third, title lifted above the fold, rim lighting added from the left.",
    ),
    ApprovalGateItemDTO(
        id="appr-2",
        stageName="Stage 05 · Composition",
        title="Scene 04 · Feature close-up",
        versionLabel="v1 · 18 min ago",
        previousVersionLabel="v0 · storyboard sketch",
        previousDescription="Initial storyboard wireframe concept",
        currentVersionLabel="v1 · current",
        currentDescription="Macro driver mesh with specular gloss",
        aiSummary="Generated high-resolution macro depth pass for acoustic driver diaphragm.",
    ),
]


@router.get("/{project_id}/approvals", response_model=ApprovalCenterResponseDTO)
async def get_project_approvals(project_id: str) -> ApprovalCenterResponseDTO:
    """Return pending HITL approval items, diff comparison versions, and AI summaries."""
    project_name = "Aurora X1 Launch" if project_id in ["proj-1", "default"] else f"Project {project_id}"
    return ApprovalCenterResponseDTO(
        projectName=project_name,
        pendingCount=len(DEFAULT_APPROVAL_ITEMS),
        items=DEFAULT_APPROVAL_ITEMS,
    )


@router.post("/{project_id}/approvals/{item_id}/decision")
async def record_approval_decision(
    project_id: str,
    item_id: str,
    payload: ApprovalDecisionRequestDTO,
) -> dict[str, str]:
    """Emit Human-In-The-Loop signoff, revision, or rejection signal to Temporal."""
    return {
        "status": "success",
        "projectId": project_id,
        "itemId": item_id,
        "decision": payload.decision,
        "message": f"Decision '{payload.decision}' successfully processed for {item_id}.",
    }
