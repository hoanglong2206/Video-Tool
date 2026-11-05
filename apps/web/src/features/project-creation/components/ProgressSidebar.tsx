import React from "react";

export function ProgressSidebar(): React.ReactElement {
  return (
    <aside className="w-52 border-r border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Progress
      </h2>

      <nav className="flex flex-col gap-3.5 text-xs">
        {/* Step 1: Done */}
        <div className="flex items-center">
          <span className="bg-[#132E27] text-[#10B981] border border-[#065F46] rounded text-[10px] px-1.5 py-0.5 font-medium mr-2">
            Done
          </span>
          <span className="text-slate-400">1 · Project details</span>
        </div>

        {/* Step 2: Active */}
        <div className="flex items-center text-slate-100 font-semibold pl-0.5">
          <span>2 · Brief & materials</span>
        </div>

        {/* Step 3: Upcoming */}
        <div className="flex items-center text-slate-500 pl-0.5">
          <span>3 · Brand kit</span>
        </div>

        {/* Step 4: Upcoming */}
        <div className="flex items-center text-slate-500 pl-0.5">
          <span>4 · Format & duration</span>
        </div>

        {/* Step 5: Upcoming */}
        <div className="flex items-center text-slate-500 pl-0.5">
          <span>5 · Review</span>
        </div>
      </nav>
    </aside>
  );
}

