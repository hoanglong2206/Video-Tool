from fastapi import APIRouter
from server.backend.src.api.dtos.asset import (
    AssetItemDTO,
    AssetStudioResponseDTO,
    CategoryCountDTO,
)

router = APIRouter(prefix="/api/v1/projects", tags=["Assets"])

DEFAULT_CATEGORIES = [
    CategoryCountDTO(id="all", label="All assets", count=64),
    CategoryCountDTO(id="product", label="Product", count=12),
    CategoryCountDTO(id="backgrounds", label="Backgrounds", count=18),
    CategoryCountDTO(id="particles", label="Particles", count=9),
    CategoryCountDTO(id="textures", label="Textures", count=11),
    CategoryCountDTO(id="logos", label="Logos", count=4),
]

DEFAULT_ASSETS = [
    AssetItemDTO(
        id="asset-1",
        name="product-front",
        category="product",
        sourceType="generated",
        resolution="4096×4096",
        format="Transparent PNG",
        scenesUsed=[2, 3, 6],
        version=3,
        totalVersions=3,
        isTransparent=True,
    ),
    AssetItemDTO(
        id="asset-2",
        name="product-side",
        category="product",
        sourceType="generated",
        resolution="4096×4096",
        format="Transparent PNG",
        scenesUsed=[2, 4],
        version=2,
        totalVersions=2,
        isTransparent=True,
    ),
    AssetItemDTO(
        id="asset-3",
        name="bg-studio-01",
        category="backgrounds",
        sourceType="generated",
        resolution="3840×2160",
        format="EXR Studio Map",
        scenesUsed=[1, 2],
        version=1,
        totalVersions=1,
    ),
    AssetItemDTO(
        id="asset-4",
        name="bg-studio-02",
        category="backgrounds",
        sourceType="generated",
        resolution="3840×2160",
        format="HDR Atmosphere",
        scenesUsed=[3, 4],
        version=2,
        totalVersions=2,
    ),
    AssetItemDTO(
        id="asset-5",
        name="particles",
        category="particles",
        sourceType="generated",
        resolution="1920×1080",
        format="Alpha Depth Pass",
        scenesUsed=[1, 5],
        version=1,
        totalVersions=1,
    ),
    AssetItemDTO(
        id="asset-6",
        name="flare",
        category="particles",
        sourceType="generated",
        resolution="2048×2048",
        format="Anamorphic Streak",
        scenesUsed=[2],
        version=1,
        totalVersions=1,
    ),
    AssetItemDTO(
        id="asset-7",
        name="metal-tex",
        category="textures",
        sourceType="generated",
        resolution="4096×4096",
        format="Roughness PBR Map",
        scenesUsed=[3, 4],
        version=1,
        totalVersions=1,
    ),
    AssetItemDTO(
        id="asset-8",
        name="logo.png",
        category="logos",
        sourceType="original",
        resolution="2048×2048",
        format="Vector Cutout",
        scenesUsed=[6],
        version=1,
        totalVersions=1,
        isTransparent=True,
    ),
]


@router.get("/{project_id}/assets", response_model=AssetStudioResponseDTO)
async def get_project_assets(project_id: str) -> AssetStudioResponseDTO:
    """Return categorized assets and generated diffusion cutouts for a project."""
    project_name = "Aurora X1 Launch" if project_id in ["proj-1", "default"] else f"Project {project_id}"
    return AssetStudioResponseDTO(
        projectName=project_name,
        categories=DEFAULT_CATEGORIES,
        assets=DEFAULT_ASSETS,
    )


@router.post("/{project_id}/assets/{asset_id}/remove-bg")
async def remove_asset_background(project_id: str, asset_id: str) -> dict[str, str]:
    """Trigger background removal isolation on target asset."""
    return {
        "status": "completed",
        "assetId": asset_id,
        "format": "Transparent PNG",
        "message": f"Background removed for asset {asset_id}.",
    }
