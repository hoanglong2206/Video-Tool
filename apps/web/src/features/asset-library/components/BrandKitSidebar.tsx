import React from "react";
import type { BrandKitInfo } from "../types";
import { Button } from "@/components/ui";

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
            className="w-10 h-10 rounded-lg border border-[#242F45] shadow-inner cursor-pointer hover:scale-105 transition-transform"
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
      <Button
        variant="outline"
        size="sm"
        onClick={onApply}
        className={`self-start ${
          isApplied
            ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-400"
            : ""
        }`}
      >
        {isApplied ? "Applied to current project!" : "Apply to project"}
      </Button>
    </aside>
  );
}

