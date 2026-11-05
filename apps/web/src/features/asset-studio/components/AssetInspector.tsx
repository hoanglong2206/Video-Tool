import React from "react";
import type { AssetItem } from "../types";
import { Button } from "@/components/ui";

interface AssetInspectorProps {
  asset: AssetItem;
  isRemovingBg?: boolean;
  onRemoveBackground?: () => void;
  onVariations?: () => void;
  onEditWithAi?: () => void;
  onCompareVersions?: () => void;
}

export function AssetInspector({
  asset,
  isRemovingBg = false,
  onRemoveBackground,
  onVariations,
  onEditWithAi,
  onCompareVersions,
}: AssetInspectorProps): React.ReactElement {
  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Preview Box */}
      <div className="w-full aspect-[16/10] rounded-lg bg-[#101520] border border-[#1C2436] flex items-center justify-center p-3 mb-6">
        <span className="text-xs text-slate-400 font-medium">
          {asset.name} · preview
        </span>
      </div>

      {/* Properties Section */}
      <div className="mb-6">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          Properties
        </h2>

        <div className="flex flex-col gap-1.5 text-xs">
          <p className="text-slate-200 font-medium">
            {asset.resolution} · {asset.format}
          </p>
          <p className="text-slate-400">
            Scenes: {asset.scenesUsed.join(", ")}
          </p>
          <p className="text-slate-400">
            Version {asset.version} of {asset.totalVersions} ·{" "}
            <span className="capitalize">{asset.sourceType}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons Grid (2x2) */}
      <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-[#1C2436]/60">
        <Button
          variant="outline"
          size="sm"
          disabled={isRemovingBg}
          className="text-[11px] h-8 px-2.5"
          onClick={onRemoveBackground}
        >
          {isRemovingBg ? "Removing..." : "Remove background"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-[11px] h-8 px-2.5"
          onClick={onVariations}
        >
          Variations
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-[11px] h-8 px-2.5"
          onClick={onEditWithAi}
        >
          Edit with AI
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-[11px] h-8 px-2.5"
          onClick={onCompareVersions}
        >
          Compare versions
        </Button>
      </div>
    </aside>
  );
}

