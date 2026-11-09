"use client";

import React from "react";
import { Sparkles, Check, Film, Cpu, Gem, Zap, Wand2 } from "lucide-react";
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
    description: "Ánh sáng neon điện tử, glitch quang học, tương lai",
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
    description: "Chuyển động nhịp điệu dồn dập, typographic",
    icon: Zap,
    badge: "Năng động",
  },
];

const AUTO_STYLE_ID = "AI Auto-Detect (Tự động theo Brief)";

interface VisualStyleSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

export function VisualStyleSelector({
  value,
  onChange,
}: VisualStyleSelectorProps): React.ReactElement {
  const isAuto = value === AUTO_STYLE_ID || value.toLowerCase().includes("auto");

  return (
    <div className="flex flex-col gap-2">
      {/* Header with smart AI Auto-detect action for when client has no specific requirement */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Phong cách thị giác (Visual Style)</span>
        </label>
        
        {/* Solution for when client has no requirement */}
        <button
          type="button"
          onClick={() => onChange(isAuto ? "3D Cinematic Minimal Tech" : AUTO_STYLE_ID)}
          className={`text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-all border ${
            isAuto
              ? "bg-blue-600 text-white border-blue-500 shadow-xs shadow-blue-500/30"
              : "bg-[#0E131E] text-cyan-400 border-[#1E2638] hover:text-cyan-300 hover:border-cyan-500/40"
          }`}
          title="Dành cho brief chưa có yêu cầu phong cách cụ thể"
        >
          <Wand2 className="w-2.5 h-2.5" />
          <span>{isAuto ? "Đang bật: Tự động theo Brief" : "✨ Chưa có yêu cầu: AI Tự chọn"}</span>
        </button>
      </div>

      {/* Preset Cards Grid (2x2) */}
      <div className="grid grid-cols-2 gap-2">
        {STYLE_PRESETS.map((preset) => {
          const isSelected = !isAuto && (value.toLowerCase().includes(preset.id.toLowerCase()) || value === preset.name);
          const Icon = preset.icon;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.id)}
              className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group h-[58px] ${
                isSelected
                  ? "bg-blue-950/50 border-blue-500 shadow-xs shadow-blue-500/20 ring-1 ring-blue-500/40"
                  : "bg-[#0E131E] border-[#1E2638] hover:border-[#2E3C56] hover:bg-[#121927]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-[#182030] text-slate-400 group-hover:text-blue-400"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className={`text-xs font-bold truncate ${isSelected ? "text-blue-300" : "text-slate-200"}`}>
                    {preset.name}
                  </span>
                </div>
                {isSelected ? (
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
                    <Check className="w-2 h-2 stroke-3" />
                  </div>
                ) : (
                  <span className="text-[9px] px-1 py-0.2 rounded font-mono text-slate-400 bg-slate-800/60 shrink-0">
                    {preset.badge}
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

      {/* Auto info banner or custom input */}
      {isAuto ? (
        <div className="h-7 px-2.5 rounded bg-blue-950/40 border border-blue-800/40 flex items-center justify-between text-[11px] text-blue-300">
          <span className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>AI sẽ tự phân tích sản phẩm & brief để chọn phong cách tối ưu</span>
          </span>
          <span className="text-[9px] font-mono text-emerald-400 shrink-0">Auto AI</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 whitespace-nowrap">Tùy chỉnh:</span>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Hoặc nhập phong cách riêng..."
            className="h-7 text-xs bg-[#0E131E] border-[#1E2638] focus:border-blue-500 py-1"
          />
        </div>
      )}
    </div>
  );
}
