"use client";

import React from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { Brain, Eye, Wand2, ShieldCheck } from "lucide-react";
import { StageLlmView } from "./StageLlmView";
import { StageVisionView } from "./StageVisionView";
import { StagePromptsView } from "./StagePromptsView";
import { StageSchemaView } from "./StageSchemaView";

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
    <div className="h-full min-h-0 flex-1 bg-[#0F141F] border border-[#1C2436] rounded-xl p-3.5 flex flex-col overflow-hidden select-none">
      {/* Stage Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#1C2436] shrink-0 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            {selectedStage === 1 && <Brain className="w-4 h-4 text-blue-400" />}
            {selectedStage === 2 && <Eye className="w-4 h-4 text-cyan-400" />}
            {selectedStage === 3 && <Wand2 className="w-4 h-4 text-purple-400" />}
            {selectedStage === 4 && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-2 truncate">
              <span>
                {selectedStage === 1 && "Stage 01: Kết quả Phân tích Ngôn ngữ LLM"}
                {selectedStage === 2 && "Stage 02: Kết quả Trích xuất Vision AI"}
                {selectedStage === 3 && "Stage 03: Chuỗi Prompt 6 Phân cảnh AI"}
                {selectedStage === 4 && "Stage 04: Báo cáo Kiểm định JSON Schema"}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded font-normal shrink-0">
                Verified
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 truncate">
              {selectedStage === 1 && "Trích xuất thông điệp, insight khách hàng và phân đoạn nhịp điệu kể chuyện."}
              {selectedStage === 2 && "Nhận diện vật thể, trích xuất bảng màu HEX và phong cách ánh sáng từ media."}
              {selectedStage === 3 && "Tạo 6 prompt sinh ảnh/video chất lượng studio theo chuẩn Remotion & ComfyUI."}
              {selectedStage === 4 && "Xác thực cấu trúc dữ liệu 24 trường thông số kỹ thuật chuẩn hóa đầu ra."}
            </p>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-400 bg-[#0A0D15] border border-[#1E2638] px-2.5 py-1 rounded shrink-0 hidden sm:block">
          {selectedStage === 1 && "Engine: Claude 3.7 / LLM"}
          {selectedStage === 2 && "Engine: CLIP + ViT-H/14"}
          {selectedStage === 3 && "Engine: PromptBuilder v3"}
          {selectedStage === 4 && "Engine: Zod JSON-Schema"}
        </div>
      </div>

      {/* Stage Detail Body (Full Height Viewport) */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {selectedStage === 1 && <StageLlmView aiOutput={aiOutput} formData={formData} />}
        {selectedStage === 2 && <StageVisionView aiOutput={aiOutput} formData={formData} />}
        {selectedStage === 3 && <StagePromptsView aiOutput={aiOutput} formData={formData} />}
        {selectedStage === 4 && <StageSchemaView aiOutput={aiOutput} formData={formData} />}
      </div>
    </div>
  );
}
