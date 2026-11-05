import React from "react";
import type { PipelineStage } from "../types";

interface StageInspectorProps {
  stage: PipelineStage;
  onApprove: (stageId: string) => void;
  onRequestRevision: (stageId: string) => void;
}

export function StageInspector({
  stage,
  onApprove,
  onRequestRevision,
}: StageInspectorProps): React.ReactElement {
  const isWaitingApproval = stage.status === "waiting_approval";

  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Title & Badge */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Stage {stage.stageNumber} · {stage.name}
      </h2>

      <div className="mb-4">
        {isWaitingApproval ? (
          <span className="bg-[#2D2111] text-[#F59E0B] border border-[#784D16] rounded-full px-2.5 py-0.5 text-[10px] font-medium inline-block">
            Waiting for approval
          </span>
        ) : (
          <span className="bg-[#132E27] text-[#10B981] border border-[#065F46] rounded-full px-2.5 py-0.5 text-[10px] font-medium inline-block capitalize">
            {stage.status.replace("_", " ")}
          </span>
        )}
      </div>

      {/* Composition Preview Box */}
      <div className="w-full aspect-[16/10] rounded-lg bg-[#101520] border border-[#1C2436] flex items-center justify-center p-3 mb-5">
        <span className="text-xs text-slate-400 font-medium">
          Composition preview
        </span>
      </div>

      {/* Dependencies */}
      <div className="mb-4">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Depends on
        </h3>
        <p className="text-xs text-slate-300">
          {stage.dependsOn || "None (Root trigger)"}
        </p>
      </div>

      {/* Approval History */}
      <div className="mb-6">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Approval history
        </h3>
        <p className="text-xs text-slate-300">
          {stage.approvalHistory || "Stage currently in progress"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-[#1C2436]/60">
        <button
          type="button"
          onClick={() => onApprove(stage.id)}
          className="h-8 px-4 rounded-md text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] transition-all shadow-sm"
        >
          Approve
        </button>

        <button
          type="button"
          onClick={() => onRequestRevision(stage.id)}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Request revision
        </button>
      </div>
    </aside>
  );
}
