import { apiGet, apiPost } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { AssetStudioResponse, RemoveBgResponse } from "./types";

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
};

