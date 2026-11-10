from typing import TYPE_CHECKING
from sqlalchemy import BigInteger, Boolean, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.asset import AssetModel


class AssetVersionModel(Base, TimestampMixin):
    """SQLAlchemy model for version history of media assets (raw, cutouts, restyled)."""

    __tablename__ = "asset_versions"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    asset_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True
    )
    version_number: Mapped[int] = mapped_column(Integer, nullable=False)
    file_path: Mapped[str] = mapped_column(String(512), nullable=False)
    change_description: Mapped[str | None] = mapped_column(String(255), nullable=True)
    is_transparent: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    generation_parameters: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger, default=0, nullable=False)

    # Relationships
    asset: Mapped["AssetModel"] = relationship("AssetModel", back_populates="versions")
