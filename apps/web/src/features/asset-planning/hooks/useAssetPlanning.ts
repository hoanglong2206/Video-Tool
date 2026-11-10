import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { assetService } from "@/services/asset";
import { useAssetPlanningStore } from "../store/assetPlanningStore";
import { toast } from "@/components/ui";
import type { PlannedAsset } from "../types";

export function useAssetPlanning(projectId: string = "proj-1") {
  const router = useRouter();
  const queryClient = useQueryClient();
  const store = useAssetPlanningStore();
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["asset-planning", projectId],
    queryFn: () => assetService.getAssetPlanning(projectId),
    staleTime: 60 * 1000,
  });

  const generateMutation = useMutation({
    mutationFn: async ({ assetId }: { assetId: string }) => {
      store.setGeneratingAssetId(assetId);
      store.setProgressPercent(15);
      return assetService.generateAsset(projectId, assetId, {
        engine: store.engineMode,
        preset: store.activePreset,
        aspectRatio: store.activeRatio,
      });
    },
    onSuccess: (res) => {
      store.setProgressPercent(100);
      toast.success(res.message || "Tạo tài nguyên AI thành công!");
      queryClient.invalidateQueries({ queryKey: ["asset-planning", projectId] });
      setTimeout(() => {
        store.setGeneratingAssetId(null);
        store.setProgressPercent(0);
      }, 600);
    },
    onError: () => {
      store.setGeneratingAssetId(null);
      store.setProgressPercent(0);
      toast.error("Không thể kết nối engine sinh ảnh. Vui lòng thử lại!");
    },
  });

  const approveMutation = useMutation({
    mutationFn: () => assetService.approveAssetPlanning(projectId),
    onMutate: () => {
      setIsApproving(true);
    },
    onSuccess: (res) => {
      toast.success("Đã duyệt bảng kế hoạch tài nguyên! Đang chuyển sang Bước 04...");
      router.push(`/projects/${projectId}/${res.nextStageId || "asset-processing"}`);
    },
    onError: () => {
      setIsApproving(false);
      toast.error("Lỗi khi ghi nhận phê duyệt. Vui lòng thử lại!");
    },
  });

  const assets = data?.assets || [];
  const selectedAsset = assets.find((a: PlannedAsset) => a.id === store.selectedAssetId) || assets[0];

  const filteredAssets = assets.filter((asset: PlannedAsset) => {
    if (store.selectedLayerGroup !== "all" && asset.layerGroup !== store.selectedLayerGroup) {
      return false;
    }
    if (store.selectedSceneNumber !== null && !asset.scenesUsed.includes(store.selectedSceneNumber)) {
      return false;
    }
    return true;
  });

  const handleBulkGenerate = () => {
    const missingAssets = assets.filter((a: PlannedAsset) => a.status === "missing");
    if (missingAssets.length === 0) {
      toast.info("Tất cả tài nguyên đã sẵn sàng, không có asset nào thiếu!");
      return;
    }
    toast.info(`Bắt đầu chạy ComfyUI / OpenAI cho ${missingAssets.length} asset thiếu...`);
    generateMutation.mutate({ assetId: missingAssets[0].id });
  };

  return {
    projectName: data?.projectName || "Aurora X1 Launch",
    coverage: data?.coverage || { total: 11, ready: 9, missing: 2, percent: 82 },
    scenes: data?.scenes || [],
    groundTruth: data?.groundTruth || [],
    assets,
    filteredAssets,
    selectedAsset,
    isLoading,
    isGenerating: !!store.generatingAssetId,
    generatingAssetId: store.generatingAssetId,
    progressPercent: store.progressPercent,
    store,
    handleGenerateAsset: (assetId: string) => generateMutation.mutate({ assetId }),
    handleBulkGenerate,
    handleApproveStage: () => approveMutation.mutate(),
    isApproving: isApproving || approveMutation.isPending,
  };
}
