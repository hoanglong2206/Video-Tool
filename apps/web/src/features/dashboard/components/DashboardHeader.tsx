import React from "react";
import Link from "next/link";

interface DashboardHeaderProps {
  onNewProject?: () => void;
  onRenderHistory?: () => void;
}

export function DashboardHeader({
  onNewProject,
  onRenderHistory,
}: DashboardHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      <h1 className="text-sm font-semibold text-slate-100 tracking-tight">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onRenderHistory}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Render history
        </button>

        {onNewProject ? (
          <button
            type="button"
            onClick={onNewProject}
            className="h-8 px-3.5 rounded-md text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] transition-all shadow-sm"
          >
            New project
          </button>
        ) : (
          <Link
            href="/projects/new"
            className="h-8 px-3.5 rounded-md text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] flex items-center justify-center active:scale-[0.98] transition-all shadow-sm"
          >
            New project
          </Link>
        )}
      </div>
    </header>
  );
}
