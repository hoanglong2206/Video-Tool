import { apiGet, apiPost } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  ApprovalCenterResponse,
  ApprovalDecisionInput,
  ApprovalDecisionResponse,
} from "./types";

export const approvalService = {
  getApprovals: async (
    projectId: string = "proj-1"
  ): Promise<ApprovalCenterResponse> => {
    return apiGet<ApprovalCenterResponse>(API_ENDPOINTS.APPROVALS(projectId));
  },

  decideApproval: async (
    projectId: string,
    approvalId: string,
    data: ApprovalDecisionInput
  ): Promise<ApprovalDecisionResponse> => {
    return apiPost<ApprovalDecisionResponse, ApprovalDecisionInput>(
      API_ENDPOINTS.APPROVAL_DECISION(projectId, approvalId),
      data
    );
  },
};

