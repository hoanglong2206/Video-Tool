"use client";

import React from "react";
import type { UploadedMediaItem, FullAiAnalysisOutput } from "../types";
import { AiInsightsTabPanel } from "./AiInsightsTabPanel";
import { Image as ImageIcon, Video, FileText, FileCheck } from "lucide-react";

interface ReferenceMediaBoardProps {
  files: UploadedMediaItem[];
  aiOutput: FullAiAnalysisOutput;
}

export function ReferenceMediaBoard({
  files,
  aiOutput,
}: ReferenceMediaBoardProps): React.ReactElement {
  return (
    <div className="w-[400px] xl:w-[440px] border-l border-[#1C2436] bg-[#0A0E17] p-3.5 flex flex-col gap-3 h-full min-h-0 overflow-hidden shrink-0 select-none">
      {/* 1. Reference Media Gallery & Color Palette */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between pb-1 border-b border-[#1C2436]">
          <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Bảng Ảnh & Media Tham Chiếu</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">
            {files.length} file
          </span>
        </div>

        {/* Media Thumbnails Grid */}
        <div className="grid grid-cols-4 gap-1.5">
          {files.slice(0, 4).map((file) => (
            <div
              key={file.id}
              className="bg-[#0B0F17] border border-[#1A2234] rounded-lg p-1 flex flex-col group relative"
            >
              <div className="w-full aspect-[4/3] rounded bg-[#121723] overflow-hidden relative flex items-center justify-center">
                {file.previewUrl ? (
                  <img
                    src={file.previewUrl}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : file.category === "video" ? (
                  <Video className="w-4 h-4 text-cyan-400" />
                ) : file.category === "pdf" ? (
                  <FileText className="w-4 h-4 text-red-400" />
                ) : (
                  <FileCheck className="w-4 h-4 text-blue-400" />
                )}
                <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/80 text-slate-300 px-1 rounded font-mono uppercase">
                  {file.category}
                </span>
              </div>
              <span className="text-[9px] font-medium text-slate-300 truncate mt-1" title={file.name}>
                {file.name}
              </span>
            </div>
          ))}
        </div>

        {/* Vision AI Color Palette */}
        <div className="pt-1.5 border-t border-[#1C2436]/70">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Bảng màu Vision AI trích xuất:
          </span>
          <div className="flex items-center gap-1.5">
            {aiOutput.vision.colorPalette.map((hex, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full h-4 rounded border border-slate-700 shadow-xs"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
                <span className="text-[8px] font-mono text-slate-400 truncate max-w-full">
                  {hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AI Multi-Agent Insights Panel */}
      <div className="flex-1 min-h-0 bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2 overflow-hidden">
        <div className="flex items-center justify-between pb-1 border-b border-[#1C2436] shrink-0">
          <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
            Phân Tích AI Đa Tầng (AI Insights)
          </h3>
          <span className="text-[10px] text-emerald-400 font-mono">
            3 Models Ready
          </span>
        </div>

        <AiInsightsTabPanel aiOutput={aiOutput} />
      </div>
    </div>
  );
}
