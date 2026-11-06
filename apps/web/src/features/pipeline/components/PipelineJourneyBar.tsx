"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  PIPELINE_STAGES,
  type PipelineStageId,
  type PipelineStageConfig,
} from "../config/stages";
import { cn } from "@/lib/utils";

interface PipelineJourneyBarProps {
  projectId: string;
  currentStageId: PipelineStageId;
  className?: string;
}

export function PipelineJourneyBar({
  projectId,
  currentStageId,
  className,
}: PipelineJourneyBarProps): React.ReactElement {
  const [hoveredStage, setHoveredStage] = useState<PipelineStageConfig | null>(null);

  const currentIndex = PIPELINE_STAGES.findIndex((s) => s.id === currentStageId);

  return (
    <div
      className={cn(
        "relative bg-[#0C101A] border-b border-[#1E2638] px-4 py-2 flex items-center select-none overflow-x-auto shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-1.5 min-w-max mx-auto">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrent = stage.id === currentStageId;
          const isCompleted = idx < currentIndex;
          const isPending = idx > currentIndex;

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Pill Item */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredStage(stage)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <Link
                  href={`/projects/${projectId}/${stage.id}`}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all border",
                    isCurrent
                      ? "bg-gradient-to-r from-blue-900/60 to-indigo-900/60 text-blue-300 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.25)] font-semibold scale-[1.02]"
                      : isCompleted
                      ? "bg-[#111724] text-emerald-300 border-emerald-900/50 hover:bg-[#151D2C] hover:border-emerald-700/60"
                      : "bg-[#0E131E] text-slate-400 border-[#1C2436] hover:text-slate-200 hover:bg-[#131A27]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 shrink-0",
                      isCurrent
                        ? "text-blue-400"
                        : isCompleted
                        ? "text-emerald-400"
                        : "text-slate-400"
                    )}
                  />
                  <span className="truncate">{stage.shortName}</span>

                  {/* Stage Number Badge */}
                  <span
                    className={cn(
                      "text-[9px] font-mono px-1 rounded",
                      isCurrent
                        ? "bg-blue-950 text-blue-300 border border-blue-800/60"
                        : isCompleted
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800/60"
                        : "bg-[#182030] text-slate-400"
                    )}
                  >
                    0{stage.stepNumber}
                  </span>
                </Link>

                {/* Rich Hover Card / Tooltip */}
                {hoveredStage?.id === stage.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#0B0F17] border border-[#2A374F] rounded-xl p-3 shadow-2xl z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                        Bước 0{stage.stepNumber} / 10
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border font-medium bg-emerald-950/80 text-emerald-300 border-emerald-700/60">
                        {stage.approvalLabel}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 leading-snug">
                      {stage.fullName}
                    </h4>

                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                      {stage.description}
                    </p>

                    <div className="mt-2 pt-1.5 border-t border-[#1C2436] flex items-center justify-between text-[9px] text-slate-400 font-mono">
                      <span>Click để mở không gian làm việc</span>
                      <span className="text-blue-400">/{stage.id}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting Chevron */}
              {idx < PIPELINE_STAGES.length - 1 && (
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 mx-0.5" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

