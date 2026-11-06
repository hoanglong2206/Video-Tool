export interface PipelineStage {
  id: string;
  stageNumber: string;
  name: string;
  status: "approved" | "waiting_approval" | "running" | "skipped" | "pending";
  progressPercent?: number;
  dependsOn?: string;
  approvalHistory?: string;
  hasPreview?: boolean;
}

export interface ExecutionLogEntry {
  id: string;
  timestamp: string;
  stageLabel: string;
  message: string;
}

export interface ProjectWorkflowResponse {
  projectName: string;
  overallProgress: number;
  stages: PipelineStage[];
  logs: ExecutionLogEntry[];
}

export interface AdvanceWorkflowResponse {
  status: string;
  stage: string;
  stageName: string;
  projectProgress: number;
}

