import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { renderService, type ExportSettings as ServiceExportSettings } from "@/services/render";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useRenderExportStore } from "../store";
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

export function useRenderExport(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
  const queryClient = useQueryClient();
  const store = useRenderExportStore();

  const [settings, setSettings] = useState<ExportSettings>(DEFAULT_SETTINGS);
  const [renders, setRenders] = useState<PreviousRender[]>([]);

  const { data: progressData, refetch: refetchProgress } = useQuery({
    queryKey: QUERY_KEYS.render.progress(),
    queryFn: () => renderService.getProgress(),
    refetchInterval: store.isRendering ? 1500 : false,
  });

  useEffect(() => {
    if (progressData) {
      store.setProgress(progressData);
      const isStillRendering =
        progressData.percentage > 0 && progressData.percentage < 100;
      store.setIsRendering(isStillRendering);
    }
  }, [progressData]);

  const startRenderMutation = useMutation({
    mutationFn: () =>
      renderService.startRender({
        project_id: projectId,
        settings: {
          resolution: settings.resolution,
          codec: settings.codec,
          aspect_ratio: settings.aspectRatio,
          frame_rate: settings.frameRate,
        } as ServiceExportSettings,
      }),
    onMutate: () => store.setIsRendering(true),
    onSuccess: (data) => {
      store.setActiveJobId(data.job_id);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.render.progress() });
      toast.success("Đã bắt đầu tiến trình kết xuất video (Render Engine)!");
    },
    onError: () => {
      store.setIsRendering(false);
      toast.error("Không thể khởi động render video. Vui lòng kiểm tra lại cấu hình!");
    },
  });

  const progress: RenderProgress = progressData
    ? {
        percentage: progressData.percentage || 0,
        statusText: progressData.status_text || "Idle",
        estimatedRemaining: progressData.estimated_remaining || "0s",
        elapsedTime: progressData.elapsed_time || "0s",
        logs: progressData.logs || [],
      }
    : DEFAULT_PROGRESS;

  const updateSetting = (key: keyof ExportSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const startRender = async () => {
    startRenderMutation.mutate();
  };

  const downloadMasterVideo = () => {
    const jobId = store.activeJobId || "master";
    window.open(renderService.getDownloadUrl(jobId), "_blank");
  };

  const cancelRender = async () => {
    store.setIsRendering(false);
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.render.progress() });
  };

  const retryFailed = async () => {
    startRenderMutation.mutate();
  };

  return {
    projectName,
    settings,
    updateSetting,
    renders,
    progress,
    isRendering: store.isRendering,
    startRender,
    downloadMasterVideo,
    cancelRender,
    retryFailed,
    refetchProgress,
  };
}
