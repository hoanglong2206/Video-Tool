import { create } from "zustand";
import type { LibraryCategory, SceneTemplate, BrandKit } from "@/services/library";

interface AssetLibraryState {
  categories: LibraryCategory[];
  templates: SceneTemplate[];
  brandKits: BrandKit[];
  activeCategoryId: string;
  selectedTemplateId: string;
  selectedBrandKitId: string;
  isApplyingBrandKit: boolean;
  setCategories: (categories: LibraryCategory[]) => void;
  setTemplates: (templates: SceneTemplate[]) => void;
  setBrandKits: (brandKits: BrandKit[]) => void;
  setActiveCategoryId: (id: string) => void;
  setSelectedTemplateId: (id: string) => void;
  setSelectedBrandKitId: (id: string) => void;
  setIsApplyingBrandKit: (applying: boolean) => void;
}

export const useAssetLibraryStore = create<AssetLibraryState>((set) => ({
  categories: [],
  templates: [],
  brandKits: [],
  activeCategoryId: "all",
  selectedTemplateId: "",
  selectedBrandKitId: "",
  isApplyingBrandKit: false,
  setCategories: (categories) => set({ categories }),
  setTemplates: (templates) =>
    set((state) => ({
      templates,
      selectedTemplateId: state.selectedTemplateId || templates[0]?.id || "",
    })),
  setBrandKits: (brandKits) =>
    set((state) => ({
      brandKits,
      selectedBrandKitId: state.selectedBrandKitId || brandKits[0]?.id || "",
    })),
  setActiveCategoryId: (activeCategoryId) => set({ activeCategoryId }),
  setSelectedTemplateId: (selectedTemplateId) => set({ selectedTemplateId }),
  setSelectedBrandKitId: (selectedBrandKitId) => set({ selectedBrandKitId }),
  setIsApplyingBrandKit: (isApplyingBrandKit) => set({ isApplyingBrandKit }),
}));
