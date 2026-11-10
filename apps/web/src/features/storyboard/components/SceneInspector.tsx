"use client";

import React, { useState } from "react";
import type { StoryboardScene } from "../types";
import { Sparkles, Camera, Volume2, Sliders, Copy, Trash2 } from "lucide-react";
import { InspectorVisualTab } from "./inspector/InspectorVisualTab";
import { InspectorCameraTab } from "./inspector/InspectorCameraTab";
import { InspectorAudioTab } from "./inspector/InspectorAudioTab";
import { InspectorSettingsTab } from "./inspector/InspectorSettingsTab";

interface SceneInspectorProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onRegenerateFrame?: () => void;
}

export function SceneInspector({
  scene,
  onChangeField,
  onDuplicate,
  onRemove,
  onRegenerateFrame,
}: SceneInspectorProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<"visual" | "camera" | "audio" | "settings">("visual");

  return (
    <aside className="w-[380px] xl:w-[420px] border-l border-[#1E2638] bg-[#0A0E17] flex flex-col shrink-0 select-none overflow-hidden h-full">
      {/* 1. Header with Scene Info */}
      <div className="p-3.5 border-b border-[#1C2436] flex items-center justify-between shrink-0 bg-[#0F1422]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800/60 px-1.5 py-0.5 rounded shrink-0">
            CẢNH 0{scene.sceneNumber}
          </span>
          <h2 className="text-xs font-bold text-slate-100 truncate">
            {scene.title}
          </h2>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onDuplicate}
            className="p-1 rounded bg-[#161F30] hover:bg-[#202C44] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Nhân bản"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1 rounded bg-[#161F30] hover:bg-red-950/80 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Xóa cảnh"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Inspector Tabs Switcher */}
      <div className="grid grid-cols-4 p-1 bg-[#0D121F] border-b border-[#1C2436] text-[10.5px] font-medium shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("visual")}
          className={`py-1.5 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === "visual" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-3 h-3" /> Visual
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("camera")}
          className={`py-1.5 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === "camera" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Camera className="w-3 h-3" /> 3D Lens
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("audio")}
          className={`py-1.5 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === "audio" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Volume2 className="w-3 h-3" /> Thoại
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={`py-1.5 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === "settings" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sliders className="w-3 h-3" /> Cài đặt
        </button>
      </div>

      {/* 3. Tab Body: Cuộn nội bộ */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5 flex flex-col gap-3">
        {activeTab === "visual" && (
          <InspectorVisualTab
            scene={scene}
            onChangeField={onChangeField}
            onRegenerateFrame={onRegenerateFrame}
          />
        )}
        {activeTab === "camera" && (
          <InspectorCameraTab
            scene={scene}
            onChangeField={onChangeField}
          />
        )}
        {activeTab === "audio" && (
          <InspectorAudioTab
            scene={scene}
            onChangeField={onChangeField}
          />
        )}
        {activeTab === "settings" && (
          <InspectorSettingsTab
            scene={scene}
            onChangeField={onChangeField}
          />
        )}
      </div>
    </aside>
  );
}
