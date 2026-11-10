"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "./hooks/useDashboard";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsOverview } from "./components/StatsOverview";
import { AnalysisChart } from "./components/AnalysisChart";
import { RecentTwoProjects } from "./components/RecentTwoProjects";
import { ApprovalPanel } from "./components/ApprovalPanel";
import { RenderQueuePanel } from "./components/RenderQueuePanel";

export function Dashboard(): React.ReactElement {
  const router = useRouter();
  const { stats, projects, approvals, renderQueue, performance, isLoading } = useDashboard();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* 1. Left Sidebar Navigation */}
      <DashboardSidebar />

      {/* 2. Main View Area (Strictly 1-Screen No-Scroll Viewport) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <DashboardHeader
          onNewProject={() => router.push("/projects/new")}
          onRenderHistory={() => router.push(projects[0] ? `/projects/${projects[0].id}/render` : "/projects")}
        />

        {/* Overview Body (Fits 100% of remaining viewport) */}
        <main className="flex-1 min-h-0 p-3.5 flex flex-col gap-3 overflow-hidden">
          {/* Top Row: 4 Compact Metrics Cards */}
          <StatsOverview stats={stats} isLoading={isLoading} />

          {/* Bottom Row: 2-Column Balanced Dashboard Grid */}
          <div className="flex-1 min-h-0 grid grid-cols-12 gap-3 overflow-hidden">
            {/* Left 7 Columns: Analysis Chart + 2 Recent Projects */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-2.5 min-h-0 h-full overflow-hidden">
              {/* Biểu đồ Analysis liên quan với dữ liệu thật */}
              <AnalysisChart performance={performance} isLoading={isLoading} />

              {/* 2 Dự án gần đây */}
              <RecentTwoProjects projects={projects} isLoading={isLoading} />
            </div>

            {/* Right 5 Columns: Render Queue & Live Approvals / Milestones */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-3 min-h-0 h-full overflow-hidden">
              {/* Tiến độ hàng đợi render */}
              <RenderQueuePanel queueItem={renderQueue} gpuName={performance?.gpuName} isLoading={isLoading} />

              {/* Cần phê duyệt & Nhật ký sự kiện */}
              <ApprovalPanel
                approvals={approvals}
                isLoading={isLoading}
                onSelectApproval={(item) =>
                  router.push(projects[0] ? `/projects/${projects[0].id}/approvals` : "/projects")
                }
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
