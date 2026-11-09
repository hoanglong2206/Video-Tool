from dataclasses import dataclass
from datetime import datetime, timezone
from enum import Enum


class ProjectStatus(str, Enum):
    IN_PROGRESS = "in_progress"
    WAITING_APPROVAL = "waiting_approval"
    COMPLETED = "completed"
    STOPPED = "stopped"
    LIBRARY = "library"


@dataclass(slots=True)
class Project:
    """Domain entity representing a motion design / video project."""

    id: str
    name: str
    stage_description: str
    progress: int
    status: ProjectStatus
    asset_count: int | None = None
    template_count: int | None = None
    created_at: datetime = datetime.now(timezone.utc)

