import { useState, useEffect, useCallback } from "react";
import type { LayerItem, LayerProperties, TimelineTrack, MotionSuggestion } from "../types";

const DEFAULT_PROPERTIES: LayerProperties = {
  x: 960,
  y: 580,
  scalePercent: 100,
  rotateDeg: 0,
  opacityPercent: 100,
  easing: "Ease-out cubic",
};

export function useSceneEditor(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1",
  sceneId: string = "scene-3"
) {
  const [sceneName, setSceneName] = useState<string>("Scene 03 · Product Reveal");
  const [layers, setLayers] = useState<LayerItem[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string>("");
  const [tracks, setTracks] = useState<TimelineTrack[]>([]);
  const [properties, setProperties] = useState<LayerProperties>(DEFAULT_PROPERTIES);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(3.2);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<MotionSuggestion>({
    prompt: "Make this product reveal more cinematic...",
    description: "Slow 25° camera orbit with a rising light sweep over 2.4 s; reflections intensified.",
    cameraOrbitDeg: 25,
    sweepDurationSec: 2.4,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchSceneDetails = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/scenes/${sceneId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.sceneName) setSceneName(data.sceneName);
        if (Array.isArray(data.layers)) {
          setLayers(data.layers);
          setSelectedLayerId(data.layers[0]?.id || "");
        }
        if (Array.isArray(data.tracks)) setTracks(data.tracks);
        if (data.properties) setProperties(data.properties);
        if (data.suggestion) setSuggestion(data.suggestion);
      }
    } catch (err) {
      console.error("Failed to load scene details from Supabase backend:", err);
    }
  }, [apiUrl, projectId, sceneId]);

  useEffect(() => {
    fetchSceneDetails();
  }, [fetchSceneDetails]);

  const togglePlay = (): void => setIsPlaying((prev) => !prev);

  // 60 FPS Timehead scrubbing loop
  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = performance.now();
    let animId: number;
    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      setCurrentTimeSec((prev) => {
        const next = prev + dt;
        return next > 6.0 ? 0 : next;
      });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const applySuggestion = async (): Promise<void> => {
    setProperties((prev) => ({
      ...prev,
      rotateDeg: 25,
      easing: "Cubic-bezier(0.25, 1, 0.5, 1)",
    }));

    try {
      await fetch(`${apiUrl}/api/v1/projects/${projectId}/scenes/${sceneId}/apply-motion`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error applying motion suggestion to Supabase:", err);
    }
  };

  const handleApproveScene = (): void => {
    setIsApproved(true);
  };

  return {
    projectName,
    sceneName,
    layers,
    selectedLayerId,
    tracks,
    properties,
    isPlaying,
    currentTimeSec,
    isApproved,
    suggestion,
    setSelectedLayerId,
    setProperties,
    setCurrentTimeSec,
    togglePlay,
    applySuggestion,
    handleApproveScene,
  };
}
