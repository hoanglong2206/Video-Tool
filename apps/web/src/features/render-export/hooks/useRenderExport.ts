import { useState, useEffect, useCallback } from "react";
import type { ExportSettings, PreviousRender, RenderProgress } from "../types";

const DEFAULT_SETTINGS: ExportSettings = {
  resolution: "3840×2160 (4K)",
  frameRate: "24 fps",
  aspectRatio: "16:9",
  codec: "H.264 · MP4",
};

const DEFAULT_PROGRESS: RenderProgress = {
  percentage: 0,
  statusText: "Idle · Ready for render",
  estimatedRemaining: "0s",
  elapsedTime: "0s",
  logs: ["Ready to build broadcast master"],
};

export function useRenderExport(projectName: string = "Aurora X1 Launch", projectId: string = "proj-1") {
  const [settings, setSettings] = useState<ExportSettings>(DEFAULT_SETTINGS);
  const [renders, setRenders] = useState<PreviousRender[]>([]);
  const [progress, setProgress] = useState<RenderProgress>(DEFAULT_PROGRESS);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchRenderData = useCallback(async () => {
    try {
      // 1. Fetch History
      const histRes = await fetch(`${apiUrl}/api/v1/render/history`);
      if (histRes.ok) {
        const histData = await histRes.json();
        if (Array.isArray(histData)) {
          setRenders(
            histData.map((item, idx) => ({
              id: item.version || `rend-${idx}`,
              version: item.version,
              resolution: item.resolution,
              duration: item.duration,
              status: item.status,
            }))
          );
        }
      }

      // 2. Fetch Progress
      const progRes = await fetch(`${apiUrl}/api/v1/render/progress`);
      if (progRes.ok) {
        const progData = await progRes.json();
        setProgress({
          percentage: progData.percentage || 0,
          statusText: progData.status_text || "Idle",
          estimatedRemaining: progData.estimated_remaining || "0s",
          elapsedTime: progData.elapsed_time || "0s",
          logs: progData.logs || [],
        });
        setIsRendering(progData.percentage > 0 && progData.percentage < 100);
      }
    } catch (err) {
      console.error("Failed to fetch render status from Supabase backend:", err);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchRenderData();
  }, [fetchRenderData]);

  const updateSetting = (key: keyof ExportSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const cancelRender = async () => {
    setIsRendering(false);
    try {
      await fetch(`${apiUrl}/api/v1/render/cancel`, { method: "POST" });
      await fetchRenderData();
    } catch (err) {
      console.error("Error cancelling render:", err);
    }
  };

  const retryFailed = async () => {
    setIsRendering(true);
    try {
      await fetch(`${apiUrl}/api/v1/render/retry`, { method: "POST" });
      await fetchRenderData();
    } catch (err) {
      console.error("Error retrying render:", err);
    }
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
