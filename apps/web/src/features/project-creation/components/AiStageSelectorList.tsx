"use client";

import React from "react";
import {
  Brain,
  Eye,
  Wand2,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Terminal,
  Activity,
} from "lucide-react";

export interface PipelineStageConfig {
  stage: number;
  name: string;
  shortDesc: string;
  icon: React.ElementType;
  gradient: string;
  modelBadge: string;
}

export const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    stage: 1,
    name: "LLM (Large Language Model)",
    shortDesc: "Bóc tách thông điệp cốt lõi, insight & cấu trúc kịch bản",
    icon: Brain,
    gradient: "from-blue-600 to-indigo-600",
    modelBadge: "Claude 3.7 Sonnet",
  },
  {
    stage: 2,
    name: "Vision AI Engine",
    shortDesc: "Trích xuất bảng màu HEX, nhận diện vật thể & bố cục",
    icon: Eye,
    gradient: "from-cyan-600 to-blue-600",
    modelBadge: "ViT-H/14 + CLIP",
  },
  {
    stage: 3,
    name: "Prompt Builder Core",
    shortDesc: "Chuẩn hóa 6 Visual Prompts theo chuẩn Remotion & Blender",
    icon: Wand2,
    gradient: "from-purple-600 to-indigo-600",
    modelBadge: "PromptEngine v3",
  },
  {
    stage: 4,
    name: "JSON Schema Validator",
    shortDesc: "Kiểm tra 24 tham số kỹ thuật theo ProjectSpec.v2.json",
    icon: ShieldCheck,
    gradient: "from-emerald-600 to-teal-600",
    modelBadge: "Zod Schema 3.24",
  },
];

export interface LogEntry {
  id: string;
  time: string;
  stageName: string;
  message: string;
  type?: "info" | "success" | "warn";
}

interface AiStageSelectorListProps {
  activeStage: number;
  selectedStage: number;
  onSelectStage: (stage: number) => void;
  logs: LogEntry[];
  isAnalyzing?: boolean;
}

export function AiStageSelectorList({
  activeStage,
  selectedStage,
  onSelectStage,
  logs,
  isAnalyzing = false,
}: AiStageSelectorListProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden select-none">
      {/* 4 Interactive Stage Cards */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 uppercase tracking-wider px-1">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Các giai đoạn phân tích AI (4 Stages)</span>
          </span>
          <span className="text-[10px] text-slate-400 font-normal lowercase">
            (click stage để xem chi tiết)
          </span>
        </div>

        {PIPELINE_STAGES.map((s) => {
          const Icon = s.icon;
          const isDone = activeStage > s.stage || activeStage >= 5 || (!isAnalyzing && activeStage >= 4);
          const isRunning = isAnalyzing && activeStage === s.stage;
          const isSelected = selectedStage === s.stage;

          return (
            <div
              key={s.stage}
              onClick={() => onSelectStage(s.stage)}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? "bg-[#131B2B] border-blue-500 shadow-md shadow-blue-500/20 ring-1 ring-blue-500/40"
                  : isRunning
                  ? "bg-[#101726] border-blue-500/70 shadow-xs"
                  : isDone
                  ? "bg-[#0E131E] border-[#1C2436] hover:border-[#2C3852] hover:bg-[#121927]"
                  : "bg-[#0A0D15] border-[#182030]/60 opacity-65 hover:opacity-90"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr shrink-0 ${s.gradient}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 truncate">
                    {s.name}
                  </h4>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 font-mono text-[10px]">
                  {isDone ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Hoàn tất
                    </span>
                  ) : isRunning ? (
                    <span className="text-blue-400 flex items-center gap-1 font-semibold bg-blue-950/60 border border-blue-800/40 px-1.5 py-0.2 rounded animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" /> Đang chạy...
                    </span>
                  ) : (
                    <span className="text-slate-400 px-1.5 py-0.2">Chờ</span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-1">
                {s.shortDesc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Agent Live Telemetry Terminal */}
      <div className="flex-1 min-h-0 bg-[#070A10] border border-[#1A2234] rounded-xl p-3 flex flex-col overflow-hidden font-mono">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1A2234] shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-bold text-slate-300">
              Agent Live Telemetry
            </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Streaming
          </span>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-1.5 text-[10px]">
          {logs.map((log, idx) => (
            <div key={`${log.id}-${idx}`} className="flex items-start gap-1.5 leading-relaxed">
              <span className="text-slate-600 shrink-0">[{log.time}]</span>
              <span
                className={`font-semibold shrink-0 ${
                  log.stageName === "LLM"
                    ? "text-blue-400"
                    : log.stageName === "Vision"
                    ? "text-cyan-400"
                    : log.stageName === "PromptBuilder"
                    ? "text-purple-400"
                    : "text-emerald-400"
                }`}
              >
                [{log.stageName}]
              </span>
              <span className={log.type === "success" ? "text-emerald-300" : "text-slate-300"}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

