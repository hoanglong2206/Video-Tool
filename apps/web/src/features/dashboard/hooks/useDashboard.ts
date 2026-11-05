import { useState, useEffect } from "react";
import type {
  DashboardStats,
  ProjectItem,
  ApprovalItem,
  RenderQueueItem,
} from "../types";

const INITIAL_STATS: DashboardStats = {
  activeProjects: 5,
  waitingForApproval: 2,
  rendersInQueue: 1,
  aiGenerationsThisMonth: 1240,
};

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "Aurora X1 Launch",
    stageDescription: "Stage 06 · Motion design",
    progress: 25,
    status: "in_progress",
  },
  {
    id: "proj-2",
    name: "Nova Watch Teaser",
    stageDescription: "Stage 03 · Asset generation",
    progress: 18,
    status: "in_progress",
  },
  {
    id: "proj-3",
    name: "Halo Speaker Promo",
    stageDescription: "Stage 09 · Render",
    progress: 85,
    status: "in_progress",
  },
  {
    id: "proj-4",
    name: "Kite Sneaker Reveal",
    stageDescription: "Completed",
    progress: 100,
    status: "completed",
  },
  {
    id: "proj-5",
    name: "Brew Coffee Ad",
    stageDescription: "Stage 01 · Brief analysis",
    progress: 8,
    status: "in_progress",
  },
  {
    id: "proj-6",
    name: "Asset library",
    stageDescription: "412 assets · 18 templates",
    progress: 0,
    status: "library",
    assetCount: 412,
    templateCount: 18,
  },
];

const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: "appr-1",
    title: "Aurora X1 · Scene composition",
    stage: "Stage 05",
    timeAgo: "4 min ago",
    isUrgent: true,
  },
  {
    id: "appr-2",
    title: "Nova Watch · Asset variations",
    stage: "Stage 03",
    timeAgo: "1 h ago",
    isUrgent: false,
  },
];

const INITIAL_RENDER_QUEUE: RenderQueueItem = {
  id: "render-1",
  title: "Halo Speaker · 4K MP4",
  progress: 72,
  nextJobTitle: "Next: Aurora X1 preview · 1080p",
};

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [renderQueue, setRenderQueue] = useState<RenderQueueItem>(INITIAL_RENDER_QUEUE);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchDashboardData(): Promise<void> {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/v1/dashboard/stats`, {
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.stats) setStats(data.stats);
          if (data.projects) setProjects(data.projects);
          if (data.approvals) setApprovals(data.approvals);
          if (data.renderQueue) setRenderQueue(data.renderQueue);
        }
      } catch {
        // Fallback to initial mock data when offline or server is not yet started
      }
    }

    fetchDashboardData();
  }, []);

  return {
    stats,
    projects,
    approvals,
    renderQueue,
    isLoading,
  };
}

