"use client";

import React from "react";
import { Sparkles, Check, Film, Cpu, Gem, Zap } from "lucide-react";
import { Input } from "@/components/ui";

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "3D Cinematic Minimal Tech",
    name: "3D Cinematic Tech",
    description: "Kim loại phay xước, studio rim-light, tương phản cao",
    icon: Film,
    badge: "Phổ biến",
  },
  {
    id: "Cyberpunk Neon Future",
    name: "Cyberpunk Neon",
    description: "Ánh sáng neon điện tử, glitch quang học, công nghệ tương lai",
    icon: Cpu,
    badge: "Hi-Tech",
  },
  {
    id: "Minimal Luxury Elegance",
    name: "Minimal Luxury",
    description: "Tối giản sang trọng, tone vàng kim/đen, thanh lịch",
    icon: Gem,
    badge: "Cao cấp",
  },
  {
    id: "Kinetic Dynamic Motion",
    name: "Kinetic Motion",
    description: "Chuyển động nhịp điệu dồn dập, typographic typography",
    icon: Zap,
    badge: "Năng động",
  },
];

interface VisualStyleSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

export function VisualStyleSelector({
  value,
  onChange,
}: VisualStyleSelectorProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Phong cách thị giác (Visual Style)</span>
        </label>
        <span className="text-[10px] text-slate-400">Chọn mẫu AI hoặc tự nhập</span>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-2 gap-2">
        {STYLE_PRESETS.map((preset) => {
          const isSelected = value.toLowerCase().includes(preset.id.toLowerCase()) || value === preset.name;
          const Icon = preset.icon;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.id)}
              className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group ${
                isSelected
                  ? "bg-blue-950/40 border-blue-500 shadow-sm shadow-blue-500/20 ring-1 ring-blue-500/40"
                  : "bg-[#0E131E] border-[#1E2638] hover:border-[#2E3C56] hover:bg-[#121927]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-[#182030] text-slate-400 group-hover:text-blue-400"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? "text-blue-300" : "text-slate-200"}`}>
                    {preset.name}
                  </span>
                </div>
                {isSelected ? (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                ) : (
                  <span className="text-[9px] px-1 py-0.2 rounded font-mono text-slate-400 bg-slate-800/60">
                    {preset.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Custom input or tweak */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[10px] text-slate-400 whitespace-nowrap">Tùy chỉnh:</span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Hoặc nhập phong cách tùy ý (VD: Cyberpunk 8K, Anime Makoto Shinkai...)"
          className="h-7 text-xs bg-[#0E131E] border-[#1E2638] focus:border-blue-500 py-1"
        />
      </div>
    </div>
  );
}
