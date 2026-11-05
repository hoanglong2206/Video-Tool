import React from "react";
import type { StoryboardScene } from "../types";
import { Button, Textarea } from "@/components/ui";

interface SceneInspectorProps {
  scene: StoryboardScene;
  onChangeDescription: (desc: string) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onRegenerateFrame: () => void;
}

export function SceneInspector({
  scene,
  onChangeDescription,
  onDuplicate,
  onRemove,
  onRegenerateFrame,
}: SceneInspectorProps): React.ReactElement {
  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none overflow-y-auto">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Scene {scene.sceneNumber} · {scene.title}
      </h2>

      {/* Storyboard Frame Preview */}
      <div className="w-full aspect-[16/10] rounded-lg bg-[#101520] border border-[#1C2436] flex items-center justify-center p-3 mb-4">
        <span className="text-xs text-slate-400 font-medium">
          Storyboard frame
        </span>
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
          Description
        </label>
        <Textarea
          rows={3}
          value={scene.description}
          onChange={(e) => onChangeDescription(e.target.value)}
          className="resize-none leading-relaxed"
        />
      </div>

      {/* Duration & Transition Badges */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center justify-center text-xs text-slate-300">
          Duration {scene.durationSeconds} s
        </div>
        <div className="h-8 rounded-md bg-[#101520] border border-[#1C2436] px-3 flex items-center justify-center text-xs text-slate-300">
          Transition: {scene.transitionType}
        </div>
      </div>

      {/* Scene Actions */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerateFrame}
        >
          Regenerate frame
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onDuplicate}
        >
          Duplicate
        </Button>
      </div>

      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="w-20 text-slate-400 hover:text-rose-400 hover:border-rose-900/50"
        >
          Remove
        </Button>
      </div>

      {/* Creative Direction */}
      <div className="mt-auto pt-4 border-t border-[#1C2436]/60">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Creative Direction
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          {scene.creativeDirection || "Dark studio, slow and deliberate pacing, metallic highlights."}
        </p>
      </div>
    </aside>
  );
}

