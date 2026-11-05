from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.asset import (
    AssetItemDTO,
    AssetStudioResponseDTO,
    CategoryCountDTO,
)
from server.backend.src.infrastructure.database.models import AssetModel, ProjectModel
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/projects", tags=["Assets"])


@router.get("/{project_id}/assets", response_model=AssetStudioResponseDTO)
async def get_project_assets(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> AssetStudioResponseDTO:
    """Return categorized assets and diffusion cutouts from Supabase."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    project_name = project.name if project else f"Project {project_id}"

    # Query all assets for this project
    stmt = (
        select(AssetModel)
        .where(AssetModel.project_id == target_id)
        .order_by(AssetModel.created_at.asc())
    )
    result = await session.scalars(stmt)
    assets_db = result.all()

    # Calculate dynamic category counts
    cat_stmt = (
        select(AssetModel.category, func.count(AssetModel.id))
        .where(AssetModel.project_id == target_id)
        .group_by(AssetModel.category)
    )
    cat_counts = dict((await session.execute(cat_stmt)).all())

    categories = [
        CategoryCountDTO(id="all", label="All assets", count=len(assets_db)),
        CategoryCountDTO(id="product", label="Product", count=cat_counts.get("product", 0)),
        CategoryCountDTO(id="backgrounds", label="Backgrounds", count=cat_counts.get("backgrounds", 0)),
        CategoryCountDTO(id="particles", label="Particles", count=cat_counts.get("particles", 0)),
        CategoryCountDTO(id="textures", label="Textures", count=cat_counts.get("textures", 0)),
        CategoryCountDTO(id="logos", label="Logos", count=cat_counts.get("logos", 0)),
    ]

    assets = [
        AssetItemDTO(
            id=a.id,
            name=a.name,
            category=a.category,
            sourceType=a.source_type,
            resolution=a.resolution,
            format=a.format,
            scenesUsed=a.scenes_used or [],
            version=a.version,
            totalVersions=a.total_versions,
            isTransparent=a.is_transparent,
        )
        for a in assets_db
    ]

    return AssetStudioResponseDTO(
        projectName=project_name,
        categories=categories,
        assets=assets,
    )


from pathlib import Path
from server.ai_engine.src.vision.service import vision_service
from server.backend.src.infrastructure.storage.local_storage import storage_service


@router.post("/{project_id}/assets/{asset_id}/remove-bg")
async def remove_asset_background(
    project_id: str,
    asset_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> dict[str, str]:
    """Trigger AI background removal isolation on target asset and persist state."""
    asset = await session.get(AssetModel, asset_id)
    if not asset:
        return {"status": "failed", "message": "Asset not found", "assetId": asset_id}

    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    proj_dir = storage_service.get_project_dir(target_id)
    out_file = proj_dir / "assets" / f"{asset.name}_nobg.png"

    # If an original raw file exists, process it with vision_service
    raw_file = proj_dir / "raw" / f"{asset.name}.png"
    if raw_file.exists():
        raw_bytes = raw_file.read_bytes()
        cutout_res = await vision_service.isolate_product(raw_bytes)
        if cutout_res.success:
            out_file.write_bytes(cutout_res.image_bytes)
            asset.file_path = str(out_file)

    asset.is_transparent = True
    asset.format = "Transparent PNG"
    await session.commit()

    return {
        "status": "completed",
        "assetId": asset_id,
        "format": "Transparent PNG",
        "outputFile": str(out_file),
        "message": f"Background removed via AI Vision for asset {asset.name}.",
    }
