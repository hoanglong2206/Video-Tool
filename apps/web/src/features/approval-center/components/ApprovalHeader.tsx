import React from "react";
import Link from "next/link";

interface ApprovalHeaderProps {
  pendingCount: number;
}

export function ApprovalHeader({ pendingCount }: ApprovalHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17] select-none">
      {/* Title & Pending Pill */}
      <div className="flex items-center gap-2.5">
        <h1 className="text-sm font-semibold text-slate-100 tracking-tight">
          Approval Center
        </h1>
        <span className="bg-[#2D2111] text-[#F59E0B] border border-[#784D16] rounded-full text-[10px] px-2 py-0.5 font-medium">
          {pendingCount} pending
        </span>
      </div>

      {/* Editor Jump */}
      <Link
        href="/editor"
        className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white flex items-center justify-center transition-all shadow-sm"
      >
        Open in editor
      </Link>
    </header>
  );
}

