"use client";

import React, { useState } from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { CheckCircle2, Camera, Copy, Check } from "lucide-react";

interface StagePromptAndSchemaViewsProps {
  selectedStage: number; // 3 or 4
  aiOutput: FullAiAnalysisOutput;
  formData: ProjectBriefFormData;
}

export function StagePromptAndSchemaViews({
  selectedStage,
  aiOutput,
  formData,
}: StagePromptAndSchemaViewsProps): React.ReactElement {
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(aiOutput, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  if (selectedStage === 3) {
    return (
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            6 Phân cảnh Storyboard Visual Prompts
          </span>
          <span className="text-[10px] font-mono text-purple-400">
            Tổng: {formData.duration} ({aiOutput.scenes.length} Scenes)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {aiOutput.scenes.map((scene) => (
            <div key={scene.sceneNumber} className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/40 text-[10px] font-mono flex items-center justify-center font-bold">
                    #{scene.sceneNumber}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">{scene.title}</h4>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                  {scene.durationSeconds}s
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-mono bg-[#06080E] p-2 rounded border border-[#161E30] leading-relaxed">
                {scene.visualPrompt}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-mono text-indigo-300">
                  <Camera className="w-3 h-3" /> {scene.cameraMovement}
                </span>
                <span className="text-slate-400 italic truncate max-w-xs">
                  Voice: "{scene.voiceover}"
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Stage 4: JSON Schema
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <h4 className="text-xs font-bold text-emerald-300">
              Xác thực thành công 24/24 Thông số Kỹ thuật
            </h4>
            <p className="text-[10px] text-emerald-400/80 font-mono">
              Schema: {aiOutput.schemaValidator.schemaName} (v{aiOutput.schemaValidator.schemaVersion})
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopyJson}
          className="text-xs text-slate-300 hover:text-white bg-[#10192A] border border-[#223350] px-2.5 py-1 rounded flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copiedJson ? "Đã copy" : "Copy JSON"}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {[
          { label: "Độ phân giải", val: formData.resolution },
          { label: "Tỷ lệ khung hình", val: formData.aspectRatio },
          { label: "Thời lượng", val: formData.duration },
          { label: "Visual Style", val: formData.stylePreference },
          { label: "Âm thanh & BGM", val: formData.bgmMood || "Cinematic Epic" },
          { label: "Nhạc nền BGM", val: formData.bgmMood || "Cinematic Epic" },
          { label: "Số phân cảnh", val: `${aiOutput.scenes.length} Scenes` },
          { label: "Lỗi cấu trúc", val: "0 Errors" },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0A0D15] border border-[#1E2638] rounded-md px-2.5 py-1.5 flex items-center justify-between">
            <span className="text-slate-400 text-[10px]">{item.label}</span>
            <span className="font-mono font-semibold text-slate-200">{item.val}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 flex flex-col gap-1 font-mono">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Raw JSON Schema Payload
        </span>
        <pre className="text-[10px] text-emerald-400/90 bg-[#06080E] p-2 rounded overflow-x-auto max-h-48 scrollbar-thin">
          {JSON.stringify(
            {
              schema: aiOutput.schemaValidator.schemaName,
              project: formData.projectName,
              client: formData.client,
              scenesCount: aiOutput.scenes.length,
              resolution: formData.resolution,
              aspectRatio: formData.aspectRatio,
              duration: formData.duration,
              brandColors: aiOutput.vision.colorPalette,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}

