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


class SceneCreateDTO(BaseModel):
    """DTO for individual scene payload when initializing a project."""

    scene_number: int = Field(ge=1)
    title: str = Field(min_length=1, max_length=255)
    duration_seconds: int = Field(default=5, ge=1)
    camera_movement: str = Field(default="Static", max_length=128)
    visual_prompt: str | None = None
    voiceover: str | None = None
    transition_type: str = Field(default="Cut", max_length=128)


class CreateProjectRequestDTO(BaseModel):
    """Payload to create a new video project."""

    name: str = Field(min_length=1, max_length=255)
    brief: str | None = None
    client: str | None = None
    duration: str | None = None
    aspect_ratio: str | None = None
    style_preference: str | None = None
    brand_colors: list[str] | None = None
    scenes: list[SceneCreateDTO] | None = None


class BriefCheckRequestDTO(BaseModel):
    """Payload to evaluate creative brief completeness."""

    brief: str
    project_name: str | None = None
    client: str | None = None


class BriefCheckResponseDTO(BaseModel):
    """AI evaluation of the client creative brief."""

    missing_items: list[str]
    suggested_structure: str
    is_complete: bool


class UpdateProjectStatusRequestDTO(BaseModel):
    """Payload to update the operational status of a project."""

    status: str | None = Field(default=None, description="New status, e.g. in_progress, stopped, waiting_approval, completed")
    stage_description: str | None = Field(default=None, description="Updated stage description")
    progress: int | None = Field(default=None, description="Updated progress percentage")
