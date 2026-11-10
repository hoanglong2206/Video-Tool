"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { Textarea } from "@/components/ui";
import { Sparkles, Wand2, Volume2, History } from "lucide-react";

interface InspectorScriptTabProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
  onRegenerateFrame?: () => void;
}

export function InspectorScriptTab({
  scene,
  onChangeField,
  onRegenerateFrame,
}: InspectorScriptTabProps): React.ReactElement {
  const STYLE_PRESETS = ["Photorealistic 8K", "Octane 3D", "Cyberpunk Neon", "Minimal Tech"];
  const estimatedSeconds = Math.round(((scene.voiceover || "").split(" ").filter(Boolean).length / 2.5));

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Tiêu đề phân cảnh (2 dòng) */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Tiêu đề phân cảnh
        </label>
        <Textarea
          rows={2}
          value={scene.title}
          onChange={(e) => onChangeField("title", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs font-semibold text-slate-200 resize-none h-[52px] leading-snug"
          placeholder="Nhập tiêu đề phân cảnh..."
        />
      </div>

      {/* 2. Visual Prompt (AI Renderer - 7 dòng) */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Visual Prompt (AI Renderer)
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
          rows={7}
          value={scene.visualPrompt || scene.description || ""}
          onChange={(e) => onChangeField("visualPrompt", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs resize-none leading-relaxed h-[140px]"
          placeholder="Mô tả bối cảnh hình ảnh điện ảnh..."
        />

        {/* Quick Style Chips */}
        <div className="flex items-center gap-1 flex-wrap mt-1.5">
          <span className="text-[9px] text-slate-500 font-mono">Gợi ý style:</span>
          {STYLE_PRESETS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                const cur = scene.visualPrompt || scene.description || "";
                onChangeField("visualPrompt", `${cur}, ${st}`);
              }}
              className="text-[9px] px-1.5 py-0.5 rounded bg-[#121927] hover:bg-[#1C273C] border border-[#1E2638] text-slate-300 font-mono cursor-pointer"
            >
              +{st}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Lời bình & Thoại (Voiceover - 6 dòng) */}
      <div className="pt-2 border-t border-[#1C2436]">
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-blue-400" /> Lời bình (Voiceover / Thoại)
          </label>
          <span className="text-[9px] text-cyan-400 font-mono tabular-nums">
            ~{estimatedSeconds}s đọc ({(scene.voiceover || "").length} ký tự)
          </span>
        </div>
        <Textarea
          rows={6}
          value={scene.voiceover || scene.creativeDirection || ""}
          onChange={(e) => onChangeField("voiceover", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs resize-none leading-relaxed h-[125px] text-slate-200"
          placeholder="Nhập nội dung lời thoại thuyết minh cho cảnh này..."
        />
      </div>

      {/* 4. Lịch sử phiên bản (Version History) */}
      {scene.versions && scene.versions.length > 0 && (
        <div className="pt-2 border-t border-[#1C2436]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <History className="w-3 h-3 text-cyan-400" /> Lịch sử ({scene.versions.length} phiên bản)
            </span>
          </div>
          <div className="flex flex-col gap-1 max-h-28 overflow-y-auto pr-0.5">
            {scene.versions.map((ver, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#070A10] p-1.5 rounded border border-[#1A2234] text-[10px]">
                <span className="font-bold text-slate-200 font-mono">v{ver.versionNumber}</span>
                <span className="text-slate-400 truncate max-w-[140px] text-[9px]">{ver.title}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (ver.visualPrompt) onChangeField("visualPrompt", ver.visualPrompt);
                    if (ver.title) onChangeField("title", ver.title);
                    if (ver.voiceover) onChangeField("voiceover", ver.voiceover);
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
