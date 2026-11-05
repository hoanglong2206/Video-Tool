import React from "react";
import type { AssetItem } from "../types";

interface AssetCardProps {
  asset: AssetItem;
  isSelected: boolean;
  onSelect: (assetId: string) => void;
}

export function AssetCard({
  asset,
  isSelected,
  onSelect,
}: AssetCardProps): React.ReactElement {
  return (
    <div
      onClick={() => onSelect(asset.id)}
      className={`bg-[#101520] border ${
        isSelected
          ? "border-[#2563EB] shadow-[0_0_15px_-4px_rgba(37,99,235,0.25)]"
          : "border-[#1C2436] hover:border-[#28354D]"
      } rounded-lg aspect-[16/10] flex items-center justify-center p-3 cursor-pointer transition-all select-none group`}
    >
      <span className="text-xs text-slate-400 group-hover:text-slate-300 font-medium tracking-wide text-center">
        {asset.name}
      </span>
    </div>
  );
}

