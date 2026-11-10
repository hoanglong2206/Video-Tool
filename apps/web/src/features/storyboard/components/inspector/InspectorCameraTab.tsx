"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { Input } from "@/components/ui";

interface InspectorCameraTabProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
}

export function InspectorCameraTab({
  scene,
  onChangeField,
}: InspectorCameraTabProps): React.ReactElement {
  const CAMERA_LENSES = ["24mm Wide", "35mm Standard", "50mm Prime", "85mm Tele", "100mm Macro"];
  const DOF_PRESETS = [1.4, 1.8, 2.8, 5.6];

  return (
    <div className="flex flex-col gap-3">
      {/* Lens selection */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Tiêu cự ống kính (Focal Lens)
        </label>
        <div className="grid grid-cols-2 gap-1">
          {CAMERA_LENSES.map((lens) => (
            <button
              key={lens}
              type="button"
              onClick={() => onChangeField("cameraLens", lens.split(" ")[0])}
              className={`py-1 px-1.5 text-center text-[10px] rounded border font-mono transition-colors cursor-pointer ${
                (scene.cameraLens || "85mm").includes(lens.split(" ")[0])
                  ? "bg-indigo-950/80 border-indigo-500 text-indigo-300 font-bold"
                  : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
              }`}
            >
              {lens}
            </button>
          ))}
        </div>
      </div>

      {/* Aperture DoF */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Độ sâu trường ảnh (Aperture DoF)
        </label>
        <div className="grid grid-cols-4 gap-1">
          {DOF_PRESETS.map((dof) => (
            <button
              key={dof}
              type="button"
              onClick={() => onChangeField("cameraDof", dof)}
              className={`py-1 text-center text-xs rounded border font-mono transition-colors cursor-pointer ${
                (scene.cameraDof || 1.8) === dof
                  ? "bg-indigo-950/80 border-indigo-500 text-indigo-300 font-bold"
                  : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
              }`}
            >
              f/{dof}
            </button>
          ))}
        </div>
      </div>

      {/* Camera movement */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Chuyển động Camera (Movement)
        </label>
        <Input
          value={scene.cameraMovement}
          onChange={(e) => onChangeField("cameraMovement", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs font-mono"
        />
      </div>

      {/* Rim-light color */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Màu đèn viền Studio (Rim-Light)
        </label>
        <div className="flex items-center gap-2 bg-[#070A10] p-1.5 rounded border border-[#1E2638]">
          <input
            type="color"
            value={scene.lightingRimColor || "#06B6D4"}
            onChange={(e) => onChangeField("lightingRimColor", e.target.value)}
            className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
          />
          <span className="text-xs font-mono text-cyan-400">{scene.lightingRimColor || "#06B6D4"}</span>
        </div>
      </div>
    </div>
  );
}
