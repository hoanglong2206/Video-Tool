import React from "react";
import Link from "next/link";

interface StoryboardHeaderProps {
  projectName: string;
  onPreview?: () => void;
  onReopenRevision?: () => void;
}

export function StoryboardHeader({
  projectName,
  onPreview,
  onReopenRevision,
}: StoryboardHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      {/* Breadcrumb with Approved status */}
      <div className="flex items-center gap-2.5 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          {projectName}
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">Storyboard Studio</span>
        <span className="bg-[#132E27] text-[#10B981] border border-[#065F46] rounded-full text-[10px] px-2 py-0.5 font-medium ml-1 flex items-center gap-1">
          ✓ Approved
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onPreview}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Preview storyboard
        </button>

        <button
          type="button"
          onClick={onReopenRevision}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Reopen for revision
        </button>

        <span className="h-8 px-3 rounded-md text-xs font-medium text-slate-400 bg-[#101520] border border-[#1C2436] flex items-center">
          Approved v2
        </span>
      </div>
    </header>
  );
}

