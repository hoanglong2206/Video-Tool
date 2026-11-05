import { useState, useEffect, useCallback } from "react";
import type { StoryboardScene } from "../types";

export function useStoryboard(projectName: string = "Aurora X1 Launch", projectId: string = "proj-1") {
  const [scenes, setScenes] = useState<StoryboardScene[]>([]);
  const [selectedSceneId, setSelectedSceneId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch storyboard from Supabase via backend API
  const fetchStoryboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/storyboard`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.scenes) && data.scenes.length > 0) {
          setScenes(data.scenes);
          setSelectedSceneId((prev) => prev || data.scenes[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load storyboard from Supabase backend:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, projectId]);

  useEffect(() => {
    fetchStoryboard();
  }, [fetchStoryboard]);

  const selectedScene =
    scenes.find((s) => s.id === selectedSceneId) || scenes[0] || {
      id: "scene-empty",
      sceneNumber: 1,
      title: "Loading...",
      durationSeconds: 5,
      cameraMovement: "Static",
      transitionType: "Cut",
      description: "",
      creativeDirection: "",
    };

  const totalDuration = scenes.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

  // Persist scene modifications directly to Supabase
  const updateSelectedScene = async (field: keyof StoryboardScene, value: string | number): Promise<void> => {
    if (!selectedSceneId) return;

    // 1. Optimistic UI update
    setScenes((prev) =>
      prev.map((s) => (s.id === selectedSceneId ? { ...s, [field]: value } : s))
    );

    // 2. Persist to Supabase
    try {
      const payload: Record<string, string | number> = {};
      if (field === "description") payload.description = String(value);
      if (field === "durationSeconds") payload.durationSeconds = Number(value);
      if (field === "transitionType") payload.transitionType = String(value);

      await fetch(`${apiUrl}/api/v1/projects/${projectId}/storyboard/scenes/${selectedSceneId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Error persisting scene edit to Supabase:", err);
    }
  };

  const handleAddScene = (): void => {
    const nextNumber = scenes.length + 1;
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
    setScenes((prev) => [...prev, newScene]);
    setSelectedSceneId(newScene.id);
  };

  const handleDuplicate = (): void => {
    const duplicated: StoryboardScene = {
      ...selectedScene,
      id: `scene-${Date.now()}`,
      title: `${selectedScene.title} (Copy)`,
      sceneNumber: scenes.length + 1,
    };
    setScenes((prev) => [...prev, duplicated]);
    setSelectedSceneId(duplicated.id);
  };

  const handleRemove = (): void => {
    if (scenes.length <= 1) return;
    const filtered = scenes.filter((s) => s.id !== selectedSceneId);
    setScenes(filtered);
    setSelectedSceneId(filtered[0]?.id || "");
  };

  return {
    projectName,
    scenes,
    selectedScene,
    totalDuration,
    isLoading,
    setSelectedSceneId,
    updateSelectedScene,
    handleAddScene,
    handleDuplicate,
    handleRemove,
  };
}
