"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";
import {
  PIPELINE_STAGES,
  type PipelineStageId,
  type PipelineStageConfig,
} from "../config/stages";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PipelineJourneyBarProps {
  projectId: string;
  currentStageId: PipelineStageId;
  onHoverStage?: (stage: PipelineStageConfig | null) => void;
  className?: string;
}

export function PipelineJourneyBar({
  projectId,
  currentStageId,
  onHoverStage,
  className,
}: PipelineJourneyBarProps): React.ReactElement {
  const currentIndex = PIPELINE_STAGES.findIndex((s) => s.id === currentStageId);

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <div
        className={cn(
          "h-12 bg-[#0C101A] border-b border-[#1E2638] px-4 flex items-center select-none overflow-x-auto overflow-y-hidden shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          className
        )}
      >
        <div className="flex items-center gap-1.5 min-w-max mx-auto">
          {PIPELINE_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = stage.id === currentStageId;
            const isCompleted = idx < currentIndex;
            const isLocked = idx > currentIndex;

            return (
              <React.Fragment key={stage.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {isLocked ? (
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors border shrink-0 cursor-not-allowed opacity-45 bg-[#0A0E17] text-slate-500 border-[#151D2C] select-none"
                        aria-disabled="true"
                      >
                        <Lock className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                        <span className="truncate">{stage.shortName}</span>
                        <span className="text-[9px] font-mono px-1 rounded shrink-0 bg-[#121824] text-slate-600">
                          0{stage.stepNumber}
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={`/projects/${projectId}/${stage.id}`}
                        onMouseEnter={() => onHoverStage?.(stage)}
                        onMouseLeave={() => onHoverStage?.(null)}
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors border cursor-pointer shrink-0",
                          isCurrent
                            ? "bg-gradient-to-r from-blue-900/60 to-indigo-900/60 text-blue-300 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.25)] font-semibold"
                            : "bg-[#111724] text-emerald-300 border-emerald-900/50 hover:bg-[#151D2C] hover:border-emerald-700/60"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-3.5 h-3.5 shrink-0",
                            isCurrent ? "text-blue-400" : "text-emerald-400"
                          )}
                        />
                        <span className="truncate">{stage.shortName}</span>
                        <span
                          className={cn(
                            "text-[9px] font-mono px-1 rounded shrink-0",
                            isCurrent
                              ? "bg-blue-950 text-blue-300 border border-blue-800/60"
                              : "bg-emerald-950 text-emerald-300 border border-emerald-800/60"
                          )}
                        >
                          0{stage.stepNumber}
                        </span>
                      </Link>
                    )}
                  </TooltipTrigger>

                  {/* Portal Floating Tooltip */}
                  <TooltipContent
                    side="bottom"
                    sideOffset={8}
                    align="center"
                    className="w-72 bg-[#0B0F17] border border-[#2A374F] rounded-xl p-3 shadow-2xl z-50 text-slate-100 pointer-events-none"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                        Bước 0{stage.stepNumber} / 10
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-mono px-1.5 py-0.5 rounded border font-medium",
                          isLocked
                            ? "bg-slate-900 text-slate-400 border-slate-700/60"
                            : "bg-emerald-950/80 text-emerald-300 border-emerald-700/60"
                        )}
                      >
                        {isLocked ? "🔒 Đang khóa" : stage.approvalLabel}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 leading-snug">
                      {stage.fullName}
                    </h4>

                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                      {stage.description}
                    </p>

                    <div className="mt-2 pt-1.5 border-t border-[#1C2436] flex items-center justify-between text-[9px] text-slate-400 font-mono">
                      {isLocked ? (
                        <span className="text-amber-400/90 font-sans">
                          🔒 Chưa mở khóa · Cần duyệt Bước 0{currentIndex + 1}
                        </span>
                      ) : (
                        <>
                          <span>Click để mở không gian làm việc</span>
                          <span className="text-blue-400">/{stage.id}</span>
                        </>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>

                {/* Connecting Chevron */}
                {idx < PIPELINE_STAGES.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
