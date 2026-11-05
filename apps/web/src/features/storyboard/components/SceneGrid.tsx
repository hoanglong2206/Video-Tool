import React from "react";
import type { StoryboardScene } from "../types";
import { SceneCard } from "./SceneCard";

interface SceneGridProps {
  scenes: StoryboardScene[];
  totalDuration: number;
  selectedSceneId: string;
  onSelectScene: (sceneId: string) => void;
  onAddScene: () => void;
}

export function SceneGrid({
  scenes,
  totalDuration,
  selectedSceneId,
  onSelectScene,
  onAddScene,
}: SceneGridProps): React.ReactElement {
  return (
    <section className="flex-1 flex flex-col p-6 overflow-y-auto">
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Scenes · {scenes.length} · {totalDuration} s Total
        </h2>

        <button
          type="button"
          onClick={onAddScene}
          className="h-7 px-3 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Add scene
        </button>
      </div>

      {/* 3x2 Matrix Grid */}
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
    </section>
  );
}
