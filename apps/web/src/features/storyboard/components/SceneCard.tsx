"use client";

import React from "react";
import type { StoryboardScene } from "../types";
import { Clock, GripVertical, Copy, Trash2, Camera, Eye, Volume2 } from "lucide-react";

interface SceneCardProps {
  scene: StoryboardScene;
  index: number;
  isSelected: boolean;
  onSelect: (sceneId: string) => void;
  onDuplicate: (sceneId: string) => void;
  onRemove: (sceneId: string) => void;
  onOpenPreview?: (imageUrl: string) => void;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
}

export function SceneCard({
  scene,
  index,
  isSelected,
  onSelect,
  onDuplicate,
  onRemove,
  onOpenPreview,
  onDragStart,
  onDragOver,
  onDrop,
}: SceneCardProps): React.ReactElement {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, index)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver && onDragOver(e);
      }}
      onDrop={(e) => onDrop && onDrop(e, index)}
      onClick={() => onSelect(scene.id)}
      className={`bg-[#0D121F] border rounded-xl p-3 flex flex-col justify-between transition-all cursor-pointer select-none group relative ${
        isSelected
          ? "border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50 bg-[#0F1626]"
          : "border-[#1C2436] hover:border-[#2C3852] hover:bg-[#101726]"
      }`}
    >
      {/* 1. Card Top Bar: Grip, Number, Pacing & Actions */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <span
            className="text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing p-0.5"
            title="Kéo thả để sắp xếp lại vị trí"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-3.5 h-3.5" />
          </span>

          <span
            className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isSelected ? "bg-blue-600 text-white" : "bg-[#182030] text-slate-300"
            }`}
          >
            0{scene.sceneNumber}
          </span>

          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-0.5 bg-[#141B2B] px-1.5 py-0.5 rounded border border-[#1E2638]">
            <Clock className="w-2.5 h-2.5 text-cyan-400" />
            <strong className="text-slate-200">{scene.durationSeconds}s</strong>
          </span>
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(scene.id);
            }}
            className="p-1 rounded bg-[#161F30] hover:bg-[#202C44] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Nhân bản phân cảnh này"
          >
            <Copy className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(scene.id);
            }}
            className="p-1 rounded bg-[#161F30] hover:bg-red-950/80 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Xóa phân cảnh này"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Visual Frame 16:9 Thumbnail */}
      <div className="w-full aspect-video rounded-lg bg-[#070A10] border border-[#1A2234] overflow-hidden relative group/frame flex items-center justify-center shrink-0">
        {scene.thumbnailUrl ? (
          <img
            src={scene.thumbnailUrl}
            alt={scene.title}
            className="w-full h-full object-cover group-hover/frame:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-500">
            <Camera className="w-5 h-5 text-slate-600" />
            <span className="text-[10px] font-mono">Chờ sinh ảnh AI</span>
          </div>
        )}

        {/* Hover Fullscreen Eye Button */}
        {scene.thumbnailUrl && onOpenPreview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPreview(scene.thumbnailUrl!);
            }}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover/frame:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
            title="Xem chi tiết ảnh (Lightbox)"
          >
            <div className="p-1.5 rounded-full bg-black/60 border border-white/20">
              <Eye className="w-4 h-4 text-cyan-400" />
            </div>
          </button>
        )}

        {/* Camera Tag Overlay */}
        <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8.5px] font-mono text-cyan-300 border border-cyan-800/40">
          <Camera className="w-2.5 h-2.5" />
          <span className="truncate max-w-[120px]">{scene.cameraLens || "85mm"} · {scene.cameraMovement.split(" ")[0]}</span>
        </div>
      </div>

      {/* 3. Scene Title & Voiceover Preview */}
      <div className="mt-2.5 flex flex-col gap-1 min-w-0">
        <h3 className="text-xs font-bold text-slate-100 truncate tracking-tight group-hover:text-blue-300 transition-colors">
          {scene.title}
        </h3>

        {/* Voiceover Summary Snippet */}
        <p className="text-[10.5px] text-slate-400 line-clamp-1 italic flex items-center gap-1">
          <Volume2 className="w-2.5 h-2.5 text-slate-500 shrink-0" />
          <span>{scene.voiceover || scene.description || "Chưa có lời thoại"}</span>
        </p>
      </div>
    </div>
  );
}
