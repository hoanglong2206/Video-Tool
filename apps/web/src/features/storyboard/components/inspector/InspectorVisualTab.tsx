"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { Input, Textarea } from "@/components/ui";
import { Sparkles, Wand2, History } from "lucide-react";

interface InspectorVisualTabProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
  onRegenerateFrame?: () => void;
}

export function InspectorVisualTab({
  scene,
  onChangeField,
  onRegenerateFrame,
}: InspectorVisualTabProps): React.ReactElement {
  const STYLE_PRESETS = ["Photorealistic 8K", "Octane 3D", "Cyberpunk Neon", "Minimal Tech"];

  return (
    <div className="flex flex-col gap-3">
      {/* Title edit */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Tiêu đề phân cảnh
        </label>
        <Input
          value={scene.title}
          onChange={(e) => onChangeField("title", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] h-7 text-xs font-semibold text-slate-200"
        />
      </div>

      {/* Prompt Editor */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Visual Prompt (AI Renderer)
          </label>
          {onRegenerateFrame && (
            <button
              type="button"
              onClick={onRegenerateFrame}
              className="text-[9.5px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-mono"
            >
              <Wand2 className="w-2.5 h-2.5" /> Sinh lại frame
            </button>
          )}
        </div>
        <Textarea
          rows={4}
          value={scene.visualPrompt || scene.description || ""}
          onChange={(e) => onChangeField("visualPrompt", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs resize-none leading-relaxed h-24"
          placeholder="Mô tả bối cảnh hình ảnh điện ảnh..."
        />
      </div>

      {/* Style Pills Quick Add */}
      <div>
        <span className="text-[9.5px] text-slate-400 uppercase font-semibold block mb-1">
          Gợi ý phong cách 1-Click:
        </span>
        <div className="flex flex-wrap gap-1">
          {STYLE_PRESETS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                const cur = scene.visualPrompt || scene.description || "";
                onChangeField("visualPrompt", `${cur}, ${st}`);
              }}
              className="text-[9.5px] px-2 py-0.5 rounded bg-[#121927] hover:bg-[#1C273C] border border-[#1E2638] text-slate-300 font-mono cursor-pointer"
            >
              +{st}
            </button>
          ))}
        </div>
      </div>

      {/* Versions Ribbon */}
      {scene.versions && scene.versions.length > 0 && (
        <div className="pt-2 border-t border-[#1C2436]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <History className="w-3 h-3 text-cyan-400" /> Lịch sử ({scene.versions.length} versions)
            </span>
          </div>
          <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
            {scene.versions.map((ver, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#070A10] p-1.5 rounded border border-[#1A2234] text-[10px]">
                <span className="font-bold text-slate-200 font-mono">v{ver.versionNumber}</span>
                <span className="text-slate-400 truncate max-w-[140px] text-[9px]">{ver.title}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (ver.visualPrompt) onChangeField("visualPrompt", ver.visualPrompt);
                    if (ver.title) onChangeField("title", ver.title);
                  }}
                  className="text-[8.5px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-mono cursor-pointer"
                >
                  Khôi phục
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
