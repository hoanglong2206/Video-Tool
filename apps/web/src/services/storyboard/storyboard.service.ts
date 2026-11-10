import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  StoryboardResponse,
  GenerateStoryboardInput,
  GenerateStoryboardResponse,
  UpdateSceneInput,
  CreateSceneInput,
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

  createScene: async (
    projectId: string,
    data: CreateSceneInput
  ): Promise<StoryboardScene> => {
    return apiPost<StoryboardScene, CreateSceneInput>(
      API_ENDPOINTS.STORYBOARD_SCENES(projectId),
      data
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

  deleteScene: async (
    projectId: string,
    sceneId: string
  ): Promise<{ status: string; sceneId: string }> => {
    return apiDelete<{ status: string; sceneId: string }>(
      API_ENDPOINTS.STORYBOARD_SCENE(projectId, sceneId)
    );
  },

  createSceneVersion: async (
    projectId: string,
    sceneId: string,
    payload?: { title?: string; visualPrompt?: string; voiceover?: string; cameraMovement?: string; role?: string }
  ): Promise<StoryboardScene> => {
    return apiPost<StoryboardScene, any>(
      API_ENDPOINTS.STORYBOARD_SCENE_VERSIONS(projectId, sceneId),
      payload || {}
    );
  },

  deleteSceneVersion: async (
    projectId: string,
    sceneId: string,
    versionId: string
  ): Promise<StoryboardScene> => {
    return apiDelete<StoryboardScene>(
      API_ENDPOINTS.STORYBOARD_SCENE_VERSION(projectId, sceneId, versionId)
    );
  },

  reorderScenes: async (
    projectId: string,
    sceneIds: string[]
  ): Promise<{ status: string; count: number }> => {
    return apiPut<{ status: string; count: number }, { sceneIds: string[] }>(
      API_ENDPOINTS.STORYBOARD_REORDER(projectId),
      { sceneIds }
    );
  },

  approveStoryboard: async (
    projectId: string
  ): Promise<{ status: string; projectId: string; nextStage: string }> => {
    return apiPost<{ status: string; projectId: string; nextStage: string }, Record<string, never>>(
      API_ENDPOINTS.STORYBOARD_APPROVE(projectId),
      {}
    );
  },
};
