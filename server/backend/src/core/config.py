from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration settings loaded from environment."""

    APP_ENV: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    SECRET_KEY: str = "dev-secret-change-in-production-32bytes-minimum"
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:8000"

    # API Server
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    # PostgreSQL Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/video_ai"

    # Temporal
    TEMPORAL_HOST: str = "localhost:7233"
    TEMPORAL_TASK_QUEUE: str = "video-production-queue"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]


settings = Settings()

