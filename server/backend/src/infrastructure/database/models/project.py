from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.brand_kit import BrandKitModel
    from server.backend.src.infrastructure.database.models.scene import SceneModel
    from server.backend.src.infrastructure.database.models.asset import AssetModel
    from server.backend.src.infrastructure.database.models.audio_track import AudioTrackModel
    from server.backend.src.infrastructure.database.models.workflow import WorkflowStageModel
    from server.backend.src.infrastructure.database.models.approval import ApprovalModel
    from server.backend.src.infrastructure.database.models.render import RenderJobModel


class ProjectModel(Base, TimestampMixin):
    """SQLAlchemy model for motion design and video production projects."""

    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    user_id: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)
    brand_kit_id: Mapped[str | None] = mapped_column(
        String(64), ForeignKey("brand_kits.id", ondelete="SET NULL"), nullable=True, index=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    client: Mapped[str | None] = mapped_column(String(255), nullable=True)
    brief: Mapped[str | None] = mapped_column(Text, nullable=True)
    stage_description: Mapped[str] = mapped_column(
        String(255), default="Stage 01 · Brief analysis", nullable=False
    )
    progress: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[str] = mapped_column(String(32), default="in_progress", nullable=False)

    duration: Mapped[str | None] = mapped_column(String(64), default="30 seconds")
    aspect_ratio: Mapped[str | None] = mapped_column(String(16), default="16:9")
    style_preference: Mapped[str | None] = mapped_column(String(128), default="Cinematic, minimal")
    brand_colors: Mapped[list[str] | None] = mapped_column(JSONB, default=list)
    typeface: Mapped[str | None] = mapped_column(String(64), default="Inter")

    bgm_mood: Mapped[str | None] = mapped_column(String(64), default="Cinematic Epic")
    sound_mode: Mapped[str | None] = mapped_column(String(32), default="full")
    target_resolution: Mapped[str | None] = mapped_column(String(32), default="4K UHD")

    asset_count: Mapped[int | None] = mapped_column(Integer, default=0)
    template_count: Mapped[int | None] = mapped_column(Integer, default=0)

    # Relationships
    brand_kit: Mapped["BrandKitModel | None"] = relationship(
        "BrandKitModel", back_populates="projects"
    )
    scenes: Mapped[list["SceneModel"]] = relationship(
        "SceneModel", back_populates="project", cascade="all, delete-orphan", order_by="SceneModel.scene_number"
    )
    assets: Mapped[list["AssetModel"]] = relationship(
        "AssetModel", back_populates="project", cascade="all, delete-orphan"
    )
    audio_tracks: Mapped[list["AudioTrackModel"]] = relationship(
        "AudioTrackModel", back_populates="project", cascade="all, delete-orphan"
    )
    workflow_stages: Mapped[list["WorkflowStageModel"]] = relationship(
        "WorkflowStageModel", back_populates="project", cascade="all, delete-orphan", order_by="WorkflowStageModel.stage_number"
    )
    approvals: Mapped[list["ApprovalModel"]] = relationship(
        "ApprovalModel", back_populates="project", cascade="all, delete-orphan"
    )
    render_jobs: Mapped[list["RenderJobModel"]] = relationship(
        "RenderJobModel", back_populates="project", cascade="all, delete-orphan"
    )
