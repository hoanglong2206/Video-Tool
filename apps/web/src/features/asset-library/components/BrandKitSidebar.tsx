import React from "react";
import type { BrandKitInfo } from "../types";

interface BrandKitSidebarProps {
  brandKit: BrandKitInfo;
  isApplied: boolean;
  onApply: () => void;
}

export function BrandKitSidebar({
  brandKit,
  isApplied,
  onApply,
}: BrandKitSidebarProps): React.ReactElement {
  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-5 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Title */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Brand Kit · {brandKit.name}
      </h2>

      {/* Color Swatches */}
      <div className="flex items-center gap-2.5 mb-5">
        {brandKit.colors.map((color, idx) => (
          <div
            key={idx}
            className="w-10 h-10 rounded-lg border border-[#242F45] shadow-inner"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      {/* Logo Preview Surface */}
      <div className="w-full h-32 rounded-xl border border-[#1E2638] bg-[#0F1420] flex items-center justify-center mb-6">
        <span className="text-sm font-medium text-slate-400">Logo</span>
      </div>

      {/* Typography & Guidelines */}
      <div className="space-y-2 mb-6 text-xs text-slate-400 leading-relaxed">
        <p>Typeface: {brandKit.typeface}</p>
        <p>Guideline: {brandKit.guidelines}</p>
        <p>Used in {brandKit.usageCount} projects</p>
      </div>

      {/* Apply to project button */}
      <button
        onClick={onApply}
        className={`self-start py-1.5 px-3.5 rounded-lg text-xs font-medium border transition-colors ${
          isApplied
            ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-400"
            : "border-[#253249] bg-[#121927] hover:bg-[#182133] hover:border-[#384869] text-slate-200"
        }`}
      >
        {isApplied ? "Applied to current project!" : "Apply to project"}
      </button>
    </aside>
  );
}

