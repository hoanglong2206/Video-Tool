"use client";

import React from "react";
import type { FullAiAnalysisOutput } from "../types";
import { Zap, Target } from "lucide-react";

interface LlmInsightTabProps {
  aiOutput: FullAiAnalysisOutput;
}

export function LlmInsightTab({ aiOutput }: LlmInsightTabProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2 text-[11px]">
      {/* 1. Target AI Engines */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-1.5 flex items-center justify-between shrink-0">
        <span className="text-slate-400 text-[10px] flex items-center gap-1">
          <Zap className="w-3 h-3 text-purple-400" />
          Target AI Engines:
        </span>
        <div className="flex gap-1">
          {aiOutput.promptBuilder.targetEngines.map((eng, i) => (
            <span
              key={i}
              className="text-[9px] bg-purple-950/80 text-purple-300 border border-purple-800/40 px-1.5 py-0.5 rounded font-mono"
            >
              {eng.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Core Positioning Message */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-2 shrink-0 flex flex-col gap-1">
        <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block">
          Thông điệp định vị:
        </span>
        <p className="text-[10px] text-slate-200 leading-relaxed italic bg-[#0A0E18] p-2 rounded border border-[#182236]">
          "{aiOutput.llm.coreMessage}"
        </p>
      </div>

      {/* 3. Key Value Hooks */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-2 flex flex-col gap-1.5 shrink-0">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
          Điểm nhấn giá trị then chốt:
        </span>
        <div className="flex flex-col gap-1">
          {aiOutput.llm.keyHooks.map((hook, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-300">
              <span className="w-3.5 h-3.5 rounded bg-purple-900/60 text-purple-300 text-[9px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-snug">{hook}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Audience & Tone */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-2 flex flex-col gap-1 shrink-0 text-[10px]">
        <div className="flex items-center gap-1 text-slate-400 text-[9px] uppercase font-semibold">
          <Target className="w-2.5 h-2.5 text-purple-400" /> Khách hàng & Tông giọng:
        </div>
        <p className="text-slate-300 text-[10px]">
          {aiOutput.llm.targetAudience}
        </p>
        <span className="text-purple-300 font-mono text-[9px]">
          Tone: {aiOutput.llm.toneOfVoice}
        </span>
      </div>

      {/* 5. Pacing Arc */}
      <div className="bg-[#070A10] border border-[#1E2638] rounded-md px-2.5 py-1.5 shrink-0">
        <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5 uppercase">
          <span>Cấu trúc nhịp điệu (Pacing):</span>
          <span className="text-indigo-300 font-mono font-bold">135 WPM</span>
        </div>
        <p className="text-[10px] text-indigo-300 font-mono leading-tight">
          {aiOutput.llm.pacingStructure}
        </p>
      </div>
    </div>
  );
}
