from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel


class ApprovalModel(Base, TimestampMixin):
    """SQLAlchemy model for Human-in-the-Loop approval requests."""

    __tablename__ = "approvals"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    stage_name: Mapped[str] = mapped_column(String(128), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    version_label: Mapped[str] = mapped_column(String(64), nullable=False)

    previous_version_label: Mapped[str | None] = mapped_column(String(64), nullable=True)
    previous_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    current_version_label: Mapped[str | None] = mapped_column(String(64), nullable=True)
    current_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[str] = mapped_column(String(32), default="pending", nullable=False)
    reviewer_comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    decided_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationship
    project: Mapped["ProjectModel"] = relationship("ProjectModel", back_populates="approvals")
