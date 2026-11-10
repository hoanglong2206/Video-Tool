"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Settings,
  Sparkles,
  Film,
  Layers,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardService } from "@/services/dashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Button, Skeleton } from "@/components/ui";
import { getProjectStageRoute } from "@/features/pipeline";

import { ProjectItem } from "@/services/dashboard";

export interface StudioSidebarProps {
  className?: string;
}

export function StudioSidebar({ className }: StudioSidebarProps): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.dashboard.stats(),
    queryFn: () => dashboardService.getOverview(),
    staleTime: 10000,
  });

  // Extract up to 5 recent projects purely from live API
  const recentProjects: ProjectItem[] = React.useMemo(() => {
    return (data?.projects || []).slice(0, 5);
  }, [data?.projects]);

  const isOverview = pathname === "/" || pathname === "/overview";
  const isProjects = pathname === "/projects";
  const isSettings = pathname === "/settings";

  return (
    <aside
      className={cn(
        "w-64 border-r border-[#1E2638] bg-[#0A0E17] flex flex-col justify-between py-4 px-3 select-none shrink-0 h-screen overflow-hidden",
        className
      )}
    >
      {/* Top Header & Brand Identity */}
      <div className="flex flex-col gap-4">
        {/* Brand Bar */}
        <Link
          href="/"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#141B29] transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Film className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
                Motion AI
              </span>
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/80 border border-blue-800/50 px-1 rounded">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 truncate">
              Video Production Studio
            </span>
          </div>
        </Link>

        {/* Primary Action Button: New Project */}
        <Button
          onClick={() => router.push("/projects/new")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs h-9 shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 rounded-lg border border-blue-400/20 transition-all hover:scale-[1.01] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo mới dự án</span>
        </Button>

        {/* Primary Navigation Menu */}
        <nav className="flex flex-col gap-1 mt-1">
          {/* 1. Overview */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative cursor-pointer",
              isOverview
                ? "bg-[#141B29] text-blue-400 border border-[#28354D] shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#121723]"
            )}
          >
            <LayoutDashboard className={cn("w-4 h-4", isOverview ? "text-blue-400" : "text-slate-400")} />
            <span className="flex-1">Overview</span>
            {isOverview && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            )}
          </Link>

          {/* 2. Projects List */}
          <Link
            href="/projects"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative cursor-pointer",
              isProjects
                ? "bg-[#141B29] text-blue-400 border border-[#28354D] shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#121723]"
            )}
          >
            <FolderKanban className={cn("w-4 h-4", isProjects ? "text-blue-400" : "text-slate-400")} />
            <span className="flex-1">Danh sách dự án</span>
            <span className="text-[10px] bg-[#1A2234] text-slate-400 px-1.5 py-0.5 rounded-full font-mono min-w-4 text-center">
              {isLoading ? "..." : recentProjects.length}
            </span>
          </Link>
        </nav>

        {/* Recent Projects Section (4 - 5 items) */}
        <div className="flex flex-col mt-2 pt-3 border-t border-[#1C2436]/60">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Dự án gần đây
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {isLoading ? "..." : `${recentProjects.length}/5`}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {isLoading ? (
              <div className="flex flex-col gap-1.5 px-0.5 py-1">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-[#0E131E]/60 border border-[#161D2C]">
                    <Skeleton className="w-2 h-2 rounded-full shrink-0" />
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <Skeleton className="h-3 w-3/4 rounded" />
                      <Skeleton className="h-2 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="px-2.5 py-3 text-center rounded-lg bg-[#0E131E] border border-dashed border-[#1E2638]">
                <p className="text-[11px] text-slate-500">Chưa có dự án nào</p>
              </div>
            ) : (
              recentProjects.map((project) => {
                const isCurrent = pathname.includes(project.id);
                const isCompleted = project.status === "completed";
                const isWaiting = project.status === "waiting_approval";

                return (
                  <Link
                    key={project.id}
                    href={getProjectStageRoute(project)}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-all group relative cursor-pointer",
                      isCurrent
                        ? "bg-[#151D2C] text-slate-100 border border-[#2D3C57]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-[#111722]"
                    )}
                    title={`${project.name} (${project.stageDescription || "Pipeline"})`}
                  >
                    {/* Status Indicator Dot */}
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        isCompleted
                          ? "bg-emerald-400"
                          : isWaiting
                          ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                          : "bg-blue-400"
                      )}
                    />

                    {/* Project Info */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="truncate font-medium text-slate-200 group-hover:text-white leading-tight">
                        {project.name}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                        {project.stageDescription ? project.stageDescription.split("·")[0].trim() : "Stage 01"} · {project.progress}%
                      </span>
                    </div>

                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Settings & Workspace Pill */}
      <div className="flex flex-col gap-2 pt-3 border-t border-[#1C2436]/60">
        {/* Settings Link */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer",
            isSettings
              ? "bg-[#141B29] text-blue-400 border border-[#28354D] font-semibold"
              : "text-slate-400 hover:text-slate-200 hover:bg-[#121723]"
          )}
        >
          <Settings className={cn("w-4 h-4", isSettings ? "text-blue-400" : "text-slate-400")} />
          <span className="flex-1">Cài đặt hệ thống</span>
        </Link>

        {/* User Workspace Info Pill */}
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-[#0F1420] border border-[#1C2436] mt-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow">
            AD
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[11px] font-semibold text-slate-200 truncate">
              Studio Workspace
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-400 font-medium">GPU Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
