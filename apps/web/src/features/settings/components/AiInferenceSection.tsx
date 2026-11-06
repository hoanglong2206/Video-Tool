"use client";

import React from "react";
import { Cpu, Sparkles, Eye, Thermometer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AiProvider } from "@/features/pipeline";

interface AiInferenceSectionProps {
  aiProvider: AiProvider;
  llmModel: string;
  visionModel: string;
  aiTemperature: number;
  onSetProvider: (p: AiProvider) => void;
  onSetLlmModel: (m: string) => void;
  onSetVisionModel: (m: string) => void;
  onSetTemperature: (t: number) => void;
}

const PROVIDERS: { id: AiProvider; label: string; badge: string }[] = [
  { id: "ollama", label: "Ollama Local", badge: "Offline" },
  { id: "gemini", label: "Google Gemini", badge: "2.0 Pro" },
  { id: "openai", label: "OpenAI", badge: "Cloud" },
  { id: "deepseek", label: "DeepSeek", badge: "Reasoning" },
];

const LLM_MODELS = [
  { id: "llama3.2:latest", label: "Llama 3.2 (3B) — Siêu tốc độ, Local" },
  { id: "llama3.3:70b", label: "Llama 3.3 (70B) — Kịch bản điện ảnh sâu" },
  { id: "deepseek-r1:8b", label: "DeepSeek R1 (8B) — Tư duy suy luận" },
  { id: "qwen2.5:7b-instruct", label: "Qwen 2.5 (7B) — Tiếng Việt chuẩn" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash — Đa phương tiện 1M" },
  { id: "gpt-4o", label: "GPT-4o — Đa nhiệm thông minh" },
];

const VISION_MODELS = [
  { id: "llava:13b-v1.6", label: "LLaVA 1.6 (13B) — Phân tích ảnh cục bộ" },
  { id: "gemini-2.0-flash-vision", label: "Gemini 2.0 Vision — Nhận diện logo 4K" },
  { id: "clip-vit-large-patch14", label: "CLIP ViT-L/14 — Trích xuất vector" },
  { id: "moondream2:latest", label: "Moondream2 — Nhẹ & Nhanh" },
];

export function AiInferenceSection({
  aiProvider,
  llmModel,
  visionModel,
  aiTemperature,
  onSetProvider,
  onSetLlmModel,
  onSetVisionModel,
  onSetTemperature,
}: AiInferenceSectionProps): React.ReactElement {
  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 md:p-5 flex-1 min-h-0 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1C2436] shrink-0">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Cấu hình AI Inference Engine & Vision AI
          </h2>
        </div>
        <span className="text-[10px] text-blue-400 font-mono">
          Zero-manual typing
        </span>
      </div>

      {/* 1. AI Provider Selection (Radio Chips) */}
      <div className="shrink-0 my-1">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Nền tảng AI Provider
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {PROVIDERS.map((prov) => {
            const isSelected = aiProvider === prov.id;
            return (
              <button
                key={prov.id}
                type="button"
                onClick={() => onSetProvider(prov.id)}
                className={`py-1.5 px-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-950/60 border-blue-500 ring-1 ring-blue-500/40 text-blue-300"
                    : "bg-[#0E131E] border-[#1E2638] text-slate-300 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold truncate">{prov.label}</span>
                  <input
                    type="radio"
                    name="aiProvider"
                    checked={isSelected}
                    onChange={() => onSetProvider(prov.id)}
                    className="accent-blue-500 cursor-pointer w-3 h-3"
                  />
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">
                  {prov.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Select Dropdowns for Models */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0 flex flex-col justify-center my-1">
        {/* LLM Model Dropdown */}
        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Sparkles className="w-3 h-3 text-purple-400" /> LLM Model (Kịch bản & Brief)
          </label>
          <Select value={llmModel} onValueChange={onSetLlmModel}>
            <SelectTrigger className="h-8 bg-[#0B0F17] border-[#1E2638] text-xs">
              <SelectValue placeholder="Chọn LLM Model" />
            </SelectTrigger>
            <SelectContent>
              {LLM_MODELS.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vision AI Model Dropdown */}
        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Eye className="w-3 h-3 text-cyan-400" /> Vision AI Model (Bóc tách ảnh)
          </label>
          <Select value={visionModel} onValueChange={onSetVisionModel}>
            <SelectTrigger className="h-8 bg-[#0B0F17] border-[#1E2638] text-xs">
              <SelectValue placeholder="Chọn Vision Model" />
            </SelectTrigger>
            <SelectContent>
              {VISION_MODELS.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 3. AI Temperature / Creativity (Radio Pills) */}
      <div className="pt-2.5 border-t border-[#1C2436]/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
          <Thermometer className="w-3.5 h-3.5 text-amber-400" />
          <span>Độ sáng tạo (Temperature):</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { val: 0.2, label: "0.2 Chuẩn xác" },
            { val: 0.7, label: "0.7 Cân bằng (Chuẩn)" },
            { val: 1.0, label: "1.0 Sáng tạo cao" },
          ].map((item) => (
            <button
              key={item.val}
              type="button"
              onClick={() => onSetTemperature(item.val)}
              className={`text-[10px] px-2 py-1 rounded font-mono transition-colors cursor-pointer ${
                aiTemperature === item.val
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-[#0E131E] border border-[#1E2638] text-slate-400 hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
