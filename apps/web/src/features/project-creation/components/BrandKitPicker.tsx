"use client";

import React from "react";
import { Shield, Sparkles, Check, SlidersHorizontal } from "lucide-react";
import { BRAND_KIT_PRESETS } from "../store/initialData";

interface BrandKitPickerProps {
  selectedKitId?: string;
  onSelectKit: (kitId?: string) => void;
}

export function BrandKitPicker({
  selectedKitId,
  onSelectKit,
}: BrandKitPickerProps): React.ReactElement {
  const isCustom = !selectedKitId;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>Bộ Nhận Diện Doanh Nghiệp (Brand Kit 1-Click)</span>
        </label>
        <span className="text-[10px] text-slate-400 font-mono">
          {isCustom ? "Đang chọn: Tùy chỉnh riêng" : `${BRAND_KIT_PRESETS.length} bộ kit có sẵn`}
        </span>
      </div>

      {/* 4 Cards: Custom + 3 Presets */}
      <div className="grid grid-cols-4 gap-2">
        {/* Custom / No Preset Card */}
        <button
          type="button"
          onClick={() => onSelectKit(undefined)}
          className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group h-[72px] ${
            isCustom
              ? "bg-blue-950/60 border-blue-500 shadow-xs shadow-blue-500/30 ring-1 ring-blue-500/50"
              : "bg-[#0E131E] border-[#1E2638] hover:border-[#2E3C56] hover:bg-[#121927]"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-[11px] font-bold truncate flex items-center gap-1 ${
                isCustom ? "text-blue-300" : "text-slate-200"
              }`}
            >
              <SlidersHorizontal className="w-2.5 h-2.5 text-blue-400 shrink-0" />
              <span>Tùy chỉnh riêng</span>
            </span>
            {isCustom ? (
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5" />
              </span>
            ) : (
              <span className="text-[9px] text-slate-500 font-mono truncate">Tự do</span>
            )}
          </div>

          {/* Neutral placeholder ribbon */}
          <div className="flex items-center gap-1 w-full mt-1">
            <div className="h-2 flex-1 rounded-sm bg-slate-700/50 border border-slate-600/40" />
            <div className="h-2 flex-1 rounded-sm bg-slate-600/50 border border-slate-600/40" />
            <div className="h-2 flex-1 rounded-sm bg-slate-500/50 border border-slate-600/40" />
            <div className="h-2 flex-1 rounded-sm bg-slate-400/50 border border-slate-600/40" />
          </div>

          <div className="flex items-center justify-between w-full mt-0.5">
            <span className="text-[9px] text-slate-400 truncate">Không dùng mẫu</span>
            <span className="text-[9px] text-blue-400/80 font-mono">Custom</span>
          </div>
        </button>

        {/* 3 Brand Kit Radio Cards */}
        {BRAND_KIT_PRESETS.map((kit) => {
          const isSelected = selectedKitId === kit.id;
          return (
            <button
              key={kit.id}
              type="button"
              onClick={() => onSelectKit(isSelected ? undefined : kit.id)}
              className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group h-[72px] ${
                isSelected
                  ? "bg-blue-950/60 border-blue-500 shadow-xs shadow-blue-500/30 ring-1 ring-blue-500/50"
                  : "bg-[#0E131E] border-[#1E2638] hover:border-[#2E3C56] hover:bg-[#121927]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold truncate ${
                    isSelected ? "text-blue-300" : "text-slate-200"
                  }`}
                >
                  {kit.name}
                </span>
                {isSelected ? (
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-500 font-mono truncate max-w-[60px]">
                    {kit.typeface}
                  </span>
                )}
              </div>

              {/* Color Swatch Ribbon */}
              <div className="flex items-center gap-1 w-full mt-1">
                {kit.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-sm border border-black/30"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between w-full mt-0.5">
                <span className="text-[9px] text-slate-400 truncate">{kit.clientName}</span>
                <span className="text-[9px] text-blue-400/80 font-mono truncate">
                  {kit.toneOfVoice.split(" ")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
