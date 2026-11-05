import React from "react";
import type { PendingApprovalItem } from "../types";

interface ComparisonViewportProps {
  item: PendingApprovalItem;
}

export function ComparisonViewport({
  item,
}: ComparisonViewportProps): React.ReactElement {
  return (
    <section className="flex-1 flex flex-col p-6 overflow-y-auto select-none">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Compare Versions
      </h2>

      {/* Side-by-side Diff View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Previous Version */}
        <div className="flex flex-col">
          <div className="w-full aspect-[16/10] rounded-xl bg-[#101520] border border-[#1C2436] flex items-center justify-center p-4 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">
              {item.previousVersionLabel}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2.5 pl-1">
            {item.previousDescription}
          </p>
        </div>

        {/* Current Version */}
        <div className="flex flex-col">
          <div className="w-full aspect-[16/10] rounded-xl bg-[#101520] border border-[#2563EB] shadow-[0_0_20px_-4px_rgba(37,99,235,0.2)] flex items-center justify-center p-4">
            <span className="text-xs text-slate-200 font-semibold tracking-wide">
              {item.currentVersionLabel}
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-2.5 pl-1 font-medium">
            {item.currentDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
