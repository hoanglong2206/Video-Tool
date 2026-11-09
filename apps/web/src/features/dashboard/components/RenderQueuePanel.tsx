"use client";

import React from "react";
import type { RenderQueueItem } from "../types";
import { Cpu, Film, Loader2 } from "lucide-react";

interface RenderQueuePanelProps {
  queueItem: RenderQueueItem;
  gpuName?: string;
}

export function RenderQueuePanel({ queueItem, gpuName }: RenderQueuePanelProps): React.ReactElement {
  const isRendering = queueItem.progress > 0 && queueItem.progress < 100;

  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3 flex flex-col justify-between flex-1 min-h-0 select-none">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-cyan-400" />
          <h2 className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
            Tiến độ Hàng đợi Render
          </h2>
        </div>
        {isRendering ? (
          <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
            <Loader2 className="w-2.5 h-2.5 animate-spin" /> Đang render
          </span>
        ) : (
          <span className="text-[10px] text-slate-400 font-mono">Chờ lệnh</span>
        )}
      </div>

      <div className="bg-[#0B0F17] border border-[#1A2234] rounded p-2.5 my-1.5 flex flex-col justify-between flex-1 min-h-0">
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-200">
            <span className="truncate">{queueItem.title}</span>
            <span className="text-cyan-400 font-mono font-bold shrink-0 ml-2">
              {queueItem.progress}%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">
            {queueItem.nextJobTitle || "Remotion Worker: GPU NVENC 4K"}
          </p>
        </div>

        {/* Animated striped progress bar */}
        <div className="w-full h-2 bg-[#161D2B] rounded-full overflow-hidden relative mt-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isRendering
                ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 animate-pulse"
                : "bg-blue-600"
            }`}
            style={{ width: `${Math.max(queueItem.progress, 5)}%` }}
          />
        </div>
      </div>

      {/* GPU Worker status footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1.5 border-t border-[#1C2436]/60 shrink-0 font-mono">
        <span className="flex items-center gap-1">
          <Cpu className="w-2.5 h-2.5 text-emerald-400" /> Node: {gpuName || "DirectX 12 Compute"}
        </span>
        <span>Ước tính: ~45s còn lại</span>
      </div>
    </div>
  );
}
