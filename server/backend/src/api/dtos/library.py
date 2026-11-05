from typing import List, Optional
from pydantic import BaseModel, Field


class LibraryCategoryDto(BaseModel):
    id: str
    name: str
    count: int
    is_active: bool = False


class SceneTemplateDto(BaseModel):
    id: str
    title: str
    category: str = "scene"
    is_selected: bool = False


class MotionPresetDto(BaseModel):
    id: str
    title: str
    category: str = "motion"


class BrandKitDto(BaseModel):
    id: str
    name: str
    colors: List[str]
    typeface: str
    guideline: str
    usage_count: int
    logo_url: Optional[str] = None


class ApplyBrandKitRequest(BaseModel):
    project_id: str = Field(..., description="Target project ID")
    brand_kit_id: str = Field(..., description="Brand kit to apply")

