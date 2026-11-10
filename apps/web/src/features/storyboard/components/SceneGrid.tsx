import React from "react";
import type { StoryboardScene } from "../types";
import { SceneCard } from "./SceneCard";
import { EmptyState } from "@/components/shared";
import { Skeleton } from "@/components/ui";

interface SceneGridProps {
  scenes: StoryboardScene[];
  totalDuration: number;
  selectedSceneId: string;
  isLoading?: boolean;
  onSelectScene: (sceneId: string) => void;
  onAddScene: () => void;
}

export function SceneGrid({
  scenes,
  totalDuration,
  selectedSceneId,
  isLoading,
  onSelectScene,
  onAddScene,
}: SceneGridProps): React.ReactElement {
  return (
    <section className="flex-1 flex flex-col p-6 overflow-y-auto">
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Scenes · {isLoading ? "..." : scenes.length} · {isLoading ? "..." : `${totalDuration} s Total`}
        </h2>

        <button
          type="button"
          onClick={onAddScene}
          className="h-7 px-3 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm cursor-pointer"
        >
          Add scene
        </button>
      </div>

      {/* 3x2 Matrix Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-16 rounded" />
                <Skeleton className="h-3.5 w-10 rounded" />
              </div>
              <Skeleton className="w-full aspect-video rounded-lg bg-[#141B29]" />
              <Skeleton className="h-3.5 w-3/4 rounded mt-1" />
              <Skeleton className="h-2.5 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : scenes.length === 0 ? (
        <EmptyState
          title="No scenes generated"
          description="Click 'Generate with AI' to automatically draft scenes from your creative brief."
          actionLabel="Add scene manually"
          onAction={onAddScene}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              isSelected={scene.id === selectedSceneId}
              onSelect={onSelectScene}
            />
          ))}
        </div>
      )}
    </section>
  );
}
