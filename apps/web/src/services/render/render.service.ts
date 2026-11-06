import { apiGet, apiPost } from "@/lib/axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import type {
  RenderProgress,
  StartRenderInput,
  StartRenderResponse,
} from "./types";

export const renderService = {
  startRender: async (data: StartRenderInput): Promise<StartRenderResponse> => {
    return apiPost<StartRenderResponse, StartRenderInput>(
      API_ENDPOINTS.RENDER_START,
      data
    );
  },

  getProgress: async (): Promise<RenderProgress> => {
    return apiGet<RenderProgress>(API_ENDPOINTS.RENDER_PROGRESS);
  },

  getDownloadUrl: (jobId: string): string => {
    return `${API_BASE_URL}${API_ENDPOINTS.RENDER_DOWNLOAD(jobId)}`;
  },
};

