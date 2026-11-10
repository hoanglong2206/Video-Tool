import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { storyboardService, type UpdateSceneInput } from "@/services/storyboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useStoryboardStore } from "../store";
import type { StoryboardScene } from "../types";

export function useStoryboard(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const store = useStoryboardStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.storyboard.byProject(projectId),
    queryFn: () => storyboardService.getStoryboard(projectId),
  });

  useEffect(() => {
    if (data?.scenes && data.scenes.length > 0) {
      store.setScenes(data.scenes);
      if (data.approvalStatus) store.setApprovalStatus(data.approvalStatus);
      if (data.version) store.setVersion(data.version);
    }
  }, [data]);

  const updateSceneMutation = useMutation({
    mutationFn: ({ sceneId, input }: { sceneId: string; input: UpdateSceneInput }) =>
      storyboardService.updateScene(projectId, sceneId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.storyboard.byProject(projectId) });
    },
    onError: () => toast.error("Không thể lưu cập nhật phân cảnh."),
  });

  const addSceneMutation = useMutation({
    mutationFn: (newScene: Partial<StoryboardScene>) =>
      storyboardService.createScene(projectId, {
        title: newScene.title || "Phân cảnh mới",
        durationSeconds: newScene.durationSeconds || 5,
        cameraMovement: newScene.cameraMovement || "Slow push-in 24fps",
        transitionType: newScene.transitionType || "Cut",
        visualPrompt: newScene.visualPrompt,
        voiceover: newScene.voiceover,
        cameraLens: newScene.cameraLens || "85mm",
      }),
    onSuccess: (created) => {
      store.setScenes([...store.scenes, created]);
      store.setSelectedSceneId(created.id);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.storyboard.byProject(projectId) });
      toast.success(`Đã thêm Cảnh 0${created.sceneNumber} thành công!`);
    },
  });

  const deleteSceneMutation = useMutation({
    mutationFn: (sceneId: string) => storyboardService.deleteScene(projectId, sceneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.storyboard.byProject(projectId) });
      toast.success("Đã xóa phân cảnh và đánh số lại thành công!");
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (sceneIds: string[]) => storyboardService.reorderScenes(projectId, sceneIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.storyboard.byProject(projectId) });
      toast.success("Đã lưu thứ tự phân cảnh mới!");
    },
  });

  const approveMutation = useMutation({
    mutationFn: () => storyboardService.approveStoryboard(projectId),
    onSuccess: () => {
      toast.success("Duyệt Storyboard thành công! Chuyển sang Bước 2: Asset Planning.");
      router.push(`/projects/${projectId}/asset-planning`);
    },
  });

  const generateMutation = useMutation({
    mutationFn: () => storyboardService.generateStoryboard(projectId),
    onMutate: () => store.setIsGenerating(true),
    onSuccess: (res) => {
      if (res.scenes && res.scenes.length > 0) {
        store.setScenes(res.scenes);
        store.setSelectedSceneId(res.scenes[0].id);
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.storyboard.byProject(projectId) });
      toast.success("AI đã tạo lại Storyboard thành công!");
    },
    onSettled: () => store.setIsGenerating(false),
  });

  const selectedScene =
    store.scenes.find((s) => s.id === store.selectedSceneId) ||
    store.scenes[0] || {
      id: "scene-empty",
      sceneNumber: 1,
      title: "Chưa có phân cảnh",
      durationSeconds: 5,
      cameraMovement: "Static",
      transitionType: "Cut",
      description: "",
      creativeDirection: "",
    };

  const totalDuration = store.scenes.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  const updateSelectedScene = (field: keyof StoryboardScene, value: any) => {
    if (!store.selectedSceneId) return;
    store.updateSceneLocal(store.selectedSceneId, { [field]: value });

    const input: UpdateSceneInput = {};
    if (field === "title") input.title = String(value);
    if (field === "description") input.description = String(value);
    if (field === "visualPrompt") input.visualPrompt = String(value);
    if (field === "voiceover") input.voiceover = String(value);
    if (field === "durationSeconds") input.durationSeconds = Number(value);
    if (field === "cameraMovement") input.cameraMovement = String(value);
    if (field === "transitionType") input.transitionType = String(value);
    if (field === "cameraLens") input.cameraLens = String(value);
    if (field === "lightingRimColor") input.lightingRimColor = String(value);

    updateSceneMutation.mutate({ sceneId: store.selectedSceneId, input });
  };

  const handleAddScene = () => {
    const nextNum = store.scenes.length + 1;
    addSceneMutation.mutate({
      title: `Phân cảnh mới 0${nextNum}`,
      durationSeconds: 5,
      cameraMovement: "Slow push-in 24fps",
      visualPrompt: "Cinematic product shot with rim-lighting...",
      voiceover: "Mô tả nội dung lời thoại...",
    });
  };

  const handleDuplicate = () => {
    if (!selectedScene) return;
    addSceneMutation.mutate({
      title: `${selectedScene.title} (Bản sao)`,
      durationSeconds: selectedScene.durationSeconds,
      cameraMovement: selectedScene.cameraMovement,
      visualPrompt: selectedScene.visualPrompt,
      voiceover: selectedScene.voiceover,
      cameraLens: selectedScene.cameraLens,
    });
  };

  const handleRemove = () => {
    if (store.scenes.length <= 1) {
      toast.warning("Dự án cần có ít nhất 1 phân cảnh.");
      return;
    }
    const targetId = store.selectedSceneId;
    const filtered = store.scenes.filter((s) => s.id !== targetId);
    store.setScenes(filtered.map((s, i) => ({ ...s, sceneNumber: i + 1 })));
    store.setSelectedSceneId(filtered[0]?.id || "");
    deleteSceneMutation.mutate(targetId);
  };

  const handleMoveScene = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= store.scenes.length) return;
    store.reorderScenesLocal(fromIndex, toIndex);
    const updatedIds = store.scenes.map((s) => s.id);
    reorderMutation.mutate(updatedIds);
  };

  return {
    projectName: data?.projectName || projectName,
    approvalStatus: data?.approvalStatus || store.approvalStatus,
    scenes: store.scenes,
    selectedScene,
    totalDuration,
    isLoading,
    isGenerating: store.isGenerating,
    viewMode: store.viewMode,
    isPlayingAnimatics: store.isPlayingAnimatics,
    playbackCurrentTime: store.playbackCurrentTime,
    setViewMode: store.setViewMode,
    setIsPlayingAnimatics: store.setIsPlayingAnimatics,
    setPlaybackCurrentTime: store.setPlaybackCurrentTime,
    setSelectedSceneId: store.setSelectedSceneId,
    updateSelectedScene,
    handleAddScene,
    handleDuplicate,
    handleRemove,
    handleMoveScene,
    handleGenerateWithAi: () => generateMutation.mutate(),
    handleApproveAndProceed: () => approveMutation.mutate(),
    refetch,
  };
}
