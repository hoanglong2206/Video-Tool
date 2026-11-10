from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel
    from server.backend.src.infrastructure.database.models.template import SceneTemplateModel
    from server.backend.src.infrastructure.database.models.scene_version import SceneVersionModel


class SceneModel(Base, TimestampMixin):
    """SQLAlchemy model for storyboard scenes and 3D composition parameters."""

    __tablename__ = "scenes"
    __table_args__ = (
        UniqueConstraint("project_id", "scene_number", name="uq_scenes_project_scene_number"),
    )

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    scene_template_id: Mapped[str | None] = mapped_column(
        String(64), ForeignKey("scene_templates.id", ondelete="SET NULL"), nullable=True, index=True
    )
    scene_number: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    duration_seconds: Mapped[int] = mapped_column(Integer, default=5, nullable=False)
    camera_movement: Mapped[str] = mapped_column(String(128), default="Static", nullable=False)
    transition_type: Mapped[str] = mapped_column(String(128), default="Cut", nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    creative_direction: Mapped[str | None] = mapped_column(Text, nullable=True)
    voiceover_text: Mapped[str | None] = mapped_column(Text, nullable=True)

    # 3D spatial camera and lighting configuration for Blender headless execution
    camera_3d_params: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    lighting_rig: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    # Declarative Scene AST / Layers configuration (JSONB)
    layers_data: Mapped[list[dict] | None] = mapped_column(JSONB, default=list)
    tracks_data: Mapped[list[dict] | None] = mapped_column(JSONB, default=list)
    properties_data: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    # Relationships
    project: Mapped["ProjectModel"] = relationship("ProjectModel", back_populates="scenes")
    template: Mapped["SceneTemplateModel | None"] = relationship(
        "SceneTemplateModel", back_populates="scenes"
    )
    versions: Mapped[list["SceneVersionModel"]] = relationship(
        "SceneVersionModel", back_populates="scene", cascade="all, delete-orphan", order_by="SceneVersionModel.version_number"
    )
