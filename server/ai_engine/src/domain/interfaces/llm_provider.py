from abc import ABC, abstractmethod
from pydantic import BaseModel, Field


class BriefCheckResult(BaseModel):
    is_complete: bool
    missing_items: list[str] = Field(default_factory=list)
    suggested_structure: str = ""


class GeneratedScene(BaseModel):
    scene_number: int
    title: str
    duration_seconds: int = 5
    camera_movement: str = "Slow push-in"
    transition_type: str = "Fade"
    description: str
    creative_direction: str


class AssistantReply(BaseModel):
    reply_text: str
    suggested_change: dict | None = None
    quick_requests: list[str] = Field(default_factory=list)


class ILLMProvider(ABC):
    """Abstract interface for LLM reasoning and scene planning providers."""

    @abstractmethod
    async def check_brief(self, brief: str) -> BriefCheckResult:
        """Analyze brief completeness and suggest improvements."""
        pass

    @abstractmethod
    async def generate_storyboard(
        self, brief: str, project_name: str, count: int = 6
    ) -> list[GeneratedScene]:
        """Generate structured cinematic scenes from creative brief."""
        pass

    @abstractmethod
    async def chat_assistant(
        self, message: str, context: dict | None = None
    ) -> AssistantReply:
        """Respond to motion design and styling copilot inquiries."""
        pass
