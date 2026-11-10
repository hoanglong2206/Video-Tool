import type {
  AssetLayerGroup,
  AssetStatus,
  PlannedAsset,
  SceneCoverageItem,
  GroundTruthItem,
  AssetPlanningCoverage,
} from "@/services/asset/types";

export type {
  AssetLayerGroup,
  AssetStatus,
  PlannedAsset,
  SceneCoverageItem,
  GroundTruthItem,
  AssetPlanningCoverage,
};

export type EngineMode = "openai" | "comfyui";

export interface LightingPreset {
  id: string;
  label: string;
  description: string;
  colorHex: string;
}

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: "apple_rim",
    label: "Apple Rim 4:1",
    description: "Tương phản 4:1 viền Cyan/White 6500K",
    colorHex: "#06B6D4",
  },
  {
    id: "matte_dark",
    label: "Matte Dark #050505",
    description: "Nền đen mờ không phản quang",
    colorHex: "#0F172A",
  },
  {
    id: "neon_horizon",
    label: "Neon Horizon",
    description: "Vệt sáng ngang xanh tím công nghệ",
    colorHex: "#8B5CF6",
  },
  {
    id: "titanium_specular",
    label: "Titanium Specular",
    description: "Vát sáng mép kim loại titan phay xước",
    colorHex: "#94A3B8",
  },
];

export interface AspectRatioOption {
  id: string;
  label: string;
  ratio: string;
}

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { id: "16:9", label: "16:9 Widescreen", ratio: "3840×2160" },
  { id: "9:16", label: "9:16 Vertical Reel", ratio: "2160×3840" },
  { id: "1:1", label: "1:1 Square Feed", ratio: "2048×2048" },
];
