from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel


class SceneModel(Base, TimestampMixin):
    """SQLAlchemy model for storyboard scenes."""

    __tablename__ = "scenes"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    scene_number: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    duration_seconds: Mapped[int] = mapped_column(Integer, default=5, nullable=False)
    camera_movement: Mapped[str] = mapped_column(String(128), default="Static", nullable=False)
    transition_type: Mapped[str] = mapped_column(String(128), default="Cut", nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    creative_direction: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Declarative Scene AST / Layers configuration (JSONB)
    layers_data: Mapped[list[dict] | None] = mapped_column(JSONB, default=list)
    tracks_data: Mapped[list[dict] | None] = mapped_column(JSONB, default=list)
    properties_data: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    # Relationship
    project: Mapped["ProjectModel"] = relationship("ProjectModel", back_populates="scenes")
