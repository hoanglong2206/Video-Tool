import httpx
from server.ai_engine.src.core.config import ai_settings


class ComfyUIClient:
    """HTTP client for ComfyUI local diffusion daemon."""

    def __init__(self, base_url: str | None = None) -> None:
        self.base_url = (base_url or ai_settings.COMFYUI_BASE_URL).rstrip("/")
        self.timeout = ai_settings.COMFYUI_TIMEOUT_SECONDS

    async def is_available(self) -> bool:
        """Check if local ComfyUI instance is responding."""
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                res = await client.get(f"{self.base_url}/system_stats")
                return res.status_code == 200
        except Exception:
            return False

    async def queue_prompt(self, workflow_graph: dict) -> dict | None:
        """Submit a prompt generation workflow graph to ComfyUI queue."""
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                res = await client.post(
                    f"{self.base_url}/prompt",
                    json={"prompt": workflow_graph},
                )
                if res.status_code == 200:
                    return res.json()
        except Exception:
            return None
        return None

    async def get_history(self, prompt_id: str) -> dict | None:
        """Fetch execution outputs and generated image filenames for a queued prompt."""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(f"{self.base_url}/history/{prompt_id}")
                if res.status_code == 200:
                    return res.json()
        except Exception:
            return None
        return None


comfy_client = ComfyUIClient()
