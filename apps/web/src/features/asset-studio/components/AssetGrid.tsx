import React from "react";
import type { AssetItem, AssetSourceType } from "../types";
import { AssetCard } from "./AssetCard";
import { EmptyState } from "@/components/shared";
import { Skeleton } from "@/components/ui";

interface AssetGridProps {
  assets: AssetItem[];
  selectedAssetId: string;
  sourceFilter: AssetSourceType;
  searchQuery: string;
  isLoading?: boolean;
  onSelectAsset: (assetId: string) => void;
  onSourceFilterChange: (source: AssetSourceType) => void;
  onSearchChange: (query: string) => void;
}

export function AssetGrid({
  assets,
  selectedAssetId,
  sourceFilter,
  searchQuery,
  isLoading,
  onSelectAsset,
  onSourceFilterChange,
  onSearchChange,
}: AssetGridProps): React.ReactElement {
  return (
    <section className="flex-1 flex flex-col p-6 overflow-y-auto">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search assets"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-56 h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
        />

        {/* Segmented Pill: Generated vs Original */}
        <div className="h-8 bg-[#101520] border border-[#1C2436] rounded-md p-0.5 flex items-center select-none text-xs">
          <button
            type="button"
            onClick={() => onSourceFilterChange("generated")}
            className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              sourceFilter === "generated"
                ? "bg-[#1A2234] text-slate-100 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Generated
          </button>
          <button
            type="button"
            onClick={() => onSourceFilterChange("original")}
            className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              sourceFilter === "original"
                ? "bg-[#1A2234] text-slate-100 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Original
          </button>
        </div>
      </div>

      {/* Grid of Assets or Skeleton or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2.5"
            >
              <Skeleton className="w-full aspect-square rounded-lg bg-[#141B29]" />
              <div className="space-y-1.5 mt-1">
                <Skeleton className="h-3.5 w-3/4 rounded" />
                <Skeleton className="h-2.5 w-1/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : assets.length === 0 ? (
        <EmptyState
          title="No assets found"
          description="Try selecting another category or clear your search filter."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              isSelected={asset.id === selectedAssetId}
              onSelect={onSelectAsset}
            />
          ))}
        </div>
      )}
    </section>
  );
}
