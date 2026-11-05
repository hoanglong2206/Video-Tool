import React from "react";
import type { StoryboardScene } from "../types";

interface SceneCardProps {
  scene: StoryboardScene;
  isSelected: boolean;
  onSelect: (sceneId: string) => void;
}

export function SceneCard({
  scene,
  isSelected,
  onSelect,
}: SceneCardProps): React.ReactElement {
  return (
    <div
      onClick={() => onSelect(scene.id)}
      className={`bg-[#101520] border ${
        isSelected
          ? "border-[#2563EB] shadow-[0_0_15px_-4px_rgba(37,99,235,0.25)]"
          : "border-[#1C2436] hover:border-[#28354D]"
      } rounded-lg p-3 flex flex-col justify-between transition-all cursor-pointer select-none group`}
    >
      {/* Aspect Ratio Storyboard Sketch Preview */}
      <div className="w-full aspect-[16/10] rounded-md bg-[#131926] border border-[#1A2234] flex items-center justify-center p-3">
        <span className="text-xs text-slate-400 group-hover:text-slate-300 font-medium">
          Scene {scene.sceneNumber}
        </span>
      </div>

      {/* Card Info Footer */}
      <div className="mt-3">
        <h3 className="text-xs font-semibold text-slate-100 tracking-tight">
          {scene.sceneNumber} · {scene.title} {scene.durationSeconds} s
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {scene.cameraMovement} · {scene.transitionType}
        </p>
      </div>
    </div>
  );
}

