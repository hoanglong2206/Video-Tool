import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { assetService } from "@/services/asset";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAssetStudioStore } from "../store";
import type { AssetItem, AssetCategory, AssetSourceType } from "../types";

export function useAssetStudio(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
  const queryClient = useQueryClient();
  const store = useAssetStudioStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState<AssetCategory>("all");
  const [sourceFilter, setSourceFilter] = useState<AssetSourceType>("generated");
  const [searchQuery, setSearchQuery] = useState<string>("" );

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.assets.byProject(projectId),
    queryFn: () => assetService.getAssets(projectId),
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.assets)) {
        store.setAssets(data.assets as AssetItem[]);
      }
      if (Array.isArray(data.categories)) {
        store.setCategories(data.categories);
      }
    }
  }, [data]);

  const removeBgMutation = useMutation({
    mutationFn: (assetId: string) => assetService.removeBackground(projectId, assetId),
    onMutate: () => store.setIsProcessingBg(true),
    onSuccess: (_, assetId) => {
      store.updateAsset(assetId, {
        isTransparent: true,
        format: "Transparent PNG",
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.assets.byProject(projectId),
      });
      toast.success("Đã tách nền AI (Remove Background) thành công!");
    },
    onError: () => {
      toast.error("Tách nền AI thất bại. Vui lòng thử lại!");
    },
    onSettled: () => store.setIsProcessingBg(false),
  });

  const filteredAssets = useMemo(() => {
    return store.assets.filter((asset) => {
      const matchCat =
        selectedCategoryId === "all" || asset.category === selectedCategoryId;
      const matchSource = asset.sourceType === sourceFilter;
      const matchQuery =
        searchQuery === "" ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSource && matchQuery;
    });
  }, [store.assets, selectedCategoryId, sourceFilter, searchQuery]);

  const selectedAsset =
    store.assets.find((a) => a.id === store.selectedAssetId) ||
    filteredAssets[0] ||
    store.assets[0] || {
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
    removeBgMutation.mutate(targetId);
  };

  return {
    projectName,
    categories: store.categories,
    selectedCategoryId,
    sourceFilter,
    searchQuery,
    filteredAssets,
    selectedAsset,
    isLoading,
    isRemovingBg: store.isProcessingBg,
    handleRemoveBackground,
    setSelectedCategoryId,
    setSourceFilter,
    setSearchQuery,
    setSelectedAssetId: store.setSelectedAssetId,
    refetch,
  };
}
