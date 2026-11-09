"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Palette, Trash2, Check, Sparkles } from "lucide-react";

const STUDIO_COLOR_PRESETS = [
  // Row 1: Blues & Cyans
  "#3B82F6", "#2563EB", "#06B6D4", "#0891B2",
  // Row 2: Emerald & Mints
  "#10B981", "#059669", "#34D399", "#064E3B",
  // Row 3: Purples & Pinks
  "#8B5CF6", "#7C3AED", "#EC4899", "#F43F5E",
  // Row 4: Luxury Golds & Ambers
  "#F59E0B", "#D97706", "#FBBF24", "#FEF3C7",
  // Row 5: Titanium & Darks
  "#0B0F17", "#0F172A", "#334155", "#F8FAFC",
];

interface StudioColorPickerModalProps {
  isOpen: boolean;
  currentColor: string;
  colorIndex: number;
  canDelete: boolean;
  onClose: () => void;
  onChangeColor: (newHex: string) => void;
  onDeleteColor?: () => void;
}

export function StudioColorPickerModal({
  isOpen,
  currentColor,
  colorIndex,
  canDelete,
  onClose,
  onChangeColor,
  onDeleteColor,
}: StudioColorPickerModalProps): React.ReactElement {
  const [hexInput, setHexInput] = useState<string>(currentColor);

  useEffect(() => {
    setHexInput(currentColor);
  }, [currentColor]);

  const handleApplyHex = (val: string) => {
    let clean = val.trim();
    if (!clean.startsWith("#")) clean = `#${clean}`;
    setHexInput(clean.toUpperCase());
    if (/^#[0-9A-F]{6}$/i.test(clean)) {
      onChangeColor(clean.toUpperCase());
    }
  };

  const handleSelectPreset = (hex: string) => {
    setHexInput(hex);
    onChangeColor(hex);
  };

  const isValidHex = /^#[0-9A-F]{6}$/i.test(hexInput);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm bg-[#0D121F] border-[#1E2638] text-slate-100 p-4 rounded-2xl shadow-2xl select-none">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between pb-2.5 border-b border-[#1E2638] pr-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <DialogTitle className="text-xs font-bold text-slate-100">
              Chỉnh sửa Mã màu #{colorIndex + 1}
            </DialogTitle>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
            Studio Palette
          </span>
        </DialogHeader>

        {/* Live Preview Box & HEX Input */}
        <div className="flex flex-col gap-3 py-1">
          <div className="flex items-center gap-2.5 bg-[#080C14] border border-[#172033] p-2.5 rounded-xl">
            {/* Color Swatch Preview */}
            <div
              className="w-12 h-12 rounded-lg border-2 border-white/20 shadow-md shrink-0 flex items-center justify-center transition-colors"
              style={{ backgroundColor: isValidHex ? hexInput : currentColor }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-black/40 border border-white/40" />
            </div>

            {/* Input & Hex Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                Mã HEX (6 ký tự)
              </label>
              <div className="flex items-center gap-1.5">
                <Input
                  value={hexInput}
                  onChange={(e) => handleApplyHex(e.target.value)}
                  placeholder="#3B82F6"
                  maxLength={7}
                  className="h-7 text-xs font-mono font-bold bg-[#0D121F] border-[#1E2638] text-slate-100 focus:border-blue-500 uppercase"
                />
              </div>
            </div>
          </div>

          {/* Quick Curated Color Swatches Grid */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-blue-400" />
              <span>Bảng màu chuẩn Studio (1-Click chọn)</span>
            </span>

            <div className="grid grid-cols-5 gap-1.5 p-2 rounded-xl bg-[#080C14] border border-[#172033]">
              {STUDIO_COLOR_PRESETS.map((hex) => {
                const isSelected = hexInput.toUpperCase() === hex.toUpperCase();
                return (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => handleSelectPreset(hex)}
                    title={hex}
                    className={`h-7 rounded-md border flex items-center justify-center transition-all cursor-pointer relative group ${
                      isSelected
                        ? "border-white ring-2 ring-blue-500 scale-105"
                        : "border-black/30 hover:scale-105 hover:border-white/50"
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1E2638]">
          {canDelete && onDeleteColor ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onDeleteColor();
                onClose();
              }}
              className="h-7 text-[11px] text-red-400 hover:text-white bg-red-950/30 hover:bg-red-600 border border-red-800/40 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Xóa màu này</span>
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            size="sm"
            onClick={onClose}
            className="h-7 text-xs px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold cursor-pointer transition-all shadow-md shadow-blue-500/20"
          >
            Hoàn tất
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

