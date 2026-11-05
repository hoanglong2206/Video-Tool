import React from "react";
import Link from "next/link";

export function AssistantPipelineNav(): React.ReactElement {
  return (
    <nav className="h-10 border-b border-[#1E2638] bg-[#0A0E17] px-4 flex items-center justify-between text-xs select-none shrink-0">
      <div className="flex items-center gap-4 text-[11px] text-slate-400">
        <span className="font-semibold text-slate-300">Journey</span>
        <Link href="/projects/1/brief" className="hover:text-slate-200">
          ✓ Brief
        </Link>
        <Link href="/projects/1/direction" className="hover:text-slate-200">
          ✓ Direction
        </Link>
        <Link href="/storyboard" className="hover:text-slate-200">
          ✓ Storyboard
        </Link>
        <Link href="/assets" className="hover:text-slate-200">
          ✓ Assets
        </Link>
        <Link href="/editor" className="text-amber-400 font-medium hover:text-amber-300">
          ! Composition
        </Link>
        <span className="px-2.5 py-0.5 rounded-full bg-[#182030] text-blue-400 font-medium border border-blue-500/30">
          ... Motion
        </span>
        <Link href="/threed" className="hover:text-slate-200">
          – 3D (optional)
        </Link>
        <span className="hover:text-slate-200 cursor-pointer">– Sound</span>
        <Link href="/render" className="hover:text-slate-200">
          – Render
        </Link>
        <span className="hover:text-slate-200 cursor-pointer">– Export</span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/editor"
          className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-[#121824] border border-[#20293A] hover:bg-[#182132] rounded-md transition-colors"
        >
          ← Composition
        </Link>
        <button
          disabled
          className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-[#0F1420] border border-[#1A2233] rounded-md cursor-not-allowed opacity-60"
        >
          3D (optional) → locked
        </button>
      </div>
    </nav>
  );
}
