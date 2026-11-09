"use client";

import React from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { Sparkles, MessageSquareQuote, Users, Volume2, TrendingUp, Clock } from "lucide-react";

interface StageLlmViewProps {
  aiOutput: FullAiAnalysisOutput;
  formData: ProjectBriefFormData;
}

export function StageLlmView({
  aiOutput,
  formData,
}: StageLlmViewProps): React.ReactElement {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
      {/* Scrollable Container with balanced studio height */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-2.5 scrollbar-thin">
        {/* Core Message Hero Banner */}
        <div className="bg-gradient-to-r from-blue-950/40 via-[#0E1524] to-[#0A0D15] border border-blue-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Thông điệp cốt lõi (Core Message)</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              AI Confidence: 99.4%
            </span>
          </div>
          <p className="text-xs text-slate-100 font-medium leading-relaxed italic border-l-2 border-blue-500 pl-2.5 py-0.5">
            "{aiOutput.llm.coreMessage}"
          </p>
        </div>

        {/* 2-Column Audience & Voice Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Users className="w-3 h-3 text-cyan-400" />
                <span>Khách hàng mục tiêu</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {aiOutput.llm.targetAudience}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#161E30] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Độ tuổi: 22 - 45 tuổi</span>
              <span className="text-cyan-400">Độ khớp: 98%</span>
            </div>
          </div>

          <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Volume2 className="w-3 h-3 text-indigo-400" />
                <span>Tông giọng & Khí chất (Tone of Voice)</span>
              </span>
              <p className="text-xs text-cyan-300 font-medium leading-relaxed">
                {aiOutput.llm.toneOfVoice}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#161E30] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Kênh: {formData.duration} TVC/Digital</span>
              <span className="text-indigo-400">Pacing: Dynamic</span>
            </div>
          </div>
        </div>

        {/* Key Value Hooks */}
        <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>3 Điểm kích hoạt cảm xúc then chốt (Key Hooks)</span>
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {aiOutput.llm.keyHooks.map((hook, i) => (
              <div
                key={i}
                className="bg-[#06080E] border border-[#172033] rounded-md p-2 flex flex-col justify-between gap-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-blue-900/60 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">
                    0{i + 1}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-300 uppercase">
                    Hook #{i + 1}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">{hook}</p>
                <span className="text-[9px] font-mono text-emerald-400/80">
                  Tác động: Cao ({90 + i * 4}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Pacing Timeline */}
        <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Tiến trình phân bổ nhịp điệu (Story Pacing Arc)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Tổng: {formData.duration} (6 Phân cảnh)
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1 text-center">
            {[
              { sc: "Cảnh 1", time: "0-5s", role: "Hook khơi gợi" },
              { sc: "Cảnh 2", time: "5-10s", role: "Vật liệu tinh tế" },
              { sc: "Cảnh 3", time: "10-16s", role: "Bóc tách công nghệ" },
              { sc: "Cảnh 4", time: "16-21s", role: "Âm thanh bùng nổ" },
              { sc: "Cảnh 5", time: "21-26s", role: "Toàn cảnh sản phẩm" },
              { sc: "Cảnh 6", time: "26-30s", role: "Logo & Kêu gọi" },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-[#080B12] border border-[#182236] rounded p-1.5 flex flex-col justify-between"
              >
                <span className="text-[10px] font-bold text-slate-300">{st.sc}</span>
                <span className="text-[9px] font-mono text-cyan-400 my-0.5">{st.time}</span>
                <span className="text-[8px] text-slate-500 leading-tight">{st.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Production Verification Footer */}
        <div className="bg-[#080B12] border border-[#161F30] rounded-lg px-3 py-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-blue-400">
            <Sparkles className="w-3 h-3" />
            <span>Kịch bản đã sẵn sàng nạp cho Prompt Generator</span>
          </span>
          <span className="text-emerald-400">Retention Score: 96/100</span>
        </div>
      </div>
    </div>
  );
}
