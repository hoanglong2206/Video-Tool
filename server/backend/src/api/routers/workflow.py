from fastapi import APIRouter
from server.backend.src.api.dtos.workflow import (
    ExecutionLogEntryDTO,
    PipelineStageDTO,
    ProjectWorkflowResponseDTO,
)

router = APIRouter(prefix="/api/v1/projects", tags=["Workflow"])

DEFAULT_STAGES = [
    PipelineStageDTO(id="stage-01", stageNumber="01", name="Brief analysis", status="approved"),
    PipelineStageDTO(id="stage-02", stageNumber="02", name="Storyboard", status="approved"),
    PipelineStageDTO(id="stage-03", stageNumber="03", name="Asset generation", status="approved"),
    PipelineStageDTO(id="stage-04", stageNumber="04", name="Asset processing", status="approved"),
    PipelineStageDTO(
        id="stage-05",
        stageNumber="05",
        name="Scene composition",
        status="waiting_approval",
        dependsOn="Stage 04 · Asset processing (approved)",
        approvalHistory="v2 revision requested · v3 awaiting review",
        hasPreview=True,
    ),
    PipelineStageDTO(
        id="stage-06",
        stageNumber="06",
        name="Motion design",
        status="running",
        progressPercent=62,
        dependsOn="Stage 05 · Scene composition",
    ),
    PipelineStageDTO(id="stage-07", stageNumber="07", name="3D production", status="skipped"),
    PipelineStageDTO(id="stage-08", stageNumber="08", name="Sound design", status="pending"),
    PipelineStageDTO(id="stage-09", stageNumber="09", name="Render & post", status="pending"),
    PipelineStageDTO(id="stage-10", stageNumber="10", name="QC & export", status="pending"),
]

DEFAULT_LOGS = [
    ExecutionLogEntryDTO(id="log-1", timestamp="14:02", stageLabel="Stage 06", message="Generating keyframes for scene 03"),
    ExecutionLogEntryDTO(id="log-2", timestamp="14:01", stageLabel="Stage 05", message="Composition ready for review (6 scenes)"),
    ExecutionLogEntryDTO(id="log-3", timestamp="13:48", stageLabel="Stage 04", message="Masks and depth maps approved"),
]


@router.get("/{project_id}/workflow", response_model=ProjectWorkflowResponseDTO)
async def get_project_workflow(project_id: str) -> ProjectWorkflowResponseDTO:
    """Return the 10-stage execution DAG and logs for a given project."""
    project_name = "Aurora X1 Launch" if project_id in ["proj-1", "default"] else f"Project {project_id}"
    return ProjectWorkflowResponseDTO(
        projectName=project_name,
        overallProgress=46,
        stages=DEFAULT_STAGES,
        logs=DEFAULT_LOGS,
    )


@router.post("/{project_id}/stages/{stage_id}/approve")
async def approve_workflow_stage(project_id: str, stage_id: str) -> dict[str, str]:
    """Emit Human-In-The-Loop approval signal to unblock downstream execution."""
    return {
        "status": "approved",
        "projectId": project_id,
        "stageId": stage_id,
        "message": f"Stage {stage_id} approved. Downstream activities unblocked.",
    }


@router.post("/{project_id}/stages/{stage_id}/revision")
async def request_stage_revision(project_id: str, stage_id: str) -> dict[str, str]:
    """Emit HITL revision request signal with feedback."""
    return {
        "status": "revision_requested",
        "projectId": project_id,
        "stageId": stage_id,
        "message": f"Revision requested for stage {stage_id}.",
    }
