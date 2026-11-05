import React from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

interface RenderHeaderProps {
  projectName: string;
  isRendering: boolean;
  onCancel: () => void;
  onExport: () => void;
  onStart: () => void;
}

export function RenderHeader({
  projectName,
  isRendering,
  onCancel,
  onExport,
  onStart,
}: RenderHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] bg-[#0D121F] px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-[#161F30] rounded-md transition-colors"
          title="Back to Dashboard"
        >
          <LayoutGrid className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-100">Render & Export</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-300">{projectName}</span>
          <span className="ml-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#1A1822] text-amber-400/90 border border-amber-500/20">
            – Blocked: stages 05–08 not approved
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCancel}
          disabled={!isRendering}
          className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A26] border border-[#232E42] hover:bg-[#1A2234] hover:border-[#32425E] disabled:opacity-50 transition-colors"
        >
          Cancel render
        </button>
        <button
          onClick={onExport}
          className="px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-200 bg-[#161D2B] border border-[#243048] hover:bg-[#1E283C] transition-colors"
        >
          Export MP4
        </button>
        <button
          onClick={onStart}
          className="px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-400 bg-[#131722] border border-[#1E2536] hover:text-slate-200 transition-colors"
        >
          Start render
        </button>
      </div>
    </header>
  );
}
