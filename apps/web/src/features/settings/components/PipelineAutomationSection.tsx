"use client";

import React from "react";
import { GitBranch, ShieldAlert, Zap, BookmarkCheck, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { PipelineApprovalMode } from "@/features/pipeline";

interface PipelineAutomationSectionProps {
  approvalMode: PipelineApprovalMode;
  autoProceedDelaySeconds: number;
  autoSaveCheckpoint: boolean;
  audioNotification: boolean;
  onSetApprovalMode: (mode: PipelineApprovalMode) => void;
  onSetDelay: (seconds: number) => void;
  onSetAutoSave: (val: boolean) => void;
  onSetAudioNotification: (val: boolean) => void;
}

export function PipelineAutomationSection({
  approvalMode,
  autoProceedDelaySeconds,
  autoSaveCheckpoint,
  audioNotification,
  onSetApprovalMode,
  onSetDelay,
  onSetAutoSave,
  onSetAudioNotification,
}: PipelineAutomationSectionProps): React.ReactElement {
  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1C2436]">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Chế độ Duyệt Luồng Pipeline (Story ➔ Export)
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          Điều chỉnh cơ chế chuyển bước
        </span>
      </div>

      {/* 2 Radio Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Option A: Manual Human Approval */}
        <div
          onClick={() => onSetApprovalMode("manual")}
          className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
            approvalMode === "manual"
              ? "bg-[#141B29] border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.2)] ring-1 ring-blue-500/40"
              : "bg-[#0E131E] border-[#1E2638] hover:border-slate-600"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Phê duyệt thủ công
              </span>
              <input
                type="radio"
                name="approvalMode"
                checked={approvalMode === "manual"}
                onChange={() => onSetApprovalMode("manual")}
                className="accent-blue-500 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Mỗi bước dừng lại đợi bạn trực tiếp duyệt để kiểm soát chất lượng kỹ thuật cao.
            </p>
          </div>
          <span className="text-[10px] text-amber-400/90 font-mono mt-2.5">
            • Khuyên dùng cho TVC & Quảng cáo
          </span>
        </div>

        {/* Option B: Always Proceed */}
        <div
          onClick={() => onSetApprovalMode("always_proceed")}
          className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
            approvalMode === "always_proceed"
              ? "bg-[#141B29] border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40"
              : "bg-[#0E131E] border-[#1E2638] hover:border-slate-600"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Tự động chuyển bước
              </span>
              <input
                type="radio"
                name="approvalMode"
                checked={approvalMode === "always_proceed"}
                onChange={() => onSetApprovalMode("always_proceed")}
                className="accent-emerald-500 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tự động duyệt và chuyển bước tiếp theo sau thời gian đếm ngược (có thể tạm dừng).
            </p>
          </div>

          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#1C2436]/60">
            <span className="text-[10px] text-slate-400">Đếm ngược:</span>
            <div className="flex items-center gap-1">
              {[2, 3, 5, 10].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetDelay(sec);
                  }}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    autoProceedDelaySeconds === sec
                      ? "bg-emerald-600 text-white font-bold"
                      : "bg-[#101520] text-slate-400 hover:text-slate-200 border border-[#1E2638]"
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Automation Toggles (No typing!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#1C2436]/60">
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0E131E] border border-[#1E2638]">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-3.5 h-3.5 text-blue-400" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-200 font-medium">Tự động lưu bản nháp</span>
              <span className="text-[10px] text-slate-400">Lưu checkpoint sau mỗi bước</span>
            </div>
          </div>
          <Switch
            checked={autoSaveCheckpoint}
            onCheckedChange={onSetAutoSave}
          />
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0E131E] border border-[#1E2638]">
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-200 font-medium">Âm thanh thông báo</span>
              <span className="text-[10px] text-slate-400">Phát chuông khi AI xử lý xong</span>
            </div>
          </div>
          <Switch
            checked={audioNotification}
            onCheckedChange={onSetAudioNotification}
          />
        </div>
      </div>
    </div>
  );
}
