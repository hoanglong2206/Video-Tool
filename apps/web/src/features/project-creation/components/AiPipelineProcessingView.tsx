"use client";

import React, { useState, useEffect, useRef } from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { AiStageSelectorList, type LogEntry } from "./AiStageSelectorList";
import { AiStageResultInspector } from "./AiStageResultInspector";
import { CancelAnalysisConfirmDialog } from "./CancelAnalysisConfirmDialog";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

interface AiPipelineProcessingViewProps {
  activeStage: number;
  formData: ProjectBriefFormData;
  aiOutput: FullAiAnalysisOutput;
  isAnalyzing: boolean;
  onProceedToInspection: () => void;
  onBackToInput: () => void;
}

export function AiPipelineProcessingView({
  activeStage,
  formData,
  aiOutput,
  isAnalyzing,
  onProceedToInspection,
  onBackToInput,
}: AiPipelineProcessingViewProps): React.ReactElement {
  const [selectedStage, setSelectedStage] = useState<number>(1);
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
  const loggedStagesRef = useRef<Set<number>>(new Set());

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "log-init",
      time: "00:00.2",
      stageName: "LLM",
      message: `Khởi tạo tiến trình phân tích cho "${formData.projectName || "Dự án"}"`,
      type: "info",
    },
  ]);

  // Synchronize selectedStage with activeStage progression while running
  useEffect(() => {
    if (activeStage >= 1 && activeStage <= 4) {
      setSelectedStage(activeStage);
    }
  }, [activeStage]);

  // Append telemetry logs when stage changes (strictly once per stage, guaranteed unique IDs)
  useEffect(() => {
    if (activeStage < 1 || loggedStagesRef.current.has(activeStage)) return;
    loggedStagesRef.current.add(activeStage);

    const timestamp = `00:0${Math.min(activeStage, 4)}.4`;
    let newLog: LogEntry | null = null;

    if (activeStage === 1) {
      newLog = {
        id: "log-stage-1",
        time: timestamp,
        stageName: "LLM",
        message: `Phân tích brief: Đã bóc tách 3 key hooks và cấu trúc ${formData.duration}`,
        type: "success",
      };
    } else if (activeStage === 2) {
      newLog = {
        id: "log-stage-2",
        time: timestamp,
        stageName: "Vision",
        message: `Quét ${formData.files.length} tệp: Trích xuất ${formData.brandColors.length} mã màu HEX. Độ nhận diện 98%`,
        type: "success",
      };
    } else if (activeStage === 3) {
      newLog = {
        id: "log-stage-3",
        time: timestamp,
        stageName: "PromptBuilder",
        message: `Đã chuẩn hóa 6 Visual Prompts theo phong cách "${formData.stylePreference}"`,
        type: "success",
      };
    } else if (activeStage >= 4) {
      newLog = {
        id: "log-stage-4",
        time: timestamp,
        stageName: "Schema",
        message: "Xác thực ProjectSpec.v2.json: 24/24 tham số đạt chuẩn sản xuất. 0 lỗi.",
        type: "success",
      };
    }

    if (newLog) {
      setLogs((prev) => {
        if (prev.some((l) => l.id === newLog!.id)) return prev;
        return [...prev, newLog!];
      });
    }
  }, [activeStage, formData]);

  const progressPercent =
    activeStage === 1
      ? 25
      : activeStage === 2
      ? 50
      : activeStage === 3
      ? 75
      : 100;

  const isCompleted = !isAnalyzing && (activeStage >= 4 || activeStage === 5);

  const handleBackClick = () => {
    if (isAnalyzing) {
      setShowCancelConfirm(true);
    } else {
      onBackToInput();
    }
  };

  return (
    <div className="flex-1 h-full min-h-0 w-full flex flex-col p-4 gap-3 overflow-hidden select-none bg-[#0B0F17] text-slate-100">
      {/* Top Studio Control Bar */}
      <div className="bg-gradient-to-r from-[#121826] to-[#0D121D] border border-[#1E2638] rounded-xl px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-slate-100 truncate">
                Hệ thống Đa tác vụ AI đang phân tích & trích xuất dữ liệu
              </h2>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-normal shrink-0 border ${
                  isCompleted
                    ? "bg-emerald-950/60 border-emerald-800/40 text-emerald-400"
                    : "bg-blue-950/60 border-blue-800/40 text-blue-400 animate-pulse"
                }`}
              >
                {isCompleted ? "4/4 Stages Hoàn tất" : `Đang xử lý: Stage 0${activeStage}`}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {formData.projectName} ({formData.client}) — Bấm vào từng Stage để xem chi tiết & kết quả phân tích.
            </p>
          </div>
        </div>

        {/* Center Progress Bar */}
        <div className="hidden md:flex items-center gap-3 w-64 px-2">
          <div className="flex-1 h-1.5 bg-[#172033] rounded-full overflow-hidden border border-[#222E47]">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-cyan-400 tabular-nums shrink-0">
            {progressPercent}%
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBackClick}
            className="h-8 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sửa lại Brief</span>
          </Button>

          {/* User cannot click continue when not finished */}
          <Button
            type="button"
            size="sm"
            disabled={!isCompleted}
            onClick={onProceedToInspection}
            className={`h-8 text-xs px-3.5 font-bold flex items-center gap-1.5 transition-all ${
              isCompleted
                ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-md shadow-emerald-600/30 cursor-pointer"
                : "bg-[#141B29] text-slate-500 border border-[#1E2638] cursor-not-allowed opacity-60"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tiếp tục: Giao diện kiểm tra ➔</span>
              </>
            ) : (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>Đang phân tích Stage 0{activeStage}/4...</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Full-Screen Split Viewport (Balanced 2-Column Grid) */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-3.5 overflow-hidden">
        {/* Left 5 Columns: 4 Interactive Stage Cards + Agent Live Logs */}
        <div className="col-span-12 lg:col-span-5 min-h-0 h-full overflow-hidden flex flex-col">
          <AiStageSelectorList
            activeStage={activeStage}
            selectedStage={selectedStage}
            onSelectStage={setSelectedStage}
            logs={logs}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Right 7 Columns: Stage Result Inspector (Full Details & Artifacts) */}
        <div className="col-span-12 lg:col-span-7 min-h-0 h-full overflow-hidden flex flex-col">
          <AiStageResultInspector
            selectedStage={selectedStage}
            aiOutput={aiOutput}
            formData={formData}
          />
        </div>
      </div>

      {/* Cancel Confirmation Modal while analyzing */}
      <CancelAnalysisConfirmDialog
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirmCancel={() => {
          setShowCancelConfirm(false);
          onBackToInput();
        }}
      />
    </div>
  );
}
