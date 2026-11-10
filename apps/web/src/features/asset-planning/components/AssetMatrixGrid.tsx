"use client";

import React from "react";
import { Filter, X, Smartphone, Image as ImageIcon, Sparkles, Type } from "lucide-react";
import { AssetPlanningCard } from "./AssetPlanningCard";
import type { AssetLayerGroup, PlannedAsset } from "../types";

interface AssetMatrixGridProps {
  assets: PlannedAsset[];
  selectedLayerGroup: AssetLayerGroup | "all";
  selectedSceneNumber: number | null;
  selectedAssetId: string | null;
  generatingAssetId: string | null;
  onSelectGroup: (group: AssetLayerGroup | "all") => void;
  onClearSceneFilter: () => void;
  onSelectAsset: (assetId: string) => void;
  onQuickAction: (assetId: string) => void;
}

const LAYER_CONFIGS: { group: AssetLayerGroup; title: string; subtitle: string; icon: React.ElementType }[] = [
  {
    group: "product_cutout",
    title: "1. Product Cutouts",
    subtitle: "Bảo toàn gốc 100% · SAM 2 / BiRefNet · Không để AI vẽ lại",
    icon: Smartphone,
  },
  {
    group: "environment_plate",
    title: "2. Studio Backgrounds & Environment",
    subtitle: "OpenAI GPT Image / ComfyUI · Phông nền tối Apple #050505",
    icon: ImageIcon,
  },
  {
    group: "vfx_overlay",
    title: "3. VFX & Motion Overlays",
    subtitle: "Alpha channel · Tia sáng vát cạnh, hạt bụi cyan, vệt flare",
    icon: Sparkles,
  },
  {
    group: "brand_typography",
    title: "4. Brand Typography & Vector Decals",
    subtitle: "Asset riêng biệt · SVG Logo & Remotion kinetic typography",
    icon: Type,
  },
];

export function AssetMatrixGrid({
  assets,
  selectedLayerGroup,
  selectedSceneNumber,
  selectedAssetId,
  generatingAssetId,
  onSelectGroup,
  onClearSceneFilter,
  onSelectAsset,
  onQuickAction,
}: AssetMatrixGridProps): React.ReactElement {
  return (
    <section className="flex-1 min-w-0 flex flex-col bg-[#0B0F17] overflow-hidden select-none">
      {/* Filter Chips Bar */}
      <div className="h-12 border-b border-[#1E2638] px-4 flex items-center justify-between shrink-0 bg-[#0C101A]">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
          <button
            type="button"
            onClick={() => onSelectGroup("all")}
            className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer shrink-0 ${
              selectedLayerGroup === "all"
                ? "bg-blue-600 text-white font-medium shadow-sm"
                : "bg-[#111726] text-slate-400 hover:text-slate-200"
            }`}
          >
            Tất cả ({assets.length})
          </button>
          {LAYER_CONFIGS.map((cfg) => {
            const count = assets.filter((a) => a.layerGroup === cfg.group).length;
            const isCurrent = selectedLayerGroup === cfg.group;
            return (
              <button
                key={cfg.group}
                type="button"
                onClick={() => onSelectGroup(cfg.group)}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer shrink-0 ${
                  isCurrent
                    ? "bg-blue-600 text-white font-medium shadow-sm"
                    : "bg-[#111726] text-slate-400 hover:text-slate-200"
                }`}
              >
                {cfg.title.split(". ")[1]} ({count})
              </button>
            );
          })}
        </div>

        {/* Scene Filter Indicator */}
        {selectedSceneNumber !== null && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/60 text-blue-300 text-[11px] shrink-0 font-medium">
            <span>Đang lọc: Scene 0{selectedSceneNumber}</span>
            <button
              type="button"
              onClick={onClearSceneFilter}
              className="hover:text-white cursor-pointer ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Internal Scrollable Canvas */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6">
        {LAYER_CONFIGS.map((cfg) => {
          if (selectedLayerGroup !== "all" && selectedLayerGroup !== cfg.group) {
            return null;
          }
          const groupAssets = assets.filter((a) => a.layerGroup === cfg.group);
          if (groupAssets.length === 0) return null;
          const Icon = cfg.icon;

          return (
            <div key={cfg.group} className="space-y-3">
              {/* Group Title Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-[#1A2336]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                      {cfg.title}
                    </h2>
                    <p className="text-[10px] text-slate-400">
                      {cfg.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101624] text-slate-400 border border-[#1A2336]">
                  {groupAssets.length} Assets
                </span>
              </div>

              {/* Responsive Cards Grid (2 to 4 cols) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupAssets.map((asset) => (
                  <AssetPlanningCard
                    key={asset.id}
                    asset={asset}
                    isSelected={selectedAssetId === asset.id}
                    isGenerating={generatingAssetId === asset.id}
                    onSelect={() => onSelectAsset(asset.id)}
                    onQuickAction={() => onQuickAction(asset.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
