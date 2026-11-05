export type AssetCategory =
  | "all"
  | "product"
  | "backgrounds"
  | "particles"
  | "textures"
  | "logos";

export type AssetSourceType = "generated" | "original";

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

export interface CategoryCount {
  id: AssetCategory;
  label: string;
  count: number;
}
