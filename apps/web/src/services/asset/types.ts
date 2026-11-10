export type AssetCategory =
  | "all"
  | "product"
  | "backgrounds"
  | "particles"
  | "textures"
  | "logos";

export type AssetSourceType = "generated" | "original";

export type AssetLayerGroup =
  | "product_cutout"
  | "environment_plate"
  | "vfx_overlay"
  | "brand_typography";

export type AssetStatus = "ready" | "missing" | "generating" | "needs_review";

export interface CategoryCount {
  id: AssetCategory;
  label: string;
  count: number;
}

export interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  sourceType: AssetSourceType;
  resolution: string;
  format: string;
  scenesUsed: number[];
  version: number;
  totalVersions: number;
  isTransparent?: boolean;
}

export interface AssetStudioResponse {
  projectName: string;
  categories: CategoryCount[];
  assets: AssetItem[];
}

export interface RemoveBgResponse {
  status: string;
  assetId: string;
  format: string;
  outputFile?: string;
  message: string;
}

export interface PlannedAsset {
  id: string;
  name: string;
  layerGroup: AssetLayerGroup;
  category: string;
  sourceType: AssetSourceType;
  status: AssetStatus;
  resolution: string;
  format: string;
  scenesUsed: number[];
  version: number;
  totalVersions: number;
  isTransparent: boolean;
  thumbnailUrl?: string | null;
  engine: "openai" | "comfyui" | "birefnet_sam2" | "vector";
  prompt?: string | null;
  notes?: string | null;
}

export interface SceneCoverageItem {
  id: string;
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  totalAssets: number;
  readyAssets: number;
}

export interface GroundTruthItem {
  id: string;
  name: string;
  type: "image" | "vector_logo" | "3d_cad";
  fileSize: string;
  isLocked: boolean;
}

export interface AssetPlanningCoverage {
  total: number;
  ready: number;
  missing: number;
  percent: number;
}

export interface AssetPlanningResponse {
  projectId: string;
  projectName: string;
  coverage: AssetPlanningCoverage;
  scenes: SceneCoverageItem[];
  groundTruth: GroundTruthItem[];
  assets: PlannedAsset[];
}

export interface GenerateAssetPayload {
  engine: "openai" | "comfyui";
  preset: string;
  aspectRatio: string;
  customPrompt?: string;
}
