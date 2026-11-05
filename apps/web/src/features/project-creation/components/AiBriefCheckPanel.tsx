import React from "react";
import type { AiBriefAnalysis } from "../types";
import { Button } from "@/components/ui";

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
        <Button
          variant="outline"
          size="sm"
          onClick={onFillFromNotes}
        >
          Fill from my notes
        </Button>
      </div>
    </aside>
  );
}

