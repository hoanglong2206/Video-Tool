"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { Input } from "@/components/ui";

interface InspectorSettingsTabProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
}

export function InspectorSettingsTab({
  scene,
  onChangeField,
}: InspectorSettingsTabProps): React.ReactElement {
  const DURATION_PRESETS = [3, 5, 8, 10];

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Thời lượng cảnh (Giây)
        </label>
        <div className="grid grid-cols-4 gap-1 mb-2">
          {DURATION_PRESETS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onChangeField("durationSeconds", d)}
              className={`py-1 text-center text-xs rounded border font-mono transition-colors cursor-pointer ${
                scene.durationSeconds === d
                  ? "bg-blue-600 border-blue-500 text-white font-bold"
                  : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
              }`}
            >
              {d}s
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Hiệu ứng chuyển cảnh (Transition)
        </label>
        <Input
          value={scene.transitionType}
          onChange={(e) => onChangeField("transitionType", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs"
        />
      </div>
    </div>
  );
}
