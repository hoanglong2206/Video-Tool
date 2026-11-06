import { create } from "zustand";
import type { StoryboardScene } from "@/services/storyboard";

interface StoryboardState {
  scenes: StoryboardScene[];
  selectedSceneId: string;
  isGenerating: boolean;
  approvalStatus: string;
  version: string;
  setScenes: (scenes: StoryboardScene[]) => void;
  updateSceneLocal: (sceneId: string, updates: Partial<StoryboardScene>) => void;
  setSelectedSceneId: (sceneId: string) => void;
  setIsGenerating: (generating: boolean) => void;
  setApprovalStatus: (status: string) => void;
  setVersion: (version: string) => void;
}

export const useStoryboardStore = create<StoryboardState>((set) => ({
  scenes: [],
  selectedSceneId: "",
  isGenerating: false,
  approvalStatus: "Waiting approval",
  version: "v2.4",
  setScenes: (scenes) =>
    set((state) => ({
      scenes,
      selectedSceneId: state.selectedSceneId || scenes[0]?.id || "",
    })),
  updateSceneLocal: (sceneId, updates) =>
    set((state) => ({
      scenes: state.scenes.map((s) => (s.id === sceneId ? { ...s, ...updates } : s)),
    })),
  setSelectedSceneId: (selectedSceneId) => set({ selectedSceneId }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setApprovalStatus: (approvalStatus) => set({ approvalStatus }),
  setVersion: (version) => set({ version }),
}));
