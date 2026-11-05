from typing import List, Optional
from pydantic import BaseModel, Field


class AssistantContextDto(BaseModel):
    project_id: str = "aurora-x1"
    stage: str = "Stage 06 · Motion"
    scene_id: str = "Scene 03"
    layer_name: Optional[str] = "Product layer"


class SuggestedChangeDto(BaseModel):
    id: str
    title: str = "Suggested change"
    description: str
    actions: List[str] = ["Preview", "Edit", "Apply"]


class AssistantChatRequest(BaseModel):
    message: str = Field(..., description="User query or command for AI assistant")
    context: AssistantContextDto = Field(default_factory=AssistantContextDto)


class AssistantChatResponse(BaseModel):
    reply_text: str
    suggested_change: Optional[SuggestedChangeDto] = None
    quick_requests: List[str] = [
        "Generate 3 backgrounds",
        "Improve lighting",
        "Shorten to 3 s",
    ]


class ApplyChangeRequest(BaseModel):
    change_id: str
    scene_id: str
    parameters: Optional[dict] = None
