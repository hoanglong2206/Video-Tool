import { create } from "zustand";
import type { DashboardStats, ProjectItem, ApprovalItem, RenderQueueItem } from "@/services/dashboard";

interface DashboardState {
  stats: DashboardStats;
  projects: ProjectItem[];
  approvals: ApprovalItem[];
  renderQueue: RenderQueueItem;
  searchFilter: string;
  statusFilter: "all" | "in_progress" | "waiting_approval" | "completed";
  setStats: (stats: DashboardStats) => void;
  setProjects: (projects: ProjectItem[]) => void;
  setApprovals: (approvals: ApprovalItem[]) => void;
  setRenderQueue: (queue: RenderQueueItem) => void;
  setSearchFilter: (query: string) => void;
  setStatusFilter: (status: "all" | "in_progress" | "waiting_approval" | "completed") => void;
}

const INITIAL_STATS: DashboardStats = {
  activeProjects: 0,
  waitingForApproval: 0,
  rendersInQueue: 0,
  aiGenerationsThisMonth: 0,
};

const INITIAL_RENDER_QUEUE: RenderQueueItem = {
  id: "render-queue",
  title: "Render queue idle",
  progress: 0,
  nextJobTitle: "No active render jobs",
};

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: INITIAL_STATS,
  projects: [],
  approvals: [],
  renderQueue: INITIAL_RENDER_QUEUE,
  searchFilter: "",
  statusFilter: "all",
  setStats: (stats) => set({ stats }),
  setProjects: (projects) => set({ projects }),
  setApprovals: (approvals) => set({ approvals }),
  setRenderQueue: (renderQueue) => set({ renderQueue }),
  setSearchFilter: (searchFilter) => set({ searchFilter }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
}));
