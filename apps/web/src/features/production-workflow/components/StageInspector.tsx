import React from "react";
import type { PipelineStage } from "../types";
import { Badge, Button } from "@/components/ui";

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
          <Badge variant="warning">Waiting for approval</Badge>
        ) : (
          <Badge variant="success" className="capitalize">
            {stage.status.replace("_", " ")}
          </Badge>
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
        <Button size="sm" onClick={() => onApprove(stage.id)}>
          Approve
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRequestRevision(stage.id)}
        >
          Request revision
        </Button>
      </div>
    </aside>
  );
}

