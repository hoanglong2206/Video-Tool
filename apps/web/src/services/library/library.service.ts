import { apiGet, apiPost } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  AssetLibraryResponse,
  ApplyBrandKitInput,
  ApplyBrandKitResponse,
} from "./types";

export const libraryService = {
  getLibrary: async (): Promise<AssetLibraryResponse> => {
    return apiGet<AssetLibraryResponse>(API_ENDPOINTS.LIBRARY_ASSETS);
  },

  applyBrandKit: async (data: ApplyBrandKitInput): Promise<ApplyBrandKitResponse> => {
    return apiPost<ApplyBrandKitResponse, ApplyBrandKitInput>(
      API_ENDPOINTS.BRAND_KIT_APPLY,
      data
    );
  },
};

