"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, ArrowUpRight, Film, Clock, Sparkles } from "lucide-react";
import type { ProjectItem } from "../types";
import { StatusBadge } from "@/components/shared";
import { Progress, Button } from "@/components/ui";

interface RecentTwoProjectsProps {
  projects: ProjectItem[];
}

export function RecentTwoProjects({ projects }: RecentTwoProjectsProps): React.ReactElement {
  const router = useRouter();

  // Pick exactly 2 projects (or fallbacks if empty)
  const displayProjects: ProjectItem[] = React.useMemo(() => {
    if (projects.length >= 2) return projects.slice(0, 2);
    const fallbacks: ProjectItem[] = [
      {
        id: "proj-e6240645",
        name: "Aurora X1 Launch",
        stageDescription: "Stage 01 · Phân tích Brief & Moodboard",
        progress: 10,
        status: "in_progress",
      },
      {
        id: "proj-3b38d3ac",
        name: "Nike Cyber Air Max",
        stageDescription: "Stage 03 · Khởi tạo mô hình 3D",
        progress: 35,
        status: "in_progress",
      },
    ];
    if (projects.length === 1) return [projects[0], fallbacks[1]];
    return fallbacks;
  }, [projects]);

  return (
    <div className="flex flex-col flex-1 min-h-0 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-blue-400" />
          <h2 className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
            2 Dự án gần đây
          </h2>
        </div>
        <Link
          href="/projects"
          className="text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
        >
          Xem tất cả ({projects.length || 2})
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 2 Projects Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {displayProjects.map((project, idx) => {
          const isCompleted = project.status === "completed";
          const isWaiting = project.status === "waiting_approval";

          return (
            <div
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}/workflow`)}
              className="bg-[#101520] border border-[#1C2436] hover:border-[#2D3C57] rounded-lg p-3 flex flex-col justify-between transition-all cursor-pointer group hover:bg-[#121826] relative overflow-hidden"
            >
              {/* Aspect Ratio Video Preview Area */}
              <div className="w-full aspect-[16/8.5] rounded bg-gradient-to-br from-[#141B29] to-[#0A0D14] border border-[#1E2638] relative overflow-hidden flex items-center justify-center group-hover:border-blue-500/40 transition-colors shrink-0">
                {/* Subtle animated pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

                {/* Central Play Badge */}
                <div className="w-8 h-8 rounded-full bg-blue-600/80 backdrop-blur-sm border border-blue-400/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-blue-500 transition-all z-10">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>

                {/* Top Badges */}
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span className="text-[9px] font-mono bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-slate-300 border border-white/10 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> 00:30
                  </span>
                </div>
                <div className="absolute top-1.5 right-1.5 z-10">
                  <StatusBadge status={project.status} />
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                  <span className="bg-black/50 px-1 rounded">4K UHD</span>
                  <span className="bg-black/50 px-1 rounded">Remotion v4</span>
                </div>
              </div>

              {/* Project Metadata & Stage */}
              <div className="mt-2.5 flex flex-col justify-between flex-1 min-h-0">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors truncate">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {project.stageDescription || "Pipeline đang khởi tạo"}
                  </p>
                </div>

                {/* Progress bar & Action */}
                <div className="mt-2 pt-2 border-t border-[#1C2436]/60 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
                      <span>Tiến độ</span>
                      <span className="font-semibold text-slate-200">{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className={`h-1.5 ${
                        isCompleted
                          ? "[&>div]:bg-emerald-500"
                          : isWaiting
                          ? "[&>div]:bg-amber-500"
                          : "[&>div]:bg-blue-500"
                      }`}
                    />
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-[10px] bg-[#141B29] border-[#242D40] hover:bg-blue-600 hover:text-white shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects/${project.id}/workflow`);
                    }}
                  >
                    Tiếp tục dựng ➔
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

