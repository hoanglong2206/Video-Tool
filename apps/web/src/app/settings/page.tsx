"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { usePipelineSettingsStore, type PipelineApprovalMode } from "@/features/pipeline";
import { Input, Button } from "@/components/ui";
import {
  Cpu,
  Film,
  HardDrive,
  CheckCircle2,
  GitBranch,
  ShieldAlert,
  Zap,
} from "lucide-react";

export default function SettingsPage(): React.ReactElement {
  const [saved, setSaved] = useState(false);
  const {
    approvalMode,
    autoProceedDelaySeconds,
    setApprovalMode,
    setAutoProceedDelaySeconds,
  } = usePipelineSettingsStore();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0">
          <h1 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
            Cài đặt Hệ thống Studio
          </h1>
          <Button
            size="sm"
            onClick={handleSave}
            className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold"
          >
            {saved ? (
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> Đã lưu cấu hình
              </span>
            ) : (
              "Lưu cấu hình"
            )}
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 max-w-4xl space-y-6">
          {/* 1. Pipeline Approval Automation Mode (New Feature requested by user) */}
          <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2436]">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Chế độ Duyệt Luồng Pipeline (Story ➔ Export)
                </h2>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Điều chỉnh cơ chế chuyển bước tự động
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Option A: Manual Human Approval */}
              <div
                onClick={() => setApprovalMode("manual")}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                  approvalMode === "manual"
                    ? "bg-[#141B29] border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                    : "bg-[#0E131E] border-[#1E2638] hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      Phê duyệt thủ công (Human Approval)
                    </span>
                    <input
                      type="radio"
                      name="approvalMode"
                      checked={approvalMode === "manual"}
                      onChange={() => setApprovalMode("manual")}
                      className="accent-blue-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Mỗi bước pipeline sẽ dừng lại đợi bạn trực tiếp duyệt (click nút &ldquo;Duyệt & Chuyển bước&rdquo;) để đảm bảo chất lượng từng khâu.
                  </p>
                </div>
                <span className="text-[10px] text-amber-400/90 font-mono mt-3">
                  • Khuyên dùng cho sản phẩm yêu cầu kiểm soát kỹ thuật cao
                </span>
              </div>

              {/* Option B: Always Proceed (Automatic) */}
              <div
                onClick={() => setApprovalMode("always_proceed")}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                  approvalMode === "always_proceed"
                    ? "bg-[#141B29] border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    : "bg-[#0E131E] border-[#1E2638] hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      Tự động chuyển bước (Always Proceed)
                    </span>
                    <input
                      type="radio"
                      name="approvalMode"
                      checked={approvalMode === "always_proceed"}
                      onChange={() => setApprovalMode("always_proceed")}
                      className="accent-emerald-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Hệ thống sẽ tự động duyệt và tự nhảy sang bước tiếp theo sau thời gian đếm ngược (vẫn có nút tạm dừng nếu bạn muốn can thiệp).
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1C2436]/60">
                  <span className="text-[10px] text-slate-400">Thời gian đếm ngược:</span>
                  <div className="flex items-center gap-1">
                    {[2, 3, 5, 10].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAutoProceedDelaySeconds(sec);
                        }}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
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
          </div>

          {/* 2. AI Engines */}
          <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1C2436]">
              <Cpu className="w-4 h-4 text-blue-400" />
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Cấu hình AI Inference Engine
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-slate-400">
                  Ollama / LLM Host URL
                </label>
                <Input
                  defaultValue="http://localhost:11434"
                  className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400">
                  LLM Model Name
                </label>
                <Input
                  defaultValue="llama3.2:latest"
                  className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1"
                />
              </div>
            </div>
          </div>

          {/* 3. Render specs */}
          <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1C2436]">
              <Film className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Remotion Render & Video Post Engine
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-slate-400">
                  Phần cứng tăng tốc GPU
                </label>
                <Input
                  defaultValue="NVIDIA NVENC (Dual RTX 4090)"
                  className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1"
                  readOnly
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400">
                  Số luồng CPU Remotion Concurrency
                </label>
                <Input
                  defaultValue="8 worker threads"
                  className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1"
                />
              </div>
            </div>
          </div>

          {/* 4. Storage & Schema */}
          <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1C2436]">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Lưu trữ & JSON Schema Validator
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-slate-400">
                  Đường dẫn Storage cục bộ
                </label>
                <Input
                  defaultValue="d:\IT\DEMO\video-ai-demo\storage"
                  className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1"
                  readOnly
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400">
                  Schema Validator Mode
                </label>
                <Input
                  defaultValue="STRICT_CONTRACT_V2 (Auto-repair enabled)"
                  className="bg-[#0B0F17] border-[#1E2638] text-xs mt-1"
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
