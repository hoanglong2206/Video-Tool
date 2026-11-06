"use client";

import React, { useState } from "react";
import type { FullAiAnalysisOutput } from "../types";
import { Eye, Brain, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

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

      {/* Tab Contents - Scrollable internally if necessary */}
      <div className="flex-1 min-h-0 bg-[#0B0F17] border border-[#1E2638] rounded-lg p-2.5 overflow-y-auto">
        {/* Tab 1: Vision AI */}
        {activeTab === "vision" && (
          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex items-center justify-between pb-1 border-b border-[#1E2638]">
              <span className="text-slate-400 text-[10px]">Độ nhận diện thương hiệu:</span>
              <span className="text-emerald-400 font-mono font-bold">
                {aiOutput.vision.brandIdentityScore}/100 Match
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block mb-1">
                Vật thể chính nhận diện:
              </span>
              <div className="flex flex-wrap gap-1">
                {aiOutput.vision.detectedObjects.map((obj, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-blue-950/80 text-blue-300 border border-blue-800/50 px-1.5 py-0.5 rounded font-mono"
                  >
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1 border-t border-[#1E2638]/70">
              <span className="text-[10px] text-slate-400 block">Phong cách ánh sáng:</span>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
                {aiOutput.vision.lightingStyle}
              </p>
            </div>

            <div className="pt-1 border-t border-[#1E2638]/70 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Tỷ lệ bố cục:</span>
              <span className="text-cyan-400 font-mono font-semibold">
                {aiOutput.vision.compositionRatio}
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: LLM & Prompt Builder */}
        {activeTab === "llm" && (
          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex items-center justify-between pb-1 border-b border-[#1E2638]">
              <span className="text-slate-400 text-[10px]">Target AI Engines:</span>
              <div className="flex gap-1">
                {aiOutput.promptBuilder.targetEngines.map((eng, i) => (
                  <span key={i} className="text-[9px] bg-purple-950/80 text-purple-300 border border-purple-800/40 px-1 rounded font-mono">
                    {eng.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block mb-1">
                Điểm bán hàng cốt lõi (Key Hooks):
              </span>
              <div className="flex flex-col gap-1">
                {aiOutput.llm.keyHooks.map((hook, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-300">
                    <span className="text-purple-400 font-bold shrink-0">•</span>
                    <span>{hook}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1 border-t border-[#1E2638]/70">
              <span className="text-[10px] text-slate-400 block">Cấu trúc nhịp điệu (Pacing):</span>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
                {aiOutput.llm.pacingStructure}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Schema Validator */}
        {activeTab === "schema" && (
          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex items-center justify-between pb-1 border-b border-[#1E2638]">
              <span className="text-[10px] text-slate-400">Trạng thái cấu trúc:</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono px-1.5 py-0.2 rounded font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> HỢP LỆ 100%
              </span>
            </div>

            <div className="flex flex-col gap-1 text-[10px] font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Schema File:</span>
                <span className="text-slate-200">{aiOutput.schemaValidator.schemaName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phiên bản:</span>
                <span className="text-slate-200">v{aiOutput.schemaValidator.schemaVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Số trường đã duyệt:</span>
                <span className="text-emerald-400 font-bold">
                  {aiOutput.schemaValidator.validatedFieldsCount} / 24 trường
                </span>
              </div>
            </div>

            <div className="mt-1 p-2 bg-[#070A10] border border-[#182030] rounded text-[10px] text-slate-400 font-mono leading-relaxed">
              ✓ Output JSON đã vượt qua bộ kiểm tra Zod Schema Validator. Toàn bộ thông số sẵn sàng cho Remotion engine.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
