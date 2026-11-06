import { create } from "zustand";
import type { AssetItem, CategoryCount } from "@/services/asset";

interface AssetStudioState {
  categories: CategoryCount[];
  assets: AssetItem[];
  activeCategoryId: string;
  selectedAssetId: string;
  isProcessingBg: boolean;
  setCategories: (categories: CategoryCount[]) => void;
  setAssets: (assets: AssetItem[]) => void;
  updateAsset: (assetId: string, updates: Partial<AssetItem>) => void;
  setActiveCategoryId: (categoryId: string) => void;
  setSelectedAssetId: (assetId: string) => void;
  setIsProcessingBg: (processing: boolean) => void;
}

export const useAssetStudioStore = create<AssetStudioState>((set) => ({
  categories: [],
  assets: [],
  activeCategoryId: "all",
  selectedAssetId: "",
  isProcessingBg: false,
  setCategories: (categories) => set({ categories }),
  setAssets: (assets) =>
    set((state) => ({
      assets,
      selectedAssetId: state.selectedAssetId || assets[0]?.id || "",
    })),
  updateAsset: (assetId, updates) =>
    set((state) => ({
      assets: state.assets.map((a) => (a.id === assetId ? { ...a, ...updates } : a)),
    })),
  setActiveCategoryId: (activeCategoryId) => set({ activeCategoryId }),
  setSelectedAssetId: (selectedAssetId) => set({ selectedAssetId }),
  setIsProcessingBg: (isProcessingBg) => set({ isProcessingBg }),
}));
