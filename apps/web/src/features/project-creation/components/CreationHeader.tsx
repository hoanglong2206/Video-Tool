"use client";

import React, { useState } from "react";
import type { CreationStep } from "../types";
import { ChevronRight, ArrowLeft, Cloud, RotateCcw } from "lucide-react";
import { ResetDraftConfirmDialog } from "./ResetDraftConfirmDialog";

interface CreationHeaderProps {
  step: CreationStep;
  onBackToOverview: () => void;
  onResetDraft?: () => void;
  onSelectStep?: (step: CreationStep) => void;
  lastSavedAt?: number | null;
}

export function CreationHeader({
  step,
  onBackToOverview,
  onResetDraft,
  onSelectStep,
  lastSavedAt,
}: CreationHeaderProps): React.ReactElement {
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  return (
    <>
      <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0 select-none">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBackToOverview}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tổng quan</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

          <h1 className="text-xs font-bold text-slate-100 uppercase tracking-wide truncate">
            Tạo mới Dự án Video AI
          </h1>

          {/* Auto-Persist LocalStorage Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#111827] border border-[#1F293D] text-[10px] font-mono text-emerald-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <Cloud className="w-3 h-3 text-emerald-400" />
            <span>Tự động lưu nháp</span>
          </div>
        </div>

        {/* Step Progress Pill & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => onSelectStep && onSelectStep("input")}
              className={`px-2 py-0.5 rounded font-mono text-[10px] transition-colors cursor-pointer ${
                step === "input"
                  ? "bg-blue-900/60 text-blue-400 border border-blue-700/60 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141B2B]"
              }`}
            >
              1. Nhập yêu cầu & Media
            </button>

            <ChevronRight className="w-3 h-3 text-slate-600" />

            <button
              type="button"
              onClick={() => onSelectStep && onSelectStep("processing")}
              className={`px-2 py-0.5 rounded font-mono text-[10px] transition-colors cursor-pointer ${
                step === "processing"
                  ? "bg-blue-900/60 text-blue-400 border border-blue-700/60 font-semibold animate-pulse"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141B2B]"
              }`}
            >
              2. Phân tích AI đa tầng
            </button>

            <ChevronRight className="w-3 h-3 text-slate-600" />

            <button
              type="button"
              onClick={() => onSelectStep && onSelectStep("inspection")}
              className={`px-2 py-0.5 rounded font-mono text-[10px] transition-colors cursor-pointer ${
                step === "inspection"
                  ? "bg-emerald-900/60 text-emerald-400 border border-emerald-700/60 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141B2B]"
              }`}
            >
              3. Giao diện kiểm tra
            </button>
          </div>

          {/* Reset Draft Button */}
          {onResetDraft && (
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="text-[11px] text-slate-400 hover:text-red-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-[#161F30] border border-transparent hover:border-red-900/40 transition-colors cursor-pointer shrink-0"
              title="Xóa nháp và đặt lại ban đầu"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Làm mới</span>
            </button>
          )}
        </div>
      </header>

      {/* Reset Draft Confirmation Dialog */}
      <ResetDraftConfirmDialog
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirmReset={() => {
          onResetDraft && onResetDraft();
          setShowResetModal(false);
        }}
      />
    </>
  );
}
