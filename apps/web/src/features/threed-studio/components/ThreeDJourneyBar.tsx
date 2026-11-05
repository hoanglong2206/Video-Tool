import React from "react";
import Link from "next/link";

export function ThreeDJourneyBar(): React.ReactElement {
  return (
    <div className="h-11 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#080C14] text-[11px] select-none">
      {/* Journey Stages */}
      <div className="flex items-center gap-3 overflow-x-auto">
        <span className="text-slate-500 font-medium mr-1">Journey</span>

        <Link href="/projects/new" className="text-emerald-400 hover:underline">
          ✓ Brief
        </Link>
        <span className="text-emerald-400">✓ Direction</span>
        <Link href="/storyboard" className="text-emerald-400 hover:underline">
          ✓ Storyboard
        </Link>
        <Link href="/assets" className="text-emerald-400 hover:underline">
          ✓ Assets
        </Link>
        <Link href="/editor" className="text-amber-400 hover:underline">
          ! Composition
        </Link>
        <span className="text-blue-400">... Motion</span>

        {/* Current Active 3D Box */}
        <span className="bg-[#101520] border border-[#242D40] text-slate-200 px-2 py-0.5 rounded font-medium shadow-sm">
          - 3D (optional)
        </span>

        <span className="text-slate-600">- Sound</span>
        <span className="text-slate-600">- Render</span>
        <span className="text-slate-600">- Export</span>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/editor"
          className="h-7 px-2.5 rounded text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white flex items-center justify-center transition-all shadow-sm"
        >
          ← Motion
        </Link>

        <span className="h-7 px-3 rounded text-[11px] font-medium text-slate-500 bg-[#101520] border border-[#1C2436] flex items-center justify-center">
          Sound → locked
        </span>
      </div>
    </div>
  );
}
