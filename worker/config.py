import os
from pathlib import Path
from pydantic_settings import BaseSettings

class WorkerSettings(BaseSettings):
    """Background worker daemon configuration."""
    database_url: str = ""
    poll_interval_seconds: float = 2.0
    workspace_root: Path = Path(__file__).resolve().parent.parent
    render_out_dir: Path = Path(__file__).resolve().parent.parent / "storage" / "renders"
    gpu_concurrency_limit: int = 2

    class Config:
        env_file = ".env"
        extra = "ignore"

worker_settings = WorkerSettings()
worker_settings.render_out_dir.mkdir(parents=True, exist_ok=True)
