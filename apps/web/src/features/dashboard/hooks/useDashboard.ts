import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useDashboardStore } from "../store";

export function useDashboard() {
  const store = useDashboardStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.dashboard.stats(),
    queryFn: () => dashboardService.getOverview(),
  });

  useEffect(() => {
    if (data) {
      if (data.stats) store.setStats(data.stats);
      if (data.projects) store.setProjects(data.projects);
      if (data.approvals) store.setApprovals(data.approvals);
      if (data.renderQueue) store.setRenderQueue(data.renderQueue);
    }
  }, [data]);

  return {
    stats: data?.stats || store.stats,
    projects: data?.projects || store.projects,
    approvals: data?.approvals || store.approvals,
    renderQueue: data?.renderQueue || store.renderQueue,
    isLoading,
    error,
    refetch,
    searchFilter: store.searchFilter,
    statusFilter: store.statusFilter,
    setSearchFilter: store.setSearchFilter,
    setStatusFilter: store.setStatusFilter,
  };
}
