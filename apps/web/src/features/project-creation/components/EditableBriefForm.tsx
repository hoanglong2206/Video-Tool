"use client";

import React, { useState } from "react";
import type { ProjectBriefFormData, FullAiAnalysisOutput, SceneBreakdownItem } from "../types";
import { Input, Textarea } from "@/components/ui";
import { ChevronDown, ChevronUp, Clock, Film, Edit3 } from "lucide-react";

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
  const [expandedScene, setExpandedScene] = useState<number>(0);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 select-none">
      {/* Form Section 1: Overview Metadata */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-[#1C2436]">
          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
          Thông tin Tổng quan & Định vị (Có thể chỉnh sửa)
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase">
              Tên dự án
            </label>
            <Input
              value={formData.projectName}
              onChange={(e) => onChangeField("projectName", e.target.value)}
              className="bg-[#0B0F17] border-[#1E2638] h-8 text-xs mt-1"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase">
              Khách hàng
            </label>
            <Input
              value={formData.client}
              onChange={(e) => onChangeField("client", e.target.value)}
              className="bg-[#0B0F17] border-[#1E2638] h-8 text-xs mt-1"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase">
            Thông điệp cốt lõi (Core Message)
          </label>
          <Textarea
            rows={2}
            value={aiOutput.llm.coreMessage}
            className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1 resize-none leading-relaxed"
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase">
              Khách hàng mục tiêu
            </label>
            <Input
              value={aiOutput.llm.targetAudience}
              className="bg-[#0B0F17] border-[#1E2638] h-8 text-xs mt-1"
              readOnly
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase">
              Tông giọng (Tone of Voice)
            </label>
            <Input
              value={aiOutput.llm.toneOfVoice}
              className="bg-[#0B0F17] border-[#1E2638] h-8 text-xs mt-1"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Form Section 2: 6 Phân cảnh AI đã trích xuất & Chuẩn hóa */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1C2436]">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            Cấu trúc 6 Phân cảnh (Storyboard Scenes Breakdown)
          </h3>
          <span className="text-[10px] text-cyan-400 font-mono">
            Tổng thời lượng: 30s
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {aiOutput.scenes.map((scene, idx) => {
            const isExpanded = expandedScene === idx;

            return (
              <div
                key={scene.sceneNumber}
                className="bg-[#0B0F17] border border-[#1C2436] rounded-lg overflow-hidden transition-all"
              >
                {/* Scene Header Row */}
                <div
                  onClick={() => setExpandedScene(isExpanded ? -1 : idx)}
                  className="px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-[#121826] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded bg-blue-950/80 border border-blue-800/40 text-blue-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      0{scene.sceneNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      {scene.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {scene.durationSeconds}s
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Editable Fields */}
                {isExpanded && (
                  <div className="p-3 pt-1 border-t border-[#1C2436] bg-[#0E131E]/60 flex flex-col gap-2.5">
                    <div>
                      <label className="text-[9px] font-semibold text-slate-400 uppercase">
                        Visual Prompt (Prompt tạo hình ảnh/video)
                      </label>
                      <Textarea
                        rows={2}
                        value={scene.visualPrompt}
                        onChange={(e) =>
                          onUpdateScene(idx, { visualPrompt: e.target.value })
                        }
                        className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-semibold text-slate-400 uppercase">
                          Lời bình (Voiceover / Lời thoại)
                        </label>
                        <Input
                          value={scene.voiceover}
                          onChange={(e) =>
                            onUpdateScene(idx, { voiceover: e.target.value })
                          }
                          className="bg-[#0B0F17] border-[#1E2638] h-7 text-xs mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-semibold text-slate-400 uppercase">
                          Chuyển động Camera (Camera Movement)
                        </label>
                        <Input
                          value={scene.cameraMovement}
                          onChange={(e) =>
                            onUpdateScene(idx, { cameraMovement: e.target.value })
                          }
                          className="bg-[#0B0F17] border-[#1E2638] h-7 text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

