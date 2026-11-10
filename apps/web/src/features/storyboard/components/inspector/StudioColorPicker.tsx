"use client";

import React, { useState, useEffect } from "react";
import { SunMedium, Palette, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface StudioColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const STUDIO_PRESETS = [
  { hex: "#06B6D4", label: "Cyber Cyan" },
  { hex: "#0EA5E9", label: "Sky Blue" },
  { hex: "#3B82F6", label: "Cinema Blue" },
  { hex: "#8B5CF6", label: "Electric Violet" },
  { hex: "#A855F7", label: "Neon Purple" },
  { hex: "#EC4899", label: "Vapor Pink" },
  { hex: "#EF4444", label: "Crimson Rim" },
  { hex: "#F97316", label: "Sunset Orange" },
  { hex: "#F59E0B", label: "Amber Gold" },
  { hex: "#10B981", label: "Matrix Emerald" },
  { hex: "#64748B", label: "Moody Slate" },
  { hex: "#F8FAFC", label: "Studio 5600K" },
];

export function StudioColorPicker({
  color = "#06B6D4",
  onChange,
}: StudioColorPickerProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color.replace("#", ""));

  useEffect(() => {
    setHexInput(color.replace("#", ""));
  }, [color]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
    setHexInput(val);
    if (val.length === 6 || val.length === 3) {
      onChange(`#${val}`);
    }
  };

  const handleHueSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value, 10);
    const s = 0.9;
    const l = 0.55;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (hue >= 0 && hue < 60) { r = c; g = x; }
    else if (hue >= 60 && hue < 120) { r = x; g = c; }
    else if (hue >= 120 && hue < 180) { g = c; b = x; }
    else if (hue >= 180 && hue < 240) { g = x; b = c; }
    else if (hue >= 240 && hue < 300) { r = x; b = c; }
    else { r = c; b = x; }

    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    onChange(hex);
  };

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        {/* Compact Studio Swatch & Bar */}
        <div className="flex items-center gap-2 bg-[#070A10] p-1.5 rounded-lg border border-[#1E2638]">
          {/* Glow swatch trigger button */}
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="w-6 h-6 rounded-md border border-white/20 transition-all cursor-pointer shrink-0 relative flex items-center justify-center group"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}60`,
              }}
              title="Mở bảng màu Studio Rim-Light"
            >
              <Palette className="w-3 h-3 text-black/60 group-hover:text-black transition-colors" />
            </button>
          </DropdownMenuTrigger>

          {/* Direct Hex Input */}
          <div className="flex items-center gap-0.5 bg-[#0D1322] px-1.5 py-0.5 rounded border border-[#1E273A] font-mono text-xs">
            <span className="text-slate-500 font-bold select-none">#</span>
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              className="w-16 bg-transparent text-slate-100 font-mono font-bold uppercase focus:outline-none text-[11px]"
              maxLength={6}
              placeholder="06B6D4"
            />
          </div>

          {/* Quick Top 5 Presets */}
          <div className="flex items-center gap-1 ml-auto">
            {STUDIO_PRESETS.slice(0, 5).map((p) => (
              <button
                key={p.hex}
                type="button"
                onClick={() => onChange(p.hex)}
                style={{ backgroundColor: p.hex }}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  color.toLowerCase() === p.hex.toLowerCase()
                    ? "ring-2 ring-white scale-110 shadow-sm"
                    : "border-slate-800 opacity-70 hover:opacity-100"
                }`}
                title={p.label}
              />
            ))}
          </div>
        </div>

        {/* Sleek Dark Theme Popover Panel Portaled Directly Below Trigger */}
        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={6}
          onKeyDown={(e) => e.stopPropagation()}
          className="w-64 bg-[#0A0F1D] border border-[#232F46] rounded-xl p-3 shadow-2xl shadow-black/90 z-50 flex flex-col gap-2.5"
        >
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1 text-cyan-400">
              <SunMedium className="w-3 h-3" /> Studio Rim-Light
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-300 font-bold">{color}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-0.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                title="Đóng bảng màu"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Hue Rainbow Slider */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-slate-400 font-mono">Dải màu Quang phổ (Spectrum):</label>
            <input
              type="range"
              min={0}
              max={359}
              defaultValue={180}
              onChange={handleHueSlider}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-full h-3 rounded-full appearance-none cursor-pointer border border-white/20"
              style={{
                background: "linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff0080, #ff0000)",
              }}
            />
          </div>

          {/* 12 Cinematic Presets Grid */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-slate-400 font-mono">Presets Điện ảnh Studio:</label>
            <div className="grid grid-cols-4 gap-1.5">
              {STUDIO_PRESETS.map((p) => {
                const isActive = color.toLowerCase() === p.hex.toLowerCase();
                return (
                  <button
                    key={p.hex}
                    type="button"
                    onClick={() => onChange(p.hex)}
                    className={`h-6 rounded-md flex items-center justify-center border transition-all cursor-pointer relative ${
                      isActive ? "ring-2 ring-white scale-105 shadow-md" : "border-slate-800 hover:border-slate-500"
                    }`}
                    style={{ backgroundColor: p.hex }}
                    title={p.label}
                  >
                    {isActive && <Check className="w-3 h-3 text-black drop-shadow" />}
                  </button>
                );
              })}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
