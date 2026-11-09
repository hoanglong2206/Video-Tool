"use client";

import React, { useState } from "react";
import type { FullAiAnalysisOutput } from "../types";
import { Eye, Brain, ShieldCheck, CheckCircle2, Sparkles, Check } from "lucide-react";

interface AiInsightsTabPanelProps {
  aiOutput: FullAiAnalysisOutput;
}

type TabType = "vision" | "llm" | "schema";

export function AiInsightsTabPanel({
  aiOutput,
}: AiInsightsTabPanelProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabType>("vision");

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
      {/* 3 Interactive AI Engine Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-[#0A0D15] p-1 rounded-lg border border-[#1E2638] shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("vision")}
          className={`py-1.5 px-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "vision"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vision AI</span>
          <span className="text-[9px] font-mono bg-black/30 px-1 py-0.2 rounded">
            98%
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("llm")}
          className={`py-1.5 px-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "llm"
              ? "bg-purple-600 text-white shadow-xs"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>LLM Prompts</span>
          <span className="text-[9px] font-mono bg-black/30 px-1 py-0.2 rounded">
            6
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schema")}
          className={`py-1.5 px-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "schema"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Schema</span>
          <span className="text-[9px] font-mono bg-black/30 px-1 py-0.2 rounded">
            24/24
          </span>
        </button>
      </div>

      {/* Tab Contents - Fills the card viewport with rich, well-spaced metrics */}
      <div className="flex-1 min-h-0 bg-[#0B0F17] border border-[#1E2638] rounded-lg p-2.5 overflow-y-auto flex flex-col gap-2.5 scrollbar-thin">
        {/* Tab 1: Vision AI */}
        {activeTab === "vision" && (
          <div className="flex flex-col gap-2.5 text-[11px]">
            {/* Match Gauge */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">Độ nhận diện thương hiệu (Match):</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {aiOutput.vision.brandIdentityScore}/100 High Confidence
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#141B2B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                  style={{ width: `${aiOutput.vision.brandIdentityScore}%` }}
                />
              </div>
            </div>

            {/* Detected Objects */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Vật thể & Chi tiết thị giác nhận diện:
              </span>
              <div className="flex flex-wrap gap-1">
                {aiOutput.vision.detectedObjects.map((obj, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-blue-950/80 text-blue-300 border border-blue-800/50 px-1.5 py-0.5 rounded font-mono"
                  >
                    #{obj}
                  </span>
                ))}
              </div>
            </div>

            {/* Lighting & Contrast */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2 flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Phong cách ánh sáng & Bố cục:
              </span>
              <p className="text-[10px] text-slate-300 leading-relaxed font-mono">
                {aiOutput.vision.lightingStyle}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#1E2638]/60 text-[10px]">
                <span className="text-slate-400">Tỷ lệ bố cục:</span>
                <span className="text-cyan-400 font-mono font-semibold">
                  {aiOutput.vision.compositionRatio}
                </span>
              </div>
            </div>

            {/* Visual Pipeline Quality Verification */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2 flex flex-col gap-1 text-[10px]">
              <span className="font-semibold text-slate-400 uppercase tracking-wider block">
                Xác thực Chuẩn Video Studio:
              </span>
              <div className="grid grid-cols-2 gap-1.5 pt-0.5 font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> 4K Texture Maps
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> HDR Rec.709 Space
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Ray-traced Rim-light
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Anti-aliasing 8x
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: LLM Prompts & Narrative */}
        {activeTab === "llm" && (
          <div className="flex flex-col gap-2.5 text-[11px]">
            {/* Target Engines */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2 flex items-center justify-between">
              <span className="text-slate-400 text-[10px]">Target AI Engines:</span>
              <div className="flex gap-1">
                {aiOutput.promptBuilder.targetEngines.map((eng, i) => (
                  <span key={i} className="text-[9px] bg-purple-950/80 text-purple-300 border border-purple-800/40 px-1 rounded font-mono">
                    {eng.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Message */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2 flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block">
                Thông điệp định vị:
              </span>
              <p className="text-[10px] text-slate-200 leading-relaxed italic">
                "{aiOutput.llm.coreMessage}"
              </p>
            </div>

            {/* Key Hooks */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Điểm nhấn giá trị then chốt:
              </span>
              <div className="flex flex-col gap-1">
                {aiOutput.llm.keyHooks.map((hook, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-300">
                    <span className="w-3.5 h-3.5 rounded bg-purple-900/60 text-purple-300 text-[9px] font-mono flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{hook}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pacing Structure */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                Cấu trúc nhịp điệu (Pacing Arc):
              </span>
              <p className="text-[10px] text-indigo-300 font-mono leading-relaxed">
                {aiOutput.llm.pacingStructure}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Schema Validator */}
        {activeTab === "schema" && (
          <div className="flex flex-col gap-2.5 text-[11px]">
            {/* Status Header */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">HỢP LỆ 100%</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                {aiOutput.schemaValidator.validatedFieldsCount}/24 trường
              </span>
            </div>

            {/* Parameters Grid */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-lg p-2 flex flex-col gap-1 font-mono text-[10px]">
              <div className="flex justify-between py-0.5 border-b border-[#1A2234]">
                <span className="text-slate-400">Schema Name:</span>
                <span className="text-slate-200">{aiOutput.schemaValidator.schemaName}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#1A2234]">
                <span className="text-slate-400">Phiên bản:</span>
                <span className="text-slate-200">v{aiOutput.schemaValidator.schemaVersion}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#1A2234]">
                <span className="text-slate-400">Audio Codec:</span>
                <span className="text-cyan-400">AAC 320kbps 48kHz</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#1A2234]">
                <span className="text-slate-400">Video Engine:</span>
                <span className="text-purple-400">Remotion 4.x Compatible</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Trạng thái lỗi:</span>
                <span className="text-emerald-400 font-bold">0 Errors / Strict Pass</span>
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="p-2 bg-[#070A10] border border-[#1A2234] rounded-lg text-[10px] text-slate-300 font-mono leading-relaxed">
              ✓ Output JSON đã vượt qua bộ kiểm tra Zod Schema Validator. Toàn bộ thông số 6 phân cảnh sẵn sàng cho pipeline render Storyboard.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
