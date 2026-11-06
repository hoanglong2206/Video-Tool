import asyncio
import sys
from pathlib import Path


def find_workspace_root() -> Path:
    current = Path(__file__).resolve().parent
    for _ in range(7):
        if (current / ".env").exists() or (current / "package.json").exists():
            return current
        current = current.parent
    return Path.cwd()


root = find_workspace_root()
if str(root) not in sys.path:
    sys.path.insert(0, str(root))

from sqlalchemy import delete
from server.backend.src.infrastructure.database.session import async_session_maker
from server.backend.src.infrastructure.database.models import (
    ProjectModel,
    SceneModel,
    AssetModel,
    WorkflowStageModel,
    ExecutionLogModel,
    ApprovalModel,
    RenderJobModel,
)


async def clear_all_data() -> None:
    """Wipe all project data from Supabase PostgreSQL and temporary render files."""
    async with async_session_maker() as session:
        print("[INFO] Wiping all data from Supabase tables...")
        await session.execute(delete(RenderJobModel))
        await session.execute(delete(ApprovalModel))
        await session.execute(delete(ExecutionLogModel))
        await session.execute(delete(WorkflowStageModel))
        await session.execute(delete(AssetModel))
        await session.execute(delete(SceneModel))
        await session.execute(delete(ProjectModel))
        await session.commit()
        print("[SUCCESS] All database records cleared!")

    # Clean storage render files
    render_dir = root / "storage" / "renders"
    if render_dir.exists():
        for f in render_dir.glob("*.mp4"):
            try:
                f.unlink()
                print(f"[INFO] Deleted render artifact: {f.name}")
            except Exception as e:
                print(f"[WARN] Could not delete {f.name}: {e}")

    print("[SUCCESS] Database and render cache are now 100% clean and ready for testing.")


if __name__ == "__main__":
    asyncio.run(clear_all_data())
