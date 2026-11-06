"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Plus, History, Cpu } from "lucide-react";

interface DashboardHeaderProps {
  onNewProject?: () => void;
  onRenderHistory?: () => void;
}

export function DashboardHeader({
  onNewProject,
  onRenderHistory,
}: DashboardHeaderProps): React.ReactElement {
  return (
    <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0 select-none">
      <div className="flex items-center gap-3">
        <h1 className="text-xs font-bold text-slate-100 tracking-wide uppercase">
          Studio Overview
        </h1>
        <div className="h-4 w-px bg-[#1E2638]" />
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-[#121723] px-2 py-0.5 rounded border border-[#1E2638]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-emerald-400 font-medium">GPU Cluster: Active</span>
          <span className="text-slate-400 font-mono">· Remotion 4K</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs px-2.5 bg-[#101520] border-[#1E2638] text-slate-300 hover:bg-[#161D2B] flex items-center gap-1.5"
          onClick={onRenderHistory}
        >
          <History className="w-3.5 h-3.5 text-slate-400" />
          <span>Lịch sử Render</span>
        </Button>

        {onNewProject ? (
          <Button
            size="sm"
            onClick={onNewProject}
            className="h-7 text-xs px-2.5 bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo mới dự án</span>
          </Button>
        ) : (
          <Button size="sm" asChild className="h-7 text-xs px-2.5 bg-blue-600 hover:bg-blue-500 text-white">
            <Link href="/projects/new" className="flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo mới dự án</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
