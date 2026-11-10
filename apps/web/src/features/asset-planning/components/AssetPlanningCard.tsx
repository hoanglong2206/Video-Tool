"use client";

import React from "react";
import { Sparkles, Layers, Scissors, Box, Check, Loader2, AlertCircle } from "lucide-react";
import type { PlannedAsset } from "../types";

interface AssetPlanningCardProps {
  asset: PlannedAsset;
  isSelected: boolean;
  isGenerating: boolean;
  onSelect: () => void;
  onQuickAction: () => void;
}

export function AssetPlanningCard({
  asset,
  isSelected,
  isGenerating,
  onSelect,
  onQuickAction,
}: AssetPlanningCardProps): React.ReactElement {
  const isProduct = asset.layerGroup === "product_cutout";
  const isBackdrop = asset.layerGroup === "environment_plate";
  const isVfx = asset.layerGroup === "vfx_overlay";
  const isReady = asset.status === "ready";

  const getEngineBadge = () => {
    switch (asset.engine) {
      case "birefnet_sam2":
        return { label: "SAM 2 Cutout", color: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60" };
      case "openai":
        return { label: "OpenAI Image", color: "bg-blue-950/80 text-blue-300 border-blue-700/60" };
      case "comfyui":
        return { label: "ComfyUI Node", color: "bg-indigo-950/80 text-indigo-300 border-indigo-700/60" };
      case "vector":
        return { label: "Vector Decal", color: "bg-amber-950/80 text-amber-300 border-amber-700/60" };
    }
  };

  const badge = getEngineBadge();

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl border p-3 flex flex-col justify-between transition-all cursor-pointer select-none relative group ${
        isSelected
          ? "bg-[#141B2D] border-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.2)] ring-1 ring-blue-500"
          : "bg-[#0F1420] border-[#1C2538] hover:border-[#28354E] hover:bg-[#121826]"
      }`}
    >
      {/* Top Bar: Engine Tag & Status */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded border ${badge.color}`}>
          {badge.label}
        </span>
        <span
          className={`text-[9px] font-mono px-1.5 py-0.5 rounded border flex items-center gap-1 font-semibold ${
            isReady
              ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/50"
              : "bg-amber-950/60 text-amber-300 border-amber-800/50"
          }`}
        >
          {isReady ? <Check className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />}
          {isReady ? "Ready" : "Missing"}
        </span>
      </div>

      {/* Center Media Preview Box (16:10) */}
      <div className="w-full aspect-[16/10] rounded-lg bg-[#0A0D14] border border-[#182030] flex items-center justify-center overflow-hidden relative mb-2.5 group-hover:border-[#232F46] transition-colors">
        {asset.thumbnailUrl ? (
          <img
            src={asset.thumbnailUrl}
            alt={asset.name}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              asset.isTransparent ? "p-2 object-contain" : ""
            }`}
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-500 p-2 text-center">
            {isProduct && <Scissors className="w-5 h-5 text-emerald-500/60" />}
            {isBackdrop && <Layers className="w-5 h-5 text-blue-500/60" />}
            {isVfx && <Sparkles className="w-5 h-5 text-amber-500/60" />}
            {!isProduct && !isBackdrop && !isVfx && <Box className="w-5 h-5 text-purple-500/60" />}
            <span className="text-[10px] font-mono text-slate-400">Chưa sinh ảnh</span>
          </div>
        )}

        {/* Transparent Pattern Grid Overlay for cutouts */}
        {asset.isTransparent && (
          <div className="absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
        )}
      </div>

      {/* Asset Name & Meta */}
      <div className="mb-2">
        <h3 className="text-xs font-semibold text-slate-200 truncate" title={asset.name}>
          {asset.name}
        </h3>
        <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
          {asset.resolution} · {asset.format}
        </p>
      </div>

      {/* Bottom Row: Linked Scenes & 1-Click Action */}
      <div className="flex items-center justify-between pt-2 border-t border-[#182030]">
        <div className="flex items-center gap-1">
          {asset.scenesUsed.map((sNum) => (
            <span
              key={sNum}
              className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#161F32] text-slate-300 border border-[#222E46]"
            >
              S0{sNum}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickAction();
          }}
          disabled={isGenerating}
          className="text-[10px] px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-colors cursor-pointer flex items-center gap-1"
        >
          {isGenerating ? (
            <Loader2 className="w-2.5 h-2.5 animate-spin" />
          ) : (
            <Sparkles className="w-2.5 h-2.5 text-blue-400" />
          )}
          <span>{isReady ? "Tái sinh" : "Tạo ngay"}</span>
        </button>
      </div>
    </div>
  );
}
