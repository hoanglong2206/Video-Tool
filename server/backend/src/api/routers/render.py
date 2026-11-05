from typing import List
from fastapi import APIRouter, status
from server.backend.src.api.dtos.render import (
    ExportSettingsDto,
    PreviousRenderDto,
    RenderProgressDto,
    StartRenderRequest,
)

router = APIRouter(prefix="/api/v1/render", tags=["Render & Export Center"])

CURRENT_SETTINGS = ExportSettingsDto()

PREVIOUS_RENDERS: List[PreviousRenderDto] = [
    PreviousRenderDto(version="v3", resolution="1080p", duration="2m 14s", status="completed"),
    PreviousRenderDto(version="v2", resolution="1080p", duration="2m 09s", status="completed"),
    PreviousRenderDto(version="v1", resolution="720p", duration="failed", status="failed"),
]

CURRENT_PROGRESS = RenderProgressDto(
    percentage=34,
    status_text="Rendering frames",
    estimated_remaining="Estimated 3 min left",
    elapsed_time="Elapsed 1 min 42 s",
    logs=[
        "14:10 · Assembling scenes 1–6",
        "14:11 · Audio synced",
        "14:12 · Encoding with FFmpeg",
    ],
)


@router.get("/settings", response_model=ExportSettingsDto)
async def get_export_settings() -> ExportSettingsDto:
    """Get active video export encoding parameters."""
    return CURRENT_SETTINGS


@router.get("/progress", response_model=RenderProgressDto)
async def get_render_progress() -> RenderProgressDto:
    """Get live render job progress, frame status, and execution logs."""
    return CURRENT_PROGRESS


@router.get("/history", response_model=List[PreviousRenderDto])
async def get_render_history() -> List[PreviousRenderDto]:
    """Get previous render build logs and artifacts."""
    return PREVIOUS_RENDERS


@router.post("/start", status_code=status.HTTP_202_ACCEPTED)
async def start_render(req: StartRenderRequest) -> dict:
    """Dispatch render compilation pipeline."""
    return {
        "status": "queued",
        "project_id": req.project_id,
        "message": "Render pipeline initialized and dispathed to worker pool",
    }


@router.post("/cancel", status_code=status.HTTP_200_OK)
async def cancel_render() -> dict:
    """Halt current video encoding and release GPU render instance."""
    return {"status": "cancelled", "message": "Render queue aborted"}


@router.post("/retry", status_code=status.HTTP_200_OK)
async def retry_failed_jobs() -> dict:
    """Retry failed scene frame renders."""
    return {"status": "requeued", "message": "Failed frame jobs requeued"}

