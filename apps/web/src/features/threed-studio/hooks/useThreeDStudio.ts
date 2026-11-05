import { useState, useEffect, useCallback } from "react";
import type {
  SceneGraphNode,
  PbrMaterial,
  LightSetting,
  Camera3DSettings,
  ThreeDTimelineTrack,
} from "../types";

const INITIAL_NODES: SceneGraphNode[] = [
  { id: "node-1", name: "Camera · Orbit A", type: "camera" },
  { id: "node-2", name: "Key light", type: "light" },
  { id: "node-3", name: "Rim light", type: "light" },
  { id: "node-4", name: "Headphones.glb", type: "mesh" },
  { id: "node-5", name: "Floor · reflective", type: "floor" },
];

const INITIAL_TRACKS: ThreeDTimelineTrack[] = [
  { id: "track-1", name: "Camera", startPercent: 5, durationPercent: 45, colorClass: "bg-[#2563EB]" },
  { id: "track-2", name: "Model", startPercent: 18, durationPercent: 50, colorClass: "bg-[#1E293B]" },
  { id: "track-3", name: "Lights", startPercent: 38, durationPercent: 30, colorClass: "bg-[#784D16]" },
];

export function useThreeDStudio(projectName: string = "Aurora X1 Launch", projectId: string = "proj-1") {
  const [nodes, setNodes] = useState<SceneGraphNode[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("node-4");
  const [isOrbitMode, setIsOrbitMode] = useState<boolean>(true);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const [material, setMaterial] = useState<PbrMaterial>({
    name: "Anodized Titanium PBR",
    metalness: 0.85,
    roughness: 0.25,
  });

  const [lights, setLights] = useState<LightSetting[]>([
    { name: "Key light", colorTempK: 3200, intensityPercent: 80 },
    { name: "Rim light", colorTempK: 5600, intensityPercent: 45 },
  ]);

  const [camera, setCamera] = useState<Camera3DSettings>({
    orbitTrajectory: "Orbit 25° over 2.4 s",
    focalLengthMm: 35,
    aperture: "f/2.8",
  });

  const [tracks] = useState<ThreeDTimelineTrack[]>(INITIAL_TRACKS);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchThreeDConfig = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/3d`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.nodes)) setNodes(data.nodes);
        if (data.material) setMaterial(data.material);
        if (Array.isArray(data.lights)) setLights(data.lights);
        if (data.camera) setCamera(data.camera);
      }
    } catch (err) {
      console.error("Failed to fetch 3D WebGL config from Supabase:", err);
    }
  }, [apiUrl, projectId]);

  useEffect(() => {
    fetchThreeDConfig();
  }, [fetchThreeDConfig]);

  const selectedNode =
    nodes.find((n) => n.id === selectedNodeId) || nodes[3];

  const handleRenderPreview = (): void => {
    setIsRendering(true);
    setTimeout(() => setIsRendering(false), 1200);
  };

  const handleApproveScene = (): void => {
    setIsApproved(true);
  };

  return {
    projectName,
    sceneTitle: "3D Scene Studio · Scene 04",
    nodes,
    selectedNodeId,
    selectedNode,
    isOrbitMode,
    isRendering,
    isApproved,
    material,
    lights,
    camera,
    tracks,
    setSelectedNodeId,
    setIsOrbitMode,
    setMaterial,
    handleRenderPreview,
    handleApproveScene,
  };
}

