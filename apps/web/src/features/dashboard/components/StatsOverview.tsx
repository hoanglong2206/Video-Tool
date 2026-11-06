import React from "react";
import type { DashboardStats } from "../types";
import { FolderGit2, AlertCircle, PlayCircle, Sparkles, TrendingUp } from "lucide-react";

interface StatsOverviewProps {
  stats: DashboardStats;
}

export function StatsOverview({ stats }: StatsOverviewProps): React.ReactElement {
  return (
    <div className="grid grid-cols-4 gap-3 shrink-0">
      {/* 1. Active projects */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3 flex flex-col justify-between hover:border-[#28354D] transition-colors relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Dự án đang chạy
          </span>
          <div className="w-5 h-5 rounded bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
            <FolderGit2 className="w-3 h-3" />
          </div>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-xl font-bold text-slate-100 tracking-tight font-mono">
            {stats.activeProjects}
          </span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-mono">
            <TrendingUp className="w-2.5 h-2.5" /> +1 tuần này
          </span>
        </div>
      </div>

      {/* 2. Waiting for approval */}
      <div
        className={`bg-[#101520] rounded-lg p-3 flex flex-col justify-between transition-colors relative overflow-hidden group ${
          stats.waitingForApproval > 0
            ? "border border-[#A16207] shadow-[0_0_12px_-4px_rgba(202,138,4,0.25)]"
            : "border border-[#1C2436] hover:border-[#28354D]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider ${
              stats.waitingForApproval > 0 ? "text-amber-300" : "text-slate-400"
            }`}
          >
            Chờ phê duyệt
          </span>
          <div className="w-5 h-5 rounded bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-3 h-3" />
          </div>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span
            className={`text-xl font-bold tracking-tight font-mono ${
              stats.waitingForApproval > 0 ? "text-[#FBBF24]" : "text-slate-100"
            }`}
          >
            {stats.waitingForApproval}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {stats.waitingForApproval > 0 ? "Cần đạo diễn duyệt" : "Tất cả đã duyệt"}
          </span>
        </div>
      </div>

      {/* 3. Renders in queue */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3 flex flex-col justify-between hover:border-[#28354D] transition-colors relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Hàng đợi Render
          </span>
          <div className="w-5 h-5 rounded bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
            <PlayCircle className="w-3 h-3" />
          </div>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-xl font-bold text-slate-100 tracking-tight font-mono">
            {stats.rendersInQueue}
          </span>
          <span className="text-[10px] text-cyan-400 font-mono">
            Remotion 4K 60fps
          </span>
        </div>
      </div>

      {/* 4. AI generations this month */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3 flex flex-col justify-between hover:border-[#28354D] transition-colors relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            AI Generations tháng này
          </span>
          <div className="w-5 h-5 rounded bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-xl font-bold text-slate-100 tracking-tight font-mono">
            {stats.aiGenerationsThisMonth.toLocaleString()}
          </span>
          <span className="text-[10px] text-purple-400 font-mono">
            LLM & Vision Core
          </span>
        </div>
      </div>
    </div>
  );
}
