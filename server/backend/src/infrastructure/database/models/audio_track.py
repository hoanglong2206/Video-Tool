from typing import TYPE_CHECKING
from sqlalchemy import Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel


class AudioTrackModel(Base, TimestampMixin):
    """SQLAlchemy model for multi-channel audio sequencing (BGM, Voiceover, SFX)."""

    __tablename__ = "audio_tracks"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    track_type: Mapped[str] = mapped_column(String(32), default="bgm", nullable=False)
    file_path: Mapped[str | None] = mapped_column(String(512), nullable=True)
    volume: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)
    start_time_seconds: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    duration_seconds: Mapped[float] = mapped_column(Float, default=30.0, nullable=False)

    beat_markers: Mapped[list[float] | None] = mapped_column(JSONB, default=list)
    ducking_config: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    # Relationships
    project: Mapped["ProjectModel"] = relationship("ProjectModel", back_populates="audio_tracks")
