export interface ExportSettings {
  resolution: string;
  frameRate: string;
  aspectRatio: string;
  codec: string;
}

export interface PreviousRender {
  id: string;
  version: string;
  resolution: string;
  duration: string;
  status: "completed" | "failed";
}

export interface RenderProgress {
  percentage: number;
  statusText: string;
  estimatedRemaining: string;
  elapsedTime: string;
  logs: string[];
}
