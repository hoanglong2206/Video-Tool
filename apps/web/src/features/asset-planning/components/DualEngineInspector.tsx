"use client";

import React from "react";
import { Sparkles, Cpu, Cloud, Check, Loader2, RefreshCw, Scissors, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui";
import { LIGHTING_PRESETS, ASPECT_RATIO_OPTIONS, type PlannedAsset, type EngineMode } from "../types";

interface DualEngineInspectorProps {
  asset?: PlannedAsset;
  engineMode: EngineMode;
  activePreset: string;
  activeRatio: string;
  isGenerating: boolean;
  progressPercent: number;
  onEngineChange: (mode: EngineMode) => void;
  onPresetChange: (presetId: string) => void;
  onRatioChange: (ratioId: string) => void;
  onTriggerGenerate: () => void;
}

export function DualEngineInspector({
  asset,
  engineMode,
  activePreset,
  activeRatio,
  isGenerating,
  progressPercent,
  onEngineChange,
  onPresetChange,
  onRatioChange,
  onTriggerGenerate,
}: DualEngineInspectorProps): React.ReactElement {
  if (!asset) {
    return (
      <aside className="w-88 border-l border-[#1E2638] bg-[#0A0E17] p-5 flex items-center justify-center text-slate-500 text-xs shrink-0 select-none">
        Chọn một tài nguyên để xem thuộc tính & cấu hình AI
      </aside>
    );
  }

  const isProduct = asset.layerGroup === "product_cutout";
  const isTypography = asset.layerGroup === "brand_typography";

  return (
    <aside className="w-88 border-l border-[#1E2638] bg-[#0A0E17] flex flex-col shrink-0 select-none overflow-hidden">
      {/* Top Header */}
      <div className="p-4 border-b border-[#1E2638] bg-[#0D121F]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
            Inspector & AI Presets
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60 font-semibold">
            v{asset.version} / {asset.totalVersions}
          </span>
        </div>
        <h2 className="text-xs font-bold text-slate-100 truncate">
          {asset.name}
        </h2>
      </div>

      {/* Internal Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-5">
        {/* Brand Protection Warning for Product */}
        {isProduct && (
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-lg p-2.5 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-300 leading-snug">
              <span className="font-semibold text-emerald-300">Khóa nhận diện: </span>
              Giữ nguyên hình ảnh gốc làm chuẩn. AI chỉ tách nền (SAM 2) hoặc chỉnh ánh sáng viền.
            </div>
          </div>
        )}

        {/* Engine Switcher */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Engine xử lý AI
          </label>
          <div className="grid grid-cols-2 gap-1.5 bg-[#0F1420] p-1 rounded-lg border border-[#1A2234]">
            <button
              type="button"
              onClick={() => onEngineChange("openai")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                engineMode === "openai"
                  ? "bg-blue-600 text-white font-medium shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>OpenAI API</span>
            </button>
            <button
              type="button"
              onClick={() => onEngineChange("comfyui")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                engineMode === "comfyui"
                  ? "bg-indigo-600 text-white font-medium shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>ComfyUI Node</span>
            </button>
          </div>
        </div>

        {/* Lighting & Style Presets (Zero Typing) */}
        {!isTypography && (
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Phong cách & Ánh sáng (Presets)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LIGHTING_PRESETS.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => onPresetChange(preset.id)}
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#141C2E] border-blue-500 shadow-sm"
                        : "bg-[#0F1420] border-[#1C2538] hover:border-[#28354E]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: preset.colorHex }}
                      />
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {preset.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                      {preset.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Aspect Ratio Pills */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Tỷ lệ khung hình (Aspect Ratio)
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {ASPECT_RATIO_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onRatioChange(opt.id)}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-colors border cursor-pointer text-center ${
                  activeRatio === opt.id
                    ? "bg-blue-600 text-white border-blue-500 font-semibold"
                    : "bg-[#0F1420] text-slate-400 border-[#1C2538] hover:text-slate-200"
                }`}
              >
                {opt.id}
              </button>
            ))}
          </div>
        </div>

        {/* Live Progress Bar if Generating */}
        {isGenerating && (
          <div className="p-3 rounded-lg bg-[#111726] border border-blue-500/40 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-blue-300 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang xử lý qua {engineMode.toUpperCase()}...</span>
              </span>
              <span className="font-mono tabular-nums font-bold text-blue-400">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#1A2234] overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* 4 Candidate Variations Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Biến thể (Candidates)
            </label>
            <span className="text-[10px] font-mono text-slate-500">4 sinh ra</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className={`aspect-video rounded-lg border bg-[#0B0E16] flex items-center justify-center cursor-pointer transition-all ${
                  idx === 1
                    ? "border-blue-500 ring-1 ring-blue-500/50 bg-[#141C2E]"
                    : "border-[#1A2336] hover:border-[#28354E]"
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400">
                  {idx === 1 ? "✓ Bản chọn (v1)" : `Thử nghiệm #${idx}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="p-4 border-t border-[#1E2638] bg-[#0D121F]">
        <Button
          size="sm"
          disabled={isGenerating}
          onClick={onTriggerGenerate}
          className="w-full h-9 bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isProduct ? (
            <Scissors className="w-4 h-4" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>
            {isProduct
              ? "Tách nền siêu mịn (SAM 2)"
              : `Sinh tài nguyên qua ${engineMode === "openai" ? "OpenAI" : "ComfyUI"}`}
          </span>
        </Button>
      </div>
    </aside>
  );
}
