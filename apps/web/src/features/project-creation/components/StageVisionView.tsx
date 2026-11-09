"use client";

import React from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { Eye, Palette, Layers, SunMedium, ShieldCheck, Check } from "lucide-react";

interface StageVisionViewProps {
  aiOutput: FullAiAnalysisOutput;
  formData: ProjectBriefFormData;
}

export function StageVisionView({
  aiOutput,
  formData,
}: StageVisionViewProps): React.ReactElement {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-2.5 scrollbar-thin">
        {/* 3-Column Studio KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Eye className="w-3 h-3 text-emerald-400" />
              <span>Độ khớp Brand Specs</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                {aiOutput.vision.brandIdentityScore}%
              </span>
              <span className="text-[10px] text-emerald-500/80 font-mono">Chuẩn studio</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1">Đã đối chiếu 4 asset media</span>
          </div>

          <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <SunMedium className="w-3 h-3 text-cyan-400" />
              <span>Ánh sáng chủ đạo</span>
            </span>
            <p className="text-xs font-semibold text-cyan-300 font-mono line-clamp-1">
              Low-key Rim Lighting
            </p>
            <span className="text-[9px] text-slate-500 mt-1">Tỷ lệ tương phản 4:1 High-Key</span>
          </div>

          <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Layers className="w-3 h-3 text-indigo-400" />
              <span>Tỷ lệ & Bố cục</span>
            </span>
            <p className="text-xs font-semibold text-indigo-300 font-mono">
              {aiOutput.vision.compositionRatio}
            </p>
            <span className="text-[9px] text-slate-500 mt-1">Chuẩn phát hành {formData.aspectRatio}</span>
          </div>
        </div>

        {/* Brand Color Harmony Palette */}
        <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hệ màu sắc trích xuất tự động (Color Harmony System)</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
              {aiOutput.vision.colorPalette.length} Palettes
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {aiOutput.vision.colorPalette.map((col, idx) => (
              <div
                key={idx}
                className="bg-[#080B12] border border-[#182236] rounded-md p-2 flex items-center gap-2"
              >
                <div
                  className="w-7 h-7 rounded-lg border border-white/20 shrink-0 shadow-inner"
                  style={{ backgroundColor: col }}
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-mono font-bold text-slate-200 block truncate">
                    {col}
                  </span>
                  <span className="text-[9px] text-slate-500 uppercase font-mono">
                    {idx === 0 ? "Chủ đạo" : idx === 1 ? "Điểm nhấn" : idx === 2 ? "Viền sáng" : "Nền Studio"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Objects & Hardware Elements */}
        <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Vật thể & Thuộc tính vật liệu nhận diện (Detected Assets & Textures)</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {aiOutput.vision.detectedObjects.map((obj, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-800/40 text-cyan-300 font-mono flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>#{obj}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Vision Quality Checklist for Production */}
        <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tiêu chuẩn kết xuất đồ họa (Studio Render Verification)</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">All Passed (4/4)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            {[
              { label: "Độ phân giải Texture", spec: "4K UHD (3840x2160)", status: "Verified" },
              { label: "Không gian màu", spec: "Rec.709 Cinema Standard", status: "Calibrated" },
              { label: "Ray-traced Reflections", spec: "Bật phản chiếu kim loại phay xước", status: "Active" },
              { label: "Khử răng cưa (AA)", spec: "8x Multi-sample Temporal", status: "Optimal" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#080B12] border border-[#182236] rounded p-2 flex items-center justify-between"
              >
                <div>
                  <span className="text-slate-400 block">{item.label}</span>
                  <span className="text-slate-200 font-semibold">{item.spec}</span>
                </div>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <Check className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
