"use client";

import React from "react";
import { LayoutTemplate, Check, Clock, Sparkles } from "lucide-react";
import { SCENE_TEMPLATE_PRESETS } from "../store/initialData";

interface SceneTemplatePickerProps {
  selectedTemplateId?: string;
  onSelectTemplate: (templateId?: string) => void;
}

export function SceneTemplatePicker({
  selectedTemplateId,
  onSelectTemplate,
}: SceneTemplatePickerProps): React.ReactElement {
  const isCustom = !selectedTemplateId;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <LayoutTemplate className="w-3.5 h-3.5 text-cyan-400" />
          <span>Mẫu Bố Cục Kịch Bản (Scene Templates)</span>
        </label>
        <span className="text-[10px] text-slate-400 font-mono">
          {isCustom ? "Đang chọn: Kịch bản tự do" : `${SCENE_TEMPLATE_PRESETS.length} khung dựng sẵn`}
        </span>
      </div>

      {/* 4 Cards: Custom Freeform + 3 Presets */}
      <div className="grid grid-cols-4 gap-2">
        {/* Custom / Freeform Card */}
        <button
          type="button"
          onClick={() => onSelectTemplate(undefined)}
          className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group h-[64px] ${
            isCustom
              ? "bg-cyan-950/60 border-cyan-500 shadow-xs shadow-cyan-500/30 ring-1 ring-cyan-500/50"
              : "bg-[#0E131E] border-[#1E2638] hover:border-[#2E3C56] hover:bg-[#121927]"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-[11px] font-bold truncate flex items-center gap-1 ${
                isCustom ? "text-cyan-300" : "text-slate-200"
              }`}
            >
              <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
              <span>Kịch bản tự do</span>
            </span>
            {isCustom ? (
              <span className="w-4 h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5" />
              </span>
            ) : (
              <span className="text-[9px] text-slate-500 font-mono shrink-0">Brief</span>
            )}
          </div>

          <div className="flex items-center justify-between w-full mt-1">
            <span className="text-[9px] text-slate-400 truncate">
              Bám sát brief thuần túy
            </span>
            <span className="text-[9px] text-cyan-400/80 font-mono uppercase">
              TỰ DO
            </span>
          </div>
        </button>

        {/* 3 Template Radio Cards */}
        {SCENE_TEMPLATE_PRESETS.map((tmpl) => {
          const isSelected = selectedTemplateId === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(isSelected ? undefined : tmpl.id)}
              className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group h-[64px] ${
                isSelected
                  ? "bg-cyan-950/60 border-cyan-500 shadow-xs shadow-cyan-500/30 ring-1 ring-cyan-500/50"
                  : "bg-[#0E131E] border-[#1E2638] hover:border-[#2E3C56] hover:bg-[#121927]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold truncate ${
                    isSelected ? "text-cyan-300" : "text-slate-200"
                  }`}
                  title={tmpl.title}
                >
                  {tmpl.title}
                </span>
                {isSelected ? (
                  <span className="w-4 h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-500 font-mono flex items-center gap-0.5 shrink-0">
                    <Clock className="w-2.5 h-2.5" /> {tmpl.defaultDuration}s
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between w-full mt-1">
                <span className="text-[9px] text-slate-400 truncate max-w-[100px]">
                  {tmpl.sceneCount} Phân cảnh
                </span>
                <span className="text-[9px] text-cyan-400/80 font-mono uppercase">
                  {tmpl.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
