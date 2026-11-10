"use client";

import React, { useState } from "react";
import type { StoryboardScene, StoryboardViewMode } from "../types";
import { SceneCard } from "./SceneCard";
import { Plus, Film, Sparkles } from "lucide-react";
import { Button, Skeleton } from "@/components/ui";

interface SceneGridProps {
  scenes: StoryboardScene[];
  totalDuration: number;
  selectedSceneId: string;
  viewMode: StoryboardViewMode;
  isLoading?: boolean;
  isAddingScene?: boolean;
  onSelectScene: (sceneId: string) => void;
  onAddScene: () => void;
  onDuplicateScene: (sceneId: string) => void;
  onRemoveScene: (sceneId: string) => void;
  onMoveScene: (fromIndex: number, toIndex: number) => void;
  onOpenPreview?: (imageUrl: string) => void;
}

export function SceneGrid({
  scenes,
  totalDuration,
  selectedSceneId,
  viewMode,
  isLoading,
  isAddingScene,
  onSelectScene,
  onAddScene,
  onDuplicateScene,
  onRemoveScene,
  onMoveScene,
  onOpenPreview,
}: SceneGridProps): React.ReactElement {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  return (
    <section className="flex-1 min-h-0 flex flex-col p-4 overflow-hidden select-none">
      {/* 1. Subheader with Sequence Counter & Quick Add */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1C2436] shrink-0">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Dòng phân cảnh ({scenes.length} Scenes)
          </h2>
          <span className="text-[10px] text-slate-400 font-mono">
            Kéo thả để đổi thứ tự · Tổng thời lượng: <strong className="text-cyan-400">{totalDuration}s</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={onAddScene}
            disabled={isAddingScene}
            className="h-7 text-xs bg-[#121A29] hover:bg-[#1A253A] border border-[#24324D] text-slate-200 hover:text-white flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className={`w-3 h-3 text-cyan-400 ${isAddingScene ? "animate-spin" : ""}`} />
            <span>{isAddingScene ? "Đang thêm..." : "Thêm cảnh"}</span>
          </Button>
        </div>
      </div>

      {/* 2. Loading State Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 overflow-y-auto">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-[#0D121F] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2.5">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="w-full aspect-video rounded-lg bg-[#141B29]" />
              <Skeleton className="h-3 w-3/4 rounded mt-1" />
            </div>
          ))}
        </div>
      ) : scenes.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 border border-dashed border-[#1E2638] rounded-xl">
          <Sparkles className="w-8 h-8 text-cyan-400 mb-2" />
          <h3 className="text-sm font-bold text-slate-200 mb-1">Chưa có phân cảnh nào</h3>
          <p className="text-xs text-slate-400 mb-4 max-w-sm">
            Bấm nút dưới để tạo phân cảnh đầu tiên hoặc sinh tự động với AI.
          </p>
          <Button size="sm" onClick={onAddScene} className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer">
            <Plus className="w-3 h-3 mr-1" /> Thêm cảnh mới
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* 3. Grid Matrix View (3x2 or responsive) */
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3.5 pb-4">
            {scenes.map((scene, idx) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                index={idx}
                isSelected={scene.id === selectedSceneId}
                onSelect={onSelectScene}
                onDuplicate={onDuplicateScene}
                onRemove={onRemoveScene}
                onOpenPreview={onOpenPreview}
                onDragStart={handleDragStart}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
      ) : (
        /* 4. Timeline Reel View (Cuộn ngang dòng thời gian) */
        <div className="flex-1 min-h-0 flex items-center overflow-x-auto gap-3.5 pb-2 scrollbar-thin">
          {scenes.map((scene, idx) => (
            <div key={scene.id} className="w-[320px] shrink-0 h-full flex flex-col justify-center">
              <SceneCard
                scene={scene}
                index={idx}
                isSelected={scene.id === selectedSceneId}
                onSelect={onSelectScene}
                onDuplicate={onDuplicateScene}
                onRemove={onRemoveScene}
                onOpenPreview={onOpenPreview}
                onDragStart={handleDragStart}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
