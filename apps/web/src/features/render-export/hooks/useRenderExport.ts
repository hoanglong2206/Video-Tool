import { useState } from "react";
import type { ExportSettings, PreviousRender, RenderProgress } from "../types";

const INITIAL_SETTINGS: ExportSettings = {
  resolution: "3840×2160 (4K)",
  frameRate: "24 fps",
  aspectRatio: "16:9",
  codec: "H.264 · MP4",
};

const INITIAL_PREVIOUS_RENDERS: PreviousRender[] = [
  { id: "v3", version: "v3", resolution: "1080p", duration: "2m 14s", status: "completed" },
  { id: "v2", version: "v2", resolution: "1080p", duration: "2m 09s", status: "completed" },
  { id: "v1", version: "v1", resolution: "720p", duration: "failed", status: "failed" },
];

const INITIAL_PROGRESS: RenderProgress = {
  percentage: 34,
  statusText: "Rendering frames",
  estimatedRemaining: "Estimated 3 min left",
  elapsedTime: "Elapsed 1 min 42 s",
  logs: [
    "14:10 · Assembling scenes 1–6",
    "14:11 · Audio synced",
    "14:12 · Encoding with FFmpeg",
  ],
};

export function useRenderExport(projectName: string = "Aurora X1 Launch") {
  const [settings, setSettings] = useState<ExportSettings>(INITIAL_SETTINGS);
  const [renders, setRenders] = useState<PreviousRender[]>(INITIAL_PREVIOUS_RENDERS);
  const [progress, setProgress] = useState<RenderProgress>(INITIAL_PROGRESS);
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const updateSetting = (key: keyof ExportSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const cancelRender = () => {
    setIsRendering(false);
  };

  const retryFailed = () => {
    setIsRendering(true);
    setProgress((prev) => ({
      ...prev,
      logs: [...prev.logs, `${new Date().toLocaleTimeString()} · Retrying failed frames`],
    }));
  };

  return {
    projectName,
    settings,
    updateSetting,
    renders,
    progress,
    isRendering,
    cancelRender,
    retryFailed,
  };
}

