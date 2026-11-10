import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { sceneService, type LayerProperties } from "@/services/scene";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useSceneEditorStore } from "../store";

export function useSceneEditor(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1",
  sceneId: string = "scene-3"
) {
  const queryClient = useQueryClient();
  const store = useSceneEditorStore();
  const [sceneName, setSceneName] = useState<string>("Scene 03 · Product Reveal");
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.scene.detail(projectId, sceneId),
    queryFn: () => sceneService.getSceneDetails(projectId, sceneId),
  });

  useEffect(() => {
    if (data) {
      if (data.sceneName) setSceneName(data.sceneName);
      if (Array.isArray(data.layers)) store.setLayers(data.layers);
      if (Array.isArray(data.tracks)) store.setTracks(data.tracks);
      if (data.properties) store.setProperties(data.properties);
      if (data.suggestion) store.setSuggestion(data.suggestion);
    }
  }, [data]);

  const updatePropsMutation = useMutation({
    mutationFn: (props: Partial<LayerProperties>) =>
      sceneService.updateProperties(projectId, sceneId, props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.scene.detail(projectId, sceneId),
      });
      toast.success("Đã cập nhật thuộc tính layer thành công!");
    },
    onError: () => {
      toast.error("Không thể cập nhật thuộc tính layer!");
    },
  });

  const togglePlay = (): void => store.setIsPlaying(!store.isPlaying);

  // 60 FPS Timehead scrubbing loop
  useEffect(() => {
    if (!store.isPlaying) return;
    let lastTime = performance.now();
    let animId: number;
    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      store.setCurrentTimeSec(
        store.currentTimeSec + dt > 6.0 ? 0 : store.currentTimeSec + dt
      );
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [store.isPlaying, store.currentTimeSec]);

  const applySuggestion = async (): Promise<void> => {
    const updatedProps: Partial<LayerProperties> = {
      rotateDeg: 25,
      easing: "Cubic-bezier(0.25, 1, 0.5, 1)",
    };
    store.setProperties(updatedProps);
    updatePropsMutation.mutate(updatedProps);
  };

  const handleApproveScene = (): void => {
    setIsApproved(true);
  };

  return {
    projectName,
    sceneName,
    layers: store.layers,
    selectedLayerId: store.selectedLayerId,
    tracks: store.tracks,
    properties: store.properties,
    isPlaying: store.isPlaying,
    currentTimeSec: store.currentTimeSec,
    isApproved,
    suggestion: store.suggestion,
    isLoading,
    setSelectedLayerId: store.setSelectedLayerId,
    setProperties: (updater: LayerProperties | ((prev: LayerProperties) => LayerProperties)) => {
      if (typeof updater === "function") {
        const next = updater(store.properties);
        store.setProperties(next);
        updatePropsMutation.mutate(next);
      } else {
        store.setProperties(updater);
        updatePropsMutation.mutate(updater);
      }
    },
    setCurrentTimeSec: store.setCurrentTimeSec,
    togglePlay,
    applySuggestion,
    handleApproveScene,
    refetch,
  };
}
