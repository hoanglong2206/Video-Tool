"use client";

import React from "react";
import { Volume2, Mic, Music, Radio } from "lucide-react";

interface AudioAtmosphereSelectorProps {
  voiceActor?: string;
  bgmMood?: string;
  targetChannel?: string;
  onChangeVoice: (voice: string) => void;
  onChangeBgm: (bgm: string) => void;
  onChangeChannel: (channel: string) => void;
}

const VOICE_OPTIONS = [
  { id: "Trấn Vũ (Nam - Trầm ấm)", label: "Trấn Vũ (Nam)", tag: "Trầm ấm" },
  { id: "Mai Lan (Nữ - Truyền cảm)", label: "Mai Lan (Nữ)", tag: "Truyền cảm" },
  { id: "Marcus (US - Studio Pro)", label: "Marcus (US)", tag: "Studio" },
  { id: "Chỉ BGM (Không lồng tiếng)", label: "Tắt Voice", tag: "Chỉ BGM" },
];

const BGM_OPTIONS = [
  { id: "Cinematic Epic", label: "Cinematic Epic", tag: "Kịch tính" },
  { id: "Cyberpunk Tech", label: "Cyberpunk Tech", tag: "Điện tử" },
  { id: "Minimal Luxury", label: "Minimal Luxury", tag: "Sang trọng" },
  { id: "Upbeat Viral", label: "Upbeat Viral", tag: "Năng động" },
];

const CHANNEL_OPTIONS = [
  { id: "YouTube / TVC 16:9", label: "YouTube / TVC" },
  { id: "TikTok / Reels 9:16", label: "TikTok / Reels" },
  { id: "Social Feed 1:1", label: "Social Feed 1:1" },
];

export function AudioAtmosphereSelector({
  voiceActor = "Trấn Vũ (Nam - Trầm ấm)",
  bgmMood = "Cinematic Epic",
  targetChannel = "YouTube / TVC 16:9",
  onChangeVoice,
  onChangeBgm,
  onChangeChannel,
}: AudioAtmosphereSelectorProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-[#1C2436]">
        <div className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
            Âm thanh & Giọng đọc AI (AI Audio)
          </h3>
        </div>
        <span className="text-[10px] text-cyan-400 font-mono">
          4 MC Ảo & Multi-Track BGM
        </span>
      </div>

      {/* Grid of 3 Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Voiceover Actor */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
            <Mic className="w-2.5 h-2.5 text-blue-400" /> Giọng đọc AI
          </label>
          <div className="grid grid-cols-2 gap-1">
            {VOICE_OPTIONS.map((opt) => {
              const active = voiceActor === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeVoice(opt.id)}
                  className={`px-1.5 py-1 rounded text-left transition-colors cursor-pointer border ${
                    active
                      ? "bg-blue-600 text-white font-bold border-blue-500 shadow-xs shadow-blue-500/30"
                      : "bg-[#0E131E] text-slate-400 border-[#1E2638] hover:text-slate-200 hover:border-[#2C3852]"
                  }`}
                >
                  <div className="text-[11px] leading-tight truncate">{opt.label}</div>
                  <span className={`text-[9px] block leading-none font-mono ${active ? "text-blue-100" : "text-slate-400"}`}>
                    {opt.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* BGM Mood */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
            <Music className="w-2.5 h-2.5 text-cyan-400" /> Nhạc nền BGM
          </label>
          <div className="grid grid-cols-2 gap-1">
            {BGM_OPTIONS.map((opt) => {
              const active = bgmMood === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeBgm(opt.id)}
                  className={`px-1.5 py-1 rounded text-left transition-colors cursor-pointer border ${
                    active
                      ? "bg-cyan-600 text-white font-bold border-cyan-500 shadow-xs shadow-cyan-500/30"
                      : "bg-[#0E131E] text-slate-400 border-[#1E2638] hover:text-slate-200 hover:border-[#2C3852]"
                  }`}
                >
                  <div className="text-[11px] leading-tight truncate">{opt.label}</div>
                  <span className={`text-[9px] block leading-none font-mono ${active ? "text-cyan-100" : "text-slate-400"}`}>
                    {opt.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Channel */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-indigo-400" /> Kênh phát hành
          </label>
          <div className="flex flex-col gap-1">
            {CHANNEL_OPTIONS.map((opt) => {
              const active = targetChannel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeChannel(opt.id)}
                  className={`px-2 py-1 rounded text-left text-[11px] font-medium transition-colors cursor-pointer border truncate ${
                    active
                      ? "bg-indigo-600 text-white font-bold border-indigo-500 shadow-xs shadow-indigo-500/30"
                      : "bg-[#0E131E] text-slate-400 border-[#1E2638] hover:text-slate-200 hover:border-[#2C3852]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

