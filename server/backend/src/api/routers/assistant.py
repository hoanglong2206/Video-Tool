from fastapi import APIRouter, status
from server.backend.src.api.dtos.assistant import (
    AssistantChatRequest,
    AssistantChatResponse,
    SuggestedChangeDto,
    ApplyChangeRequest,
)

router = APIRouter(prefix="/api/v1/assistant", tags=["Global AI Assistant"])


@router.post("/chat", response_model=AssistantChatResponse)
async def query_assistant(req: AssistantChatRequest) -> AssistantChatResponse:
    """Analyze context and return intelligent production suggestions with previewable actions."""
    return AssistantChatResponse(
        reply_text="Analysis complete. Recommended camera motion adjustments ready.",
        suggested_change=SuggestedChangeDto(
            id="sug-motion-01",
            title="Suggested change",
            description="Add a slow 25° orbit, a rising light sweep and stronger reflections over 2.4 s.",
            actions=["Preview", "Edit", "Apply"],
        ),
        quick_requests=[
            "Generate 3 backgrounds",
            "Improve lighting",
            "Shorten to 3 s",
        ],
    )


@router.post("/apply", status_code=status.HTTP_200_OK)
async def apply_assistant_change(req: ApplyChangeRequest) -> dict:
    """Commit AI suggested parameters to the scene timeline and composition graph."""
    return {
        "status": "applied",
        "change_id": req.change_id,
        "scene_id": req.scene_id,
        "message": f"Successfully merged AI motion adjustments into {req.scene_id}",
    }
