from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


def find_workspace_root() -> Path:
    """Traverse upwards to locate the workspace root containing .env or PROJECT.md."""
    current = Path(__file__).resolve().parent
    for _ in range(6):
        if (current / ".env").exists() or (current / "PROJECT.md").exists() or (current / "package.json").exists():
            return current
        current = current.parent
    return Path.cwd()


ROOT_DIR = find_workspace_root()
ENV_PATH = ROOT_DIR / ".env"


class Settings(BaseSettings):
    """Application configuration settings loaded from environment."""

    APP_ENV: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    SECRET_KEY: str = "dev-secret-change-in-production-32bytes-minimum"
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:3001,http://localhost:8000"

    # API Server
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    # PostgreSQL Database (Supabase Cloud / Local)
    DATABASE_URL: str = (
        "postgresql+asyncpg://postgres:postgres@localhost:5432/video_ai"
    )
    POSTGRES_POOL_SIZE: int = 10
    POSTGRES_MAX_OVERFLOW: int = 20
    DB_ECHO: bool = False

    # Media Storage
    STORAGE_TYPE: str = "local"
    LOCAL_STORAGE_DIR: str = "./storage/projects"

    # Temporal
    TEMPORAL_HOST: str = "localhost:7233"
    TEMPORAL_TASK_QUEUE: str = "video-production-queue"

    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.ALLOWED_ORIGINS.split(",")
            if origin.strip()
        ]


settings = Settings()
