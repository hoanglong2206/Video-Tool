import { useState, useMemo } from "react";
import type { AssetItem, AssetCategory, AssetSourceType, CategoryCount } from "../types";

const INITIAL_CATEGORIES: CategoryCount[] = [
  { id: "all", label: "All assets", count: 64 },
  { id: "product", label: "Product", count: 12 },
  { id: "backgrounds", label: "Backgrounds", count: 18 },
  { id: "particles", label: "Particles", count: 9 },
  { id: "textures", label: "Textures", count: 11 },
  { id: "logos", label: "Logos", count: 4 },
];

const INITIAL_ASSETS: AssetItem[] = [
  {
    id: "asset-1",
    name: "product-front",
    category: "product",
    sourceType: "generated",
    resolution: "4096×4096",
    format: "Transparent PNG",
    scenesUsed: [2, 3, 6],
    version: 3,
    totalVersions: 3,
    isTransparent: true,
  },
  {
    id: "asset-2",
    name: "product-side",
    category: "product",
    sourceType: "generated",
    resolution: "4096×4096",
    format: "Transparent PNG",
    scenesUsed: [2, 4],
    version: 2,
    totalVersions: 2,
    isTransparent: true,
  },
  {
    id: "asset-3",
    name: "bg-studio-01",
    category: "backgrounds",
    sourceType: "generated",
    resolution: "3840×2160",
    format: "EXR Studio Map",
    scenesUsed: [1, 2],
    version: 1,
    totalVersions: 1,
  },
  {
    id: "asset-4",
    name: "bg-studio-02",
    category: "backgrounds",
    sourceType: "generated",
    resolution: "3840×2160",
    format: "HDR Atmosphere",
    scenesUsed: [3, 4],
    version: 2,
    totalVersions: 2,
  },
  {
    id: "asset-5",
    name: "particles",
    category: "particles",
    sourceType: "generated",
    resolution: "1920×1080",
    format: "Alpha Depth Pass",
    scenesUsed: [1, 5],
    version: 1,
    totalVersions: 1,
  },
  {
    id: "asset-6",
    name: "flare",
    category: "particles",
    sourceType: "generated",
    resolution: "2048×2048",
    format: "Anamorphic Streak",
    scenesUsed: [2],
    version: 1,
    totalVersions: 1,
  },
  {
    id: "asset-7",
    name: "metal-tex",
    category: "textures",
    sourceType: "generated",
    resolution: "4096×4096",
    format: "Roughness PBR Map",
    scenesUsed: [3, 4],
    version: 1,
    totalVersions: 1,
  },
  {
    id: "asset-8",
    name: "logo.png",
    category: "logos",
    sourceType: "original",
    resolution: "2048×2048",
    format: "Vector Cutout",
    scenesUsed: [6],
    version: 1,
    totalVersions: 1,
    isTransparent: true,
  },
];

export function useAssetStudio(projectName: string = "Aurora X1 Launch") {
  const [assets] = useState<AssetItem[]>(INITIAL_ASSETS);
  const [categories] = useState<CategoryCount[]>(INITIAL_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState<AssetCategory>("all");
  const [sourceFilter, setSourceFilter] = useState<AssetSourceType>("generated");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAssetId, setSelectedAssetId] = useState<string>("asset-1");

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchCat =
        selectedCategoryId === "all" || asset.category === selectedCategoryId;
      const matchSource = asset.sourceType === sourceFilter;
      const matchQuery =
        searchQuery === "" ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSource && matchQuery;
    });
  }, [assets, selectedCategoryId, sourceFilter, searchQuery]);

  const selectedAsset =
    assets.find((a) => a.id === selectedAssetId) || assets[0];

  return {
    projectName,
    categories,
    selectedCategoryId,
    sourceFilter,
    searchQuery,
    filteredAssets,
    selectedAsset,
    setSelectedCategoryId,
    setSourceFilter,
    setSearchQuery,
    setSelectedAssetId,
  };
}
