"use client";

import React from "react";
import { Play, Sparkles, PauseCircle, Trash2, Clock, Film, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/shared";
import { Progress } from "@/components/ui/progress";
import type { ProjectItem } from "@/services/dashboard";

interface ProjectCardItemProps {
  project: ProjectItem;
  onOpenStopModal: (project: ProjectItem) => void;
  onOpenResumeModal: (project: ProjectItem) => void;
  onOpenDeleteModal: (project: ProjectItem) => void;
  onOpenVideoPreview: (project: ProjectItem) => void;
  onNavigate: (project: ProjectItem) => void;
}

export function ProjectCardItem({
  project,
  onOpenStopModal,
  onOpenResumeModal,
  onOpenDeleteModal,
  onOpenVideoPreview,
  onNavigate,
}: ProjectCardItemProps): React.ReactElement {
  const isInProgress = project.status === "in_progress";
  const isStopped = project.status === "stopped";
  const isWaiting = project.status === "waiting_approval";
  const isCompleted = project.status === "completed";
  const canPlayVideo = isWaiting || isCompleted;

  return (
    <div
      onClick={() => onNavigate(project)}
      className="bg-[#101520] border border-[#1C2436] hover:border-[#2D3C57] rounded-xl p-3 flex flex-col justify-between transition-all cursor-pointer group hover:bg-[#121826] relative overflow-hidden select-none"
    >
      {/* 16:9 Thumbnail Monitor */}
      <div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-br from-[#141B29] to-[#0A0D14] border border-[#1E2638] relative overflow-hidden flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent pointer-events-none" />

        {/* Center Action/State Element */}
        {canPlayVideo ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenVideoPreview(project);
            }}
            title="Bấm để xem lại kết quả video"
            className="w-10 h-10 rounded-full bg-blue-600/90 hover:bg-blue-500 hover:scale-110 border border-blue-400/50 flex items-center justify-center text-white shadow-xl cursor-pointer transition-all z-10"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </button>
        ) : isInProgress ? (
          <div className="flex flex-col items-center gap-1.5 z-10 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-blue-400 shadow-md">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-[9px] font-mono text-blue-300 bg-black/60 px-2 py-0.5 rounded border border-blue-800/40">
              AI Pipeline đang dựng
            </span>
          </div>
        ) : isStopped ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenResumeModal(project);
            }}
            title="Bấm để tiếp tục lại dự án"
            className="flex flex-col items-center gap-1.5 z-10 cursor-pointer group/resume hover:scale-105 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-rose-950/80 border border-rose-700/50 group-hover/resume:border-rose-400 group-hover/resume:bg-rose-900/80 flex items-center justify-center text-rose-300 group-hover/resume:text-white shadow-md transition-colors">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span className="text-[9px] font-mono text-rose-300 group-hover/resume:text-rose-200 bg-black/60 px-2 py-0.5 rounded border border-rose-800/40 group-hover/resume:border-rose-600/60 transition-colors">
              Tiến trình đã tạm dừng
            </span>
          </button>
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700/50 flex items-center justify-center text-slate-400 z-10 pointer-events-none">
            <Film className="w-4 h-4" />
          </div>
        )}

        {/* Top Left Duration */}
        <div className="absolute top-2 left-2 z-10">
          <span className="text-[9px] font-mono bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-slate-300 border border-white/10 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> 00:30
          </span>
        </div>

        {/* Top Right Status & Action Controls */}
        <div className="absolute top-2 right-2 z-10">
          {isInProgress ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenStopModal(project);
              }}
              title="Bấm vào để tạm dừng dự án"
              className="cursor-pointer group/badge transition-transform hover:scale-105"
            >
              <StatusBadge status="in_progress" className="hover:ring-1 hover:ring-amber-500/60" />
            </button>
          ) : isStopped ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenResumeModal(project);
                }}
                title="Bấm để tiếp tục lại dự án"
                className="cursor-pointer group/badge transition-transform hover:scale-105"
              >
                <StatusBadge status="stopped" className="hover:ring-1 hover:ring-rose-500/60 cursor-pointer" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDeleteModal(project);
                }}
                title="Xóa vĩnh viễn dự án"
                className="w-6 h-6 rounded bg-rose-950/90 border border-rose-700/60 hover:bg-rose-900 text-rose-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <StatusBadge status={project.status} />
          )}
        </div>

        {/* Bottom Format Tag */}
        <div className="absolute bottom-1.5 left-2 right-2 z-10 flex items-center justify-between text-[9px] text-slate-400 font-mono">
          <span className="bg-black/50 px-1.5 py-0.2 rounded">4K UHD</span>
          <span className="bg-black/50 px-1.5 py-0.2 rounded">Remotion v4</span>
        </div>
      </div>

      {/* Project Details */}
      <div className="mt-2.5">
        <div className="flex items-center justify-between gap-1.5 min-w-0">
          <h3 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors truncate">
            {project.name}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </div>
        <p className="text-[10px] text-slate-400 truncate mt-0.5">
          {project.stageDescription || "Pipeline v2.0"}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 pt-2 border-t border-[#1C2436]/60">
        <div className="flex items-center justify-between text-[9px] font-mono tabular-nums text-slate-400 mb-1">
          <span>Tiến độ</span>
          <span className="font-semibold text-slate-200">{project.progress}%</span>
        </div>
        <Progress
          value={project.progress}
          className={`h-1.5 ${
            isCompleted
              ? "[&>div]:bg-emerald-500"
              : isWaiting
              ? "[&>div]:bg-amber-500"
              : isStopped
              ? "[&>div]:bg-rose-500"
              : "[&>div]:bg-blue-500"
          }`}
        />
      </div>
    </div>
  );
}

