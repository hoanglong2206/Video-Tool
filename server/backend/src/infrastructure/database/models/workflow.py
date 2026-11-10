from typing import TYPE_CHECKING
from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.backend.src.infrastructure.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from server.backend.src.infrastructure.database.models.project import ProjectModel


class WorkflowStageModel(Base, TimestampMixin):
    """SQLAlchemy model for DAG pipeline stages and Temporal orchestration state."""

    __tablename__ = "workflow_stages"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    stage_number: Mapped[str] = mapped_column(String(8), nullable=False)
    name: Mapped[str] = mapped_column(String(128), nullable=False)
    status: Mapped[str] = mapped_column(String(32), default="pending", nullable=False)
    progress_percent: Mapped[int | None] = mapped_column(Integer, nullable=True)
    depends_on: Mapped[str | None] = mapped_column(String(255), nullable=True)
    approval_history: Mapped[str | None] = mapped_column(String(255), nullable=True)
    has_preview: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Temporal workflow resilience & execution metrics
    temporal_workflow_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    temporal_run_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    retry_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    stage_outputs: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    error_details: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    # Relationship
    project: Mapped["ProjectModel"] = relationship("ProjectModel", back_populates="workflow_stages")


class ExecutionLogModel(Base, TimestampMixin):
    """SQLAlchemy model for production execution events and audit logs."""

    __tablename__ = "execution_logs"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    project_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    timestamp_label: Mapped[str] = mapped_column(String(32), nullable=False)
    stage_label: Mapped[str] = mapped_column(String(64), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    level: Mapped[str] = mapped_column(String(16), default="INFO", nullable=False)
    source: Mapped[str | None] = mapped_column(String(64), nullable=True)
    duration_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
