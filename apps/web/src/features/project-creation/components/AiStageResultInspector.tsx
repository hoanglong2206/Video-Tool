"use client";

import React from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { Brain, Eye, Wand2, ShieldCheck } from "lucide-react";
import { StagePromptAndSchemaViews } from "./StagePromptAndSchemaViews";

interface AiStageResultInspectorProps {
  selectedStage: number;
  aiOutput: FullAiAnalysisOutput;
  formData: ProjectBriefFormData;
}

export function AiStageResultInspector({
  selectedStage,
  aiOutput,
  formData,
}: AiStageResultInspectorProps): React.ReactElement {
  return (
    <div className="flex-1 min-h-0 bg-[#0F141F] border border-[#1C2436] rounded-xl p-4 flex flex-col overflow-hidden select-none">
      {/* Stage Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1C2436] shrink-0 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            {selectedStage === 1 && <Brain className="w-4 h-4 text-blue-400" />}
            {selectedStage === 2 && <Eye className="w-4 h-4 text-cyan-400" />}
            {selectedStage === 3 && <Wand2 className="w-4 h-4 text-purple-400" />}
            {selectedStage === 4 && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-2">
              <span>
                {selectedStage === 1 && "Stage 01: Kết quả Phân tích Ngôn ngữ LLM"}
                {selectedStage === 2 && "Stage 02: Kết quả Trích xuất Vision AI"}
                {selectedStage === 3 && "Stage 03: Chuỗi Prompt 6 Phân cảnh AI"}
                {selectedStage === 4 && "Stage 04: Báo cáo Kiểm định JSON Schema"}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded font-normal">
                Verified
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {selectedStage === 1 && "Trích xuất thông điệp, insight khách hàng và phân đoạn nhịp điệu kể chuyện."}
              {selectedStage === 2 && "Nhận diện vật thể, trích xuất bảng màu HEX và phong cách ánh sáng từ media."}
              {selectedStage === 3 && "Tạo 6 prompt sinh ảnh/video chất lượng studio theo chuẩn Remotion & ComfyUI."}
              {selectedStage === 4 && "Xác thực cấu trúc dữ liệu 24 trường thông số kỹ thuật chuẩn hóa đầu ra."}
            </p>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-400 bg-[#0A0D15] border border-[#1E2638] px-2.5 py-1 rounded">
          {selectedStage === 1 && "Engine: Claude 3.7 / LLM"}
          {selectedStage === 2 && "Engine: CLIP + ViT-H/14"}
          {selectedStage === 3 && "Engine: PromptBuilder v3"}
          {selectedStage === 4 && "Engine: Zod JSON-Schema"}
        </div>
      </div>

      {/* Stage Detail Body (Internal Scroll Only) */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-3">
        {/* STAGE 1: LLM */}
        {selectedStage === 1 && (
          <div className="flex flex-col gap-3">
            <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                Thông điệp cốt lõi (Core Message)
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                "{aiOutput.llm.coreMessage}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Đối tượng mục tiêu
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {aiOutput.llm.targetAudience}
                </p>
              </div>

              <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Giọng điệu (Tone of Voice)
                </span>
                <p className="text-xs text-cyan-300 font-medium leading-relaxed">
                  {aiOutput.llm.toneOfVoice}
                </p>
              </div>
            </div>

            <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                3 Điểm nhấn giá trị then chốt (Key Hooks)
              </span>
              <div className="flex flex-col gap-1.5">
                {aiOutput.llm.keyHooks.map((hook, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="w-4 h-4 rounded bg-blue-900/60 text-blue-400 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span>{hook}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Nhịp điệu phân cảnh (Pacing Structure)
              </span>
              <p className="text-xs text-indigo-300 font-mono leading-relaxed">
                {aiOutput.llm.pacingStructure}
              </p>
            </div>
          </div>
        )}

        {/* STAGE 2: VISION AI */}
        {selectedStage === 2 && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Độ nhận diện thương hiệu
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    {aiOutput.vision.brandIdentityScore}%
                  </span>
                  <span className="text-[10px] text-emerald-500 font-mono">
                    (Phù hợp cao với Brand Specs)
                  </span>
                </div>
              </div>

              <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Tỷ lệ khung hình & Bố cục
                </span>
                <p className="text-xs text-cyan-300 font-mono font-medium">
                  {aiOutput.vision.compositionRatio}
                </p>
              </div>
            </div>

            <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Bảng màu trích xuất từ tài liệu & Media
              </span>
              <div className="flex items-center gap-2.5">
                {aiOutput.vision.colorPalette.map((col, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-[#121927] border border-[#1F2B40] px-2 py-1 rounded">
                    <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: col }} />
                    <span className="text-[11px] font-mono font-semibold text-slate-200">{col}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Vật thể & Chi tiết thị giác nhận diện
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiOutput.vision.detectedObjects.map((obj, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-mono">
                    #{obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Phong cách ánh sáng & Texture
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {aiOutput.vision.lightingStyle}
              </p>
            </div>
          </div>
        )}

        {/* STAGES 3 & 4: PROMPTS AND SCHEMA */}
        {(selectedStage === 3 || selectedStage === 4) && (
          <StagePromptAndSchemaViews
            selectedStage={selectedStage}
            aiOutput={aiOutput}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
}
