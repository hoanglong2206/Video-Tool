from typing import TYPE_CHECKING
from sqlalchemy import Boolean, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.scene import SceneModel


class SceneTemplateModel(Base, TimestampMixin):
    """SQLAlchemy model for reusable scene layout templates and animation presets."""

    __tablename__ = "scene_templates"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(64), default="reveal", nullable=False, index=True)
    default_duration: Mapped[int] = mapped_column(Integer, default=5, nullable=False)

    composition_dsl: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    preview_video_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    is_system_preset: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Relationships
    scenes: Mapped[list["SceneModel"]] = relationship(
        "SceneModel", back_populates="template"
    )
