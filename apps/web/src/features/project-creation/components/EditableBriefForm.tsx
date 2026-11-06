"use client";

import React, { useState } from "react";
import type { ProjectBriefFormData, FullAiAnalysisOutput, SceneBreakdownItem } from "../types";
import { SceneTimelineEditor } from "./SceneTimelineEditor";
import { Input, Textarea } from "@/components/ui";
import { Edit3, Sparkles } from "lucide-react";

interface EditableBriefFormProps {
  formData: ProjectBriefFormData;
  aiOutput: FullAiAnalysisOutput;
  onChangeField: <K extends keyof ProjectBriefFormData>(
    field: K,
    value: ProjectBriefFormData[K]
  ) => void;
  onUpdateScene: (index: number, updated: Partial<SceneBreakdownItem>) => void;
}

export function EditableBriefForm({
  formData,
  aiOutput,
  onChangeField,
  onUpdateScene,
}: EditableBriefFormProps): React.ReactElement {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 p-3.5 overflow-hidden select-none">
      {/* 1. Project Metadata & LLM Positioning */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between pb-1 border-b border-[#1C2436]">
          <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span>Thông tin Tổng quan & Định vị (Brief Verified)</span>
          </h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded font-mono flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> LLM Structured
          </span>
        </div>

        {/* 3 Columns Top Row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
              Tên dự án
            </label>
            <Input
              value={formData.projectName}
              onChange={(e) => onChangeField("projectName", e.target.value)}
              className="bg-[#0B0F17] border-[#1E2638] h-7 text-xs font-semibold text-slate-200"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
              Khách hàng
            </label>
            <Input
              value={formData.client}
              onChange={(e) => onChangeField("client", e.target.value)}
              className="bg-[#0B0F17] border-[#1E2638] h-7 text-xs text-slate-200"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
              Tông giọng (Tone of Voice)
            </label>
            <Input
              value={aiOutput.llm.toneOfVoice}
              className="bg-[#0B0F17] border-[#1E2638] h-7 text-xs text-slate-300"
              readOnly
            />
          </div>
        </div>

        {/* 2 Columns Bottom Row: Core message & Audience */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
              Thông điệp cốt lõi (Core Message)
            </label>
            <Textarea
              rows={2}
              value={aiOutput.llm.coreMessage}
              className="bg-[#0B0F17] border-[#1E2638] text-xs resize-none leading-relaxed h-12"
              readOnly
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
              Khách hàng mục tiêu (Target Audience)
            </label>
            <Textarea
              rows={2}
              value={aiOutput.llm.targetAudience}
              className="bg-[#0B0F17] border-[#1E2638] text-xs resize-none leading-relaxed h-12 text-slate-300"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* 2. Storyboard 6 Scenes Studio */}
      <div className="flex-1 min-h-0 bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col overflow-hidden">
        <SceneTimelineEditor
          scenes={aiOutput.scenes}
          activeIndex={activeSceneIndex}
          onSelectScene={setActiveSceneIndex}
          onUpdateScene={onUpdateScene}
        />
      </div>
    </div>
  );
}
