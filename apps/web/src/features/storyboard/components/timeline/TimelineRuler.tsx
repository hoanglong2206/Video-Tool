"use client";

import React, { useRef } from "react";

interface TimelineRulerProps {
  totalDuration: number;
  currentTime: number;
  zoomMode: "fit" | "1x" | "1.5x";
  onSeek: (time: number) => void;
}

export function TimelineRuler({
  totalDuration,
  currentTime,
  zoomMode,
  onSeek,
}: TimelineRulerProps): React.ReactElement {
  const rulerRef = useRef<HTMLDivElement>(null);

  // Generate 5-second major interval ticks and 1-second minor ticks
  const majorInterval = 5;
  const tickCount = Math.max(1, Math.ceil(totalDuration / majorInterval));
  const ticks = Array.from({ length: tickCount + 1 }).map((_, i) => i * majorInterval);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rulerRef.current || totalDuration <= 0) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(+(ratio * totalDuration).toFixed(2));

    const onPointerMove = (moveEvent: PointerEvent) => {
      const moveX = moveEvent.clientX - rect.left;
      const moveRatio = Math.max(0, Math.min(1, moveX / rect.width));
      onSeek(+(moveRatio * totalDuration).toFixed(2));
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const playheadPercent =
    totalDuration > 0
      ? Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))
      : 0;

  return (
    <div className="h-6 bg-[#080B13] border-b border-[#182133] flex items-center shrink-0 select-none">
      {/* 1. Left Track Column Spacer */}
      <div className="w-32 xl:w-36 px-2.5 flex items-center justify-between shrink-0 border-r border-[#182133] h-full text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
        <span>RÃNH TRACK</span>
        <span>TC</span>
      </div>

      {/* 2. Timeline Ruler Bar */}
      <div
        ref={rulerRef}
        onPointerDown={handlePointerDown}
        className={`flex-1 h-full px-1.5 relative cursor-ew-resize overflow-hidden ${
          zoomMode === "1.5x" ? "min-w-[1800px]" : zoomMode === "1x" ? "min-w-[1320px]" : "w-full"
        }`}
      >
        {/* Ticks Grid */}
        {ticks.map((second) => {
          const leftPercent = (second / (totalDuration || 1)) * 100;
          if (leftPercent > 100) return null;
          return (
            <div
              key={second}
              style={{ left: `${leftPercent}%` }}
              className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
            >
              <div className="w-px h-2 bg-slate-600" />
              <span className="text-[8.5px] font-mono text-slate-400 tabular-nums -translate-x-1/2 leading-none mt-0.5">
                {second}s
              </span>
            </div>
          );
        })}

        {/* Sub-second minor tick marks */}
        {Array.from({ length: Math.floor(totalDuration) }).map((_, sec) => {
          if (sec % majorInterval === 0) return null;
          const leftPercent = (sec / (totalDuration || 1)) * 100;
          return (
            <div
              key={`minor-${sec}`}
              style={{ left: `${leftPercent}%` }}
              className="absolute top-0 w-px h-1 bg-slate-800 pointer-events-none"
            />
          );
        })}

        {/* Floating Playhead Needle in Ruler */}
        <div
          style={{ left: `${playheadPercent}%` }}
          className="absolute top-0 bottom-0 pointer-events-none z-30 flex flex-col items-center -translate-x-1/2"
        >
          <div className="w-2.5 h-2.5 bg-cyan-400 rotate-45 shadow-[0_0_8px_#22d3ee] -mb-1" />
          <div className="w-0.5 flex-1 bg-cyan-400" />
        </div>
      </div>
    </div>
  );
}
