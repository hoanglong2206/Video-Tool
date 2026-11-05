from dataclasses import dataclass


@dataclass(slots=True)
class RenderQueueItem:
    """Domain entity representing a render queue job."""

    id: str
    title: str
    progress: int
    next_job_title: str | None = None

