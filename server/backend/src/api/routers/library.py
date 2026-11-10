from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.library import (
    LibraryCategoryDto,
    SceneTemplateDto,
    MotionPresetDto,
    BrandKitDto,
    ApplyBrandKitRequest,
)
from server.backend.src.infrastructure.database.models import (
    BrandKitModel,
    SceneTemplateModel,
    ProjectModel,
)
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/library", tags=["Asset Library & Brand Kit"])

CATEGORIES: List[LibraryCategoryDto] = [
    LibraryCategoryDto(id="shared", name="Shared assets", count=412, is_active=True),
    LibraryCategoryDto(id="scenes", name="Scene templates", count=18),
    LibraryCategoryDto(id="motion", name="Motion presets", count=36),
    LibraryCategoryDto(id="transitions", name="Transition presets", count=24),
    LibraryCategoryDto(id="brands", name="Brand kits", count=6),
]

MOTION_PRESETS: List[MotionPresetDto] = [
    MotionPresetDto(id="mot-1", title="Slow orbit"),
    MotionPresetDto(id="mot-2", title="Light sweep"),
    MotionPresetDto(id="mot-3", title="Cross dissolve"),
    MotionPresetDto(id="mot-4", title="Whip pan"),
]

DEFAULT_TEMPLATES = [
    {"id": "tmpl-1", "title": "Product reveal", "category": "reveal", "default_duration": 5},
    {"id": "tmpl-2", "title": "Feature close-up", "category": "macro", "default_duration": 5},
    {"id": "tmpl-3", "title": "Spec callout", "category": "callout", "default_duration": 6},
    {"id": "tmpl-4", "title": "Logo end card", "category": "endcard", "default_duration": 4},
]


@router.get("/categories", response_model=List[LibraryCategoryDto])
async def get_library_categories() -> List[LibraryCategoryDto]:
    """Retrieve shared asset library categories with asset counts."""
    return CATEGORIES


@router.get("/scene-templates", response_model=List[SceneTemplateDto])
async def get_scene_templates(
    session: AsyncSession = Depends(get_db_session),
) -> List[SceneTemplateDto]:
    """Retrieve reusable scene layout templates from PostgreSQL."""
    stmt = select(SceneTemplateModel).order_by(SceneTemplateModel.id.asc())
    templates = (await session.scalars(stmt)).all()

    if not templates:
        # Auto-seed standard templates if empty
        new_records = []
        for item in DEFAULT_TEMPLATES:
            tm = SceneTemplateModel(
                id=item["id"],
                title=item["title"],
                category=item["category"],
                default_duration=item["default_duration"],
                is_system_preset=True,
            )
            session.add(tm)
            new_records.append(tm)
        await session.commit()
        templates = new_records

    return [
        SceneTemplateDto(
            id=t.id,
            title=t.title,
            category=t.category,
            is_selected=(t.id == "tmpl-1"),
        )
        for t in templates
    ]


@router.get("/motion-presets", response_model=List[MotionPresetDto])
async def get_motion_presets() -> List[MotionPresetDto]:
    """Retrieve motion presets and camera transition animations."""
    return MOTION_PRESETS


@router.get("/brand-kit", response_model=BrandKitDto)
async def get_active_brand_kit(
    session: AsyncSession = Depends(get_db_session),
) -> BrandKitDto:
    """Retrieve active brand kit with color swatches and typography standards from PostgreSQL."""
    stmt = select(BrandKitModel).limit(1)
    brand_kit = await session.scalar(stmt)

    if not brand_kit:
        # Auto-seed default Aurora Audio brand kit
        brand_kit = BrandKitModel(
            id="kit-aurora",
            name="Aurora Audio",
            client_name="Aurora Audio Inc.",
            colors=["#12151D", "#E2E8F0", "#6B93FF"],
            typography={"primary": "Inter", "heading_weight": 600},
            tone_of_voice="Cinematic Minimal Tech",
            rules_guidelines="keep logo clear on dark",
        )
        session.add(brand_kit)
        await session.commit()
        await session.refresh(brand_kit)

    typeface_label = "Inter, 600 for titles"
    if brand_kit.typography and "primary" in brand_kit.typography:
        typeface_label = f"{brand_kit.typography.get('primary')}, {brand_kit.typography.get('heading_weight', 600)} for titles"

    # Query real project usage count
    cnt_stmt = select(func.count(ProjectModel.id)).where(ProjectModel.brand_kit_id == brand_kit.id)
    usage_count = (await session.scalar(cnt_stmt)) or 0

    return BrandKitDto(
        id=brand_kit.id,
        name=brand_kit.name,
        colors=brand_kit.colors or ["#12151D", "#E2E8F0", "#6B93FF"],
        typeface=typeface_label,
        guideline=brand_kit.rules_guidelines or "keep logo clear on dark",
        usage_count=usage_count,
    )


@router.post("/brand-kit/apply", status_code=status.HTTP_200_OK)
async def apply_brand_kit(
    req: ApplyBrandKitRequest,
    session: AsyncSession = Depends(get_db_session),
) -> dict:
    """Apply selected brand kit styling directly to target project in PostgreSQL."""
    project = await session.get(ProjectModel, req.project_id)
    brand_kit = await session.get(BrandKitModel, req.brand_kit_id)

    if project and brand_kit:
        project.brand_kit_id = brand_kit.id
        project.brand_colors = brand_kit.colors or project.brand_colors
        if brand_kit.typography and "primary" in brand_kit.typography:
            project.typeface = brand_kit.typography.get("primary")
        await session.commit()

    return {
        "status": "applied",
        "project_id": req.project_id,
        "brand_kit_id": req.brand_kit_id,
        "message": f"Brand kit '{req.brand_kit_id}' successfully applied to project '{req.project_id}'",
    }
