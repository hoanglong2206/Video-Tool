import React from "react";
import type { LayerProperties, MotionSuggestion } from "../types";
import { Button } from "@/components/ui";

interface MotionInspectorProps {
  properties: LayerProperties;
  suggestion: MotionSuggestion;
  onApplySuggestion: () => void;
}

export function MotionInspector({
  properties,
  suggestion,
  onApplySuggestion,
}: MotionInspectorProps): React.ReactElement {
  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Properties Section */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Properties · Product
      </h2>

      <div className="grid grid-cols-2 gap-2 text-xs mb-6">
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center text-slate-300">
          X {properties.x}
        </div>
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center text-slate-300">
          Y {properties.y}
        </div>
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center text-slate-300">
          Scale {properties.scalePercent}%
        </div>
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center text-slate-300">
          Rotate {properties.rotateDeg}°
        </div>
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center text-slate-300">
          Opacity {properties.opacityPercent}
        </div>
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center text-slate-300 truncate">
          {properties.easing}
        </div>
      </div>

      {/* AI Motion Assistant */}
      <div className="mt-2 pt-4 border-t border-[#1C2436]/60">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          AI Motion Assistant
        </h2>

        <div className="w-full rounded-md bg-[#101520] border border-[#1C2436] p-2.5 text-xs text-slate-400 mb-3">
          {suggestion.prompt}
        </div>

        {/* Suggestion Card */}
        <div className="rounded-lg bg-[#121A2C] border border-[#1E3256] p-3.5 flex flex-col">
          <span className="text-xs font-semibold text-slate-200">
            Suggestion
          </span>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            {suggestion.description}
          </p>

          <div className="flex items-center gap-2 mt-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 text-[11px]"
            >
              Preview
            </Button>

            <Button
              size="sm"
              onClick={onApplySuggestion}
              className="h-7 px-3.5 text-[11px]"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

