import React from "react";
import type { RenderProgress } from "../types";

interface RenderPreviewPanelProps {
  progress: RenderProgress;
  onRetry: () => void;
}

export function RenderPreviewPanel({
  progress,
  onRetry,
}: RenderPreviewPanelProps): React.ReactElement {
  return (
    <div className="w-1/2 p-6 flex flex-col bg-[#090D14] overflow-y-auto">
      {/* Video Preview Canvas */}
      <div className="w-full aspect-[16/10] rounded-xl border border-[#1E2638] bg-[#0E131F] relative flex items-center justify-center mb-6 overflow-hidden">
        <span className="text-xs font-medium text-slate-400">
          Full video preview · 00:00 / 00:30
        </span>

        {/* Video progress bottom bar */}
        <div className="absolute bottom-3 left-4 right-4 h-1 bg-[#1C2538] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Bottom 2 Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* RENDER PROGRESS */}
        <div className="rounded-xl border border-[#1E2638] bg-[#0C111C] p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Render Progress
            </h2>
            <div className="flex items-center justify-between text-xs font-medium text-slate-200 mb-2">
              <span>{progress.statusText}</span>
              <span className="text-blue-400">{progress.percentage}%</span>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full h-1 bg-[#1A2336] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>

            <div className="text-[11px] text-slate-400 space-y-0.5">
              <p>{progress.estimatedRemaining}</p>
              <p>{progress.elapsedTime}</p>
            </div>
          </div>

          <button
            onClick={onRetry}
            className="mt-4 w-full py-1.5 px-3 rounded-md text-xs font-medium text-slate-300 bg-[#141B28] border border-[#232F45] hover:bg-[#1A2436] hover:border-[#334361] transition-colors"
          >
            Retry failed jobs
          </button>
        </div>

        {/* RENDER LOG */}
        <div className="rounded-xl border border-[#1E2638] bg-[#0C111C] p-4">
          <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Render Log
          </h2>
          <div className="space-y-2 text-[11px] text-slate-400 font-mono">
            {progress.logs.map((log, idx) => (
              <p key={idx} className="leading-snug">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

