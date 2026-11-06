import type { ProjectItem } from "../dashboard/types";

export interface CreateProjectInput {
  name: string;
  brief?: string;
  client?: string;
  duration?: string;
  aspect_ratio?: string;
  style_preference?: string;
  status?: string;
}

export interface CreatedProjectResponse {
  id: string;
  name: string;
  stage_description: string;
  progress: number;
  status: string;
  duration?: string;
  aspect_ratio?: string;
  style_preference?: string;
}

export interface BriefCheckInput {
  brief: string;
  project_name?: string;
  client?: string;
}

export interface BriefCheckResponse {
  missing_items: string[];
  suggested_structure: string;
  is_complete: boolean;
}

export type { ProjectItem };

