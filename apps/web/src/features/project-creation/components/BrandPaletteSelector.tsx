"use client";

import React, { useState } from "react";
import { Palette, Plus, Trash2, Type } from "lucide-react";
import { StudioColorPickerModal } from "./StudioColorPickerModal";

export interface ColorPalettePreset {
  id: string;
  name: string;
  colors: string[];
}

export const PALETTE_PRESETS: ColorPalettePreset[] = [
  {
    id: "aurora",
    name: "Aurora Cyber",
    colors: ["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"],
  },
  {
    id: "synth",
    name: "Neon Synth",
    colors: ["#0E0720", "#8B5CF6", "#EC4899", "#F43F5E"],
  },
  {
    id: "emerald",
    name: "Emerald Tech",
    colors: ["#06201B", "#10B981", "#34D399", "#A7F3D0"],
  },
  {
    id: "amber",
    name: "Amber Gold",
    colors: ["#1C1204", "#F59E0B", "#FBBF24", "#FEF3C7"],
  },
  {
    id: "titanium",
    name: "Titanium Mono",
    colors: ["#0F172A", "#475569", "#94A3B8", "#F8FAFC"],
  },
];

interface BrandPaletteSelectorProps {
  colors: string[];
  typeface: string;
  onChangeColors: (colors: string[]) => void;
  onChangeTypeface: (font: string) => void;
}

export function BrandPaletteSelector({
  colors,
  typeface,
  onChangeColors,
}: BrandPaletteSelectorProps): React.ReactElement {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleColorChange = (newHex: string) => {
    if (editingIndex === null) return;
    const newColors = [...colors];
    newColors[editingIndex] = newHex;
    onChangeColors(newColors);
  };

  const handleAddColor = () => {
    if (colors.length >= 6) return;
    const newIdx = colors.length;
    onChangeColors([...colors, "#6366F1"]);
    setEditingIndex(newIdx);
  };

  const handleRemoveColor = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (colors.length <= 2) return;
    onChangeColors(colors.filter((_, i) => i !== idx));
    setEditingIndex(null);
  };

  const isCurrentPreset = (preset: ColorPalettePreset) =>
    JSON.stringify(preset.colors) === JSON.stringify(colors);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-blue-400" />
          <span>Bảng màu thương hiệu (Brand Palette)</span>
        </label>
        <span className="text-[10px] text-slate-400">Click màu để mở Studio Color Picker</span>
      </div>

      {/* Palette Presets */}
      <div className="grid grid-cols-5 gap-1.5">
        {PALETTE_PRESETS.map((p) => {
          const selected = isCurrentPreset(p);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChangeColors(p.colors)}
              title={p.name}
              className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                selected
                  ? "bg-blue-950/40 border-blue-500 ring-1 ring-blue-500/40"
                  : "bg-[#0E131E] border-[#1E2638] hover:border-[#2C3B55]"
              }`}
            >
              <div className="flex -space-x-1 items-center">
                {p.colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-xs inline-block"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span className={`text-[10px] truncate max-w-full font-medium ${selected ? "text-blue-300 font-bold" : "text-slate-400"}`}>
                {p.name.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Current Swatches Row + Font selection */}
      <div className="flex items-center justify-between pt-1 border-t border-[#1C2436]/60">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400">Mã màu:</span>
          <div className="flex items-center gap-1.5">
            {colors.map((c, idx) => (
              <div
                key={idx}
                onClick={() => setEditingIndex(idx)}
                className="group relative w-6 h-6 rounded-md border border-[#2D3950] shadow-sm flex items-center justify-center cursor-pointer transition-all hover:ring-2 hover:ring-blue-400 hover:border-transparent"
                style={{ backgroundColor: c }}
                title={`${c} (Click để chỉnh màu)`}
              >
                {colors.length > 2 && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveColor(idx, e)}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Xóa màu"
                  >
                    <Trash2 className="w-2 h-2" />
                  </button>
                )}
              </div>
            ))}

            {colors.length < 6 && (
              <button
                type="button"
                onClick={handleAddColor}
                title="Thêm màu"
                className="w-6 h-6 rounded-md border border-dashed border-slate-600 hover:border-blue-400 text-slate-400 hover:text-blue-300 flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Type className="w-3 h-3 text-slate-500" />
          <span className="font-mono text-[10px] text-slate-300 bg-[#0E131E] px-1.5 py-0.5 rounded border border-[#1E2638]">
            {typeface}
          </span>
        </div>
      </div>

      {/* Modern Studio Dark-Themed Color Picker Modal */}
      {editingIndex !== null && (
        <StudioColorPickerModal
          isOpen={editingIndex !== null}
          currentColor={colors[editingIndex] || "#6366F1"}
          colorIndex={editingIndex}
          canDelete={colors.length > 2}
          onClose={() => setEditingIndex(null)}
          onChangeColor={handleColorChange}
          onDeleteColor={() => handleRemoveColor(editingIndex)}
        />
      )}
    </div>
  );
}
