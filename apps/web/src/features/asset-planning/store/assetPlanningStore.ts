import { create } from "zustand";
import type { AssetLayerGroup, EngineMode } from "../types";

interface AssetPlanningState {
  selectedLayerGroup: AssetLayerGroup | "all";
  selectedSceneNumber: number | null;
  selectedAssetId: string | null;
  engineMode: EngineMode;
  activePreset: string;
  activeRatio: string;
  activeTabLeft: "ground_truth" | "scenes";
  generatingAssetId: string | null;
  progressPercent: number;

  setSelectedLayerGroup: (group: AssetLayerGroup | "all") => void;
  setSelectedSceneNumber: (sceneNumber: number | null) => void;
  setSelectedAssetId: (assetId: string | null) => void;
  setEngineMode: (mode: EngineMode) => void;
  setActivePreset: (presetId: string) => void;
  setActiveRatio: (ratioId: string) => void;
  setActiveTabLeft: (tab: "ground_truth" | "scenes") => void;
  setGeneratingAssetId: (id: string | null) => void;
  setProgressPercent: (percent: number) => void;
}

export const useAssetPlanningStore = create<AssetPlanningState>((set) => ({
  selectedLayerGroup: "all",
  selectedSceneNumber: null,
  selectedAssetId: "asset-prod-1",
  engineMode: "openai",
  activePreset: "apple_rim",
  activeRatio: "16:9",
  activeTabLeft: "scenes",
  generatingAssetId: null,
  progressPercent: 0,

  setSelectedLayerGroup: (group) => set({ selectedLayerGroup: group }),
  setSelectedSceneNumber: (num) => set({ selectedSceneNumber: num }),
  setSelectedAssetId: (id) => set({ selectedAssetId: id }),
  setEngineMode: (mode) => set({ engineMode: mode }),
  setActivePreset: (presetId) => set({ activePreset: presetId }),
  setActiveRatio: (ratioId) => set({ activeRatio: ratioId }),
  setActiveTabLeft: (tab) => set({ activeTabLeft: tab }),
  setGeneratingAssetId: (id) => set({ generatingAssetId: id }),
  setProgressPercent: (percent) => set({ progressPercent: percent }),
}));
