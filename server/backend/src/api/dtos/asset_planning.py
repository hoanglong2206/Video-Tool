from pydantic import BaseModel, ConfigDict


class PlannedAssetDTO(BaseModel):
    id: str
    name: str
    layerGroup: str  # "product_cutout", "environment_plate", "vfx_overlay", "brand_typography"
    category: str  # "product", "backgrounds", "particles", "textures", "logos"
    sourceType: str  # "original", "generated"
    status: str  # "ready", "missing", "generating", "needs_review"
    resolution: str
    format: str
    scenesUsed: list[int]
    version: int
    totalVersions: int
    isTransparent: bool
    thumbnailUrl: str | None = None
    engine: str = "birefnet_sam2"  # "birefnet_sam2", "openai", "comfyui", "vector"
    prompt: str | None = None
    notes: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SceneCoverageItemDTO(BaseModel):
    id: str
    sceneNumber: int
    title: str
    durationSeconds: int
    totalAssets: int
    readyAssets: int

    model_config = ConfigDict(from_attributes=True)


class GroundTruthItemDTO(BaseModel):
    id: str
    name: str
    type: str  # "image", "vector_logo", "3d_cad"
    fileSize: str
    isLocked: bool = True

    model_config = ConfigDict(from_attributes=True)


class AssetPlanningCoverageDTO(BaseModel):
    total: int
    ready: int
    missing: int
    percent: int

    model_config = ConfigDict(from_attributes=True)


class AssetPlanningResponseDTO(BaseModel):
    projectId: str
    projectName: str
    coverage: AssetPlanningCoverageDTO
    scenes: list[SceneCoverageItemDTO]
    groundTruth: list[GroundTruthItemDTO]
    assets: list[PlannedAssetDTO]

    model_config = ConfigDict(from_attributes=True)


class GenerateAssetRequestDTO(BaseModel):
    engine: str = "openai"  # "openai" or "comfyui"
    preset: str = "apple_rim"
    aspectRatio: str = "16:9"
    customPrompt: str | None = None


class SegmentAssetRequestDTO(BaseModel):
    model: str = "birefnet_sam2"  # "birefnet_sam2" or "rembg"
