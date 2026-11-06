import json
import httpx
from server.ai_engine.src.core.config import ai_settings
from server.ai_engine.src.domain.interfaces.llm_provider import (
    AssistantReply,
    BriefCheckResult,
    GeneratedScene,
    ILLMProvider,
)
from server.ai_engine.src.llm.fallback_provider import FallbackLLMProvider
from server.ai_engine.src.llm.prompts.brief_analysis import (
    BRIEF_ANALYSIS_SYSTEM_PROMPT,
    build_brief_check_prompt,
)
from server.ai_engine.src.llm.prompts.storyboard import (
    STORYBOARD_SYSTEM_PROMPT,
    build_storyboard_prompt,
)


class OllamaProvider(ILLMProvider):
    """Local Ollama client utilizing LLMs (Llama 3, Qwen) with automatic graceful fallback."""

    def __init__(self, fallback: ILLMProvider | None = None) -> None:
        self.fallback = fallback or FallbackLLMProvider()
        self.base_url = ai_settings.OLLAMA_BASE_URL.rstrip("/")
        self.model = ai_settings.OLLAMA_MODEL
        self.timeout = ai_settings.OLLAMA_TIMEOUT_SECONDS

    async def _query_ollama(self, prompt: str, system: str) -> dict | list | None:
        """Call Ollama /api/generate with JSON mode."""
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                res = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "system": system,
                        "stream": False,
                        "format": "json",
                    },
                )
                if res.status_code == 200:
                    payload = res.json()
                    response_text = payload.get("response", "{}")
                    return json.loads(response_text)
        except Exception:
            # Daemon offline or timeout -> use fallback
            return None
        return None

    async def check_brief(self, brief: str) -> BriefCheckResult:
        prompt = build_brief_check_prompt(brief)
        data = await self._query_ollama(prompt, BRIEF_ANALYSIS_SYSTEM_PROMPT)
        if isinstance(data, dict) and "is_complete" in data:
            return BriefCheckResult(
                is_complete=bool(data.get("is_complete")),
                missing_items=data.get("missing_items", []),
                suggested_structure=data.get("suggested_structure", ""),
            )
        return await self.fallback.check_brief(brief)

    async def generate_storyboard(
        self, brief: str, project_name: str, count: int = 6
    ) -> list[GeneratedScene]:
        prompt = build_storyboard_prompt(project_name, brief, count)
        data = await self._query_ollama(prompt, STORYBOARD_SYSTEM_PROMPT)
        if isinstance(data, list) and len(data) > 0:
            scenes: list[GeneratedScene] = []
            for idx, item in enumerate(data, start=1):
                scenes.append(
                    GeneratedScene(
                        scene_number=item.get("scene_number", idx),
                        title=item.get("title", f"Scene {idx}"),
                        duration_seconds=item.get("duration_seconds", 5),
                        camera_movement=item.get("camera_movement", "Slow push-in"),
                        transition_type=item.get("transition_type", "Fade"),
                        description=item.get("description", ""),
                        creative_direction=item.get("creative_direction", "Dark studio"),
                    )
                )
            return scenes

        return await self.fallback.generate_storyboard(brief, project_name, count)

    async def chat_assistant(
        self, message: str, context: dict | None = None
    ) -> AssistantReply:
        system = "You are a senior motion designer copilot specializing in kinetic typography and 3D Apple-style lighting."
        prompt = f"User Request: {message}\nContext: {json.dumps(context or {})}"
        data = await self._query_ollama(prompt, system)
        if isinstance(data, dict) and "reply_text" in data:
            return AssistantReply(
                reply_text=data.get("reply_text", "Refined motion curve ready."),
                suggested_change=data.get("suggested_change"),
                quick_requests=data.get("quick_requests", []),
            )
        return await self.fallback.chat_assistant(message, context)
