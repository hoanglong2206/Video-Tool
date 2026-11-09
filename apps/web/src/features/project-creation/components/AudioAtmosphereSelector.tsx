"use client";

import React from "react";
import { Volume2, Sparkles, Check, Music, Wand2, Disc, Waves, Zap, Flame } from "lucide-react";

export interface BgmPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  bpm: string;
}

export const BGM_PRESETS: BgmPreset[] = [
  {
    id: "Cinematic Epic",
    name: "Cinematic Epic",
    description: "Hào hùng, kịch tính, bass drop, trailer studio",
    icon: Flame,
    bpm: "110 BPM",
  },
  {
    id: "Cyberpunk Tech",
    name: "Cyberpunk Tech",
    description: "Điện tử synthwave, glitch quang học, hi-tech",
    icon: Zap,
    bpm: "128 BPM",
  },
  {
    id: "Minimal Luxury",
    name: "Minimal Luxury",
    description: "Thanh lịch, piano ambient, sang trọng tinh tế",
    icon: Waves,
    bpm: "90 BPM",
  },
  {
    id: "Upbeat Viral",
    name: "Upbeat Viral",
    description: "Năng động, nhịp điệu dồn dập, hiện đại",
    icon: Disc,
    bpm: "125 BPM",
  },
];

const AUTO_AUDIO_ID = "AI Auto-Mix (Tự động theo Kịch bản)";

interface AudioAtmosphereSelectorProps {
  bgmMood?: string;
  soundMode?: string;
  onChangeBgm: (bgm: string) => void;
  onChangeSoundMode?: (mode: string) => void;
}

export function AudioAtmosphereSelector({
  bgmMood = "Cinematic Epic",
  soundMode = "full",
  onChangeBgm,
  onChangeSoundMode,
}: AudioAtmosphereSelectorProps): React.ReactElement {
  const isAuto = bgmMood === AUTO_AUDIO_ID || bgmMood.toLowerCase().includes("auto");

  return (
    <div className="flex flex-col gap-2">
      {/* Header with smart AI Auto-detect action for when client has no specific sound requirement */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Âm thanh & Nhạc nền AI (Audio & Soundtrack)</span>
        </label>

        {/* Solution for when client has no requirement */}
        <button
          type="button"
          onClick={() => onChangeBgm(isAuto ? "Cinematic Epic" : AUTO_AUDIO_ID)}
          className={`text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-all border ${
            isAuto
              ? "bg-cyan-600 text-white border-cyan-500 shadow-xs shadow-cyan-500/30"
              : "bg-[#0E131E] text-cyan-400 border-[#1E2638] hover:text-cyan-300 hover:border-cyan-500/40"
          }`}
          title="Dành cho brief chưa có yêu cầu âm thanh cụ thể"
        >
          <Wand2 className="w-2.5 h-2.5" />
          <span>{isAuto ? "Đang bật: Tự động theo Kịch bản" : "✨ Chưa có yêu cầu: AI Tự phối"}</span>
        </button>
      </div>

      {/* Preset Cards Grid (2x2) - Matches VisualStyleSelector height */}
      <div className="grid grid-cols-2 gap-2">
        {BGM_PRESETS.map((preset) => {
          const isSelected = !isAuto && (bgmMood.toLowerCase().includes(preset.id.toLowerCase()) || bgmMood === preset.name);
          const Icon = preset.icon;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChangeBgm(preset.id)}
              className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group h-[58px] ${
                isSelected
                  ? "bg-cyan-950/50 border-cyan-500 shadow-xs shadow-cyan-500/20 ring-1 ring-cyan-500/40"
                  : "bg-[#0E131E] border-[#1E2638] hover:border-[#2E3C56] hover:bg-[#121927]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-cyan-600 text-white"
                        : "bg-[#182030] text-slate-400 group-hover:text-cyan-400"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className={`text-xs font-bold truncate ${isSelected ? "text-cyan-300" : "text-slate-200"}`}>
                    {preset.name}
                  </span>
                </div>
                {isSelected ? (
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-3" />
                  </div>
                ) : (
                  <span className="text-[9px] px-1 py-0.2 rounded font-mono text-slate-400 bg-slate-800/60 shrink-0">
                    {preset.bpm}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 truncate leading-snug">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Auto info banner or Sound Mode Pills */}
      {isAuto ? (
        <div className="h-7 px-2.5 rounded bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between text-[11px] text-cyan-300">
          <span className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>AI sẽ tự phân tích nhịp độ video và phối BGM + SFX khớp từng cảnh</span>
          </span>
          <span className="text-[9px] font-mono text-emerald-400 shrink-0">Auto Audio</span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-1 h-7">
          <span className="text-[10px] text-slate-400 shrink-0">Hiệu ứng SFX:</span>
          <div className="grid grid-cols-4 gap-1 flex-1 min-w-0">
            {[
              { id: "full", label: "BGM + SFX FX" },
              { id: "bgm_only", label: "Chỉ BGM" },
              { id: "sfx_only", label: "Chỉ SFX" },
              { id: "mute", label: "Mute" },
            ].map((mode) => {
              const active = soundMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onChangeSoundMode && onChangeSoundMode(mode.id)}
                  className={`py-1 text-[10px] rounded font-medium transition-colors cursor-pointer border truncate ${
                    active
                      ? "bg-cyan-600 text-white font-bold border-cyan-500"
                      : "bg-[#0E131E] text-slate-400 border-[#1E2638] hover:text-slate-200"
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
