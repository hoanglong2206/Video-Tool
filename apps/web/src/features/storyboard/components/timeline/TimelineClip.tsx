"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { Camera, GripVertical } from "lucide-react";

interface TimelineClipProps {
  scene: StoryboardScene;
  index: number;
  isSelected: boolean;
  zoomMode: "fit" | "1x" | "1.5x";
  isLast: boolean;
  onSelect: (sceneId: string) => void;
  onUpdateTransition?: (sceneId: string, transition: string) => void;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
}

export function TimelineClip({
  scene,
  index,
  isSelected,
  zoomMode,
  isLast,
  onSelect,
  onUpdateTransition,
  onDragStart,
  onDragOver,
  onDrop,
}: TimelineClipProps): React.ReactElement {
  const TRANSITIONS = ["Cut", "Cross Dissolve", "Whip Pan Blur", "Zoom Push", "Glitch Digital"];

  const handleCycleTransition = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onUpdateTransition) return;
    const curIdx = TRANSITIONS.indexOf(scene.transitionType || "Cut");
    const nextIdx = (curIdx + 1) % TRANSITIONS.length;
    onUpdateTransition(scene.id, TRANSITIONS[nextIdx]);
  };

  const getTransitionShortLabel = (type?: string): string => {
    switch (type) {
      case "Cross Dissolve":
        return "Dis";
      case "Whip Pan Blur":
        return "Pan";
      case "Zoom Push":
        return "Push";
      case "Glitch Digital":
        return "Glit";
      default:
        return "Cut";
    }
  };

  const widthClass =
    zoomMode === "1.5x"
      ? "w-[300px] shrink-0"
      : zoomMode === "1x"
      ? "w-[220px] shrink-0"
      : "flex-1 min-w-0";

  return (
    <div className={`h-full relative select-none ${widthClass}`}>
      {/* 1. Main Video Clip: Full-Bleed 16:9 Cinematic Image Block */}
      <div
        draggable
        onDragStart={(e) => onDragStart && onDragStart(e, index)}
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver && onDragOver(e);
        }}
        onDrop={(e) => onDrop && onDrop(e, index)}
        onClick={() => onSelect(scene.id)}
        className={`w-full h-full rounded-lg border relative overflow-hidden transition-all cursor-pointer shadow-md ${
          isSelected
            ? "border-cyan-400 ring-2 ring-cyan-400 shadow-cyan-500/30"
            : "border-[#1E283D] hover:border-cyan-500/70"
        }`}
      >
        {/* Full Image */}
        {scene.thumbnailUrl ? (
          <img
            src={scene.thumbnailUrl}
            alt={scene.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
          />
        ) : (
          <div className="w-full h-full bg-[#080D18] flex flex-col items-center justify-center text-slate-500 gap-1">
            <Camera className="w-5 h-5 text-slate-600" />
            <span className="text-[9px] font-mono">Chờ ảnh</span>
          </div>
        )}

        {/* Filmstrip Top & Bottom Sprocket Borders */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3B4D73]/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3B4D73]/60 to-transparent pointer-events-none" />

        {/* Minimalist Scene Tag Overlay (Top-Left) */}
        <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/85 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono border border-black/40 pointer-events-none z-10">
          <span
            className={`font-black ${
              isSelected ? "text-cyan-400" : "text-slate-200"
            }`}
          >
            0{scene.sceneNumber}
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300 font-semibold">{scene.durationSeconds}s</span>
        </div>

        {/* Drag Indicator (Top-Right on Hover) */}
        <span
          className="absolute top-1.5 right-1.5 p-0.5 rounded bg-black/70 text-slate-400 hover:text-white cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Kéo thả để sắp xếp lại phân cảnh"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3 h-3" />
        </span>
      </div>

      {/* 2. Absolute Floating Transition Connector on the Seam (Takes 0px of flex width) */}
      {!isLast && (
        <button
          type="button"
          onClick={handleCycleTransition}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-6 px-1.5 rounded-full bg-[#0B111D] hover:bg-cyan-950 border border-[#233148] hover:border-cyan-400 text-[8.5px] font-mono text-cyan-300 shadow-xl cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-0.5"
          title={`Hiệu ứng chuyển cảnh: ${scene.transitionType || "Cut"} (Nhấp để đổi)`}
        >
          <span>⚡</span>
          <span>{getTransitionShortLabel(scene.transitionType)}</span>
        </button>
      )}
    </div>
  );
}
