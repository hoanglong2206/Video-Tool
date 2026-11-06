"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PIPELINE_STAGES,
  getStageById,
  getNextStageId,
  getPrevStageId,
  type PipelineStageId,
  type PipelineStageConfig,
} from "../config/stages";
import { PipelineJourneyBar } from "./PipelineJourneyBar";
import { usePipelineSettingsStore } from "../store/pipelineSettingsStore";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { Button } from "@/components/ui";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Pause,
  Play,
  Settings,
  Sparkles,
} from "lucide-react";

interface PipelineStageViewProps {
  projectId: string;
  stageId: PipelineStageId;
  projectName?: string;
}

export function PipelineStageView({
  projectId,
  stageId,
  projectName = "Aurora X1 Launch",
}: PipelineStageViewProps): React.ReactElement {
  const router = useRouter();
  const stage = getStageById(stageId) || PIPELINE_STAGES[0];
  const nextStageId = getNextStageId(stage.id);
  const prevStageId = getPrevStageId(stage.id);

  const { approvalMode, autoProceedDelaySeconds } = usePipelineSettingsStore();

  const [countdown, setCountdown] = useState<number>(autoProceedDelaySeconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [hoveredStage, setHoveredStage] = useState<PipelineStageConfig | null>(null);

  const displayStage = hoveredStage || stage;

  // Auto-proceed logic when approvalMode === 'always_proceed'
  useEffect(() => {
    if (approvalMode !== "always_proceed" || isPaused || !nextStageId) return;

    setCountdown(autoProceedDelaySeconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsApproved(true);
          router.push(`/projects/${projectId}/${nextStageId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stageId, approvalMode, isPaused, nextStageId, autoProceedDelaySeconds, projectId, router]);

  const handleManualApproveAndProceed = () => {
    setIsApproved(true);
    if (nextStageId) {
      router.push(`/projects/${projectId}/${nextStageId}`);
    } else {
      router.push(`/projects`);
    }
  };

  const Icon = stage.icon;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* 1. Left Sidebar */}
      <DashboardSidebar />

      {/* 2. Main Studio Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dự án</span>
            </Link>

            <span className="text-slate-600">/</span>

            <span className="text-xs font-bold text-slate-200 truncate max-w-xs">
              {projectName}
            </span>

            <span className="text-[10px] font-mono bg-blue-950/80 text-blue-400 border border-blue-800/40 px-1.5 py-0.2 rounded">
              {projectId}
            </span>
          </div>

          {/* Mode Pill & Settings link */}
          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 bg-[#101520] border border-[#1E2638] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              <Settings className="w-3 h-3 text-slate-400" />
              <span>Chế độ:</span>
              <span className="text-blue-400 font-semibold font-mono">
                {approvalMode === "always_proceed" ? "Tự động (Always Proceed)" : "Thủ công (Duyệt từng bước)"}
              </span>
            </Link>
          </div>
        </header>

        {/* 3. The 9-Stage Pipeline Bar (from story -> export) */}
        <PipelineJourneyBar
          projectId={projectId}
          currentStageId={stage.id}
          onHoverStage={setHoveredStage}
        />

        {/* 4. Action & Approval Control Bar (Fixed height to prevent any layout jump) */}
        <div className="h-14 bg-[#0E131E] border-b border-[#1C2436] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded border bg-emerald-950 text-emerald-300 border-emerald-700/60 shrink-0">
              {displayStage.approvalLabel}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-200 truncate flex items-center gap-1.5">
                <span>Bước 0{displayStage.stepNumber}: {displayStage.fullName}</span>
                {hoveredStage && (
                  <span className="text-[10px] text-blue-400 font-normal font-mono bg-blue-950/60 px-1 rounded border border-blue-800/40">
                    Xem trước
                  </span>
                )}
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                {displayStage.description}
              </span>
            </div>
          </div>

          {/* Controls: Manual Approve or Always Proceed Countdown */}
          <div className="flex items-center gap-2.5">
            {approvalMode === "always_proceed" ? (
              <div className="flex items-center gap-2 bg-[#121826] border border-[#1E2638] px-3 py-1 rounded-lg">
                <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  Tự động chuyển sau: <strong className="text-white">{countdown}s</strong>
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPaused(!isPaused)}
                  className="h-6 px-2 text-[10px] bg-[#161D2C] border-[#242D40] text-slate-300"
                >
                  {isPaused ? <Play className="w-2.5 h-2.5 mr-1" /> : <Pause className="w-2.5 h-2.5 mr-1" />}
                  {isPaused ? "Tiếp tục" : "Tạm dừng"}
                </Button>

                <Button
                  size="sm"
                  onClick={handleManualApproveAndProceed}
                  className="h-6 px-2 text-[10px] bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  Chuyển ngay ➔
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={handleManualApproveAndProceed}
                className="h-8 px-4 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30"
              >
                {nextStageId ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Duyệt & Chuyển sang bước tiếp theo ➔</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Hoàn tất & Bàn giao dự án ✓</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* 5. Center Empty Screen Area (Sẵn sàng triển khai chi tiết sau) */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden select-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111726]/40 via-[#0B0F17] to-[#0B0F17]">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141B29_1px,transparent_1px),linear-gradient(to_bottom,#141B29_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

          {/* Central Placeholder Card */}
          <div className="max-w-md w-full bg-[#101520]/80 backdrop-blur-md border border-[#1E2638] rounded-2xl p-8 flex flex-col items-center shadow-2xl relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 shadow-lg">
              <Icon className="w-8 h-8" />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold bg-emerald-950 text-emerald-300 border-emerald-700/60">
                {stage.approvalLabel}
              </span>
              <span className="text-xs font-mono text-slate-400">
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
                  onClick={() => router.push(`/projects/${projectId}/${prevStageId}`)}
                  className="h-8 text-xs bg-[#0E131E] border-[#1E2638] text-slate-300 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Bước trước
                </Button>
              )}

              <Button
                size="sm"
                onClick={handleManualApproveAndProceed}
                className="h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1"
              >
                <span>Duyệt bước này</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

