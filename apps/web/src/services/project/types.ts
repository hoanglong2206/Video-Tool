import type { ProjectItem } from "../dashboard/types";

export interface SceneInputDTO {
  scene_number: number;
  title: string;
  duration_seconds: number;
  camera_movement: string;
  visual_prompt: string;
  voiceover: string;
  transition_type?: string;
}

export interface CreateProjectInput {
  name: string;
  brief?: string;
  client?: string;
  duration?: string;
  aspect_ratio?: string;
  style_preference?: string;
  brand_colors?: string[];
  status?: string;
  scenes?: SceneInputDTO[];
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

