import { apiGet, apiPut } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  SceneDetailsResponse,
  LayerProperties,
} from "./types";

export const sceneService = {
  getSceneDetails: async (
    projectId: string = "proj-1",
    sceneId: string = "scene-3"
  ): Promise<SceneDetailsResponse> => {
    return apiGet<SceneDetailsResponse>(
      API_ENDPOINTS.SCENE_DETAILS(projectId, sceneId)
    );
  },

  updateProperties: async (
    projectId: string,
    sceneId: string,
    properties: Partial<LayerProperties>
  ): Promise<{ status: string; properties: LayerProperties }> => {
    return apiPut<{ status: string; properties: LayerProperties }, Partial<LayerProperties>>(
      API_ENDPOINTS.SCENE_DETAILS(projectId, sceneId),
      properties
    );
  },
};

