"use client";

import React, { useEffect, useRef } from "react";
import type { StoryboardScene } from "../types";
import { Play, Pause, RotateCcw } from "lucide-react";

interface AnimaticsTimelineDockProps {
  scenes: StoryboardScene[];
  selectedSceneId: string;
  totalDuration: number;
  isPlaying: boolean;
  currentTime: number;
  onTogglePlay: (playing: boolean) => void;
  onSeek: (time: number) => void;
  onSelectScene: (sceneId: string) => void;
}

export function AnimaticsTimelineDock({
  scenes,
  selectedSceneId,
  totalDuration,
  isPlaying,
  currentTime,
  onTogglePlay,
  onSeek,
  onSelectScene,
}: AnimaticsTimelineDockProps): React.ReactElement {
  // Synchronize Playhead when user selects scene while not playing
  useEffect(() => {
    if (isPlaying || !selectedSceneId || scenes.length === 0) return;
    let acc = 0;
    for (const s of scenes) {
      if (s.id === selectedSceneId) {
        onSeek(acc);
        break;
      }
      acc += s.durationSeconds;
    }
  }, [selectedSceneId, isPlaying, scenes, onSeek]);

  return (
    <div className="h-14 bg-[#090D15] border-t border-[#1C2436] px-4 flex items-center gap-4 shrink-0 select-none">
      {/* 1. Playback Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onTogglePlay(!isPlaying)}
          className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-colors cursor-pointer shadow-md shadow-cyan-500/25 font-bold"
          title={isPlaying ? "Tạm dừng" : "Chạy thử Animatics"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
        </button>

        <button
          type="button"
          onClick={() => {
            onTogglePlay(false);
            onSeek(0);
          }}
          className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Tua về đầu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <span className="text-[11px] font-mono text-cyan-400 tabular-nums ml-1">
          {currentTime.toFixed(1)}s / {totalDuration.toFixed(1)}s
        </span>
      </div>

      {/* 2. Visual Sequence Timeline Blocks */}
      <div className="flex-1 h-8 bg-[#05070B] rounded-lg border border-[#1A2234] flex p-0.5 gap-1 overflow-hidden relative">
        {/* Playhead Indicator */}
        {totalDuration > 0 && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-10 shadow-[0_0_8px_#22d3ee] pointer-events-none transition-all duration-100"
            style={{ left: `${Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))}%` }}
          />
        )}

        {scenes.map((scene) => {
          const widthPercent = totalDuration > 0 ? (scene.durationSeconds / totalDuration) * 100 : 16.6;
          const isCurrent = scene.id === selectedSceneId;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                onSelectScene(scene.id);
                let acc = 0;
                for (const s of scenes) {
                  if (s.id === scene.id) break;
                  acc += s.durationSeconds;
                }
                onSeek(acc);
              }}
              style={{ width: `${widthPercent}%` }}
              className={`h-full rounded text-[10px] font-mono flex items-center justify-between px-2 transition-all cursor-pointer relative truncate ${
                isCurrent
                  ? "bg-cyan-950/90 text-cyan-300 border border-cyan-400 shadow-xs ring-1 ring-cyan-400/50 font-bold"
                  : "bg-[#101625] text-slate-400 hover:bg-[#151D2F] border border-transparent"
              }`}
              title={`${scene.title} (${scene.durationSeconds}s)`}
            >
              <span className="font-bold truncate">0{scene.sceneNumber}</span>
              <span className="text-[9px] opacity-70 shrink-0">{scene.durationSeconds}s</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
