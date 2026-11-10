"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import type { PipelineStageConfig, PipelineStageId } from "../config/stages";

interface PipelineStagePlaceholderCardProps {
  stage: PipelineStageConfig;
  prevStageId: PipelineStageId | null;
  isApproving?: boolean;
  onPrevStage: () => void;
  onProceed: () => void;
}

export function PipelineStagePlaceholderCard({
  stage,
  prevStageId,
  isApproving = false,
  onPrevStage,
  onProceed,
}: PipelineStagePlaceholderCardProps): React.ReactElement {
  const Icon = stage.icon;

  return (
    <div className="max-w-md w-full bg-[#101520]/80 backdrop-blur-md border border-[#1E2638] rounded-2xl p-8 flex flex-col items-center shadow-2xl relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 shadow-lg">
        <Icon className="w-8 h-8" />
      </div>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold bg-emerald-950 text-emerald-300 border-emerald-700/60">
          {stage.approvalLabel}
        </span>
        <span className="text-xs font-mono tabular-nums text-slate-400">
          Bước 0{stage.stepNumber} / 10
        </span>
      </div>

      <h2 className="text-base font-bold text-slate-100 mt-2">
        {stage.fullName}
      </h2>

      <p className="text-xs text-slate-400 leading-relaxed mt-2">
        {stage.description}
      </p>

      <div className="w-full h-px bg-[#1C2436] my-5" />

      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>Màn hình trống (Sẵn sàng triển khai chi tiết)</span>
      </div>

      <div className="mt-5 flex items-center gap-2 w-full justify-center">
        {prevStageId && (
          <Button
            variant="outline"
            size="sm"
            disabled={isApproving}
            onClick={onPrevStage}
            className="h-8 text-xs bg-[#0E131E] border-[#1E2638] text-slate-300 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3 h-3" /> Bước trước
          </Button>
        )}

        <Button
          size="sm"
          disabled={isApproving}
          onClick={onProceed}
          className="h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed min-w-[130px] justify-center"
        >
          {isApproving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Đang duyệt...</span>
            </>
          ) : (
            <>
              <span>Duyệt bước này</span>
              <ArrowRight className="w-3 h-3" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
