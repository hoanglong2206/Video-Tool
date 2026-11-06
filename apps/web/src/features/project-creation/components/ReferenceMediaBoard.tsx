"use client";

import React from "react";
import type { UploadedMediaItem, FullAiAnalysisOutput } from "../types";
import { Eye, ShieldCheck, Brain, Wand2, CheckCircle2, Image as ImageIcon } from "lucide-react";

interface ReferenceMediaBoardProps {
  files: UploadedMediaItem[];
  aiOutput: FullAiAnalysisOutput;
}

export function ReferenceMediaBoard({
  files,
  aiOutput,
}: ReferenceMediaBoardProps): React.ReactElement {
  return (
    <div className="w-96 border-l border-[#1E2638] bg-[#0A0E17] p-4 flex flex-col gap-4 overflow-y-auto shrink-0 select-none">
      {/* 1. Reference Media Gallery & Moodboard */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between pb-1.5 border-b border-[#1C2436]">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            Bảng Ảnh & Media Tham Chiếu
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">
            {files.length} file
          </span>
        </div>

        {/* Media Thumbnails with Vision Tags */}
        <div className="grid grid-cols-2 gap-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-[#0B0F17] border border-[#1A2234] rounded-lg p-1.5 flex flex-col"
            >
              <div className="w-full aspect-[16/10] rounded bg-[#121723] overflow-hidden relative flex items-center justify-center mb-1">
                {file.previewUrl ? (
                  <img
                    src={file.previewUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[9px] font-mono text-slate-400 uppercase">
                    {file.category}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-300 truncate">
                {file.name}
              </span>
              {file.visionTags && file.visionTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {file.visionTags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[8px] bg-[#161D2C] text-cyan-400 px-1 py-0.2 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Color Palette extracted by Vision AI */}
        <div className="pt-2 border-t border-[#1C2436]/60">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Bảng màu Vision AI trích xuất:
          </span>
          <div className="flex items-center gap-1.5">
            {aiOutput.vision.colorPalette.map((hex, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full h-5 rounded border border-slate-700 shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-[8px] font-mono text-slate-400">{hex}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Thông tin AI đã nhận diện: Vision AI */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-[#1C2436]">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            Vision AI đã Nhận diện
          </h3>
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
            Điểm: {aiOutput.vision.brandIdentityScore}/100
          </span>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px] text-slate-300">
          <div>
            <span className="text-slate-400 text-[10px]">Vật thể chính:</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {aiOutput.vision.detectedObjects.map((obj, i) => (
                <span
                  key={i}
                  className="text-[9px] bg-blue-950/80 text-blue-300 border border-blue-800/40 px-1.5 py-0.5 rounded"
                >
                  {obj}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-1 leading-relaxed text-[10px] text-slate-400">
            <span className="text-slate-300 font-medium">Ánh sáng:</span>{" "}
            {aiOutput.vision.lightingStyle}
          </p>
        </div>
      </div>

      {/* 3. Thông tin AI đã nhận diện: LLM & Prompt Builder */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-[#1C2436]">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            LLM & Prompt Builder
          </h3>
          <span className="text-[10px] text-purple-400 font-mono">
            {aiOutput.promptBuilder.generatedPromptsCount} prompts
          </span>
        </div>

        <div className="flex flex-col gap-1 text-[10px] text-slate-300">
          <span className="text-slate-400">Điểm bán hàng cốt lõi (Key Hooks):</span>
          {aiOutput.llm.keyHooks.map((hook, i) => (
            <p key={i} className="flex items-center gap-1 text-slate-300">
              <span className="text-purple-400 font-bold">•</span> {hook}
            </p>
          ))}
          <p className="mt-1 text-slate-400 leading-relaxed border-t border-[#1C2436]/60 pt-1">
            <span className="text-slate-300 font-medium">Cấu trúc nhịp độ:</span>{" "}
            {aiOutput.llm.pacingStructure}
          </p>
        </div>
      </div>

      {/* 4. JSON Schema Validator Result */}
      <div className="bg-[#101520] border border-emerald-900/50 rounded-xl p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              JSON Schema Validator
            </span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono px-1.5 py-0.2 rounded font-bold flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" /> VALIDATED
          </span>
        </div>

        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
          Schema: {aiOutput.schemaValidator.schemaName} (v{aiOutput.schemaValidator.schemaVersion})
        </p>
        <span className="text-[10px] text-emerald-400 font-mono">
          ✓ {aiOutput.schemaValidator.validatedFieldsCount}/24 trường thông số hợp lệ 100%
        </span>
      </div>
    </div>
  );
}

