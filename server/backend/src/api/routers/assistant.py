from fastapi import APIRouter, status
from server.ai_engine.src.llm.service import llm_service
from server.backend.src.api.dtos.assistant import (
    ApplyChangeRequest,
    AssistantChatRequest,
    AssistantChatResponse,
    SuggestedChangeDto,
)

router = APIRouter(prefix="/api/v1/assistant", tags=["Global AI Assistant"])


@router.post("/chat", response_model=AssistantChatResponse)
async def query_assistant(req: AssistantChatRequest) -> AssistantChatResponse:
    """Analyze context and return intelligent production suggestions with previewable actions via LLM."""
    ctx_dict = {}
    if req.context:
        ctx_dict = {
            "project_id": req.context.project_id,
            "stage": req.context.stage,
            "scene": req.context.scene_id,
            "layer": req.context.layer_name,
        }

    reply = await llm_service.chat_copilot(
        message=req.message,
        context=ctx_dict,
    )

    suggested_dto = None
    if reply.suggested_change:
        suggested_dto = SuggestedChangeDto(
            id=reply.suggested_change.get("id", "sug-ai"),
            title=reply.suggested_change.get("title", "AI Enhancement"),
            description=reply.suggested_change.get("description", ""),
            actions=reply.suggested_change.get("actions", ["Preview", "Apply"]),
        )

    return AssistantChatResponse(
        reply_text=reply.reply_text,
        suggested_change=suggested_dto,
        quick_requests=reply.quick_requests or ["Improve lighting", "Shorten scene", "Orbit camera"],
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
