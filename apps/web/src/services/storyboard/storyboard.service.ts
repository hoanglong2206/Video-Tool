import { apiGet, apiPost, apiPut } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  StoryboardResponse,
  GenerateStoryboardInput,
  GenerateStoryboardResponse,
  UpdateSceneInput,
  StoryboardScene,
} from "./types";

export const storyboardService = {
  getStoryboard: async (projectId: string = "proj-1"): Promise<StoryboardResponse> => {
    return apiGet<StoryboardResponse>(API_ENDPOINTS.STORYBOARD(projectId));
  },

  generateStoryboard: async (
    projectId: string = "proj-1",
    input?: GenerateStoryboardInput
  ): Promise<GenerateStoryboardResponse> => {
    return apiPost<GenerateStoryboardResponse, GenerateStoryboardInput>(
      API_ENDPOINTS.STORYBOARD_GENERATE(projectId),
      input || {}
    );
  },

  updateScene: async (
    projectId: string,
    sceneId: string,
    data: UpdateSceneInput
  ): Promise<StoryboardScene> => {
    return apiPut<StoryboardScene, UpdateSceneInput>(
      API_ENDPOINTS.STORYBOARD_SCENE(projectId, sceneId),
      data
    );
  },
};

