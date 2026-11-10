import React from "react";
import type { PipelineStage } from "../types";
import { StageCard } from "./StageCard";
import { Skeleton } from "@/components/ui";

interface StageGridProps {
  stages: PipelineStage[];
  selectedStageId: string;
  isLoading?: boolean;
  onSelectStage: (stageId: string) => void;
}

export function StageGrid({
  stages,
  selectedStageId,
  isLoading,
  onSelectStage,
}: StageGridProps): React.ReactElement {
  return (
    <section className="flex flex-col">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Pipeline · {isLoading ? "..." : `${stages.length} Stages`}
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col justify-between h-28"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-14 rounded" />
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </section>
  );
}

