from typing import TYPE_CHECKING
from sqlalchemy import String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel


class BrandKitModel(Base, TimestampMixin):
    """SQLAlchemy model for reusable brand guidelines and visual assets."""

    __tablename__ = "brand_kits"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    client_name: Mapped[str] = mapped_column(String(255), nullable=False)
    user_id: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)

    colors: Mapped[list[str] | None] = mapped_column(JSONB, default=list)
    typography: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    logo_asset_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    tone_of_voice: Mapped[str | None] = mapped_column(String(128), default="Cinematic Minimal Tech")
    rules_guidelines: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    projects: Mapped[list["ProjectModel"]] = relationship(
        "ProjectModel", back_populates="brand_kit"
    )
