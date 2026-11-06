"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { dashboardService } from "@/services/dashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { StatusBadge } from "@/components/shared";
import { Progress, Button, Input } from "@/components/ui";
import { Plus, Search, Film, Clock, Play } from "lucide-react";

export default function ProjectsPage(): React.ReactElement {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "in_progress" | "waiting_approval" | "completed">("all");

  const { data } = useQuery({
    queryKey: QUERY_KEYS.dashboard.stats(),
    queryFn: () => dashboardService.getOverview(),
  });

  const defaultProjects = [
    {
      id: "proj-e6240645",
      name: "Aurora X1 Launch",
      stageDescription: "Stage 01 · Phân tích Brief & Moodboard",
      progress: 10,
      status: "in_progress" as const,
    },
    {
      id: "proj-3b38d3ac",
      name: "Nike Cyber Air Max",
      stageDescription: "Stage 03 · Khởi tạo mô hình 3D",
      progress: 35,
      status: "in_progress" as const,
    },
    {
      id: "proj-7f89b1c2",
      name: "Sony Alpha Cine TVC",
      stageDescription: "Stage 02 · Storyboard Visual",
      progress: 20,
      status: "waiting_approval" as const,
    },
    {
      id: "proj-9d41a8e5",
      name: "Tesla Cyberpunk Spot",
      stageDescription: "Stage 09 · Render & Post",
      progress: 100,
      status: "completed" as const,
    },
    {
      id: "proj-1c22d43e",
      name: "Cosmic Kinetic Audio",
      stageDescription: "Stage 05 · Composition Remotion",
      progress: 50,
      status: "in_progress" as const,
    },
  ];

  const projects = data?.projects?.length ? data.projects : defaultProjects;

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
              Danh sách Dự án
            </h1>
            <span className="text-[10px] text-slate-400 font-mono bg-[#141B29] px-2 py-0.5 rounded border border-[#1E2638]">
              {filteredProjects.length} dự án
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm dự án..."
                className="h-7 pl-8 text-xs bg-[#101520] border-[#1E2638]"
              />
            </div>

            <Button
              size="sm"
              onClick={() => router.push("/projects/new")}
              className="h-7 text-xs px-2.5 bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo mới dự án</span>
            </Button>
          </div>
        </header>

        {/* Filter bar */}
        <div className="px-5 py-2.5 border-b border-[#1E2638] bg-[#0C101A] flex items-center gap-2 shrink-0">
          {[
            { id: "all", label: "Tất cả" },
            { id: "in_progress", label: "Đang sản xuất" },
            { id: "waiting_approval", label: "Chờ phê duyệt" },
            { id: "completed", label: "Đã hoàn thành" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
                filter === tab.id
                  ? "bg-blue-600 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141B29]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <main className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => router.push(`/projects/${project.id}/workflow`)}
                className="bg-[#101520] border border-[#1C2436] hover:border-[#2D3C57] rounded-xl p-3.5 flex flex-col justify-between transition-all cursor-pointer group hover:bg-[#121826]"
              >
                {/* 16:9 Thumbnail */}
                <div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-br from-[#141B29] to-[#0A0D14] border border-[#1E2638] relative overflow-hidden flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-blue-600/80 backdrop-blur-sm border border-blue-400/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                {/* Project details */}
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {project.stageDescription || "Pipeline v2.0"}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-2.5 border-t border-[#1C2436]/60">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Tiến độ hoàn thành</span>
                    <span className="font-semibold text-slate-200">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-1.5 [&>div]:bg-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

