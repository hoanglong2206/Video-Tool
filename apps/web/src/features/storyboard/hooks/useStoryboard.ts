import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storyboardService, type UpdateSceneInput } from "@/services/storyboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useStoryboardStore } from "../store";
import type { StoryboardScene } from "../types";

export function useStoryboard(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
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
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.storyboard.byProject(projectId),
      });
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
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.storyboard.byProject(projectId),
      });
    },
    onSettled: () => store.setIsGenerating(false),
  });

  const selectedScene =
    store.scenes.find((s) => s.id === store.selectedSceneId) ||
    store.scenes[0] || {
      id: "scene-empty",
      sceneNumber: 1,
      title: "Loading...",
      durationSeconds: 5,
      cameraMovement: "Static",
      transitionType: "Cut",
      description: "",
      creativeDirection: "",
    };

  const totalDuration = store.scenes.reduce(
    (acc, s) => acc + (s.durationSeconds || 0),
    0
  );

  const updateSelectedScene = async (
    field: keyof StoryboardScene,
    value: string | number
  ): Promise<void> => {
    if (!store.selectedSceneId) return;

    // 1. Optimistic update
    store.updateSceneLocal(store.selectedSceneId, { [field]: value });

    // 2. Persist with mutation
    const input: UpdateSceneInput = {};
    if (field === "description") input.description = String(value);
    if (field === "durationSeconds") input.durationSeconds = Number(value);
    if (field === "transitionType") input.transitionType = String(value);

    updateSceneMutation.mutate({ sceneId: store.selectedSceneId, input });
  };

  const handleAddScene = (): void => {
    const nextNumber = store.scenes.length + 1;
    const newScene: StoryboardScene = {
      id: `scene-${Date.now()}`,
      sceneNumber: nextNumber,
      title: `Scene ${nextNumber}`,
      durationSeconds: 5,
      cameraMovement: "Dolly in",
      transitionType: "Dissolve",
      description: "New cinematic scene concept awaiting direction.",
      creativeDirection: selectedScene.creativeDirection || "Studio minimal",
    };
    store.setScenes([...store.scenes, newScene]);
    store.setSelectedSceneId(newScene.id);
  };

  const handleDuplicate = (): void => {
    const duplicated: StoryboardScene = {
      ...selectedScene,
      id: `scene-${Date.now()}`,
      title: `${selectedScene.title} (Copy)`,
      sceneNumber: store.scenes.length + 1,
    };
    store.setScenes([...store.scenes, duplicated]);
    store.setSelectedSceneId(duplicated.id);
  };

  const handleRemove = (): void => {
    if (store.scenes.length <= 1) return;
    const filtered = store.scenes.filter((s) => s.id !== store.selectedSceneId);
    store.setScenes(filtered);
    store.setSelectedSceneId(filtered[0]?.id || "");
  };

  const handleGenerateWithAi = async (): Promise<void> => {
    generateMutation.mutate();
  };

  return {
    projectName,
    scenes: store.scenes,
    selectedScene,
    totalDuration,
    isLoading,
    isGenerating: store.isGenerating,
    setSelectedSceneId: store.setSelectedSceneId,
    updateSelectedScene,
    handleAddScene,
    handleDuplicate,
    handleRemove,
    handleGenerateWithAi,
    refetch,
  };
}
