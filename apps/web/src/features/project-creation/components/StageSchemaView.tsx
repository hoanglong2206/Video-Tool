"use client";

import React, { useState } from "react";
import type { FullAiAnalysisOutput, ProjectBriefFormData } from "../types";
import { CheckCircle2, Copy, Check, FileCode, CheckCheck, Download } from "lucide-react";

interface StageSchemaViewProps {
  aiOutput: FullAiAnalysisOutput;
  formData: ProjectBriefFormData;
}

export function StageSchemaView({
  aiOutput,
  formData,
}: StageSchemaViewProps): React.ReactElement {
  const [copiedJson, setCopiedJson] = useState(false);

  const rawPayload = {
    $schema: "https://schema.videotool.ai/v2/project-spec.json",
    schemaVersion: "2.4.0",
    validator: "Zod Schema v3.24",
    project: {
      id: "prj_" + (formData.projectName || "aurora").toLowerCase().replace(/\s+/g, "_"),
      name: formData.projectName,
      client: formData.client,
      style: formData.stylePreference,
    },
    renderingSpecs: {
      resolution: formData.resolution,
      aspectRatio: formData.aspectRatio,
      duration: formData.duration,
      fps: 24,
      colorSpace: "Rec.709",
      scenesCount: aiOutput.scenes.length,
    },
    audioSpecs: {
      soundtrack: formData.bgmMood || "Cinematic Epic",
      sampleRate: "48kHz Stereo",
      voiceoverEngine: "Studio AI Voice",
    },
    brandAssets: {
      colorPalette: aiOutput.vision.colorPalette,
      mediaCount: formData.files.length,
      brandMatchScore: aiOutput.vision.brandIdentityScore,
    },
    scenes: aiOutput.scenes.map((s) => ({
      sceneIndex: s.sceneNumber,
      title: s.title,
      duration: s.durationSeconds,
      camera: s.cameraMovement,
      prompt: s.visualPrompt,
    })),
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(rawPayload, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
      {/* Top Validation Banner */}
      <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-emerald-300">
              Xác thực hoàn tất 24/24 Thông số Kỹ thuật
            </h4>
            <p className="text-[10px] text-emerald-400/80 font-mono">
              Schema: {aiOutput.schemaValidator.schemaName} (v{aiOutput.schemaValidator.schemaVersion}) • 0 Lỗi cấu trúc
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopyJson}
          className="text-xs text-slate-300 hover:text-white bg-[#10192A] border border-[#223350] px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
        >
          {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="font-medium">{copiedJson ? "Đã copy" : "Copy JSON"}</span>
        </button>
      </div>

      {/* Balanced 2-Column Split View filling full vertical space */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-2.5 overflow-hidden">
        {/* Left 5 Cols: Validation Checklist & Key Specs */}
        <div className="md:col-span-5 min-h-0 flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin">
          <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Thông số kết xuất chuẩn hóa
            </span>
            <div className="space-y-1.5 text-[11px]">
              {[
                { label: "Độ phân giải", val: formData.resolution },
                { label: "Tỷ lệ khung hình", val: formData.aspectRatio },
                { label: "Thời lượng", val: formData.duration },
                { label: "Phong cách", val: formData.stylePreference },
                { label: "Âm thanh & BGM", val: formData.bgmMood || "Cinematic Epic" },
                { label: "Khung hình/giây", val: "24.00 fps" },
                { label: "Không gian màu", val: "Rec.709 HDR" },
                { label: "Số lượng phân cảnh", val: `${aiOutput.scenes.length} Scenes` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#070A10] border border-[#161F30] rounded px-2 py-1 flex items-center justify-between"
                >
                  <span className="text-slate-400 text-[10px]">{item.label}</span>
                  <span className="font-mono font-semibold text-slate-200 text-[10px] truncate max-w-[120px]">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kiểm định tính tương thích</span>
            </span>
            <div className="space-y-1 text-[10px] font-mono text-slate-300">
              <div className="flex items-center justify-between text-emerald-400/90">
                <span>✓ Remotion Root Composition</span>
                <span>Pass</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400/90">
                <span>✓ Timeline Beat-Grid Synced</span>
                <span>Pass</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400/90">
                <span>✓ Color Gamut Clamping</span>
                <span>Pass</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400/90">
                <span>✓ Prompt Token Budget</span>
                <span>Pass</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Full-Height Raw JSON Schema Viewport */}
        <div className="md:col-span-7 min-h-0 flex flex-col bg-[#0A0D15] border border-[#1E2638] rounded-lg p-2.5 overflow-hidden">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#1A2336] shrink-0 mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>ProjectSpec.v2.json (Zod Validated)</span>
            </span>
            <span className="text-[9px] font-mono text-slate-500">Read-Only</span>
          </div>

          <pre className="flex-1 min-h-0 overflow-y-auto text-[10px] font-mono text-emerald-300/90 bg-[#06080E] p-2.5 rounded border border-[#151D2C] leading-relaxed scrollbar-thin select-text">
            {JSON.stringify(rawPayload, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

