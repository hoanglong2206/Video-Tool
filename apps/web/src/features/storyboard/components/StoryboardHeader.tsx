"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Play, CheckCircle2, LayoutGrid, Clock, Film, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import type { StoryboardViewMode } from "../types";

interface StoryboardHeaderProps {
  projectName: string;
  projectId: string;
  totalScenes: number;
  totalDuration: number;
  viewMode: StoryboardViewMode;
  isGenerating?: boolean;
  onToggleViewMode: (mode: StoryboardViewMode) => void;
  onGenerateWithAi: () => void;
  onPlayAnimatics: () => void;
  onApproveAndProceed: () => void;
}

export function StoryboardHeader({
  projectName,
  projectId,
  totalScenes,
  totalDuration,
  viewMode,
  isGenerating = false,
  onToggleViewMode,
  onGenerateWithAi,
  onPlayAnimatics,
  onApproveAndProceed,
}: StoryboardHeaderProps): React.ReactElement {
  return (
    <header className="h-12 border-b border-[#1E2638] px-4 flex items-center justify-between bg-[#0A0E17] shrink-0 select-none">
      {/* Left: Back & Project Info */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href={`/projects/${projectId}`}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tổng quan</span>
        </Link>

        <span className="text-slate-600">/</span>

        <h1 className="text-xs font-bold text-slate-100 uppercase tracking-wide truncate max-w-[200px] xl:max-w-[280px]">
          {projectName}
        </h1>

        <span className="text-[10px] bg-blue-950/80 text-blue-300 border border-blue-800/50 px-2 py-0.5 rounded font-mono font-semibold shrink-0">
          Stage 01 · Storyboard Studio
        </span>

        {/* Runtime Stats Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#111827] border border-[#1F293D] text-[10px] font-mono text-cyan-400 shrink-0">
          <Film className="w-3 h-3 text-cyan-400" />
          <span>{totalScenes} Cảnh</span>
          <span>•</span>
          <span className="tabular-nums font-bold">{totalDuration}s</span>
          <span>(16:9 UHD)</span>
        </div>
      </div>

      {/* Right Controls: View Switcher & Action CTAs */}
      <div className="flex items-center gap-2 shrink-0">
        {/* View Switcher Pills */}
        <div className="flex items-center bg-[#101520] border border-[#1E2638] rounded-md p-0.5 text-xs">
          <button
            type="button"
            onClick={() => onToggleViewMode("grid")}
            className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Xem theo lưới ma trận 3x2"
          >
            <LayoutGrid className="w-3 h-3" />
            <span className="hidden md:inline">Lưới (Grid)</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode("timeline")}
            className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === "timeline"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Xem theo thước phim dòng thời gian"
          >
            <Clock className="w-3 h-3" />
            <span className="hidden md:inline">Timeline</span>
          </button>
        </div>

        {/* AI Generate Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isGenerating}
          onClick={onGenerateWithAi}
          className="h-7 text-xs bg-[#101520] border-[#1E2638] text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          title="Yêu cầu AI phân tích lại và sinh hình ảnh mới"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
              <span>Đang sinh AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Sinh lại với AI</span>
            </>
          )}
        </Button>

        {/* Animatics Preview Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPlayAnimatics}
          className="h-7 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          title="Chạy thử animatics slide kèm đọc lời thoại"
        >
          <Play className="w-3 h-3 text-emerald-400" />
          <span>Xem Animatics</span>
        </Button>

        {/* Approve & Proceed CTA */}
        <Button
          type="button"
          size="sm"
          onClick={onApproveAndProceed}
          className="h-7 text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-1 shadow-md shadow-blue-600/30 cursor-pointer transition-all"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>Duyệt Storyboard ➔</span>
        </Button>
      </div>
    </header>
  );
}
