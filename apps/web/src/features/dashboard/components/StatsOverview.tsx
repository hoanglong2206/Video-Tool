import React from "react";
import type { DashboardStats } from "../types";

interface StatsOverviewProps {
  stats: DashboardStats;
}

export function StatsOverview({ stats }: StatsOverviewProps): React.ReactElement {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
      {/* 3 Left Cards matching Recent Projects width */}
      <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Active projects */}
        <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-4 flex flex-col justify-between min-h-[92px]">
          <span className="text-[11px] font-medium text-slate-400 tracking-wide">
            Active projects
          </span>
          <span className="text-2xl font-bold text-slate-100 tracking-tight">
            {stats.activeProjects}
          </span>
        </div>

        {/* Waiting for approval - highlighted amber border */}
        <div className="bg-[#101520] border border-[#A16207] rounded-lg p-4 flex flex-col justify-between min-h-[92px] shadow-[0_0_15px_-4px_rgba(202,138,4,0.15)]">
          <span className="text-[11px] font-medium text-amber-300 tracking-wide">
            Waiting for approval
          </span>
          <span className="text-2xl font-bold text-[#FBBF24] tracking-tight">
            {stats.waitingForApproval}
          </span>
        </div>

        {/* Renders in queue */}
        <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-4 flex flex-col justify-between min-h-[92px]">
          <span className="text-[11px] font-medium text-slate-400 tracking-wide">
            Renders in queue
          </span>
          <span className="text-2xl font-bold text-slate-100 tracking-tight">
            {stats.rendersInQueue}
          </span>
        </div>
      </div>

      {/* 1 Right Card matching Right Sidebar width */}
      <div className="xl:col-span-1 bg-[#101520] border border-[#1C2436] rounded-lg p-4 flex flex-col justify-between min-h-[92px]">
        <span className="text-[11px] font-medium text-slate-400 tracking-wide">
          AI generations this month
        </span>
        <span className="text-2xl font-bold text-slate-100 tracking-tight">
          {stats.aiGenerationsThisMonth.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

