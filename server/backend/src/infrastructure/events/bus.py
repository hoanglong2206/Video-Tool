import asyncio
import json
from typing import Any, AsyncGenerator

class AsyncEventBus:
    """In-memory asynchronous Pub/Sub Event Bus for real-time SSE & WebSocket broadcast."""

    def __init__(self) -> None:
        self._subscribers: set[asyncio.Queue] = set()

    def subscribe(self) -> asyncio.Queue:
        """Register a new listener queue."""
        q = asyncio.Queue()
        self._subscribers.add(q)
        return q

    def unsubscribe(self, q: asyncio.Queue) -> None:
        """Remove a disconnected listener queue."""
        self._subscribers.discard(q)

    async def publish(self, event_type: str, data: dict[str, Any]) -> None:
        """Broadcast an event payload to all active listener queues."""
        if not self._subscribers:
            return

        payload = {"event": event_type, "data": data}
        for q in list(self._subscribers):
            try:
                q.put_nowait(payload)
            except asyncio.QueueFull:
                pass

    async def stream(self, queue: asyncio.Queue) -> AsyncGenerator[str, None]:
        """Yield SSE formatted text messages with periodic heartbeat ping."""
        try:
            while True:
                try:
                    # Wait for message with 15-second heartbeat timeout
                    item = await asyncio.wait_for(queue.get(), timeout=15.0)
                    evt = item.get("event", "message")
                    raw_data = json.dumps(item.get("data", {}))
                    yield f"event: {evt}\ndata: {raw_data}\n\n"
                except asyncio.TimeoutError:
                    yield ": ping\n\n"
        finally:
            self.unsubscribe(queue)

event_bus = AsyncEventBus()
