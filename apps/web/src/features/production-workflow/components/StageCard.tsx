import React from "react";
import type { PipelineStage } from "../types";
import { Badge, Card } from "@/components/ui";

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
        return <Badge variant="success">Approved</Badge>;
      case "waiting_approval":
        return <Badge variant="warning">Waiting for approval</Badge>;
      case "running":
        return <Badge variant="default">Running {stage.progressPercent}%</Badge>;
      case "skipped":
        return <Badge variant="secondary">Skipped</Badge>;
      case "pending":
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card
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
    </Card>
  );
}

