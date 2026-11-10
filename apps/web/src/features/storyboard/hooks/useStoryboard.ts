import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { storyboardService, type UpdateSceneInput } from "@/services/storyboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useStoryboardStore } from "../store";
import type { StoryboardScene } from "../types";

const FALLBACK_EMPTY_SCENE: StoryboardScene = {
  id: "scene-empty",
  sceneNumber: 1,
  title: "Chưa có phân cảnh",
  durationSeconds: 5,
  cameraMovement: "Static",
  transitionType: "Cut",
  description: "",
  creativeDirection: "",
};

export function useStoryboard(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const store = useStoryboardStore();

  const isInitializedRef = useRef(false);
  const pendingUpdatesRef = useRef<Record<string, UpdateSceneInput>>({});
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reorderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.storyboard.byProject(projectId),
    queryFn: () => storyboardService.getStoryboard(projectId),
  });

  // Only initialize store from remote query once on load or when store is empty
  useEffect(() => {
    if (data?.scenes && data.scenes.length > 0) {
      if (!isInitializedRef.current || store.scenes.length === 0) {
        store.setScenes(data.scenes);
        if (data.approvalStatus) store.setApprovalStatus(data.approvalStatus);
        if (data.version) store.setVersion(data.version);
        isInitializedRef.current = true;
      }
    }
  }, [data]);

  // Flush accumulated changes for a specific scene or currently selected scene
  const flushPendingUpdates = (targetSceneId?: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    const sceneId = targetSceneId || store.selectedSceneId;
    if (sceneId && pendingUpdatesRef.current[sceneId]) {
      const input = { ...pendingUpdatesRef.current[sceneId] };
      delete pendingUpdatesRef.current[sceneId];
      if (Object.keys(input).length > 0) {
        updateSceneMutation.mutate({ sceneId, input });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (reorderTimerRef.current) clearTimeout(reorderTimerRef.current);
    };
  }, []);

  const updateSceneMutation = useMutation({
    mutationFn: ({ sceneId, input }: { sceneId: string; input: UpdateSceneInput }) =>
      storyboardService.updateScene(projectId, sceneId, input),
    onSuccess: (updated) => {
      // Silently update React Query cache without invalidating queries
      queryClient.setQueryData(QUERY_KEYS.storyboard.byProject(projectId), (old: any) => {
        if (!old?.scenes) return old;
        return {
          ...old,
          scenes: old.scenes.map((s: StoryboardScene) => (s.id === updated.id ? { ...s, ...updated } : s)),
        };
      });
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
      const currentScenes = useStoryboardStore.getState().scenes;
      const nextScenes = [...currentScenes, created];
      store.setScenes(nextScenes);
      store.setSelectedSceneId(created.id);
      queryClient.setQueryData(QUERY_KEYS.storyboard.byProject(projectId), (old: any) =>
        old ? { ...old, scenes: nextScenes } : old
      );
      toast.success(`Đã thêm Cảnh 0${created.sceneNumber} thành công!`);
    },
    onError: () => toast.error("Không thể thêm phân cảnh mới."),
  });

  const deleteSceneMutation = useMutation({
    mutationFn: (sceneId: string) => storyboardService.deleteScene(projectId, sceneId),
    onError: () => toast.error("Không thể xóa phân cảnh."),
    onSuccess: () => toast.success("Đã xóa phân cảnh và đánh số lại thành công!"),
  });

  const reorderMutation = useMutation({
    mutationFn: (sceneIds: string[]) => storyboardService.reorderScenes(projectId, sceneIds),
    onError: () => toast.error("Không thể lưu thứ tự phân cảnh."),
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
        queryClient.setQueryData(QUERY_KEYS.storyboard.byProject(projectId), (old: any) =>
          old ? { ...old, scenes: res.scenes } : old
        );
      }
      toast.success("AI đã tạo lại Storyboard thành công!");
    },
    onSettled: () => store.setIsGenerating(false),
  });

  const selectedScene =
    store.scenes.find((s) => s.id === store.selectedSceneId) ||
    store.scenes[0] ||
    FALLBACK_EMPTY_SCENE;

  const totalDuration = store.scenes.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  const updateSelectedScene = (field: keyof StoryboardScene, value: any) => {
    if (!store.selectedSceneId) return;
    const targetId = store.selectedSceneId;
    store.updateSceneLocal(targetId, { [field]: value });

    if (!pendingUpdatesRef.current[targetId]) {
      pendingUpdatesRef.current[targetId] = {};
    }
    (pendingUpdatesRef.current[targetId] as any)[field] = value;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      flushPendingUpdates(targetId);
    }, 500);
  };

  const setSelectedSceneId = (sceneId: string) => {
    if (store.selectedSceneId && store.selectedSceneId !== sceneId) {
      flushPendingUpdates(store.selectedSceneId);
    }
    store.setSelectedSceneId(sceneId);
  };

  const handleAddScene = () => {
    if (addSceneMutation.isPending) return;
    flushPendingUpdates();
    const currentScenes = useStoryboardStore.getState().scenes;
    const nextNum = currentScenes.length + 1;
    addSceneMutation.mutate({
      title: `Phân cảnh mới 0${nextNum}`,
      durationSeconds: 5,
      cameraMovement: "Slow push-in 24fps",
      visualPrompt: "Cinematic product shot with rim-lighting...",
      voiceover: "Mô tả nội dung lời thoại...",
    });
  };

  const handleDuplicate = (targetSceneId?: string) => {
    if (addSceneMutation.isPending) return;
    flushPendingUpdates();
    const currentScenes = useStoryboardStore.getState().scenes;
    const target = targetSceneId ? currentScenes.find((s) => s.id === targetSceneId) : selectedScene;
    if (!target) return;
    addSceneMutation.mutate({
      title: `${target.title} (Bản sao)`,
      durationSeconds: target.durationSeconds,
      cameraMovement: target.cameraMovement,
      visualPrompt: target.visualPrompt,
      voiceover: target.voiceover,
      cameraLens: target.cameraLens,
    });
  };

  const handleRemove = async (targetSceneId?: string) => {
    const currentScenes = useStoryboardStore.getState().scenes;
    if (currentScenes.length <= 1) {
      toast.warning("Dự án cần có ít nhất 1 phân cảnh.");
      return;
    }
    const targetId = targetSceneId || store.selectedSceneId;
    if (!targetId) return;

    await queryClient.cancelQueries({ queryKey: QUERY_KEYS.storyboard.byProject(projectId) });

    if (pendingUpdatesRef.current[targetId]) {
      delete pendingUpdatesRef.current[targetId];
    }

    const filtered = currentScenes.filter((s) => s.id !== targetId);
    const resequenced = filtered.map((s, i) => ({ ...s, sceneNumber: i + 1 }));

    store.setScenes(resequenced);
    if (store.selectedSceneId === targetId) {
      store.setSelectedSceneId(resequenced[0]?.id || "");
    }
    queryClient.setQueryData(QUERY_KEYS.storyboard.byProject(projectId), (old: any) =>
      old ? { ...old, scenes: resequenced } : old
    );

    deleteSceneMutation.mutate(targetId);
  };

  const handleMoveScene = (fromIndex: number, toIndex: number) => {
    const currentScenes = useStoryboardStore.getState().scenes;
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= currentScenes.length) return;

    const updated = [...currentScenes];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    const resequenced = updated.map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));

    store.setScenes(resequenced);
    queryClient.setQueryData(QUERY_KEYS.storyboard.byProject(projectId), (old: any) =>
      old ? { ...old, scenes: resequenced } : old
    );

    if (reorderTimerRef.current) clearTimeout(reorderTimerRef.current);
    const sceneIds = resequenced.map((s) => s.id);
    reorderTimerRef.current = setTimeout(() => {
      reorderMutation.mutate(sceneIds);
    }, 400);
  };

  return {
    projectName: data?.projectName || projectName,
    approvalStatus: data?.approvalStatus || store.approvalStatus,
    scenes: store.scenes,
    selectedScene,
    totalDuration,
    isLoading,
    isAddingScene: addSceneMutation.isPending,
    isGenerating: store.isGenerating,
    viewMode: store.viewMode,
    isPlayingAnimatics: store.isPlayingAnimatics,
    playbackCurrentTime: store.playbackCurrentTime,
    setViewMode: store.setViewMode,
    setIsPlayingAnimatics: store.setIsPlayingAnimatics,
    setPlaybackCurrentTime: store.setPlaybackCurrentTime,
    setSelectedSceneId,
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
