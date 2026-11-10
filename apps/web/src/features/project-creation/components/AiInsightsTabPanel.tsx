"use client";

import React, { useState } from "react";
import type { FullAiAnalysisOutput } from "../types";
import { VisionInsightTab } from "./VisionInsightTab";
import { LlmInsightTab } from "./LlmInsightTab";
import { SchemaInsightTab } from "./SchemaInsightTab";
import { Eye, Brain, ShieldCheck } from "lucide-react";

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

      {/* Tab Contents - Natural flow with internal scrollbar, fits all screen sizes */}
      <div className="flex-1 min-h-0 bg-[#0B0F17] border border-[#1E2638] rounded-lg p-2.5 overflow-y-auto pr-1">
        {activeTab === "vision" && <VisionInsightTab aiOutput={aiOutput} />}
        {activeTab === "llm" && <LlmInsightTab aiOutput={aiOutput} />}
        {activeTab === "schema" && <SchemaInsightTab aiOutput={aiOutput} />}
      </div>
    </div>
  );
}
