import React from "react";
import type { RenderQueueItem } from "../types";

interface RenderQueuePanelProps {
  queueItem: RenderQueueItem;
}

export function RenderQueuePanel({
  queueItem,
}: RenderQueuePanelProps): React.ReactElement {
  return (
    <div className="flex flex-col mt-6 pt-4 border-t border-[#1C2436]/60">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Render Queue
      </h2>

      <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3">
        <div className="flex items-center justify-between text-xs font-medium text-slate-100">
          <span>{queueItem.title}</span>
          <span className="text-slate-400 font-normal">{queueItem.progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#1C2436] rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
            style={{ width: `${queueItem.progress}%` }}
          />
        </div>

        {queueItem.nextJobTitle && (
          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-[#1C2436]/40">
            {queueItem.nextJobTitle}
          </p>
        )}
      </div>
    </div>
  );
}

