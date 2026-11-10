import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui";
import { storyboardService, type UpdateSceneInput } from "@/services/storyboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useStoryboardStore, type StoryboardState } from "../store";
import type { StoryboardScene } from "../types";

interface UseStoryboardMutationsProps {
  projectId: string;
  store: StoryboardState;
  lastSavedRef: React.MutableRefObject<Record<string, Record<string, any>>>;
  isUpdatingSceneRef: React.MutableRefObject<boolean>;
  onFlushNextPending: () => void;
}

export function useStoryboardMutations({
  projectId,
  store,
  lastSavedRef,
  isUpdatingSceneRef,
  onFlushNextPending,
}: UseStoryboardMutationsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateSceneMutation = useMutation({
    mutationFn: ({ sceneId, input }: { sceneId: string; input: UpdateSceneInput }) =>
      storyboardService.updateScene(projectId, sceneId, input),
    onSuccess: (updated) => {
      lastSavedRef.current[updated.id] = { ...(lastSavedRef.current[updated.id] || {}), ...updated };
      queryClient.setQueryData(QUERY_KEYS.storyboard.byProject(projectId), (old: any) => {
        if (!old?.scenes) return old;
        return {
          ...old,
          scenes: old.scenes.map((s: StoryboardScene) => (s.id === updated.id ? { ...s, ...updated } : s)),
        };
      });
    },
    onError: () => toast.error("Không thể lưu cập nhật phân cảnh."),
    onSettled: () => {
      isUpdatingSceneRef.current = false;
      onFlushNextPending();
    },
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
      lastSavedRef.current[created.id] = { ...created };
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
        res.scenes.forEach((s) => {
          lastSavedRef.current[s.id] = { ...s };
        });
        queryClient.setQueryData(QUERY_KEYS.storyboard.byProject(projectId), (old: any) =>
          old ? { ...old, scenes: res.scenes } : old
        );
      }
      toast.success("AI đã tạo lại Storyboard thành công!");
    },
    onSettled: () => store.setIsGenerating(false),
  });

  return {
    updateSceneMutation,
    addSceneMutation,
    deleteSceneMutation,
    reorderMutation,
    approveMutation,
    generateMutation,
  };
}
