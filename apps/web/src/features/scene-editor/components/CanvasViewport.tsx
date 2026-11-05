import React from "react";
import type { LayerProperties } from "../types";

interface CanvasViewportProps {
  properties: LayerProperties;
}

export function CanvasViewport({ properties }: CanvasViewportProps): React.ReactElement {
  return (
    <div className="flex-1 bg-[#090D16] p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* 16:9 Composition Preview Frame */}
      <div className="w-full max-w-2xl aspect-[16/9] rounded-xl bg-gradient-to-b from-[#111827] to-[#0A0E17] border border-[#1E2638] flex flex-col items-center justify-between p-6 shadow-2xl relative overflow-hidden">
        {/* Animated Kinetic Typography Layer */}
        <h1
          className="text-2xl font-bold text-slate-100 tracking-tight transition-transform duration-300"
          style={{ opacity: properties.opacityPercent / 100 }}
        >
          Meet Aurora
        </h1>

        {/* Central 3D Product Placeholder with metallic reflection */}
        <div
          className="w-24 h-40 rounded-2xl bg-gradient-to-tr from-[#334155] via-[#94A3B8] to-[#1E293B] border border-slate-500/40 shadow-[0_0_35px_rgba(59,130,246,0.15)] flex items-center justify-center transition-all duration-500 cursor-pointer"
          style={{
            transform: `scale(${properties.scalePercent / 100}) rotate(${properties.rotateDeg}deg)`,
            opacity: properties.opacityPercent / 100,
          }}
        >
          <div className="w-20 h-36 rounded-xl bg-gradient-to-b from-transparent via-white/10 to-black/30" />
        </div>

        {/* Bottom Format Stamp */}
        <span className="text-[11px] text-slate-500 font-mono tracking-wider">
          Preview · 1920×1080 · 24 fps
        </span>
      </div>
    </div>
  );
}
