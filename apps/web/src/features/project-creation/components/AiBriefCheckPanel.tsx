import React from "react";
import type { AiBriefAnalysis } from "../types";

interface AiBriefCheckPanelProps {
  analysis: AiBriefAnalysis;
  onFillFromNotes: () => void;
}

export function AiBriefCheckPanel({
  analysis,
  onFillFromNotes,
}: AiBriefCheckPanelProps): React.ReactElement {
  return (
    <aside className="w-64 border-l border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
        AI Brief Check
      </h2>

      <div className="flex flex-col gap-2.5 text-xs text-slate-400">
        {analysis.missingItems.length > 0 ? (
          analysis.missingItems.map((item, index) => (
            <p key={index} className="leading-relaxed">
              Missing: {item}
            </p>
          ))
        ) : (
          <p className="text-emerald-400 leading-relaxed font-medium">
            ✓ Brief analysis complete. All key inputs detected!
          </p>
        )}

        <p className="mt-2 leading-relaxed">
          Suggested structure: {analysis.suggestedStructure}
        </p>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={onFillFromNotes}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Fill from my notes
        </button>
      </div>
    </aside>
  );
}
