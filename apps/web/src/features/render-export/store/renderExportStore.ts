import { create } from "zustand";
import type { ExportSettings, RenderProgress } from "@/services/render";

interface RenderExportState {
  exportSettings: ExportSettings;
  progress: RenderProgress;
  activeJobId: string | null;
  isRendering: boolean;
  setExportSettings: (settings: Partial<ExportSettings>) => void;
  setProgress: (progress: RenderProgress) => void;
  setActiveJobId: (id: string | null) => void;
  setIsRendering: (rendering: boolean) => void;
}

const DEFAULT_SETTINGS: ExportSettings = {
  resolution: "3840x2160 (4K)",
  frame_rate: "24 fps",
  aspect_ratio: "16:9",
  codec: "H.264 · MP4",
};

const DEFAULT_PROGRESS: RenderProgress = {
  percentage: 0,
  status_text: "Idle · Ready for render",
  estimated_remaining: "0 min",
  elapsed_time: "0 s",
  logs: ["Pipeline initialized", "Ready to render"],
};

export const useRenderExportStore = create<RenderExportState>((set) => ({
  exportSettings: DEFAULT_SETTINGS,
  progress: DEFAULT_PROGRESS,
  activeJobId: null,
  isRendering: false,
  setExportSettings: (settings) =>
    set((state) => ({ exportSettings: { ...state.exportSettings, ...settings } })),
  setProgress: (progress) => set({ progress }),
  setActiveJobId: (activeJobId) => set({ activeJobId }),
  setIsRendering: (isRendering) => set({ isRendering }),
}));
