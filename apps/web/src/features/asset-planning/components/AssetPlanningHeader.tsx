"use client";

import React from "react";
import { Sparkles, CheckCircle2, Cpu, Cloud, ArrowRight, Loader2 } from "lucide-react";
import { Button, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui";
import type { AssetPlanningCoverage, EngineMode } from "../types";

interface AssetPlanningHeaderProps {
  projectName: string;
  coverage: AssetPlanningCoverage;
  engineMode: EngineMode;
  isGenerating: boolean;
  isApproving: boolean;
  onEngineChange: (mode: EngineMode) => void;
  onBulkGenerate: () => void;
  onApprove: () => void;
}

export function AssetPlanningHeader({
  projectName,
  coverage,
  engineMode,
  isGenerating,
  isApproving,
  onEngineChange,
  onBulkGenerate,
  onApprove,
}: AssetPlanningHeaderProps): React.ReactElement {
  return (
    <header className="h-14 bg-[#0A0E17] border-b border-[#1E2638] px-5 flex items-center justify-between shrink-0 select-none">
      {/* Left: Project & Stage Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-100 truncate tracking-tight">
              {projectName}
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60 font-semibold shrink-0">
              Bước 03 · Asset Planning
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            Bóc tách 4 lớp tài nguyên theo Storyboard · Khóa nhận diện thương hiệu
          </p>
        </div>
      </div>

      {/* Center: Dual-Engine Switch Pill */}
      <div className="flex items-center gap-2 bg-[#101522] border border-[#1C2538] p-1 rounded-lg">
        <span className="text-[10px] uppercase font-semibold text-slate-400 px-2 tracking-wider">
          AI Engine:
        </span>
        <button
          type="button"
          onClick={() => onEngineChange("openai")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
            engineMode === "openai"
              ? "bg-blue-600 text-white font-medium shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>OpenAI Image API</span>
        </button>
        <button
          type="button"
          onClick={() => onEngineChange("comfyui")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
            engineMode === "comfyui"
              ? "bg-indigo-600 text-white font-medium shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>ComfyUI Local</span>
        </button>
      </div>

      {/* Right: Coverage Metric & Action CTAs */}
      <div className="flex items-center gap-3">
        {/* Coverage Badge wrapped in TooltipProvider */}
        <TooltipProvider delayDuration={100} skipDelayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111726] border border-[#1E283E]">
                <span className="text-[11px] text-slate-400">Độ phủ:</span>
                <span className="text-xs font-mono tabular-nums font-bold text-emerald-400">
                  {coverage.ready}/{coverage.total} Ready ({coverage.percent}%)
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6}>
              <p className="text-xs">
                {coverage.missing > 0
                  ? `${coverage.missing} asset cần AI sinh hoặc tải lên.`
                  : "Tất cả các cảnh đã có đầy đủ tài nguyên!"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* 1-Click Bulk Generate */}
        <Button
          variant="outline"
          size="sm"
          disabled={isGenerating || coverage.missing === 0}
          onClick={onBulkGenerate}
          className="h-8 text-xs bg-[#101624] border-[#222C42] hover:bg-[#161F32] text-amber-300 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>Sinh tự động {coverage.missing > 0 ? `(${coverage.missing})` : ""}</span>
        </Button>

        {/* HITL Gate Approve Button with Spinner */}
        <Button
          size="sm"
          disabled={isApproving}
          onClick={onApprove}
          className="h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-900/30 disabled:opacity-80 disabled:cursor-not-allowed min-w-[136px] justify-center"
        >
          {isApproving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Đang duyệt...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Duyệt kế hoạch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
