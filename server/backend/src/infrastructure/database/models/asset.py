from typing import TYPE_CHECKING
from sqlalchemy import BigInteger, Boolean, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel
    from server.backend.src.infrastructure.database.models.asset_version import AssetVersionModel


class AssetModel(Base, TimestampMixin):
    """SQLAlchemy model for media assets (product photos, textures, masks, backgrounds)."""

    __tablename__ = "assets"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    current_version_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(64), default="product", nullable=False, index=True)
    source_type: Mapped[str] = mapped_column(String(32), default="generated", nullable=False)
    file_path: Mapped[str | None] = mapped_column(String(512), nullable=True)
    storage_type: Mapped[str] = mapped_column(String(32), default="local", nullable=False)

    resolution: Mapped[str] = mapped_column(String(64), default="4096×4096", nullable=False)
    width: Mapped[int | None] = mapped_column(Integer, nullable=True)
    height: Mapped[int | None] = mapped_column(Integer, nullable=True)
    format: Mapped[str] = mapped_column(String(64), default="Transparent PNG", nullable=False)
    version: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    total_versions: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    is_transparent: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger, default=0, nullable=False)

    scenes_used: Mapped[list[int] | None] = mapped_column(JSONB, default=list)
    asset_metadata: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    # Relationships
    project: Mapped["ProjectModel"] = relationship("ProjectModel", back_populates="assets")
    versions: Mapped[list["AssetVersionModel"]] = relationship(
        "AssetVersionModel", back_populates="asset", cascade="all, delete-orphan", order_by="AssetVersionModel.version_number"
    )
