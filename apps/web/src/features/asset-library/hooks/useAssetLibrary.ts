import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { libraryService } from "@/services/library";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAssetLibraryStore } from "../store";
import type { LibraryCategory, TemplateItem, BrandKitInfo } from "../types";

const FALLBACK_CATEGORIES: LibraryCategory[] = [
  { id: "shared", name: "Shared assets", count: 412 },
  { id: "scenes", name: "Scene templates", count: 18 },
  { id: "motion", name: "Motion presets", count: 36 },
  { id: "transitions", name: "Transition presets", count: 24 },
  { id: "brands", name: "Brand kits", count: 6 },
];

const FALLBACK_TEMPLATES: TemplateItem[] = [
  { id: "tmpl-1", title: "Product reveal", category: "scene" },
  { id: "tmpl-2", title: "Feature close-up", category: "scene" },
  { id: "tmpl-3", title: "Spec callout", category: "scene" },
  { id: "tmpl-4", title: "Logo end card", category: "scene" },
];

const FALLBACK_MOTION: TemplateItem[] = [
  { id: "mot-1", title: "Slow orbit", category: "motion" },
  { id: "mot-2", title: "Light sweep", category: "motion" },
  { id: "mot-3", title: "Cross dissolve", category: "motion" },
  { id: "mot-4", title: "Whip pan", category: "motion" },
];

const DEFAULT_BRAND_KIT: BrandKitInfo = {
  name: "AURORA AUDIO",
  colors: ["#12151D", "#E2E8F0", "#6B93FF"],
  typeface: "Inter, 600 for titles",
  guidelines: "keep logo clear on dark",
  usageCount: 3,
};

export function useAssetLibrary() {
  const queryClient = useQueryClient();
  const store = useAssetLibraryStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("shared");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.library.assets(),
    queryFn: () => libraryService.getLibrary(),
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.categories) && data.categories.length > 0) {
        store.setCategories(data.categories);
      }
      if (Array.isArray(data.templates) && data.templates.length > 0) {
        store.setTemplates(data.templates);
      }
      if (Array.isArray(data.brandKits) && data.brandKits.length > 0) {
        store.setBrandKits(data.brandKits);
      }
    }
  }, [data]);

  const applyBrandKitMutation = useMutation({
    mutationFn: () =>
      libraryService.applyBrandKit({
        project_id: "proj-1",
        brand_kit_id: store.selectedBrandKitId || "brand-1",
      }),
    onSuccess: () => {
      setIsApplied(true);
      toast.success("Đã áp dụng bộ nhận diện thương hiệu (Brand Kit) thành công!");
      setTimeout(() => setIsApplied(false), 2500);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.library.all });
    },
    onError: () => {
      setIsApplied(true);
      toast.error("Không thể áp dụng Brand Kit. Vui lòng thử lại!");
      setTimeout(() => setIsApplied(false), 2500);
    },
  });

  const categories =
    store.categories.length > 0 ? store.categories : FALLBACK_CATEGORIES;

  const sceneTemplates =
    store.templates.filter((t) => t.category === "scene").length > 0
      ? (store.templates.filter((t) => t.category === "scene") as TemplateItem[])
      : FALLBACK_TEMPLATES;

  const motionPresets =
    store.templates.filter((t) => t.category === "motion").length > 0
      ? (store.templates.filter((t) => t.category === "motion") as TemplateItem[])
      : FALLBACK_MOTION;

  const brandKit: BrandKitInfo = store.brandKits[0]
    ? {
        name: store.brandKits[0].name,
        colors: store.brandKits[0].colors,
        typeface: store.brandKits[0].typeface,
        guidelines: store.brandKits[0].guideline,
        usageCount: store.brandKits[0].usageCount,
      }
    : DEFAULT_BRAND_KIT;

  const handleApplyBrandKit = () => {
    applyBrandKitMutation.mutate();
  };

  return {
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    tags: ["product", "cinematic", "dark", "minimal"],
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    sceneTemplates,
    motionPresets,
    selectedTemplateId: store.selectedTemplateId || "tmpl-1",
    setSelectedTemplateId: store.setSelectedTemplateId,
    brandKit,
    isApplied,
    isLoading,
    handleApplyBrandKit,
    refetch,
  };
}
