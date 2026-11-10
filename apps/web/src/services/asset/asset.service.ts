import { apiGet, apiPost } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  AssetPlanningResponse,
  AssetStudioResponse,
  GenerateAssetPayload,
  RemoveBgResponse,
} from "./types";

export const assetService = {
  getAssets: async (projectId: string = "proj-1"): Promise<AssetStudioResponse> => {
    return apiGet<AssetStudioResponse>(API_ENDPOINTS.ASSETS(projectId));
  },

  removeBackground: async (
    projectId: string,
    assetId: string
  ): Promise<RemoveBgResponse> => {
    return apiPost<RemoveBgResponse>(
      API_ENDPOINTS.ASSET_REMOVE_BG(projectId, assetId)
    );
  },

  getAssetPlanning: async (
    projectId: string = "proj-1"
  ): Promise<AssetPlanningResponse> => {
    return apiGet<AssetPlanningResponse>(API_ENDPOINTS.ASSET_PLANNING(projectId));
  },

  generateAsset: async (
    projectId: string,
    assetId: string,
    payload: GenerateAssetPayload
  ): Promise<{ status: string; message: string; assetId: string }> => {
    return apiPost<{ status: string; message: string; assetId: string }>(
      API_ENDPOINTS.ASSET_PLAN_GENERATE(projectId, assetId),
      payload
    );
  },

  approveAssetPlanning: async (
    projectId: string
  ): Promise<{ status: string; nextStageId: string; message: string }> => {
    return apiPost<{ status: string; nextStageId: string; message: string }>(
      API_ENDPOINTS.ASSET_PLAN_APPROVE(projectId)
    );
  },
};
