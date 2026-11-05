import React from "react";
import type { LayerItem } from "../types";

interface LayersSidebarProps {
  layers: LayerItem[];
  selectedLayerId: string;
  onSelectLayer: (layerId: string) => void;
}

const ASSET_CHIPS = ["bg-01", "bg-02", "flare", "dust"];

export function LayersSidebar({
  layers,
  selectedLayerId,
  onSelectLayer,
}: LayersSidebarProps): React.ReactElement {
  return (
    <aside className="w-52 border-r border-[#1E2638] bg-[#0A0E17] p-5 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Layers Section */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Layers
      </h2>

      <div className="flex flex-col gap-1.5">
        {layers.map((layer) => {
          const isSelected = layer.id === selectedLayerId;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => onSelectLayer(layer.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors border ${
                isSelected
                  ? "bg-[#14233D] text-slate-100 border-[#2563EB] font-medium"
                  : "bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-[#101520]"
              }`}
            >
              {layer.name}
            </button>
          );
        })}
      </div>

      {/* Assets Section */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-3">
        Assets
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {ASSET_CHIPS.map((chip) => (
          <div
            key={chip}
            className="h-12 rounded-md bg-[#101520] border border-[#1C2436] hover:border-slate-500 flex items-center justify-center text-xs text-slate-400 cursor-pointer transition-colors"
          >
            {chip}
          </div>
        ))}
      </div>
    </aside>
  );
}

