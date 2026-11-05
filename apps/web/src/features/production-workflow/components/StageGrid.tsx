import React from "react";
import type { PipelineStage } from "../types";
import { StageCard } from "./StageCard";

interface StageGridProps {
  stages: PipelineStage[];
  selectedStageId: string;
  onSelectStage: (stageId: string) => void;
}

export function StageGrid({
  stages,
  selectedStageId,
  onSelectStage,
}: StageGridProps): React.ReactElement {
  return (
    <section className="flex flex-col">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Pipeline · {stages.length} Stages
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {stages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isSelected={stage.id === selectedStageId}
            onSelect={onSelectStage}
          />
        ))}
      </div>
    </section>
  );
}

