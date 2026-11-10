from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.scene import SceneModel


class SceneVersionModel(Base, TimestampMixin):
    """SQLAlchemy model for historical snapshots of storyboard scenes."""

    __tablename__ = "scene_versions"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    scene_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("scenes.id", ondelete="CASCADE"), nullable=False, index=True
    )
    version_number: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    visual_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    voiceover: Mapped[str | None] = mapped_column(Text, nullable=True)
    camera_movement: Mapped[str | None] = mapped_column(String(128), nullable=True)

    layers_snapshot: Mapped[list[dict] | None] = mapped_column(JSONB, default=list)
    tracks_snapshot: Mapped[list[dict] | None] = mapped_column(JSONB, default=list)
    created_by_role: Mapped[str] = mapped_column(String(32), default="ai_llm", nullable=False)

    # Relationships
    scene: Mapped["SceneModel"] = relationship("SceneModel", back_populates="versions")
