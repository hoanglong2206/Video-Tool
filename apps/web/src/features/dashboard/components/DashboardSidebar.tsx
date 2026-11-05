import React from "react";
import Link from "next/link";
import { LayoutGrid, GitFork, Monitor, ChevronRight, Play } from "lucide-react";

export function DashboardSidebar(): React.ReactElement {
  return (
    <aside className="w-14 border-r border-[#1E2638] bg-[#0A0E17] flex flex-col items-center py-4 select-none shrink-0">
      {/* Top Main Logo / Active Section */}
      <Link
        href="/"
        aria-label="Dashboard"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-200 bg-[#1A2234] hover:bg-[#232D44] transition-colors"
      >
        <LayoutGrid className="w-5 h-5" />
      </Link>

      {/* Nav Actions */}
      <div className="flex flex-col items-center gap-5 mt-6">
        <Link
          href="/workflow"
          aria-label="Production Workflow"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-[#161D2B] transition-colors"
        >
          <GitFork className="w-4 h-4 rotate-180" />
        </Link>

        <button
          aria-label="Studio View"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-[#161D2B] transition-colors"
        >
          <Monitor className="w-4 h-4" />
        </button>

        <button
          aria-label="Editor"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-[#161D2B] transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-90" />
        </button>

        <button
          aria-label="Render Engine"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-[#161D2B] transition-colors"
        >
          <Play className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
