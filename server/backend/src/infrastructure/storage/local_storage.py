from pathlib import Path
from server.backend.src.core.config import settings, ROOT_DIR


class LocalStorageService:
    """Local file storage service managing project asset directories."""

    def __init__(self, base_dir: Path | str | None = None) -> None:
        if base_dir is None:
            raw_path = Path(settings.LOCAL_STORAGE_DIR)
            if raw_path.is_absolute():
                self.base_dir = raw_path
            else:
                self.base_dir = ROOT_DIR / raw_path
        else:
            self.base_dir = Path(base_dir)
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def get_project_dir(self, project_id: str) -> Path:
        """Retrieve and ensure the project-specific storage directory exists."""
        project_dir = self.base_dir / project_id
        (project_dir / "assets").mkdir(parents=True, exist_ok=True)
        (project_dir / "raw").mkdir(parents=True, exist_ok=True)
        return project_dir


storage_service = LocalStorageService()

