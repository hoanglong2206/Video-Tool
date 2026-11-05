from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from server.backend.src.infrastructure.events.bus import event_bus

router = APIRouter(prefix="/api/v1/events", tags=["Real-time Events"])


@router.get("/stream")
async def event_stream() -> StreamingResponse:
    """Server-Sent Events (SSE) broadcast channel for real-time video render & workflow events."""
    queue = event_bus.subscribe()
    return StreamingResponse(
        event_bus.stream(queue),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
