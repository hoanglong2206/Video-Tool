"use client";

import React, { useState } from "react";
import { Play, Pause, Volume2, Maximize2, Film } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared";
import type { ProjectItem } from "@/services/dashboard";

interface VideoPreviewModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateDetail?: (project: ProjectItem) => void;
}

export function VideoPreviewModal({
  project,
  isOpen,
  onClose,
  onNavigateDetail,
}: VideoPreviewModalProps): React.ReactElement | null {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[#0D121D] border-[#1E2638] text-slate-100 p-5 select-none">
        <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#1E2638]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <Film className="w-3.5 h-3.5" />
            </div>
            <div>
              <DialogTitle className="text-sm font-bold text-slate-100">
                {project.name}
              </DialogTitle>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Xem lại kết quả video Remotion 4K UHD · 60fps
              </p>
            </div>
          </div>
          <div className="mr-6">
            <StatusBadge status={project.status} />
          </div>
        </DialogHeader>

        {/* Video Monitor Player Area */}
        <div className="relative w-full aspect-video rounded-lg bg-gradient-to-br from-[#121826] via-[#0A0D15] to-[#080B10] border border-[#1E2638] overflow-hidden flex flex-col justify-between p-3 my-1">
          {/* Subtle animated lighting effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent pointer-events-none" />

          {/* Top Info Bar */}
          <div className="flex items-center justify-between z-10 text-[10px] font-mono text-slate-300">
            <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10">
              4K UHD · H.264
            </span>
            <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 text-emerald-400">
              ● Master Render Ready
            </span>
          </div>

          {/* Central Play/Pause Watermark */}
          <div className="flex items-center justify-center z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-blue-600/90 hover:bg-blue-500 hover:scale-110 border border-blue-400/50 flex items-center justify-center text-white shadow-2xl transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Player Bottom Control Strip */}
          <div className="z-10 bg-black/70 backdrop-blur-md p-2 rounded-md border border-white/10 flex flex-col gap-1.5">
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer">
              <div
                className={`h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full ${
                  isPlaying ? "w-2/3 animate-pulse" : "w-2/3"
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span>00:20 / 00:30</span>
                <span>·</span>
                <span>24 FPS Cinema</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-200" />
                <Maximize2 className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1E2638] text-xs">
          <span className="text-[11px] text-slate-400 font-mono">
            {project.stageDescription || "Hoàn tất render"}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-8 text-xs border-[#222C42] bg-[#141A28] text-slate-300 hover:bg-[#1A2234] cursor-pointer"
            >
              Đóng
            </Button>
            {onNavigateDetail && (
              <Button
                size="sm"
                onClick={() => {
                  onClose();
                  onNavigateDetail(project);
                }}
                className="h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 cursor-pointer"
              >
                {project.status === "waiting_approval" ? "Đi tới phê duyệt ➔" : "Quản lý xuất bản ➔"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

