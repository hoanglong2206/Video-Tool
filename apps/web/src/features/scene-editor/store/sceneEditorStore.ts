import { create } from "zustand";
import type { LayerItem, LayerProperties, TimelineTrack, MotionSuggestion } from "@/services/scene";

interface SceneEditorState {
  layers: LayerItem[];
  selectedLayerId: string;
  properties: LayerProperties;
  tracks: TimelineTrack[];
  suggestion: MotionSuggestion;
  currentTimeSec: number;
  isPlaying: boolean;
  zoomLevel: number;
  isSavingProps: boolean;
  setLayers: (layers: LayerItem[]) => void;
  setSelectedLayerId: (id: string) => void;
  setProperties: (props: Partial<LayerProperties>) => void;
  setTracks: (tracks: TimelineTrack[]) => void;
  setSuggestion: (s: MotionSuggestion) => void;
  setCurrentTimeSec: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setZoomLevel: (zoom: number) => void;
  setIsSavingProps: (saving: boolean) => void;
}

const DEFAULT_PROPS: LayerProperties = {
  x: 960,
  y: 540,
  scalePercent: 100,
  rotateDeg: 0,
  opacityPercent: 100,
  easing: "Ease-out cubic",
};

const DEFAULT_SUGGESTION: MotionSuggestion = {
  prompt: "Light sweep across the metallic surface",
  description: "A soft studio beam revealing the rim and titanium finish.",
  cameraOrbitDeg: 15,
  sweepDurationSec: 2.0,
};

export const useSceneEditorStore = create<SceneEditorState>((set) => ({
  layers: [],
  selectedLayerId: "",
  properties: DEFAULT_PROPS,
  tracks: [],
  suggestion: DEFAULT_SUGGESTION,
  currentTimeSec: 0,
  isPlaying: false,
  zoomLevel: 100,
  isSavingProps: false,
  setLayers: (layers) =>
    set((state) => ({
      layers,
      selectedLayerId: state.selectedLayerId || layers[0]?.id || "",
    })),
  setSelectedLayerId: (selectedLayerId) => set({ selectedLayerId }),
  setProperties: (props) =>
    set((state) => ({ properties: { ...state.properties, ...props } })),
  setTracks: (tracks) => set({ tracks }),
  setSuggestion: (suggestion) => set({ suggestion }),
  setCurrentTimeSec: (currentTimeSec) => set({ currentTimeSec }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setZoomLevel: (zoomLevel) => set({ zoomLevel }),
  setIsSavingProps: (isSavingProps) => set({ isSavingProps }),
}));
