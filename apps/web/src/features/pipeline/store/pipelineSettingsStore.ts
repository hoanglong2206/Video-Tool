import { create } from "zustand";

export type PipelineApprovalMode = "manual" | "always_proceed";

interface PipelineSettingsState {
  approvalMode: PipelineApprovalMode;
  autoProceedDelaySeconds: number;
  setApprovalMode: (mode: PipelineApprovalMode) => void;
  setAutoProceedDelaySeconds: (seconds: number) => void;
}

const STORAGE_KEY = "video_ai_pipeline_settings";

const getSavedSettings = (): { mode: PipelineApprovalMode; delay: number } => {
  if (typeof window === "undefined") {
    return { mode: "manual", delay: 3 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        mode: parsed.mode === "always_proceed" ? "always_proceed" : "manual",
        delay: Number(parsed.delay) || 3,
      };
    }
  } catch {
    // fallback
  }
  return { mode: "manual", delay: 3 };
};

export const usePipelineSettingsStore = create<PipelineSettingsState>((set) => ({
  approvalMode: typeof window !== "undefined" ? getSavedSettings().mode : "manual",
  autoProceedDelaySeconds:
    typeof window !== "undefined" ? getSavedSettings().delay : 3,

  setApprovalMode: (approvalMode) => {
    set({ approvalMode });
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const existing = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...existing, mode: approvalMode })
        );
      } catch {}
    }
  },

  setAutoProceedDelaySeconds: (autoProceedDelaySeconds) => {
    set({ autoProceedDelaySeconds });
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const existing = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...existing, delay: autoProceedDelaySeconds })
        );
      } catch {}
    }
  },
}));

