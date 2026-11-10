import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { threedService, type ThreeDSceneResponse } from "@/services/threed";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useThreeDStudioStore } from "../store";
import type { SceneGraphNode, PbrMaterial, ThreeDTimelineTrack } from "../types";

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

export function useThreeDStudio(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
  const queryClient = useQueryClient();
  const store = useThreeDStudioStore();
  const [isOrbitMode, setIsOrbitMode] = useState<boolean>(true);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.threed.byProject(projectId),
    queryFn: () => threedService.getThreeDScene(projectId),
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.nodes) && data.nodes.length > 0) {
        store.setNodes(data.nodes);
      }
      if (data.material) store.setMaterial(data.material);
      if (Array.isArray(data.lights)) store.setLights(data.lights);
      if (data.camera) store.setCamera(data.camera);
      if (Array.isArray(data.tracks) && data.tracks.length > 0) {
        store.setTracks(data.tracks);
      }
    }
  }, [data]);

  const saveSceneMutation = useMutation({
    mutationFn: (updates: Partial<ThreeDSceneResponse>) =>
      threedService.saveThreeDScene(projectId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.threed.byProject(projectId),
      });
      toast.success("Đã lưu thiết lập không gian 3D!");
    },
    onError: () => {
      toast.error("Không thể lưu thiết lập 3D. Vui lòng thử lại!");
    },
  });

  const nodes = store.nodes.length > 0 ? store.nodes : INITIAL_NODES;
  const tracks = store.tracks.length > 0 ? store.tracks : INITIAL_TRACKS;
  const selectedNode =
    nodes.find((n) => n.id === store.selectedNodeId) || nodes[3] || nodes[0];

  const handleRenderPreview = (): void => {
    setIsRendering(true);
    toast.info("Đang dựng thử nghiệm khung hình 3D...");
    setTimeout(() => setIsRendering(false), 1200);
  };

  const handleApproveScene = (): void => {
    setIsApproved(true);
    toast.success("Đã phê duyệt phân cảnh 3D thành công!");
  };

  return {
    projectName,
    sceneTitle: "3D Scene Studio · Scene 04",
    nodes,
    selectedNodeId: store.selectedNodeId || "node-4",
    selectedNode,
    isOrbitMode,
    isRendering,
    isApproved,
    material: store.material,
    lights: store.lights,
    camera: store.camera,
    tracks,
    isLoading,
    setSelectedNodeId: store.setSelectedNodeId,
    setIsOrbitMode,
    setMaterial: (mat: PbrMaterial | ((prev: PbrMaterial) => PbrMaterial)) => {
      if (typeof mat === "function") {
        const next = mat(store.material);
        store.setMaterial(next);
        saveSceneMutation.mutate({ material: next });
      } else {
        store.setMaterial(mat);
        saveSceneMutation.mutate({ material: mat });
      }
    },
    handleRenderPreview,
    handleApproveScene,
    refetch,
  };
}
