import { apiGet, apiPut } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { ThreeDSceneResponse } from "./types";

export const threedService = {
  getThreeDScene: async (projectId: string = "proj-1"): Promise<ThreeDSceneResponse> => {
    return apiGet<ThreeDSceneResponse>(API_ENDPOINTS.THREED_SCENE(projectId));
  },

  saveThreeDScene: async (
    projectId: string = "proj-1",
    data: Partial<ThreeDSceneResponse>
  ): Promise<{ status: string; data: Partial<ThreeDSceneResponse> }> => {
    return apiPut<
      { status: string; data: Partial<ThreeDSceneResponse> },
      Partial<ThreeDSceneResponse>
    >(API_ENDPOINTS.THREED_SCENE(projectId), data);
  },
};

