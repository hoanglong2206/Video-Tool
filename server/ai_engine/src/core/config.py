from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


def find_workspace_root() -> Path:
    """Traverse upwards to locate the workspace root containing .env or PROJECT.md."""
    current = Path(__file__).resolve().parent
    for _ in range(7):
        if (current / ".env").exists() or (current / "PROJECT.md").exists() or (current / "package.json").exists():
            return current
        current = current.parent
    return Path.cwd()


ROOT_DIR = find_workspace_root()
ENV_PATH = ROOT_DIR / ".env"


class AIEngineSettings(BaseSettings):
    """Configuration settings for AI and Computer Vision services."""

    AI_PROVIDER: str = "local"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3:8b"
    OLLAMA_TIMEOUT_SECONDS: float = 60.0

    COMFYUI_BASE_URL: str = "http://localhost:8188"
    COMFYUI_TIMEOUT_SECONDS: float = 120.0

    REMBG_MODEL: str = "u2netp"  # Lightweight model fast on CPU

    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH),
        env_file_encoding="utf-8",
        extra="ignore",
    )


ai_settings = AIEngineSettings()
