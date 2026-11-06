"use client";

import React from "react";
import Link from "next/link";
import type { CreationStep } from "../types";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface CreationHeaderProps {
  step: CreationStep;
  onBackToOverview: () => void;
}

export function CreationHeader({
  step,
  onBackToOverview,
}: CreationHeaderProps): React.ReactElement {
  return (
    <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0 select-none">
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToOverview}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tổng quan</span>
        </button>

        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

        <h1 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
          Tạo mới Dự án Video AI
        </h1>
      </div>

      {/* Step Progress Pill */}
      <div className="flex items-center gap-2 text-xs">
        <span
          className={`px-2 py-0.5 rounded font-mono text-[10px] ${
            step === "input"
              ? "bg-blue-900/60 text-blue-400 border border-blue-700/60 font-semibold"
              : "text-slate-400"
          }`}
        >
          1. Nhập yêu cầu & Media
        </span>

        <ChevronRight className="w-3 h-3 text-slate-600" />

        <span
          className={`px-2 py-0.5 rounded font-mono text-[10px] ${
            step === "processing"
              ? "bg-blue-900/60 text-blue-400 border border-blue-700/60 font-semibold animate-pulse"
              : "text-slate-400"
          }`}
        >
          2. Phân tích AI đa tầng
        </span>

        <ChevronRight className="w-3 h-3 text-slate-600" />

        <span
          className={`px-2 py-0.5 rounded font-mono text-[10px] ${
            step === "inspection"
              ? "bg-emerald-900/60 text-emerald-400 border border-emerald-700/60 font-semibold"
              : "text-slate-400"
          }`}
        >
          3. Giao diện kiểm tra
        </span>
      </div>
    </header>
  );
}
