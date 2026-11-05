import { useState } from "react";
import type { LibraryCategory, TemplateItem, BrandKitInfo } from "../types";

const CATEGORIES: LibraryCategory[] = [
  { id: "shared", name: "Shared assets", count: 412 },
  { id: "scenes", name: "Scene templates", count: 18 },
  { id: "motion", name: "Motion presets", count: 36 },
  { id: "transitions", name: "Transition presets", count: 24 },
  { id: "brands", name: "Brand kits", count: 6 },
];

const SCENE_TEMPLATES: TemplateItem[] = [
  { id: "tmpl-1", title: "Product reveal", category: "scene" },
  { id: "tmpl-2", title: "Feature close-up", category: "scene" },
  { id: "tmpl-3", title: "Spec callout", category: "scene" },
  { id: "tmpl-4", title: "Logo end card", category: "scene" },
];

const MOTION_PRESETS: TemplateItem[] = [
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
  const [categories] = useState<LibraryCategory[]>(CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("shared");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("tmpl-1");
  const [brandKit] = useState<BrandKitInfo>(DEFAULT_BRAND_KIT);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const tags = ["product", "cinematic", "dark", "minimal"];

  const handleApplyBrandKit = () => {
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 2500);
  };

  return {
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    tags,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    sceneTemplates: SCENE_TEMPLATES,
    motionPresets: MOTION_PRESETS,
    selectedTemplateId,
    setSelectedTemplateId,
    brandKit,
    isApplied,
    handleApplyBrandKit,
  };
}

