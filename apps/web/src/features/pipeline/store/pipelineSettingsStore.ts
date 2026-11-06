import { create } from "zustand";

export type PipelineApprovalMode = "manual" | "always_proceed";
export type AiProvider = "ollama" | "openai" | "gemini" | "deepseek";
export type GpuHardware = "nvidia_nvenc" | "apple_metal" | "intel_qsv" | "cpu";
export type VideoCodec = "h264" | "hevc" | "prores";
export type RenderPreset = "draft" | "standard_1080p" | "master_4k";
export type SchemaMode = "strict_v2" | "permissive" | "dev_debug";

export interface StudioSettingsState {
  approvalMode: PipelineApprovalMode;
  autoProceedDelaySeconds: number;
  autoSaveCheckpoint: boolean;
  audioNotification: boolean;

  aiProvider: AiProvider;
  llmModel: string;
  visionModel: string;
  aiTemperature: number;

  gpuHardware: GpuHardware;
  renderConcurrency: string;
  renderPreset: RenderPreset;
  videoCodec: VideoCodec;

  storageLocation: string;
  schemaMode: SchemaMode;
  autoCleanCache: boolean;

  setApprovalMode: (mode: PipelineApprovalMode) => void;
  setAutoProceedDelaySeconds: (seconds: number) => void;
  updateSetting: <K extends keyof StudioSettingsState>(key: K, value: StudioSettingsState[K]) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = "video_ai_pipeline_settings";

const DEFAULT_SETTINGS = {
  approvalMode: "manual" as PipelineApprovalMode,
  autoProceedDelaySeconds: 3,
  autoSaveCheckpoint: true,
  audioNotification: true,

  aiProvider: "ollama" as AiProvider,
  llmModel: "llama3.2:latest",
  visionModel: "llava:13b-v1.6",
  aiTemperature: 0.7,

  gpuHardware: "nvidia_nvenc" as GpuHardware,
  renderConcurrency: "8",
  renderPreset: "master_4k" as RenderPreset,
  videoCodec: "h264" as VideoCodec,

  storageLocation: "default",
  schemaMode: "strict_v2" as SchemaMode,
  autoCleanCache: true,
};

const getSavedSettings = () => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {}
  return DEFAULT_SETTINGS;
};

export const usePipelineSettingsStore = create<StudioSettingsState>((set) => ({
  ...getSavedSettings(),

  setApprovalMode: (approvalMode) => {
    set({ approvalMode });
    saveToStorage({ approvalMode });
  },

  setAutoProceedDelaySeconds: (autoProceedDelaySeconds) => {
    set({ autoProceedDelaySeconds });
    saveToStorage({ autoProceedDelaySeconds });
  },

  updateSetting: (key, value) => {
    set((state) => {
      const next = { ...state, [key]: value };
      saveToStorage({ [key]: value });
      return next;
    });
  },

  resetToDefaults: () => {
    set({ ...DEFAULT_SETTINGS });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
      } catch {}
    }
  },
}));

function saveToStorage(partial: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...partial }));
  } catch {}
}
