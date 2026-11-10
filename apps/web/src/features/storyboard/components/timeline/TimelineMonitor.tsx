"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Camera,
  Eye,
  Volume2,
  Sparkles,
} from "lucide-react";

interface TimelineMonitorProps {
  scene: StoryboardScene;
  totalScenes: number;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  onTogglePlay: (playing: boolean) => void;
  onPrevScene: () => void;
  onNextScene: () => void;
  onOpenPreview?: (imageUrl: string) => void;
}

export function TimelineMonitor({
  scene,
  totalScenes,
  isPlaying,
  currentTime,
  totalDuration,
  onTogglePlay,
  onPrevScene,
  onNextScene,
  onOpenPreview,
}: TimelineMonitorProps): React.ReactElement {
  return (
    <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-center gap-4 p-3 bg-[#080C14] border-b border-[#1C2436] select-none overflow-hidden">
      {/* 1. Main 16:9 Preview Player Monitor */}
      <div className="relative w-full max-w-[460px] 2xl:max-w-[560px] max-h-[300px] aspect-video bg-[#05070B] rounded-xl border border-[#1A2234] overflow-hidden group shadow-2xl flex items-center justify-center shrink-0">
        {scene.thumbnailUrl ? (
          <img
            src={scene.thumbnailUrl}
            alt={scene.title}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Camera className="w-8 h-8 text-slate-600 animate-pulse" />
            <span className="text-xs font-mono">Chờ sinh ảnh AI cho phân cảnh</span>
          </div>
        )}

        {/* Top Monitor HUD Overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-cyan-500/30">
            <span className="font-mono text-[10px] font-bold text-cyan-300">
              CẢNH 0{scene.sceneNumber} / 0{totalScenes}
            </span>
            <span className="text-[10px] text-slate-400">·</span>
            <span className="font-mono text-[10px] text-slate-300">{scene.durationSeconds}s</span>
          </div>

          {scene.thumbnailUrl && onOpenPreview && (
            <button
              type="button"
              onClick={() => onOpenPreview(scene.thumbnailUrl!)}
              className="pointer-events-auto p-1.5 rounded-md bg-black/80 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-colors cursor-pointer"
              title="Phóng to ảnh (Lightbox)"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Center Hover Play & Prev/Next Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-3 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            type="button"
            onClick={onPrevScene}
            disabled={scene.sceneNumber <= 1}
            className="p-1.5 rounded-full bg-black/75 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 border border-slate-700/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Cảnh trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onTogglePlay(!isPlaying)}
            className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title={isPlaying ? "Tạm dừng (Space)" : "Phát thử (Space)"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            )}
          </button>

          <button
            type="button"
            onClick={onNextScene}
            disabled={scene.sceneNumber >= totalScenes}
            className="p-1.5 rounded-full bg-black/75 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 border border-slate-700/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Cảnh tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Monitor Camera Specs Pill */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10 text-[9px] font-mono">
          <div className="flex items-center gap-1 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded border border-[#24324D] text-cyan-300 truncate max-w-[280px]">
            <Camera className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">
              {scene.cameraLens || "85mm"} · f/{scene.cameraDof || 1.8} · {scene.cameraMovement || "Static"}
            </span>
          </div>

          {scene.transitionType && (
            <div className="bg-black/85 backdrop-blur-md px-1.5 py-0.5 rounded border border-slate-700 text-slate-300 shrink-0">
              ⚡ {scene.transitionType}
            </div>
          )}
        </div>
      </div>

      {/* 2. Director Spotlight: Scene Summary & Live Dialogue Subtitle */}
      <div className="flex-1 flex flex-col justify-between min-w-0 h-full py-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
              Focus Scene 0{scene.sceneNumber}
            </span>
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              Thời gian tổng: <strong className="text-slate-200">{currentTime.toFixed(1)}s</strong> / {totalDuration.toFixed(1)}s
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-100 truncate leading-snug" title={scene.title}>
            {scene.title}
          </h3>

          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed" title={scene.visualPrompt || scene.description}>
            <Sparkles className="w-3 h-3 text-cyan-400 inline mr-1" />
            {scene.visualPrompt || scene.description || "Chưa có mô tả hình ảnh."}
          </p>
        </div>

        {/* Voiceover Subtitle Bar */}
        <div className="mt-2 p-2 bg-[#0C121E] border border-[#1E293F] rounded-lg flex items-start gap-2">
          <div className="flex items-center gap-1 shrink-0 mt-0.5 text-cyan-400">
            <Volume2 className="w-3.5 h-3.5" />
            {isPlaying && (
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150" />
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-300 italic line-clamp-2 leading-tight">
            &ldquo;{scene.voiceover || "Chưa có lời thoại lồng tiếng cho phân cảnh này."}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

