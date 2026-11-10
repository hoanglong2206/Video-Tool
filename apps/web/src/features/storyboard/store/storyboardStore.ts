import { create } from "zustand";
import type { StoryboardScene, StoryboardViewMode } from "../types";

export interface StoryboardState {
  scenes: StoryboardScene[];
  selectedSceneId: string;
  isGenerating: boolean;
  approvalStatus: string;
  version: string;
  viewMode: StoryboardViewMode;
  isPlayingAnimatics: boolean;
  playbackCurrentTime: number;

  setScenes: (scenes: StoryboardScene[]) => void;
  updateSceneLocal: (sceneId: string, updates: Partial<StoryboardScene>) => void;
  reorderScenesLocal: (fromIndex: number, toIndex: number) => void;
  setSelectedSceneId: (sceneId: string) => void;
  setIsGenerating: (generating: boolean) => void;
  setApprovalStatus: (status: string) => void;
  setVersion: (version: string) => void;
  setViewMode: (mode: StoryboardViewMode) => void;
  setIsPlayingAnimatics: (playing: boolean) => void;
  setPlaybackCurrentTime: (time: number) => void;
}

export const useStoryboardStore = create<StoryboardState>((set) => ({
  scenes: [],
  selectedSceneId: "",
  isGenerating: false,
  approvalStatus: "Sẵn sàng kiểm duyệt",
  version: "v2.0",
  viewMode: "grid",
  isPlayingAnimatics: false,
  playbackCurrentTime: 0,

  setScenes: (scenes) =>
    set((state) => ({
      scenes,
      selectedSceneId: state.selectedSceneId || scenes[0]?.id || "",
    })),

  updateSceneLocal: (sceneId, updates) =>
    set((state) => ({
      scenes: state.scenes.map((s) => (s.id === sceneId ? { ...s, ...updates } : s)),
    })),

  reorderScenesLocal: (fromIndex, toIndex) =>
    set((state) => {
      const updated = [...state.scenes];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      // Re-number sceneNumber
      const resequenced = updated.map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));
      return { scenes: resequenced };
    }),

  setSelectedSceneId: (selectedSceneId) => set({ selectedSceneId }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setApprovalStatus: (approvalStatus) => set({ approvalStatus }),
  setVersion: (version) => set({ version }),
  setViewMode: (viewMode) => set({ viewMode }),
  setIsPlayingAnimatics: (isPlayingAnimatics) => set({ isPlayingAnimatics }),
  setPlaybackCurrentTime: (playbackCurrentTime) => set({ playbackCurrentTime }),
}));
