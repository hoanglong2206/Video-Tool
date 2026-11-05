import { useState, useEffect } from "react";
import type {
  DashboardStats,
  ProjectItem,
  ApprovalItem,
  RenderQueueItem,
} from "../types";

const EMPTY_STATS: DashboardStats = {
  activeProjects: 0,
  waitingForApproval: 0,
  rendersInQueue: 0,
  aiGenerationsThisMonth: 0,
};

const EMPTY_RENDER_QUEUE: RenderQueueItem = {
  id: "render-queue",
  title: "Render queue idle",
  progress: 0,
  nextJobTitle: "No active render jobs",
};

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [renderQueue, setRenderQueue] = useState<RenderQueueItem>(EMPTY_RENDER_QUEUE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDashboardData(): Promise<void> {
      setIsLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/v1/dashboard/stats`, {
          headers: { Accept: "application/json" },
        });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.stats) setStats(data.stats);
          if (data.projects) setProjects(data.projects);
          if (data.approvals) setApprovals(data.approvals);
          if (data.renderQueue) setRenderQueue(data.renderQueue);
        }
      } catch (err) {
        console.error("Failed to load dashboard data from Supabase backend:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    stats,
    projects,
    approvals,
    renderQueue,
    isLoading,
  };
}
