export type StageStatus =
  | "approved"
  | "waiting_approval"
  | "running"
  | "skipped"
  | "pending";

export interface PipelineStage {
  id: string;
  stageNumber: string;
  name: string;
  status: StageStatus;
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

export interface WorkflowDetails {
  projectName: string;
  overallProgress: number;
  stages: PipelineStage[];
  logs: ExecutionLogEntry[];
}
