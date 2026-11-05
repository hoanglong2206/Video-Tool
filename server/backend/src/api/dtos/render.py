from typing import List, Optional
from pydantic import BaseModel, Field


class ExportSettingsDto(BaseModel):
    resolution: str = "3840x2160 (4K)"
    frame_rate: str = "24 fps"
    aspect_ratio: str = "16:9"
    codec: str = "H.264 · MP4"


class PreviousRenderDto(BaseModel):
    version: str
    resolution: str
    duration: str
    status: str = "completed"


class RenderProgressDto(BaseModel):
    percentage: int = 34
    status_text: str = "Rendering frames"
    estimated_remaining: str = "Estimated 3 min left"
    elapsed_time: str = "Elapsed 1 min 42 s"
    logs: List[str]


class StartRenderRequest(BaseModel):
    project_id: str
    settings: Optional[ExportSettingsDto] = None

