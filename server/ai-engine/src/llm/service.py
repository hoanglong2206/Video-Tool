from server.ai_engine.src.domain.interfaces.llm_provider import (
    AssistantReply,
    BriefCheckResult,
    GeneratedScene,
    ILLMProvider,
)
from server.ai_engine.src.llm.fallback_provider import FallbackLLMProvider
from server.ai_engine.src.llm.ollama_provider import OllamaProvider


class LLMOrchestrationService:
    """High-level orchestration service for generative planning and prompt reasoning."""

    def __init__(self, provider: ILLMProvider | None = None) -> None:
        self.provider = provider or OllamaProvider(fallback=FallbackLLMProvider())

    async def check_brief_completeness(self, brief: str) -> BriefCheckResult:
        """Assess brief completeness using AI reasoning."""
        return await self.provider.check_brief(brief)

    async def generate_storyboard_scenes(
        self, brief: str, project_name: str, count: int = 6
    ) -> list[GeneratedScene]:
        """Synthesize multi-scene storyboard sequence from creative brief."""
        return await self.provider.generate_storyboard(brief, project_name, count)

    async def chat_copilot(
        self, message: str, context: dict | None = None
    ) -> AssistantReply:
        """Query creative copilot assistant for camera, lighting, and timeline adjustments."""
        return await self.provider.chat_assistant(message, context)


llm_service = LLMOrchestrationService()
