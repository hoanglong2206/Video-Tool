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
  isApproving?: boolean;
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
  isApproving = false,
  onToggleViewMode,
  onGenerateWithAi,
  onPlayAnimatics,
  onApproveAndProceed,
}: StoryboardHeaderProps): React.ReactElement {
  return (
    <header className="h-12 border-b border-[#1E2638] px-4 flex items-center justify-between bg-[#0A0E17] shrink-0 select-none">
      {/* 1. Left Project Metadata */}
      <div className="flex items-center gap-3">
        <Link
          href={`/projects`}
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-[#161F30] rounded-md transition-colors"
          title="Quay lại danh sách dự án"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-xs text-slate-100 tracking-tight truncate max-w-[200px]">
            {projectName}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold bg-emerald-950/80 text-emerald-300 border-emerald-700/60">
            Human approval #2
          </span>
        </div>
      </div>

      {/* 2. Middle Stats Badges */}
      <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
        <span className="px-2 py-0.5 rounded bg-[#101520] border border-[#1E2638] text-slate-300">
          Tổng phân cảnh: <strong className="text-white font-bold">{totalScenes}</strong>
        </span>
        <span className="px-2 py-0.5 rounded bg-[#101520] border border-[#1E2638] text-slate-300">
          Thời lượng: <strong className="text-cyan-400 font-bold">{totalDuration}s</strong>
        </span>
      </div>

      {/* 3. Right Action Tools */}
      <div className="flex items-center gap-2">
        {/* View Mode Toggle Switcher */}
        <div className="flex items-center bg-[#101520] border border-[#1E2638] rounded-md p-0.5">
          <button
            type="button"
            onClick={() => onToggleViewMode("grid")}
            className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Xem dạng thẻ phân cảnh (Storyboard Grid)"
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

        {/* Approve & Proceed CTA with Spinner */}
        <Button
          type="button"
          size="sm"
          disabled={isApproving}
          onClick={onApproveAndProceed}
          className="h-7 text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-1 shadow-md shadow-blue-600/30 cursor-pointer transition-all disabled:opacity-80 disabled:cursor-not-allowed min-w-[130px] justify-center"
        >
          {isApproving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Đang duyệt...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Duyệt Storyboard ➔</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
