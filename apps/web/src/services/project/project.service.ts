import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  CreateProjectInput,
  CreatedProjectResponse,
  BriefCheckInput,
  BriefCheckResponse,
  ProjectItem,
} from "./types";

export const projectService = {
  getProjects: async (): Promise<ProjectItem[]> => {
    return apiGet<ProjectItem[]>(API_ENDPOINTS.PROJECTS);
  },

  getProjectById: async (id: string): Promise<ProjectItem> => {
    return apiGet<ProjectItem>(API_ENDPOINTS.PROJECT_BY_ID(id));
  },

  createProject: async (data: CreateProjectInput): Promise<CreatedProjectResponse> => {
    return apiPost<CreatedProjectResponse, CreateProjectInput>(
      API_ENDPOINTS.PROJECTS,
      data
    );
  },

  checkBrief: async (data: BriefCheckInput): Promise<BriefCheckResponse> => {
    return apiPost<BriefCheckResponse, BriefCheckInput>(
      API_ENDPOINTS.BRIEF_CHECK,
      data
    );
  },

  updateProjectStatus: async (id: string, status: string): Promise<ProjectItem> => {
    return apiPatch<ProjectItem>(API_ENDPOINTS.PROJECT_BY_ID(id), { status });
  },

  deleteProject: async (id: string): Promise<void> => {
    return apiDelete<void>(API_ENDPOINTS.PROJECT_BY_ID(id));
  },
};

