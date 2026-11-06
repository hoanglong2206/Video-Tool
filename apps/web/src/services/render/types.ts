export interface ExportSettings {
  resolution: string;
  frame_rate: string;
  aspect_ratio: string;
  codec: string;
}

export interface PreviousRender {
  version: string;
  resolution: string;
  duration: string;
  status: "completed" | "failed" | string;
}

export interface RenderProgress {
  percentage: number;
  status_text: string;
  estimated_remaining: string;
  elapsed_time: string;
  logs: string[];
}

export interface StartRenderInput {
  project_id: string;
  settings?: ExportSettings;
}

export interface StartRenderResponse {
  job_id: string;
  status: string;
  message: string;
  settings?: ExportSettings;
}

