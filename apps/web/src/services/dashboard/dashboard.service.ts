import { apiGet } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { DashboardOverviewResponse } from "./types";

export const dashboardService = {
  getOverview: async (): Promise<DashboardOverviewResponse> => {
    return apiGet<DashboardOverviewResponse>(API_ENDPOINTS.DASHBOARD_STATS);
  },
};

