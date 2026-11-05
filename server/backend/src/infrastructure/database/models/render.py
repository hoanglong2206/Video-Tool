from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel


class RenderJobModel(Base, TimestampMixin):
    """SQLAlchemy model for video render jobs and export artifacts."""

    __tablename__ = "render_jobs"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    version: Mapped[str] = mapped_column(String(32), default="v1", nullable=False)
    resolution: Mapped[str] = mapped_column(String(64), default="1080p", nullable=False)
    frame_rate: Mapped[str] = mapped_column(String(32), default="24 fps", nullable=False)
    aspect_ratio: Mapped[str] = mapped_column(String(16), default="16:9", nullable=False)
    codec: Mapped[str] = mapped_column(String(64), default="H.264 · MP4", nullable=False)
    duration: Mapped[str] = mapped_column(String(64), default="0s", nullable=False)
    status: Mapped[str] = mapped_column(String(32), default="queued", nullable=False)
    progress_percent: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    output_file_path: Mapped[str | None] = mapped_column(String(512), nullable=True)
    execution_logs: Mapped[list[str] | None] = mapped_column(JSONB, default=list)

    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    finished_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationship
    project: Mapped["ProjectModel"] = relationship("ProjectModel", back_populates="render_jobs")
