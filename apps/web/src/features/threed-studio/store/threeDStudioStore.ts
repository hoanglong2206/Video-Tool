import { create } from "zustand";
import type {
  SceneGraphNode,
  PbrMaterial,
  LightSetting,
  Camera3DSettings,
  ThreeDTimelineTrack,
} from "@/services/threed";

interface ThreeDStudioState {
  nodes: SceneGraphNode[];
  selectedNodeId: string;
  material: PbrMaterial;
  lights: LightSetting[];
  camera: Camera3DSettings;
  tracks: ThreeDTimelineTrack[];
  wireframeMode: boolean;
  isSaving: boolean;
  setNodes: (nodes: SceneGraphNode[]) => void;
  setSelectedNodeId: (id: string) => void;
  setMaterial: (mat: Partial<PbrMaterial>) => void;
  setLights: (lights: LightSetting[]) => void;
  setCamera: (cam: Partial<Camera3DSettings>) => void;
  setTracks: (tracks: ThreeDTimelineTrack[]) => void;
  setWireframeMode: (wireframe: boolean) => void;
  setIsSaving: (saving: boolean) => void;
}

const DEFAULT_MAT: PbrMaterial = {
  name: "Anodized Titanium PBR",
  metalness: 0.85,
  roughness: 0.25,
};

const DEFAULT_CAM: Camera3DSettings = {
  orbitTrajectory: "Continuous 360",
  focalLengthMm: 50,
  aperture: "f/2.8",
};

export const useThreeDStudioStore = create<ThreeDStudioState>((set) => ({
  nodes: [],
  selectedNodeId: "",
  material: DEFAULT_MAT,
  lights: [],
  camera: DEFAULT_CAM,
  tracks: [],
  wireframeMode: false,
  isSaving: false,
  setNodes: (nodes) =>
    set((state) => ({
      nodes,
      selectedNodeId: state.selectedNodeId || nodes[0]?.id || "",
    })),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setMaterial: (mat) =>
    set((state) => ({ material: { ...state.material, ...mat } })),
  setLights: (lights) => set({ lights }),
  setCamera: (cam) =>
    set((state) => ({ camera: { ...state.camera, ...cam } })),
  setTracks: (tracks) => set({ tracks }),
  setWireframeMode: (wireframeMode) => set({ wireframeMode }),
  setIsSaving: (isSaving) => set({ isSaving }),
}));
