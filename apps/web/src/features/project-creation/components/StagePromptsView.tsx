"use client";

import React, { useState } from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { Camera, Volume2, Copy, Check, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

interface StagePromptsViewProps {
  aiOutput: FullAiAnalysisOutput;
  formData: ProjectBriefFormData;
}

export function StagePromptsView({
  aiOutput,
  formData,
}: StagePromptsViewProps): React.ReactElement {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number | "all">("all");
  const [copiedScene, setCopiedScene] = useState<number | null>(null);

  const handleCopyPrompt = (sceneNum: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScene(sceneNum);
    setTimeout(() => setCopiedScene(null), 2000);
  };

  const scenes = aiOutput.scenes || [];
  const activeScene = typeof selectedSceneIndex === "number" ? scenes[selectedSceneIndex] : null;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
      {/* Scene Quick Switcher Bar (1-Click Zero Typing) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none select-none">
        <button
          type="button"
          onClick={() => setSelectedSceneIndex("all")}
          className={`h-7 px-2.5 rounded-md text-[11px] font-mono font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
            selectedSceneIndex === "all"
              ? "bg-purple-600 text-white shadow-sm shadow-purple-600/40"
              : "bg-[#0A0D15] text-slate-400 hover:text-slate-200 border border-[#1E2638]"
          }`}
        >
          <span>Tất cả ({scenes.length})</span>
        </button>

        {scenes.map((sc, idx) => (
          <button
            key={sc.sceneNumber}
            type="button"
            onClick={() => setSelectedSceneIndex(idx)}
            className={`h-7 px-2.5 rounded-md text-[11px] font-mono font-medium flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              selectedSceneIndex === idx
                ? "bg-purple-600/90 text-white border border-purple-400 shadow-sm"
                : "bg-[#0A0D15] text-slate-400 hover:text-slate-200 border border-[#1E2638]"
            }`}
          >
            <span className="font-bold">#{sc.sceneNumber}</span>
            <span className="text-[10px] opacity-75">{sc.durationSeconds}s</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {selectedSceneIndex === "all" ? (
        /* View All 6 Scenes in Smooth Scrollable Area */
        <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-2 scrollbar-thin">
          {scenes.map((scene) => (
            <div
              key={scene.sceneNumber}
              className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col gap-1.5 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/40 text-[10px] font-mono flex items-center justify-center font-bold">
                    #{scene.sceneNumber}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">{scene.title}</h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                    {scene.durationSeconds}s
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(scene.sceneNumber, scene.visualPrompt)}
                    className="text-[10px] text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-[#161F30] cursor-pointer transition-colors"
                    title="Copy Prompt"
                  >
                    {copiedScene === scene.sceneNumber ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 font-mono bg-[#06080E] p-2 rounded border border-[#161E30] leading-relaxed">
                {scene.visualPrompt}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-mono text-indigo-300">
                  <Camera className="w-3 h-3 text-indigo-400" /> {scene.cameraMovement}
                </span>
                <span className="text-slate-400 italic truncate max-w-sm flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>"{scene.voiceover}"</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : activeScene ? (
        /* Single Scene Deep Focus Inspector (Fills the Height Perfectly) */
        <div className="flex-1 min-h-0 bg-[#0A0D15] border border-purple-500/30 rounded-lg p-3 flex flex-col justify-between">
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E2638]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-xs font-mono font-bold">
                  Phân cảnh #{activeScene.sceneNumber}
                </span>
                <h4 className="text-sm font-bold text-slate-100">{activeScene.title}</h4>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                Thời lượng: {activeScene.durationSeconds} giây
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  Visual Prompt (Remotion & ComfyUI Standard)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(activeScene.sceneNumber, activeScene.visualPrompt)}
                  className="text-xs text-slate-300 hover:text-white bg-[#141B2B] border border-[#23324C] px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer"
                >
                  {copiedScene === activeScene.sceneNumber ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>Copy Prompt</span>
                </button>
              </div>
              <p className="text-xs text-slate-200 font-mono bg-[#06080E] p-3 rounded-md border border-[#161E30] leading-relaxed">
                {activeScene.visualPrompt}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-[#06080E] border border-[#161E30] p-2.5 rounded-md">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  Chuyển động Camera
                </span>
                <p className="text-slate-300 font-mono">{activeScene.cameraMovement}</p>
              </div>
              <div className="bg-[#06080E] border border-[#161E30] p-2.5 rounded-md">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Lời bình & Giọng đọc (Voiceover)
                </span>
                <p className="text-slate-300 italic">"{activeScene.voiceover}"</p>
              </div>
            </div>
          </div>

          {/* Navigation Prev / Next Scene */}
          <div className="pt-2 border-t border-[#1E2638] flex items-center justify-between shrink-0">
            <button
              type="button"
              disabled={selectedSceneIndex === 0}
              onClick={() => setSelectedSceneIndex(Math.max(0, (selectedSceneIndex as number) - 1))}
              className="text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 px-2.5 py-1 rounded bg-[#101624] border border-[#1E283C] cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Cảnh trước</span>
            </button>
            <span className="text-[10px] font-mono text-slate-500">
              {((selectedSceneIndex as number) + 1)} / {scenes.length}
            </span>
            <button
              type="button"
              disabled={selectedSceneIndex === scenes.length - 1}
              onClick={() => setSelectedSceneIndex(Math.min(scenes.length - 1, (selectedSceneIndex as number) + 1))}
              className="text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 px-2.5 py-1 rounded bg-[#101624] border border-[#1E283C] cursor-pointer"
            >
              <span>Cảnh kế tiếp</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

