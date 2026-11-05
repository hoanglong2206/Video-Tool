import React from "react";
import Link from "next/link";

export function JourneySubheader(): React.ReactElement {
  return (
    <div className="h-11 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#080C14] text-[11px] select-none">
      {/* Journey Stages */}
      <div className="flex items-center gap-3 overflow-x-auto">
        <span className="text-slate-500 font-medium mr-1">Journey</span>

        <Link href="/projects/new" className="text-emerald-400 hover:underline">
          ✓ Brief
        </Link>

        <span className="text-emerald-400">✓ Direction</span>

        {/* Current Active Stage Box */}
        <span className="bg-[#101520] border border-[#242D40] text-emerald-400 px-2 py-0.5 rounded font-medium shadow-sm">
          ✓ Storyboard
        </span>

        <span className="text-emerald-400">✓ Assets</span>

        <Link href="/workflow" className="text-amber-400 hover:underline">
          ! Composition
        </Link>

        <span className="text-blue-400">... Motion</span>
        <span className="text-slate-600">- 3D (optional)</span>
        <span className="text-slate-600">- Sound</span>
        <span className="text-slate-600">- Render</span>
        <span className="text-slate-600">- Export</span>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="h-7 px-2.5 rounded text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          ← Direction
        </button>

        <button
          type="button"
          className="h-7 px-3 rounded text-[11px] font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] transition-all shadow-sm"
        >
          Assets →
        </button>
      </div>
    </div>
  );
}
