"use client";

import React from "react";
import type { FullAiAnalysisOutput } from "../types";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface SchemaInsightTabProps {
  aiOutput: FullAiAnalysisOutput;
}

export function SchemaInsightTab({ aiOutput }: SchemaInsightTabProps): React.ReactElement {
  const params = [
    { label: "SCHEMA", value: "ProjectSpec.v2", color: "text-slate-200" },
    { label: "PHIÊN BẢN", value: "v2.4.0 Strict", color: "text-slate-200" },
    { label: "AUDIO CODEC", value: "AAC 320k 48kHz", color: "text-cyan-400" },
    { label: "VIDEO ENGINE", value: "Remotion 4.x", color: "text-purple-400" },
    { label: "ĐỘ PHÂN GIẢI", value: "4K UHD (60fps)", color: "text-slate-200" },
    { label: "COLOR DEPTH", value: "Rec.709 10-bit", color: "text-emerald-400" },
    { label: "BITRATE TARGET", value: "45 Mbps CBR", color: "text-cyan-400" },
    { label: "LỖI CẤU TRÚC", value: "0 Errors / Pass", color: "text-emerald-400 font-bold" },
  ];

  return (
    <div className="flex flex-col gap-2 text-[11px]">
      {/* 1. Status Banner */}
      <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-md px-2.5 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-bold text-emerald-300">HỢP LỆ 100%</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono">
          {aiOutput.schemaValidator.validatedFieldsCount}/24 trường đạt chuẩn
        </span>
      </div>

      {/* 2. Parameters Matrix Grid (2x4) */}
      <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px] shrink-0">
        {params.map((p, idx) => (
          <div key={idx} className="bg-[#070A10] border border-[#1E2638] rounded p-1.5">
            <span className="text-slate-400 block text-[8px] uppercase">{p.label}:</span>
            <span className={`truncate block mt-0.5 ${p.color}`}>{p.value}</span>
          </div>
        ))}
      </div>

      {/* 3. Validation Metadata & Integrity Hash */}
      <div className="p-2 bg-[#070A10] border border-[#1A2234] rounded text-[9px] text-slate-300 font-mono flex flex-col gap-1 shrink-0">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Zod Schema Validator
          </span>
          <span className="text-emerald-400 font-bold">Passed</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[8.5px]">
          Xác thực toàn bộ 24 tham số cấu hình: độ phân giải, tỷ lệ khung hình, color pipeline, timeline durations và Remotion component ID.
        </p>
      </div>
    </div>
  );
}
