import React from "react";
import type { ExportSettings, PreviousRender } from "../types";

interface ExportSettingsPanelProps {
  settings: ExportSettings;
  onUpdateSetting: (key: keyof ExportSettings, value: string) => void;
  renders: PreviousRender[];
}

export function ExportSettingsPanel({
  settings,
  onUpdateSetting,
  renders,
}: ExportSettingsPanelProps): React.ReactElement {
  return (
    <div className="w-1/2 p-6 flex flex-col border-r border-[#1E2638] bg-[#0A0E17] overflow-y-auto">
      {/* EXPORT SETTINGS */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Export Settings
      </h2>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Resolution
          </label>
          <select
            value={settings.resolution}
            onChange={(e) => onUpdateSetting("resolution", e.target.value)}
            className="w-full bg-[#101522] border border-[#1E2638] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>3840×2160 (4K)</option>
            <option>1920×1080 (FHD)</option>
            <option>1280×720 (HD)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Frame rate
          </label>
          <select
            value={settings.frameRate}
            onChange={(e) => onUpdateSetting("frameRate", e.target.value)}
            className="w-full bg-[#101522] border border-[#1E2638] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>24 fps</option>
            <option>30 fps</option>
            <option>60 fps</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Aspect ratio
          </label>
          <select
            value={settings.aspectRatio}
            onChange={(e) => onUpdateSetting("aspectRatio", e.target.value)}
            className="w-full bg-[#101522] border border-[#1E2638] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>16:9</option>
            <option>9:16 (Vertical)</option>
            <option>1:1 (Square)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Codec
          </label>
          <select
            value={settings.codec}
            onChange={(e) => onUpdateSetting("codec", e.target.value)}
            className="w-full bg-[#101522] border border-[#1E2638] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>H.264 · MP4</option>
            <option>ProRes 422 HQ</option>
            <option>AV1</option>
          </select>
        </div>
      </div>

      {/* PREVIOUS RENDERS */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Previous Renders
      </h2>
      <div className="space-y-2">
        {renders.map((render) => (
          <div
            key={render.id}
            className="text-xs text-slate-400 py-1 flex items-center justify-between"
          >
            <span>
              {render.version} · {render.resolution} · {render.duration}
            </span>
            {render.status === "failed" && (
              <span className="text-[11px] text-rose-400 font-medium">Error</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
