import { useState } from "react";
import type { LayerItem, LayerProperties, TimelineTrack, MotionSuggestion } from "../types";

const INITIAL_LAYERS: LayerItem[] = [
  { id: "layer-1", name: "Light sweep", type: "light_sweep" },
  { id: "layer-2", name: 'Title · "Meet Aurora"', type: "title" },
  { id: "layer-3", name: "Product · aurora-x1.png", type: "product", assetRef: "aurora-x1.png" },
  { id: "layer-4", name: "Particles", type: "particles" },
  { id: "layer-5", name: "Background · studio-dark", type: "background" },
];

const INITIAL_TRACKS: TimelineTrack[] = [
  { id: "track-1", name: "Camera", startSec: 0.5, durationSec: 4.0, colorClass: "bg-[#2563EB]", keyframes: [0.8, 4.2] },
  { id: "track-2", name: "Product", startSec: 1.2, durationSec: 4.3, colorClass: "bg-[#1E293B]", keyframes: [2.5] },
  { id: "track-3", name: "Title", startSec: 1.8, durationSec: 2.0, colorClass: "bg-[#1E293B]", keyframes: [] },
  { id: "track-4", name: "Light sweep", startSec: 3.2, durationSec: 2.0, colorClass: "bg-[#784D16]", keyframes: [] },
];

const INITIAL_PROPERTIES: LayerProperties = {
  x: 960,
  y: 580,
  scalePercent: 100,
  rotateDeg: 0,
  opacityPercent: 100,
  easing: "Ease-out cubic",
};

export function useSceneEditor(projectName: string = "Aurora X1 Launch") {
  const [layers] = useState<LayerItem[]>(INITIAL_LAYERS);
  const [selectedLayerId, setSelectedLayerId] = useState<string>("layer-3");
  const [tracks] = useState<TimelineTrack[]>(INITIAL_TRACKS);
  const [properties, setProperties] = useState<LayerProperties>(INITIAL_PROPERTIES);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(3.2);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [suggestion] = useState<MotionSuggestion>({
    prompt: "Make this product reveal more cinematic...",
    description: "Slow 25° camera orbit with a rising light sweep over 2.4 s; reflections intensified.",
    cameraOrbitDeg: 25,
    sweepDurationSec: 2.4,
  });

  const togglePlay = (): void => setIsPlaying((prev) => !prev);

  const applySuggestion = (): void => {
    setProperties((prev) => ({
      ...prev,
      rotateDeg: 25,
      easing: "Cubic-bezier(0.25, 1, 0.5, 1)",
    }));
  };

  const handleApproveScene = (): void => {
    setIsApproved(true);
  };

  return {
    projectName,
    sceneName: "Scene 03 · Product Reveal",
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
    togglePlay,
    applySuggestion,
    handleApproveScene,
  };
}
