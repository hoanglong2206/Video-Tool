import { apiGet, apiPost } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  ProjectWorkflowResponse,
  AdvanceWorkflowResponse,
} from "./types";

export const workflowService = {
  getWorkflow: async (projectId: string = "proj-1"): Promise<ProjectWorkflowResponse> => {
    return apiGet<ProjectWorkflowResponse>(API_ENDPOINTS.WORKFLOW(projectId));
  },

  startWorkflow: async (projectId: string = "proj-1"): Promise<AdvanceWorkflowResponse> => {
    return apiPost<AdvanceWorkflowResponse>(API_ENDPOINTS.WORKFLOW_START(projectId));
  },

  approveStage: async (
    projectId: string,
    stageId: string
  ): Promise<{ status: string; stageId: string }> => {
    return apiPost<{ status: string; stageId: string }>(
      API_ENDPOINTS.STAGE_APPROVE(projectId, stageId)
    );
  },
};

