"use client";

import React, { useState } from "react";
import type { SceneBreakdownItem } from "../types";
import { Input, Textarea } from "@/components/ui";
import {
  Film,
  Clock,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Wand2,
  History,
  Camera,
  Bookmark,
} from "lucide-react";
import { RegenerateSceneModal } from "./RegenerateSceneModal";
import { SceneMovementEditor } from "./SceneMovementEditor";

interface SceneTimelineEditorProps {
  scenes: SceneBreakdownItem[];
  activeIndex: number;
  onSelectScene: (index: number) => void;
  onUpdateScene: (index: number, updated: Partial<SceneBreakdownItem>) => void;
  onRollbackVersion?: (versionNumber: number) => void;
}

export function SceneTimelineEditor({
  scenes,
  activeIndex,
  onSelectScene,
  onUpdateScene,
  onRollbackVersion,
}: SceneTimelineEditorProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [templateSaved, setTemplateSaved] = useState(false);
  const activeScene = scenes[activeIndex] || scenes[0];

  const handleCopyPrompt = () => {
    if (!activeScene) return;
    navigator.clipboard.writeText(activeScene.visualPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSaveAsTemplate = () => {
    setTemplateSaved(true);
    setTimeout(() => setTemplateSaved(false), 2000);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
      {/* 1. Scene Timeline Header */}
      <div className="flex items-center justify-between pb-1 shrink-0 border-b border-[#1C2436]">
        <div className="flex items-center gap-1.5">
          <Film className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
            Cấu trúc Phân cảnh ({scenes.length} Scenes)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
          <span>Tổng:</span>
          <span className="text-cyan-400 font-bold">
            {scenes.reduce((acc, s) => acc + s.durationSeconds, 0)}s
          </span>
        </div>
      </div>

      {/* 6 Scene Selector Pills */}
      <div className="grid grid-cols-6 gap-1.5 shrink-0">
        {scenes.map((scene, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={scene.sceneNumber}
              type="button"
              onClick={() => onSelectScene(idx)}
              className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-blue-950/60 border-blue-500 shadow-sm shadow-blue-500/30 ring-1 ring-blue-500/50"
                  : "bg-[#0B0F17] border-[#1C2436] hover:border-[#2C3852] hover:bg-[#101624]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold px-1 rounded ${
                    isSelected ? "bg-blue-600 text-white" : "bg-[#182030] text-slate-400"
                  }`}
                >
                  0{scene.sceneNumber}
                </span>
                <span className="text-[9px] text-slate-400 font-mono flex items-center gap-0.5">
                  <Clock className="w-2 h-2" /> {scene.durationSeconds}s
                </span>
              </div>
              <span
                className={`text-[10px] truncate mt-1 block font-medium ${
                  isSelected ? "text-blue-300 font-bold" : "text-slate-300"
                }`}
                title={scene.title}
              >
                {scene.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Active Scene Detail Editor */}
      {activeScene && (
        <div className="flex-1 min-h-0 bg-[#0B0F17] border border-[#1E2638] rounded-xl p-3 flex flex-col gap-2.5 overflow-y-auto pr-1">
          {/* Header with Title and Switchers */}
          <div className="flex items-center justify-between shrink-0 gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="bg-blue-950 text-blue-400 border border-blue-800/60 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                CẢNH 0{activeScene.sceneNumber}
              </span>

              {/* Version History Pill with Rollback Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                  className="flex items-center gap-1 bg-[#101520] hover:bg-[#182030] border border-[#1E2638] text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded cursor-pointer transition-colors"
                  title="Xem lịch sử các phiên bản của cảnh này"
                >
                  <History className="w-2.5 h-2.5" />
                  <span>v{activeScene.activeVersion || 1}</span>
                </button>

                {showVersionDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-52 bg-[#0E131E] border border-[#1E2638] rounded-lg shadow-xl p-1 z-30 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 px-1.5 py-0.5 font-semibold uppercase">
                      Lịch sử phiên bản
                    </span>
                    {(activeScene.versions || []).map((ver) => (
                      <div
                        key={ver.versionNumber}
                        className="flex items-center justify-between px-1.5 py-1 rounded bg-[#121927] hover:bg-[#182235] text-[10px]"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-200">v{ver.versionNumber}</span>
                          <span className="text-[8px] text-slate-400 truncate max-w-[110px]">{ver.createdAt}</span>
                        </div>
                        {ver.versionNumber !== activeScene.activeVersion && onRollbackVersion && (
                          <button
                            type="button"
                            onClick={() => {
                              onRollbackVersion(ver.versionNumber);
                              setShowVersionDropdown(false);
                            }}
                            className="text-[9px] bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-mono cursor-pointer"
                          >
                            Khôi phục
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Input
                value={activeScene.title}
                onChange={(e) => onUpdateScene(activeIndex, { title: e.target.value })}
                className="bg-[#070A10] border-[#1E2638] h-7 text-xs font-semibold text-slate-200 focus:border-blue-500 flex-1 min-w-0"
                placeholder="Tiêu đề phân cảnh"
              />
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onSelectScene(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="p-1 rounded bg-[#101520] border border-[#1E2638] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="Cảnh trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onSelectScene(Math.min(scenes.length - 1, activeIndex + 1))}
                disabled={activeIndex === scenes.length - 1}
                className="p-1 rounded bg-[#101520] border border-[#1E2638] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="Cảnh tiếp theo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Visual Prompt Input & Actions */}
          <div className="flex flex-col gap-1 shrink-0">
            <div className="flex items-center justify-between shrink-0">
              <label className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                Visual Prompt (Renderer AI)
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSaveAsTemplate}
                  className="text-[10px] text-slate-300 hover:text-white bg-[#101520] border border-[#1E2638] px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Bookmark className="w-2.5 h-2.5 text-amber-400" />
                  <span>{templateSaved ? "Đã lưu Template" : "Lưu làm mẫu"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegenerateModal(true)}
                  className="text-[10px] text-cyan-300 hover:text-cyan-200 bg-cyan-950/70 border border-cyan-800/50 hover:border-cyan-600 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <Wand2 className="w-2.5 h-2.5 text-cyan-400" />
                  <span>Sinh lại cảnh này</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copied ? "Đã copy" : "Copy prompt"}</span>
                </button>
              </div>
            </div>
            <Textarea
              rows={4}
              value={activeScene.visualPrompt}
              onChange={(e) => onUpdateScene(activeIndex, { visualPrompt: e.target.value })}
              className="bg-[#070A10] border-[#1E2638] focus:border-cyan-500 text-xs resize-none leading-relaxed h-20 xl:h-24"
              placeholder="Visual prompt cho AI renderer..."
            />
          </div>

          {/* 3D Camera & Lighting Blueprint Strip */}
          {activeScene.camera3dParams && (
            <div className="bg-[#0A0D15] border border-[#1C2436] rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[10px] shrink-0">
              <div className="flex items-center gap-2">
                <Camera className="w-3 h-3 text-blue-400" />
                <span className="text-slate-400">Blender 3D Camera:</span>
                <span className="font-mono text-slate-200 font-bold">{activeScene.camera3dParams.lens} · FOV {activeScene.camera3dParams.fov}° · f/{activeScene.camera3dParams.dof}</span>
              </div>
              {activeScene.lightingRig && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Rim-light:</span>
                  <span className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ backgroundColor: activeScene.lightingRig.rimLight }} />
                  <span className="font-mono text-cyan-400">{activeScene.lightingRig.rimLight}</span>
                </div>
              )}
            </div>
          )}

          {/* Voiceover and Detailed Camera Movement */}
          <SceneMovementEditor
            voiceover={activeScene.voiceover}
            cameraMovement={activeScene.cameraMovement}
            onChangeVoiceover={(voiceover) => onUpdateScene(activeIndex, { voiceover })}
            onChangeCameraMovement={(cameraMovement) => onUpdateScene(activeIndex, { cameraMovement })}
          />
        </div>
      )}

      {/* 1-Click AI Single-Scene Regenerator */}
      {activeScene && (
        <RegenerateSceneModal
          isOpen={showRegenerateModal}
          onClose={() => setShowRegenerateModal(false)}
          sceneNumber={activeScene.sceneNumber}
          sceneTitle={activeScene.title}
          onApplyRegeneration={(updated) => {
            onUpdateScene(activeIndex, updated);
          }}
        />
      )}
    </div>
  );
}
