import { apiPost } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  AssistantChatInput,
  AssistantChatResponse,
  ApplyChangeInput,
} from "./types";

export const assistantService = {
  sendMessage: async (
    data: AssistantChatInput
  ): Promise<AssistantChatResponse> => {
    return apiPost<AssistantChatResponse, AssistantChatInput>(
      API_ENDPOINTS.ASSISTANT_CHAT,
      data
    );
  },

  applyChange: async (
    data: ApplyChangeInput
  ): Promise<{ status: string; applied_change: string }> => {
    return apiPost<{ status: string; applied_change: string }, ApplyChangeInput>(
      API_ENDPOINTS.ASSISTANT_APPLY,
      data
    );
  },
};

