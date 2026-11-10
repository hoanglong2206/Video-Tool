"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { TimelineClip } from "./TimelineClip";
import { Film, Camera, Volume2, Music2 } from "lucide-react";

interface TimelineTracksProps {
  scenes: StoryboardScene[];
  selectedSceneId: string;
  totalDuration: number;
  currentTime: number;
  zoomMode: "fit" | "1x" | "1.5x";
  onSelectScene: (sceneId: string) => void;
  onUpdateTransition?: (sceneId: string, transition: string) => void;
  onMoveScene: (fromIndex: number, toIndex: number) => void;
  onSeek: (time: number) => void;
}

export function TimelineTracks({
  scenes,
  selectedSceneId,
  totalDuration,
  currentTime,
  zoomMode,
  onSelectScene,
  onUpdateTransition,
  onMoveScene,
  onSeek,
}: TimelineTracksProps): React.ReactElement {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onMoveScene(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
  };

  const playheadPercent =
    totalDuration > 0
      ? Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))
      : 0;

  const itemWidthClass =
    zoomMode === "1.5x"
      ? "w-[300px] shrink-0"
      : zoomMode === "1x"
      ? "w-[220px] shrink-0"
      : "flex-1 min-w-0";

  const rowContainerWidthClass =
    zoomMode === "1.5x"
      ? "min-w-[1800px]"
      : zoomMode === "1x"
      ? "min-w-[1320px]"
      : "w-full";

  return (
    <div className="flex flex-col relative select-none shrink-0 bg-[#06080F]">
      {/* Interactive Full-Height Playhead Needle across all tracks */}
      <div
        style={{ left: `calc(${playheadPercent}% + 8rem)` }}
        className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-30 pointer-events-none shadow-[0_0_10px_#22d3ee] transition-all duration-75 hidden md:block"
      />

      {/* TRACK 1: Video Storyboard Clips (V1) - 100% Equal Width Large Filmstrip Images */}
      <div className="h-24 flex border-b border-[#182133] bg-[#0A0D17]">
        <div className="w-32 xl:w-36 p-2 bg-[#0C101C] border-r border-[#182133] flex flex-col justify-center shrink-0">
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold font-mono">
            <Film className="w-3.5 h-3.5" />
            <span>V1 Video</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono mt-0.5">
            {scenes.length} khung hình đều
          </span>
        </div>

        <div className={`flex-1 p-1.5 flex items-center gap-2 overflow-x-auto ${rowContainerWidthClass}`}>
          {scenes.map((scene, idx) => (
            <TimelineClip
              key={scene.id}
              scene={scene}
              index={idx}
              isSelected={scene.id === selectedSceneId}
              zoomMode={zoomMode}
              isLast={idx === scenes.length - 1}
              onSelect={(id) => {
                onSelectScene(id);
                let acc = 0;
                for (const s of scenes) {
                  if (s.id === id) break;
                  acc += s.durationSeconds;
                }
                onSeek(acc);
              }}
              onUpdateTransition={onUpdateTransition}
              onDragStart={handleDragStart}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>

      {/* TRACK 2: Camera 3D Movement (CAM) - Perfectly Aligned */}
      <div className="h-9 flex border-b border-[#182133] bg-[#070A12]">
        <div className="w-32 xl:w-36 px-2 bg-[#0A0E18] border-r border-[#182133] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-bold font-mono">
            <Camera className="w-3 h-3" />
            <span>CAM 3D</span>
          </div>
          <span className="text-[8.5px] text-slate-500 font-mono">Góc quay</span>
        </div>

        <div className={`flex-1 px-1.5 py-0.5 flex items-center gap-2 overflow-x-auto ${rowContainerWidthClass}`}>
          {scenes.map((scene) => {
            const isCurrent = scene.id === selectedSceneId;
            return (
              <div
                key={`cam-${scene.id}`}
                onClick={() => onSelectScene(scene.id)}
                className={`h-7 rounded px-1.5 flex items-center justify-between text-[9px] font-mono border transition-all cursor-pointer truncate ${itemWidthClass} ${
                  isCurrent
                    ? "bg-indigo-950/80 border-indigo-400 text-indigo-300 font-bold"
                    : "bg-[#0E1424] border-[#1A253D] text-slate-400 hover:text-slate-200"
                }`}
                title={`Góc máy: ${scene.cameraMovement || "Static"}`}
              >
                <span className="truncate">
                  🎥 {scene.cameraMovement?.split(" ")[0] || "Static"}
                </span>
                <span className="opacity-70 text-[8px] shrink-0 ml-1">
                  {scene.cameraLens || "85mm"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRACK 3: Audio & Voiceover Subtitles (A1) - Perfectly Aligned */}
      <div className="h-9 flex border-b border-[#182133] bg-[#05070E]">
        <div className="w-32 xl:w-36 px-2 bg-[#090C16] border-r border-[#182133] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold font-mono">
            <Volume2 className="w-3 h-3" />
            <span>A1 Voice</span>
          </div>
          <span className="text-[8.5px] text-slate-500 font-mono">Lời thoại</span>
        </div>

        <div className={`flex-1 px-1.5 py-0.5 flex items-center gap-2 overflow-x-auto ${rowContainerWidthClass}`}>
          {scenes.map((scene) => {
            const isCurrent = scene.id === selectedSceneId;
            return (
              <div
                key={`aud-${scene.id}`}
                onClick={() => onSelectScene(scene.id)}
                className={`h-7 rounded px-2 flex items-center gap-1.5 border transition-all cursor-pointer truncate ${itemWidthClass} ${
                  isCurrent
                    ? "bg-emerald-950/70 border-emerald-400 text-emerald-200 font-medium"
                    : "bg-[#0B101E] border-[#182338] text-slate-400 hover:text-slate-200"
                }`}
                title={scene.voiceover || scene.description}
              >
                <div className="flex items-center gap-0.5 h-2.5 shrink-0 opacity-80">
                  <div className="w-0.5 h-2 bg-emerald-400 rounded-full" />
                  <div className="w-0.5 h-2.5 bg-emerald-400 rounded-full" />
                  <div className="w-0.5 h-1 bg-emerald-400 rounded-full" />
                </div>
                <p className="text-[8.5px] italic truncate leading-none min-w-0">
                  {scene.voiceover || "..."}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRACK 4: Background Music & Beat Markers (A2 BGM) */}
      <div className="h-9 flex bg-[#04060C]">
        <div className="w-32 xl:w-36 px-2 bg-[#070A14] border-r border-[#182133] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold font-mono">
            <Music2 className="w-3 h-3" />
            <span>A2 Music</span>
          </div>
          <span className="text-[8.5px] text-slate-500 font-mono">BGM 128bpm</span>
        </div>

        <div className={`flex-1 px-1.5 py-0.5 flex items-center overflow-x-auto ${rowContainerWidthClass}`}>
          <div className="w-full h-7 rounded px-2 bg-amber-950/20 border border-amber-900/30 flex items-center justify-between text-[8.5px] font-mono text-amber-300/80">
            <span className="flex items-center gap-1">
              <span>🎵 Cyberpunk Tech Epic (Soundtrack Master)</span>
              <span className="opacity-60">· Volume: 80% · Ducking Auto</span>
            </span>
            <div className="flex items-center gap-3 text-amber-400/60">
              <span>● Beat 1.2s</span>
              <span>● Beat 2.4s</span>
              <span>● Beat 3.6s</span>
              <span>● Beat 4.8s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
