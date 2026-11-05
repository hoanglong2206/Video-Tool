from typing import List
from fastapi import APIRouter, status
from server.backend.src.api.dtos.library import (
    LibraryCategoryDto,
    SceneTemplateDto,
    MotionPresetDto,
    BrandKitDto,
    ApplyBrandKitRequest,
)

router = APIRouter(prefix="/api/v1/library", tags=["Asset Library & Brand Kit"])

CATEGORIES: List[LibraryCategoryDto] = [
    LibraryCategoryDto(id="shared", name="Shared assets", count=412, is_active=True),
    LibraryCategoryDto(id="scenes", name="Scene templates", count=18),
    LibraryCategoryDto(id="motion", name="Motion presets", count=36),
    LibraryCategoryDto(id="transitions", name="Transition presets", count=24),
    LibraryCategoryDto(id="brands", name="Brand kits", count=6),
]

SCENE_TEMPLATES: List[SceneTemplateDto] = [
    SceneTemplateDto(id="tmpl-1", title="Product reveal", is_selected=True),
    SceneTemplateDto(id="tmpl-2", title="Feature close-up"),
    SceneTemplateDto(id="tmpl-3", title="Spec callout"),
    SceneTemplateDto(id="tmpl-4", title="Logo end card"),
]

MOTION_PRESETS: List[MotionPresetDto] = [
    MotionPresetDto(id="mot-1", title="Slow orbit"),
    MotionPresetDto(id="mot-2", title="Light sweep"),
    MotionPresetDto(id="mot-3", title="Cross dissolve"),
    MotionPresetDto(id="mot-4", title="Whip pan"),
]

BRAND_KIT = BrandKitDto(
    id="kit-aurora",
    name="Aurora Audio",
    colors=["#12151D", "#E2E8F0", "#6B93FF"],
    typeface="Inter, 600 for titles",
    guideline="keep logo clear on dark",
    usage_count=3,
)


@router.get("/categories", response_model=List[LibraryCategoryDto])
async def get_library_categories() -> List[LibraryCategoryDto]:
    """Retrieve shared asset library categories with asset counts."""
    return CATEGORIES


@router.get("/scene-templates", response_model=List[SceneTemplateDto])
async def get_scene_templates() -> List[SceneTemplateDto]:
    """Retrieve reusable scene layout templates."""
    return SCENE_TEMPLATES


@router.get("/motion-presets", response_model=List[MotionPresetDto])
async def get_motion_presets() -> List[MotionPresetDto]:
    """Retrieve motion presets and camera transition animations."""
    return MOTION_PRESETS


@router.get("/brand-kit", response_model=BrandKitDto)
async def get_active_brand_kit() -> BrandKitDto:
    """Retrieve active brand kit with color swatches and typography standards."""
    return BRAND_KIT


@router.post("/brand-kit/apply", status_code=status.HTTP_200_OK)
async def apply_brand_kit(req: ApplyBrandKitRequest) -> dict:
    """Apply selected brand kit styling to target project."""
    return {
        "status": "applied",
        "project_id": req.project_id,
        "brand_kit_id": req.brand_kit_id,
        "message": f"Brand kit '{req.brand_kit_id}' successfully applied to project '{req.project_id}'",
    }

