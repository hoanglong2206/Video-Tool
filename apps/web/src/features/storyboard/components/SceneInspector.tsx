"use client";

import React, { useState } from "react";
import type { StoryboardScene, SceneVersionItem } from "../types";
import { Sparkles, Camera, Copy, Trash2 } from "lucide-react";
import { InspectorScriptTab } from "./inspector/InspectorScriptTab";
import { InspectorCinematographyTab } from "./inspector/InspectorCinematographyTab";

interface SceneInspectorProps {
  scene: StoryboardScene;
  isSaving?: boolean;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onRegenerateFrame?: () => void;
  onCreateSnapshot?: () => void;
  onDeleteVersion?: (versionId: string) => void;
  onRollbackVersion?: (version: SceneVersionItem) => void;
  isCreatingVersion?: boolean;
  isDeletingVersion?: boolean;
}

export function SceneInspector({
  scene,
  isSaving,
  onChangeField,
  onDuplicate,
  onRemove,
  onRegenerateFrame,
  onCreateSnapshot,
  onDeleteVersion,
  onRollbackVersion,
  isCreatingVersion,
  isDeletingVersion,
}: SceneInspectorProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<"script" | "cinematography">("script");

  return (
    <aside className="w-[360px] xl:w-[400px] border-l border-[#1E2638] bg-[#0A0E17] flex flex-col shrink-0 select-none overflow-hidden h-full">
      {/* 1. Header with Scene Info & Actions */}
      <div className="p-3 border-b border-[#1C2436] flex items-center justify-between shrink-0 bg-[#0F1422]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800/60 px-1.5 py-0.5 rounded shrink-0">
            CẢNH 0{scene.sceneNumber}
          </span>
          {isSaving ? (
            <span className="font-mono text-[9px] text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1 py-0.2 rounded animate-pulse shrink-0">
              ● Đang lưu
            </span>
          ) : (
            <span className="font-mono text-[9px] text-emerald-400/80 bg-emerald-950/40 border border-emerald-900/40 px-1 py-0.2 rounded shrink-0">
              ✓ Đã lưu
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onDuplicate}
            className="p-1 rounded bg-[#161F30] hover:bg-[#202C44] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Nhân bản phân cảnh này"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1 rounded bg-[#161F30] hover:bg-red-950/80 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Xóa phân cảnh này"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. 2-Tab Switcher: Script & Visual vs 3D & Settings */}
      <div className="grid grid-cols-2 p-1 bg-[#0D121F] border-b border-[#1C2436] text-xs font-medium shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("script")}
          className={`py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === "script" ? "bg-blue-600 text-white font-bold shadow-xs" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Visual & Lời thoại</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cinematography")}
          className={`py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === "cinematography" ? "bg-blue-600 text-white font-bold shadow-xs" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-indigo-300" />
          <span>Camera 3D & Cài đặt</span>
        </button>
      </div>

      {/* 3. Tab Body: Cuộn nội bộ mượt mà */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5 flex flex-col">
        {activeTab === "script" && (
          <InspectorScriptTab
            scene={scene}
            onChangeField={onChangeField}
            onRegenerateFrame={onRegenerateFrame}
            onCreateSnapshot={onCreateSnapshot}
            onDeleteVersion={onDeleteVersion}
            onRollbackVersion={onRollbackVersion}
            isCreatingVersion={isCreatingVersion}
            isDeletingVersion={isDeletingVersion}
          />
        )}
        {activeTab === "cinematography" && (
          <InspectorCinematographyTab
            scene={scene}
            onChangeField={onChangeField}
          />
        )}
      </div>
    </aside>
  );
}
