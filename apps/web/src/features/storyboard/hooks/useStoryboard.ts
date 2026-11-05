import { useState } from "react";
import type { StoryboardScene } from "../types";

const INITIAL_SCENES: StoryboardScene[] = [
  {
    id: "scene-1",
    sceneNumber: 1,
    title: "Dark intro",
    durationSeconds: 4,
    cameraMovement: "Slow push-in",
    transitionType: "Fade",
    description: "Deep shadows cloak the headphones as an ambient glow slowly hints at the silhouette.",
    creativeDirection: "Dark studio, slow and deliberate pacing, metallic highlights.",
  },
  {
    id: "scene-2",
    sceneNumber: 2,
    title: "Product reveal",
    durationSeconds: 6,
    cameraMovement: "Orbit",
    transitionType: "Light sweep",
    description: "Headphones emerge from darkness as a soft light sweep crosses the metal surface.",
    creativeDirection: "Dark studio, slow and deliberate pacing, metallic highlights.",
  },
  {
    id: "scene-3",
    sceneNumber: 3,
    title: "Driver detail",
    durationSeconds: 5,
    cameraMovement: "Macro dolly",
    transitionType: "Cut",
    description: "Extreme close-up on the titanium acoustic driver diaphragm vibrating with precision sound waves.",
    creativeDirection: "Dark studio, macro fidelity, crisp micro-contrast.",
  },
  {
    id: "scene-4",
    sceneNumber: 4,
    title: "Materials",
    durationSeconds: 5,
    cameraMovement: "Slider",
    transitionType: "Cross dissolve",
    description: "Anodized aluminum band flexing effortlessly with leatherette ear cushion texture focus.",
    creativeDirection: "Premium haptic feel, soft studio lighting.",
  },
  {
    id: "scene-5",
    sceneNumber: 5,
    title: "Battery life",
    durationSeconds: 5,
    cameraMovement: "Typography",
    transitionType: "Wipe",
    description: "Kinetic typography reveal: '60 Hours Non-Stop Playback' integrated seamlessly onto the surface.",
    creativeDirection: "Bold typography, fluid motion blur.",
  },
  {
    id: "scene-6",
    sceneNumber: 6,
    title: "Logo end card",
    durationSeconds: 5,
    cameraMovement: "Static",
    transitionType: "Fade out",
    description: "Aurora Audio emblem centers on screen with launch date and call-to-action lockup.",
    creativeDirection: "Clean branding, confident final hold.",
  },
];

export function useStoryboard(projectName: string = "Aurora X1 Launch") {
  const [scenes, setScenes] = useState<StoryboardScene[]>(INITIAL_SCENES);
  const [selectedSceneId, setSelectedSceneId] = useState<string>("scene-2");

  const selectedScene =
    scenes.find((s) => s.id === selectedSceneId) || scenes[1];

  const totalDuration = scenes.reduce((acc, s) => acc + s.durationSeconds, 0);

  const updateSelectedScene = (field: keyof StoryboardScene, value: string | number): void => {
    setScenes((prev) =>
      prev.map((s) => (s.id === selectedSceneId ? { ...s, [field]: value } : s))
    );
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
      description: "New cinematic scene concept awaiting description.",
      creativeDirection: selectedScene.creativeDirection,
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
    setSelectedSceneId(filtered[0].id);
  };

  return {
    projectName,
    scenes,
    selectedScene,
    totalDuration,
    setSelectedSceneId,
    updateSelectedScene,
    handleAddScene,
    handleDuplicate,
    handleRemove,
  };
}
