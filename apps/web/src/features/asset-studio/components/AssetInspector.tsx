import React from "react";
import type { AssetItem } from "../types";

interface AssetInspectorProps {
  asset: AssetItem;
  onRemoveBackground?: () => void;
  onVariations?: () => void;
  onEditWithAi?: () => void;
  onCompareVersions?: () => void;
}

export function AssetInspector({
  asset,
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
        <button
          type="button"
          onClick={onRemoveBackground}
          className="h-8 px-2.5 rounded-md text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Remove background
        </button>

        <button
          type="button"
          onClick={onVariations}
          className="h-8 px-2.5 rounded-md text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Variations
        </button>

        <button
          type="button"
          onClick={onEditWithAi}
          className="h-8 px-2.5 rounded-md text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Edit with AI
        </button>

        <button
          type="button"
          onClick={onCompareVersions}
          className="h-8 px-2.5 rounded-md text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Compare versions
        </button>
      </div>
    </aside>
  );
}
