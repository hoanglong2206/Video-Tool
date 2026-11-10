import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { storyboardService, type UpdateSceneInput } from "@/services/storyboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useStoryboardStore } from "../store";
import type { StoryboardScene } from "../types";
import { useStoryboardMutations } from "./useStoryboardMutations";

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
  const queryClient = useQueryClient();
  const store = useStoryboardStore();

  const isInitializedRef = useRef(false);
  const pendingUpdatesRef = useRef<Record<string, UpdateSceneInput>>({});
  const lastSavedRef = useRef<Record<string, Record<string, any>>>({});
  const isUpdatingSceneRef = useRef(false);
  const reorderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Manual save tracking: which scenes have unsaved local changes
  const [dirtyScenes, setDirtyScenes] = useState<Record<string, boolean>>({});

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.storyboard.byProject(projectId),
    queryFn: () => storyboardService.getStoryboard(projectId),
  });

  const {
    updateSceneMutation,
    addSceneMutation,
    deleteSceneMutation,
    createVersionMutation,
    deleteVersionMutation,
    reorderMutation,
    approveMutation,
    generateMutation,
  } = useStoryboardMutations({
    projectId,
    store,
    lastSavedRef,
    isUpdatingSceneRef,
    onFlushNextPending: () => {},
  });

  useEffect(() => {
    if (data?.scenes && data.scenes.length > 0) {
      if (!isInitializedRef.current || store.scenes.length === 0) {
        store.setScenes(data.scenes);
        if (data.approvalStatus) store.setApprovalStatus(data.approvalStatus);
        if (data.version) store.setVersion(data.version);
        data.scenes.forEach((s) => {
          lastSavedRef.current[s.id] = { ...s };
        });
        isInitializedRef.current = true;
      }
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (reorderTimerRef.current) clearTimeout(reorderTimerRef.current);
    };
  }, []);

  const selectedScene =
    store.scenes.find((s) => s.id === store.selectedSceneId) ||
    store.scenes[0] ||
    FALLBACK_EMPTY_SCENE;

  const totalDuration = store.scenes.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
  const hasUnsavedChanges = Boolean(store.selectedSceneId && dirtyScenes[store.selectedSceneId]);

  // Update field locally without triggering any automatic API calls
  const updateSelectedScene = (field: keyof StoryboardScene, value: any) => {
    if (!store.selectedSceneId) return;
    const targetId = store.selectedSceneId;
    const currentScene = useStoryboardStore.getState().scenes.find((s) => s.id === targetId);

    if (currentScene && (currentScene as any)[field] === value) return;

    store.updateSceneLocal(targetId, { [field]: value });

    if (!pendingUpdatesRef.current[targetId]) {
      pendingUpdatesRef.current[targetId] = {};
    }
    (pendingUpdatesRef.current[targetId] as any)[field] = value;

    setDirtyScenes((prev) => ({ ...prev, [targetId]: true }));
  };

  const setSelectedSceneId = (sceneId: string) => {
    store.setSelectedSceneId(sceneId);
  };

  // Manual save handler: triggers only when clicking Save button or pressing Ctrl+S
  const handleSaveScene = (targetSceneId?: string) => {
    const sceneId = targetSceneId || store.selectedSceneId;
    if (!sceneId) return;

    const rawInput = pendingUpdatesRef.current[sceneId] || {};
    const lastSaved = lastSavedRef.current[sceneId] || {};
    const currentScene = useStoryboardStore.getState().scenes.find((s) => s.id === sceneId);

    const dirtyInput: UpdateSceneInput = {};
    if (currentScene) {
      if (currentScene.title !== lastSaved.title) dirtyInput.title = currentScene.title;
      if (currentScene.durationSeconds !== lastSaved.durationSeconds) dirtyInput.durationSeconds = currentScene.durationSeconds;
      if (currentScene.cameraMovement !== lastSaved.cameraMovement) dirtyInput.cameraMovement = currentScene.cameraMovement;
      if (currentScene.transitionType !== lastSaved.transitionType) dirtyInput.transitionType = currentScene.transitionType;
      if (currentScene.visualPrompt !== lastSaved.visualPrompt) dirtyInput.visualPrompt = currentScene.visualPrompt;
      if (currentScene.voiceover !== lastSaved.voiceover) dirtyInput.voiceover = currentScene.voiceover;
      if (currentScene.cameraLens !== lastSaved.cameraLens) dirtyInput.cameraLens = currentScene.cameraLens;
      if (currentScene.cameraFov !== lastSaved.cameraFov) dirtyInput.cameraFov = currentScene.cameraFov;
      if (currentScene.cameraDof !== lastSaved.cameraDof) dirtyInput.cameraDof = currentScene.cameraDof;
      if (currentScene.lightingRimColor !== lastSaved.lightingRimColor) dirtyInput.lightingRimColor = currentScene.lightingRimColor;
    }
    Object.assign(dirtyInput, rawInput);

    if (Object.keys(dirtyInput).length === 0) {
      toast.info("Không có thay đổi mới nào để lưu.");
      return;
    }

    isUpdatingSceneRef.current = true;
    updateSceneMutation.mutate(
      { sceneId, input: dirtyInput },
      {
        onSuccess: (updated) => {
          lastSavedRef.current[sceneId] = { ...(lastSavedRef.current[sceneId] || {}), ...updated };
          delete pendingUpdatesRef.current[sceneId];
          setDirtyScenes((prev) => ({ ...prev, [sceneId]: false }));
        },
      }
    );
  };

  // Keyboard shortcut Ctrl+S / Cmd+S for quick saving
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSaveScene();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [store.selectedSceneId]);

  const handleAddScene = () => {
    if (addSceneMutation.isPending) return;
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
    setDirtyScenes((prev) => ({ ...prev, [targetId]: false }));

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

  const handleCreateVersion = (targetSceneId?: string, customTitle?: string) => {
    const sceneId = targetSceneId || store.selectedSceneId;
    if (!sceneId) return;
    createVersionMutation.mutate({
      sceneId,
      payload: customTitle ? { title: customTitle } : undefined,
    });
  };

  const handleDeleteVersion = (sceneId: string, versionId: string) => {
    deleteVersionMutation.mutate({ sceneId, versionId });
  };

  const handleRollbackVersion = (scene: StoryboardScene, version: any) => {
    if (!scene?.id) return;
    if (version.title) updateSelectedScene("title", version.title);
    if (version.visualPrompt) updateSelectedScene("visualPrompt", version.visualPrompt);
    if (version.voiceover) updateSelectedScene("voiceover", version.voiceover);
    if (version.cameraMovement) updateSelectedScene("cameraMovement", version.cameraMovement);
    toast.success(`Đã khôi phục về phiên bản v${version.versionNumber}! Bấm Lưu để lưu vào máy chủ.`);
  };

  return {
    projectName: data?.projectName || projectName,
    approvalStatus: data?.approvalStatus || store.approvalStatus,
    scenes: store.scenes,
    selectedScene,
    totalDuration,
    isLoading,
    isAddingScene: addSceneMutation.isPending,
    isSavingScene: isUpdatingSceneRef.current || updateSceneMutation.isPending,
    hasUnsavedChanges,
    isGenerating: store.isGenerating,
    isCreatingVersion: createVersionMutation.isPending,
    isDeletingVersion: deleteVersionMutation.isPending,
    viewMode: store.viewMode,
    isPlayingAnimatics: store.isPlayingAnimatics,
    playbackCurrentTime: store.playbackCurrentTime,
    setViewMode: store.setViewMode,
    setIsPlayingAnimatics: store.setIsPlayingAnimatics,
    setPlaybackCurrentTime: store.setPlaybackCurrentTime,
    setSelectedSceneId,
    updateSelectedScene,
    handleSaveScene,
    handleAddScene,
    handleDuplicate,
    handleRemove,
    handleMoveScene,
    handleCreateVersion,
    handleDeleteVersion,
    handleRollbackVersion,
    handleGenerateWithAi: () => generateMutation.mutate(),
    handleApproveAndProceed: () => approveMutation.mutate(),
    refetch,
  };
}
