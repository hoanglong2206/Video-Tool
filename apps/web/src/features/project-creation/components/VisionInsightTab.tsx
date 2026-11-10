"use client";

import React from "react";
import type { FullAiAnalysisOutput } from "../types";
import { Check, Sparkles } from "lucide-react";

interface VisionInsightTabProps {
  aiOutput: FullAiAnalysisOutput;
}

export function VisionInsightTab({ aiOutput }: VisionInsightTabProps): React.ReactElement {
  const specs = [
    "4K Texture Maps",
    "Rec.709 Space",
    "Ray-traced Rim",
    "Anti-aliasing 8x",
    "Octane Render 2024",
    "UE 5.4 Lumen Ray-trace",
  ];

  return (
    <div className="flex flex-col gap-2 text-[11px]">
      {/* 1. Match Gauge & Quality Score */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-2 flex flex-col gap-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-[10px] flex items-center gap-1 font-medium">
            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
            Độ nhận diện thương hiệu:
          </span>
          <span className="text-emerald-400 font-mono font-bold text-[10px]">
            {aiOutput.vision.brandIdentityScore}/100 Match
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#141B2B] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full"
            style={{ width: `${aiOutput.vision.brandIdentityScore}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-0.5">
          <span>Visual Fidelity: 99%</span>
          <span>Color Harmony: 97%</span>
          <span>Geometry: 98%</span>
        </div>
      </div>

      {/* 2. Detected Objects & Visual Details */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-2 shrink-0 flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
          Vật thể & Chi tiết thị giác nhận diện:
        </span>
        <div className="flex flex-wrap gap-1">
          {aiOutput.vision.detectedObjects.map((obj, i) => (
            <span
              key={`vision-obj-${obj}-${i}`}
              className="text-[9px] bg-blue-950/80 text-blue-300 border border-blue-800/50 px-2 py-0.5 rounded font-mono truncate max-w-full"
            >
              #{obj}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Lighting & Composition Spec */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-2 grid grid-cols-2 gap-2 text-[10px] shrink-0">
        <div>
          <span className="text-slate-400 block text-[9px] uppercase font-semibold">
            Phong cách ánh sáng:
          </span>
          <span className="text-slate-200 font-mono text-[10px] block mt-0.5">
            Studio Rim-light (4:1 Contrast)
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[9px] uppercase font-semibold">
            Tỷ lệ & Tiêu cự:
          </span>
          <span className="text-cyan-400 font-mono text-[10px] block mt-0.5">
            {aiOutput.vision.compositionRatio} · 85mm Prime
          </span>
        </div>
      </div>

      {/* 4. Production Specs Checklist */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-2 shrink-0">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Tiêu chuẩn Render & Màu sắc:
        </span>
        <div className="grid grid-cols-2 gap-1 text-[9px] font-mono text-emerald-400">
          {specs.map((item, idx) => (
            <span key={`spec-item-${item}-${idx}`} className="flex items-center gap-1 truncate">
              <Check className="w-2.5 h-2.5 shrink-0 text-emerald-400" /> {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

