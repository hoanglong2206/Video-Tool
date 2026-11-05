from pydantic import BaseModel, ConfigDict, Field
from server.backend.src.domain.entities.project import Project, ProjectStatus


class ProjectResponseDTO(BaseModel):
    """DTO for project information sent to the frontend."""

    id: str
    name: str
    stageDescription: str = Field(alias="stage_description")
    progress: int
    status: ProjectStatus
    assetCount: int | None = Field(default=None, alias="asset_count")
    templateCount: int | None = Field(default=None, alias="template_count")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    @classmethod
    def from_domain(cls, entity: Project) -> "ProjectResponseDTO":
        return cls(
            id=entity.id,
            name=entity.name,
            stage_description=entity.stage_description,
            progress=entity.progress,
            status=entity.status,
            asset_count=entity.asset_count,
            template_count=entity.template_count,
        )


class CreateProjectRequestDTO(BaseModel):
    """Payload to create a new video project."""

    name: str = Field(min_length=1, max_length=255)
    brief: str | None = None

