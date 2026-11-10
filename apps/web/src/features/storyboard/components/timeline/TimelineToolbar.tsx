"use client";

import React from "react";
import { Play, Pause, RotateCcw, Plus, ZoomIn, Film } from "lucide-react";
import { Button } from "@/components/ui";

interface TimelineToolbarProps {
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  totalScenes: number;
  zoomMode: "fit" | "1x" | "1.5x";
  isAddingScene?: boolean;
  onTogglePlay: (playing: boolean) => void;
  onRewind: () => void;
  onChangeZoom: (mode: "fit" | "1x" | "1.5x") => void;
  onAddScene: () => void;
}

export function TimelineToolbar({
  isPlaying,
  currentTime,
  totalDuration,
  totalScenes,
  zoomMode,
  isAddingScene,
  onTogglePlay,
  onRewind,
  onChangeZoom,
  onAddScene,
}: TimelineToolbarProps): React.ReactElement {
  const formatTimecode = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${tenths}`;
  };

  return (
    <div className="h-10 px-3 bg-[#0A0F1A] border-b border-[#1A2337] flex items-center justify-between shrink-0 select-none">
      {/* 1. Left Transport Controls & Timecode */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onTogglePlay(!isPlaying)}
          className={`h-7 px-2.5 rounded flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer ${
            isPlaying
              ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
              : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xs shadow-cyan-500/30"
          }`}
          title={isPlaying ? "Tạm dừng (Space)" : "Phát timeline (Space)"}
        >
          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 ml-0.5 fill-current" />}
          <span>{isPlaying ? "Dừng" : "Phát"}</span>
        </button>

        <button
          type="button"
          onClick={onRewind}
          className="p-1 rounded bg-[#121826] hover:bg-[#1A2338] text-slate-400 hover:text-white border border-[#202C46] transition-colors cursor-pointer"
          title="Tua về đầu (00:00.0)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#060910] border border-[#182236] font-mono text-[11px] tabular-nums">
          <span className="text-cyan-400 font-bold">{formatTimecode(currentTime)}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{formatTimecode(totalDuration)}</span>
        </div>
      </div>

      {/* 2. Center: Scene Count and Duration Pill */}
      <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
        <Film className="w-3 h-3 text-cyan-400" />
        <span>{totalScenes} Phân cảnh</span>
        <span>·</span>
        <span className="text-slate-200 font-bold">{totalDuration}s</span>
      </div>

      {/* 3. Right: Zoom Presets & Add Scene */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[#070A11] border border-[#1A2337] rounded p-0.5 text-[10px] font-mono">
          <span className="text-slate-500 px-1 flex items-center gap-0.5">
            <ZoomIn className="w-2.5 h-2.5" />
          </span>
          {(["fit", "1x", "1.5x"] as const).map((z) => (
            <button
              key={z}
              type="button"
              onClick={() => onChangeZoom(z)}
              className={`px-1.5 py-0.5 rounded uppercase font-semibold transition-colors cursor-pointer ${
                zoomMode === z
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {z === "fit" ? "Vừa màn hình" : z}
            </button>
          ))}
        </div>

        <Button
          type="button"
          size="sm"
          onClick={onAddScene}
          disabled={isAddingScene}
          className="h-7 text-xs bg-[#121A29] hover:bg-[#1C273E] border border-[#243350] text-slate-200 hover:text-white flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="w-3 h-3 text-cyan-400" />
          <span>Thêm cảnh</span>
        </Button>
      </div>
    </div>
  );
}

