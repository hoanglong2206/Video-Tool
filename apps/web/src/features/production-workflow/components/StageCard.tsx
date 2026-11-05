import React from "react";
import type { PipelineStage } from "../types";

interface StageCardProps {
  stage: PipelineStage;
  isSelected: boolean;
  onSelect: (stageId: string) => void;
}

export function StageCard({
  stage,
  isSelected,
  onSelect,
}: StageCardProps): React.ReactElement {
  const isWaiting = stage.status === "waiting_approval";
  const isRunning = stage.status === "running";

  const getBorderColor = (): string => {
    if (isWaiting) return "border-[#B45309] shadow-[0_0_12px_-4px_rgba(245,158,11,0.2)]";
    if (isRunning) return "border-[#2563EB] shadow-[0_0_12px_-4px_rgba(37,99,235,0.2)]";
    if (isSelected) return "border-slate-500 ring-1 ring-slate-500/50";
    return "border-[#1C2436] hover:border-[#28354D]";
  };

  const renderBadge = (): React.ReactElement => {
    switch (stage.status) {
      case "approved":
        return (
          <span className="bg-[#132E27] text-[#10B981] border border-[#065F46] rounded text-[10px] px-1.5 py-0.5 font-medium inline-block">
            Approved
          </span>
        );
      case "waiting_approval":
        return (
          <span className="bg-[#2D2111] text-[#F59E0B] border border-[#784D16] rounded text-[10px] px-1.5 py-0.5 font-medium inline-block">
            Waiting for approval
          </span>
        );
      case "running":
        return (
          <span className="bg-[#14233D] text-[#3B82F6] border border-[#1E3A8A] rounded text-[10px] px-1.5 py-0.5 font-medium inline-block">
            Running {stage.progressPercent}%
          </span>
        );
      case "skipped":
        return (
          <span className="bg-[#1A2234] text-slate-400 border border-slate-700 rounded text-[10px] px-1.5 py-0.5 font-medium inline-block">
            Skipped
          </span>
        );
      case "pending":
      default:
        return (
          <span className="bg-[#131926] text-slate-500 border border-[#1C2436] rounded text-[10px] px-1.5 py-0.5 font-medium inline-block">
            Pending
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onSelect(stage.id)}
      className={`bg-[#101520] border ${getBorderColor()} rounded-lg p-3.5 flex flex-col justify-between min-h-[96px] cursor-pointer transition-all select-none`}
    >
      <div>
        <span className="text-[11px] font-medium text-slate-500">
          {stage.stageNumber}
        </span>
        <h3 className="text-xs font-semibold text-slate-100 tracking-tight mt-1">
          {stage.name}
        </h3>
      </div>

      <div className="mt-3">{renderBadge()}</div>
    </div>
  );
}
