"use client";

import React from "react";
import { useDashboard } from "./hooks/useDashboard";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsOverview } from "./components/StatsOverview";
import { RecentProjectsGrid } from "./components/RecentProjectsGrid";
import { ApprovalPanel } from "./components/ApprovalPanel";
import { RenderQueuePanel } from "./components/RenderQueuePanel";

export function Dashboard(): React.ReactElement {
  const { stats, projects, approvals, renderQueue } = useDashboard();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Left Icon Rail Navigation */}
      <DashboardSidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <DashboardHeader
          onNewProject={() => console.log("New project clicked")}
          onRenderHistory={() => console.log("Render history clicked")}
        />

        {/* Dashboard Body Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top 4 Metrics Cards */}
          <StatsOverview stats={stats} />

          {/* Main 2-Column Split: Recent Projects (Left) vs Right Sidebars */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-start">
            {/* Left 3 Cols: Recent Projects Grid */}
            <div className="xl:col-span-3">
              <RecentProjectsGrid
                projects={projects}
                onOpenProject={(proj) => console.log("Open project", proj.name)}
              />
            </div>

            {/* Right 1 Col: Approvals & Render Queue */}
            <div className="xl:col-span-1 flex flex-col">
              <ApprovalPanel
                approvals={approvals}
                onSelectApproval={(item) => console.log("Select approval", item.title)}
              />

              <RenderQueuePanel queueItem={renderQueue} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

