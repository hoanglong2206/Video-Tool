import React from "react";
import type { StoryboardScene } from "../types";

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
        <textarea
          rows={3}
          value={scene.description}
          onChange={(e) => onChangeDescription(e.target.value)}
          className="w-full rounded-md bg-[#101520] border border-[#1C2436] p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none leading-relaxed"
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
        <button
          type="button"
          onClick={onRegenerateFrame}
          className="h-8 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Regenerate frame
        </button>

        <button
          type="button"
          onClick={onDuplicate}
          className="h-8 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Duplicate
        </button>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={onRemove}
          className="h-8 w-20 rounded-md text-xs font-medium text-slate-400 bg-[#141A27] border border-[#242D40] hover:bg-[#20181E] hover:text-rose-400 transition-all shadow-sm"
        >
          Remove
        </button>
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
