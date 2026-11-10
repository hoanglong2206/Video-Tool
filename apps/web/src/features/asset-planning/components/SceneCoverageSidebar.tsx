"use client";

import React from "react";
import { ShieldCheck, Film, Layers, FileImage, Box, Check, AlertCircle } from "lucide-react";
import type { GroundTruthItem, SceneCoverageItem } from "../types";

interface SceneCoverageSidebarProps {
  activeTab: "ground_truth" | "scenes";
  groundTruth: GroundTruthItem[];
  scenes: SceneCoverageItem[];
  selectedSceneNumber: number | null;
  onSelectTab: (tab: "ground_truth" | "scenes") => void;
  onSelectScene: (sceneNumber: number | null) => void;
}

export function SceneCoverageSidebar({
  activeTab,
  groundTruth,
  scenes,
  selectedSceneNumber,
  onSelectTab,
  onSelectScene,
}: SceneCoverageSidebarProps): React.ReactElement {
  return (
    <aside className="w-72 border-r border-[#1E2638] bg-[#0A0E17] flex flex-col shrink-0 select-none">
      {/* Top Tab Pill Switch */}
      <div className="p-3 border-b border-[#1E2638] bg-[#0D121F]">
        <div className="grid grid-cols-2 gap-1 bg-[#090D15] p-1 rounded-lg border border-[#1A2336]">
          <button
            type="button"
            onClick={() => onSelectTab("scenes")}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === "scenes"
                ? "bg-blue-600 text-white font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cảnh Storyboard</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("ground_truth")}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === "ground_truth"
                ? "bg-blue-600 text-white font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tư liệu gốc</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Scenes List */}
      {activeTab === "scenes" && (
        <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
          {/* All Scenes Filter Button */}
          <button
            type="button"
            onClick={() => onSelectScene(null)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors border cursor-pointer ${
              selectedSceneNumber === null
                ? "bg-blue-950/60 border-blue-500 text-blue-200 font-semibold shadow-sm"
                : "bg-[#101522] border-[#1C2538] text-slate-300 hover:bg-[#141B2C]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Toàn bộ các cảnh</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161F32] text-slate-400">
              {scenes.length} Cảnh
            </span>
          </button>

          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-1 pt-2">
            Độ phủ tài nguyên theo Scene
          </div>

          {scenes.map((scene) => {
            const isSelected = selectedSceneNumber === scene.sceneNumber;
            const isFull = scene.readyAssets >= scene.totalAssets;

            return (
              <div
                key={scene.id}
                onClick={() => onSelectScene(scene.sceneNumber)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#141B2C] border-blue-500 shadow-sm"
                    : "bg-[#0F1420] border-[#1A2234] hover:border-[#25324D]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-blue-400">
                    Scene 0{scene.sceneNumber} · {scene.durationSeconds}s
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded border flex items-center gap-1 font-semibold ${
                      isFull
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-800/60"
                        : "bg-amber-950/80 text-amber-300 border-amber-800/60"
                    }`}
                  >
                    {isFull ? <Check className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />}
                    {scene.readyAssets}/{scene.totalAssets}
                  </span>
                </div>
                <div className="text-xs text-slate-200 font-medium truncate">
                  {scene.title}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Ground Truth Assets */}
      {activeTab === "ground_truth" && (
        <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3">
          {/* Brand Protection Locked Banner */}
          <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Khóa nhận diện thương hiệu</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Ảnh gốc và mô hình 3D là Ground Truth tuyệt đối. AI chỉ dùng để tách nền, tạo môi trường xung quanh và chỉnh ánh sáng.
            </p>
          </div>

          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-1">
            File gốc đã nạp ({groundTruth.length})
          </div>

          {groundTruth.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-lg bg-[#0F1420] border border-[#1A2234] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {item.type === "3d_cad" ? (
                  <Box className="w-4 h-4 text-purple-400 shrink-0" />
                ) : (
                  <FileImage className="w-4 h-4 text-blue-400 shrink-0" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-200 truncate font-medium">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.fileSize} · Locked
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#161F32] text-emerald-400 border border-emerald-800/40">
                Gốc
              </span>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
