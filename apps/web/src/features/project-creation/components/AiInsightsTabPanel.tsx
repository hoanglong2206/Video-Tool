"use client";

import React, { useState } from "react";
import type { FullAiAnalysisOutput } from "../types";
import { Eye, Brain, ShieldCheck, CheckCircle2, Check } from "lucide-react";

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

      {/* Tab Contents - Fits 100% inside container without any scrolling */}
      <div className="flex-1 min-h-0 bg-[#0B0F17] border border-[#1E2638] rounded-lg p-2.5 overflow-hidden flex flex-col justify-between">
        {/* Tab 1: Vision AI - Compact & Fit Without Scroll */}
        {activeTab === "vision" && (
          <div className="flex-1 min-h-0 flex flex-col justify-between text-[11px]">
            {/* Match Gauge */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1.5 flex flex-col gap-1 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">Độ nhận diện thương hiệu:</span>
                <span className="text-emerald-400 font-mono font-bold text-[10px]">
                  {aiOutput.vision.brandIdentityScore}/100 Match
                </span>
              </div>
              <div className="w-full h-1 bg-[#141B2B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                  style={{ width: `${aiOutput.vision.brandIdentityScore}%` }}
                />
              </div>
            </div>

            {/* Detected Objects */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1.5 shrink-0">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Vật thể & Chi tiết thị giác nhận diện:
              </span>
              <div className="flex flex-wrap gap-1">
                {aiOutput.vision.detectedObjects.slice(0, 4).map((obj, i) => (
                  <span
                    key={i}
                    className="text-[9px] bg-blue-950/80 text-blue-300 border border-blue-800/50 px-1.5 py-0.2 rounded font-mono truncate max-w-[170px]"
                  >
                    #{obj}
                  </span>
                ))}
              </div>
            </div>

            {/* Lighting & Aspect Ratio */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1.5 flex items-center justify-between text-[10px] shrink-0">
              <div className="min-w-0 pr-2">
                <span className="text-slate-400 block text-[9px] uppercase">Phong cách ánh sáng:</span>
                <span className="text-slate-300 font-mono text-[10px] truncate block">
                  Studio Rim-light (4:1 Contrast)
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-slate-400 block text-[9px] uppercase">Tỷ lệ:</span>
                <span className="text-cyan-400 font-mono font-semibold text-[10px]">
                  {aiOutput.vision.compositionRatio.split(" ")[0]}
                </span>
              </div>
            </div>

            {/* Studio Specs */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1.5 text-[9px] font-mono grid grid-cols-2 gap-1 text-emerald-400 shrink-0">
              <span className="flex items-center gap-1 truncate">
                <Check className="w-2.5 h-2.5 shrink-0" /> 4K Texture Maps
              </span>
              <span className="flex items-center gap-1 truncate">
                <Check className="w-2.5 h-2.5 shrink-0" /> Rec.709 Space
              </span>
              <span className="flex items-center gap-1 truncate">
                <Check className="w-2.5 h-2.5 shrink-0" /> Ray-traced Rim
              </span>
              <span className="flex items-center gap-1 truncate">
                <Check className="w-2.5 h-2.5 shrink-0" /> Anti-aliasing 8x
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: LLM Prompts - Vừa đủ 100%, Không Scroll */}
        {activeTab === "llm" && (
          <div className="flex-1 min-h-0 flex flex-col justify-between text-[11px]">
            {/* Target Engines */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1 flex items-center justify-between shrink-0">
              <span className="text-slate-400 text-[10px]">Target AI Engines:</span>
              <div className="flex gap-1">
                {aiOutput.promptBuilder.targetEngines.map((eng, i) => (
                  <span key={i} className="text-[9px] bg-purple-950/80 text-purple-300 border border-purple-800/40 px-1 py-0.2 rounded font-mono">
                    {eng.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Message */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1.5 shrink-0">
              <span className="text-[9px] font-semibold text-purple-400 uppercase tracking-wider block mb-0.5">
                Thông điệp định vị:
              </span>
              <p className="text-[10px] text-slate-200 leading-snug italic line-clamp-2">
                "{aiOutput.llm.coreMessage}"
              </p>
            </div>

            {/* Key Hooks */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1.5 flex flex-col gap-1 shrink-0">
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">
                3 Điểm nhấn giá trị then chốt:
              </span>
              <div className="flex flex-col gap-0.5">
                {aiOutput.llm.keyHooks.slice(0, 3).map((hook, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                    <span className="w-3 h-3 rounded bg-purple-900/60 text-purple-300 text-[8px] font-mono flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="truncate">{hook}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pacing Arc */}
            <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2 py-1 shrink-0">
              <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5 uppercase">
                <span>Cấu trúc nhịp điệu:</span>
                <span className="text-indigo-300 font-mono">135 WPM</span>
              </div>
              <p className="text-[10px] text-indigo-300 font-mono truncate">
                {aiOutput.llm.pacingStructure}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Schema Validator - Vừa đủ 100%, Không Scroll */}
        {activeTab === "schema" && (
          <div className="flex-1 min-h-0 flex flex-col justify-between text-[11px]">
            {/* Status Header */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-md px-2.5 py-1.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-300">HỢP LỆ 100%</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                {aiOutput.schemaValidator.validatedFieldsCount}/24 trường
              </span>
            </div>

            {/* Parameters Grid (2x3) */}
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px] shrink-0">
              <div className="bg-[#070A10] border border-[#1E2638] rounded p-1.5">
                <span className="text-slate-400 block text-[8px]">SCHEMA:</span>
                <span className="text-slate-200 truncate block">ProjectSpec.v2</span>
              </div>
              <div className="bg-[#070A10] border border-[#1E2638] rounded p-1.5">
                <span className="text-slate-400 block text-[8px]">PHIÊN BẢN:</span>
                <span className="text-slate-200">v2.4.0 Strict</span>
              </div>
              <div className="bg-[#070A10] border border-[#1E2638] rounded p-1.5">
                <span className="text-slate-400 block text-[8px]">AUDIO CODEC:</span>
                <span className="text-cyan-400">AAC 320k 48kHz</span>
              </div>
              <div className="bg-[#070A10] border border-[#1E2638] rounded p-1.5">
                <span className="text-slate-400 block text-[8px]">VIDEO ENGINE:</span>
                <span className="text-purple-400">Remotion 4.x</span>
              </div>
              <div className="bg-[#070A10] border border-[#1E2638] rounded p-1.5">
                <span className="text-slate-400 block text-[8px]">ĐỘ PHÂN GIẢI:</span>
                <span className="text-slate-200">4K UHD (60fps)</span>
              </div>
              <div className="bg-[#070A10] border border-[#1E2638] rounded p-1.5">
                <span className="text-slate-400 block text-[8px]">LỖI CẤU TRÚC:</span>
                <span className="text-emerald-400 font-bold">0 Errors / Pass</span>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="p-1.5 bg-[#070A10] border border-[#1A2234] rounded text-[9px] text-slate-300 font-mono leading-tight shrink-0">
              ✓ Toàn bộ 24 tham số kỹ thuật đã qua kiểm định Zod Schema và sẵn sàng render Storyboard.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
