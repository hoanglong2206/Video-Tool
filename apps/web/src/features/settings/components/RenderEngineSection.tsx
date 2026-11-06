"use client";

import React from "react";
import { Film, Zap, Layers, Video } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GpuHardware, RenderPreset, VideoCodec } from "@/features/pipeline";

interface RenderEngineSectionProps {
  gpuHardware: GpuHardware;
  renderConcurrency: string;
  renderPreset: RenderPreset;
  videoCodec: VideoCodec;
  onSetGpu: (g: GpuHardware) => void;
  onSetConcurrency: (c: string) => void;
  onSetPreset: (p: RenderPreset) => void;
  onSetCodec: (c: VideoCodec) => void;
}

const GPU_OPTIONS = [
  { id: "nvidia_nvenc", label: "NVIDIA NVENC (Dual RTX 4090 / CUDA) — Tốc độ tối đa" },
  { id: "apple_metal", label: "Apple Silicon Metal (M2/M3/M4 Hardware Acceleration)" },
  { id: "intel_qsv", label: "Intel QuickSync Video (QSV Hardware Encoder)" },
  { id: "cpu", label: "CPU Software Multithreading (Fallback)" },
];

const PRESET_OPTIONS = [
  { id: "master_4k", label: "Master 4K UHD (3840x2160, 60fps, 35Mbps) — Khuyên dùng" },
  { id: "standard_1080p", label: "Production Standard (1920x1080, 60fps, 16Mbps)" },
  { id: "draft", label: "Draft Preview (1920x1080, 30fps, 8Mbps) — Nhanh nhất" },
];

export function RenderEngineSection({
  gpuHardware,
  renderConcurrency,
  renderPreset,
  videoCodec,
  onSetGpu,
  onSetConcurrency,
  onSetPreset,
  onSetCodec,
}: RenderEngineSectionProps): React.ReactElement {
  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 md:p-5 flex-1 min-h-0 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1C2436] shrink-0">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Remotion Render & Video Post Engine
          </h2>
        </div>
        <span className="text-[10px] text-cyan-400 font-mono">
          GPU Accelerated
        </span>
      </div>

      {/* GPU Hardware Acceleration (Select Dropdown) */}
      <div className="shrink-0 my-1">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
          <Zap className="w-3 h-3 text-amber-400" /> Phần cứng tăng tốc GPU
        </label>
        <Select value={gpuHardware} onValueChange={(val) => onSetGpu(val as GpuHardware)}>
          <SelectTrigger className="h-8 bg-[#0B0F17] border-[#1E2638] text-xs">
            <SelectValue placeholder="Chọn phần cứng GPU" />
          </SelectTrigger>
          <SelectContent>
            {GPU_OPTIONS.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 2 Columns: Preset & Concurrency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0 flex flex-col justify-center my-1">
        {/* Render Preset Dropdown */}
        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Layers className="w-3 h-3 text-cyan-400" /> Cấu hình Render mặc định
          </label>
          <Select value={renderPreset} onValueChange={(val) => onSetPreset(val as RenderPreset)}>
            <SelectTrigger className="h-8 bg-[#0B0F17] border-[#1E2638] text-xs">
              <SelectValue placeholder="Chọn Preset" />
            </SelectTrigger>
            <SelectContent>
              {PRESET_OPTIONS.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CPU Concurrency Threads (Radio Pills) */}
        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Số luồng CPU Concurrency
          </label>
          <div className="grid grid-cols-4 gap-1">
            {["4", "8", "16", "auto"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onSetConcurrency(t)}
                className={`py-1.5 text-xs rounded font-mono transition-colors cursor-pointer ${
                  renderConcurrency === t
                    ? "bg-cyan-600 text-white font-bold"
                    : "bg-[#0B0F17] border border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
              >
                {t === "auto" ? "Auto" : `${t}T`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Codec (Radio Buttons) */}
      <div className="pt-2.5 border-t border-[#1C2436]/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
          <Video className="w-3.5 h-3.5 text-blue-400" />
          <span>Định dạng Video Codec:</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { id: "h264", label: "H.264 (MP4)" },
            { id: "hevc", label: "H.265 (HEVC)" },
            { id: "prores", label: "ProRes 422 HQ" },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSetCodec(c.id as VideoCodec)}
              className={`text-[10px] px-2 py-1 rounded font-mono transition-colors cursor-pointer ${
                videoCodec === c.id
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-[#0E131E] border border-[#1E2638] text-slate-400 hover:text-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
