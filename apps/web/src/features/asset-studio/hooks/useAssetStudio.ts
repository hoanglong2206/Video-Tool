import { useState, useMemo, useEffect, useCallback } from "react";
import type { AssetItem, AssetCategory, AssetSourceType, CategoryCount } from "../types";

export function useAssetStudio(projectName: string = "Aurora X1 Launch", projectId: string = "proj-1") {
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<AssetCategory>("all");
  const [sourceFilter, setSourceFilter] = useState<AssetSourceType>("generated");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRemovingBg, setIsRemovingBg] = useState<boolean>(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch asset matrix from Supabase via backend API
  const fetchAssets = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/assets`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.assets)) {
          setAssets(data.assets);
          if (data.assets.length > 0) {
            setSelectedAssetId((prev) => prev || data.assets[0].id);
          }
        }
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      }
    } catch (err) {
      console.error("Failed to load assets from Supabase backend:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, projectId]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

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
    assets.find((a) => a.id === selectedAssetId) || filteredAssets[0] || assets[0] || {
      id: "asset-empty",
      name: "No assets found",
      category: "product",
      sourceType: "generated",
      resolution: "4K",
      format: "PNG",
      scenesUsed: [],
      version: 1,
      totalVersions: 1,
      isTransparent: false,
    };

  const handleRemoveBackground = async (assetId?: string) => {
    const targetId = assetId || selectedAsset.id;
    if (!targetId || targetId === "asset-empty") return;
    setIsRemovingBg(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/assets/${targetId}/remove-bg`, {
        method: "POST",
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setAssets((prev) =>
          prev.map((a) =>
            a.id === targetId
              ? { ...a, isTransparent: true, format: "Transparent PNG", version: a.version + 1 }
              : a
          )
        );
      }
    } catch (err) {
      console.error("Failed to remove background:", err);
    } finally {
      setIsRemovingBg(false);
    }
  };

  return {
    projectName,
    categories,
    selectedCategoryId,
    sourceFilter,
    searchQuery,
    filteredAssets,
    selectedAsset,
    isLoading,
    isRemovingBg,
    handleRemoveBackground,
    setSelectedCategoryId,
    setSourceFilter,
    setSearchQuery,
    setSelectedAssetId,
  };
}
