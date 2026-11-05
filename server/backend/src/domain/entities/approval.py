from dataclasses import dataclass


@dataclass(slots=True)
class ApprovalItem:
    """Domain entity representing a Human-In-The-Loop approval gate."""

    id: str
    title: str
    stage: str
    time_ago: str
    is_urgent: bool = False

