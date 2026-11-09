export interface DashboardStats {
  activeProjects: number;
  waitingForApproval: number;
  rendersInQueue: number;
  aiGenerationsThisMonth: number;
}

export type ProjectStatus = "in_progress" | "waiting_approval" | "completed" | "library";

export interface ProjectItem {
  id: string;
  name: string;
  stageDescription: string;
  progress: number; // 0 - 100
  status: ProjectStatus;
  assetCount?: number;
  templateCount?: number;
}

export interface ApprovalItem {
  id: string;
  title: string;
  stage: string;
  timeAgo: string;
  isUrgent?: boolean;
}

export interface RenderQueueItem {
  id: string;
  title: string;
  progress: number;
  nextJobTitle?: string;
}

export type { PerformanceDataPoint, DashboardPerformance } from "@/services/dashboard";

