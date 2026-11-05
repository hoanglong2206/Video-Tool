import React from "react";
import type { PbrMaterial, LightSetting, Camera3DSettings } from "../types";

interface ThreeDInspectorProps {
  material: PbrMaterial;
  lights: LightSetting[];
  camera: Camera3DSettings;
  onMaterialChange?: (mat: PbrMaterial) => void;
}

export function ThreeDInspector({
  material,
  lights,
  camera,
  onMaterialChange,
}: ThreeDInspectorProps): React.ReactElement {
  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Material Properties */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Material · {material.name}
      </h2>

      <div className="flex flex-col gap-3 text-xs mb-6">
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Metalness</span>
            <span className="text-slate-200 font-mono">{material.metalness.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={material.metalness}
            onChange={(e) =>
              onMaterialChange?.({
                ...material,
                metalness: parseFloat(e.target.value),
              })
            }
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Roughness</span>
            <span className="text-slate-200 font-mono">{material.roughness.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={material.roughness}
            onChange={(e) =>
              onMaterialChange?.({
                ...material,
                roughness: parseFloat(e.target.value),
              })
            }
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Lighting Rig */}
      <div className="mt-2 pt-4 border-t border-[#1C2436]/60 mb-6">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Lighting
        </h2>

        <div className="flex flex-col gap-2 text-xs text-slate-300">
          {lights.map((l) => (
            <p key={l.name}>
              {l.name} · {l.colorTempK} K · {l.intensityPercent}%
            </p>
          ))}
          <p>Environment · Studio HDRI</p>
        </div>
      </div>

      {/* Camera Rig */}
      <div className="mt-auto pt-4 border-t border-[#1C2436]/60">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Camera
        </h2>

        <div className="flex flex-col gap-2 text-xs text-slate-300">
          <p>{camera.orbitTrajectory}</p>
          <p>Focal length {camera.focalLengthMm} mm</p>
        </div>
      </div>
    </aside>
  );
}

