"use client";

import React from "react";
import type { ProjectBriefFormData, UploadedMediaItem } from "../types";
import { MultiFileUploadZone } from "./MultiFileUploadZone";
import { Input, Textarea, Button } from "@/components/ui";
import { Sparkles, Sliders, ShieldCheck, Cpu } from "lucide-react";

interface BriefFormProps {
  formData: ProjectBriefFormData;
  onChangeField: <K extends keyof ProjectBriefFormData>(
    field: K,
    value: ProjectBriefFormData[K]
  ) => void;
  onAddFile: (file: UploadedMediaItem) => void;
  onRemoveFile: (id: string) => void;
  onAddDemoFiles: () => void;
  onSubmitAnalyze: () => void;
}

export function BriefForm({
  formData,
  onChangeField,
  onAddFile,
  onRemoveFile,
  onAddDemoFiles,
  onSubmitAnalyze,
}: BriefFormProps): React.ReactElement {
  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 max-w-5xl mx-auto w-full select-none">
      {/* Top Hero Instruction */}
      <div className="bg-gradient-to-r from-[#121826] to-[#0D121D] border border-[#1E2638] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">
              Khởi tạo Dự án & Trích xuất Dữ liệu Thông minh
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cung cấp yêu cầu kịch bản, tải lên Logo & Media tham chiếu. Bộ tứ AI (LLM, Vision AI, Prompt Builder & JSON Schema Validator) sẽ tự động bóc tách và tạo cấu trúc sản xuất.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Project Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Tên dự án <span className="text-blue-400">*</span>
          </label>
          <Input
            value={formData.projectName}
            placeholder="Ví dụ: Aurora X1 Launch Commercial"
            onChange={(e) => onChangeField("projectName", e.target.value)}
            className="bg-[#0E131E] border-[#1E2638] focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Tên Khách hàng / Thương hiệu <span className="text-blue-400">*</span>
          </label>
          <Input
            value={formData.client}
            placeholder="Ví dụ: Aurora Audio Inc."
            onChange={(e) => onChangeField("client", e.target.value)}
            className="bg-[#0E131E] border-[#1E2638] focus:border-blue-500"
          />
        </div>
      </div>

      {/* Section 2: Creative Brief & Content Requirements */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Yêu cầu & Nội dung kịch bản (Brief) <span className="text-blue-400">*</span>
          </label>
          <button
            type="button"
            onClick={() =>
              onChangeField(
                "brief",
                "Video giới thiệu sản phẩm cao cấp tai nghe không dây chống ồn Aurora X1. Phong cách cinematic tối màu, ánh sáng viền studio (rim-light), hiệu ứng chuyển động kim loại phản chiếu, âm thanh dồn dập kịch tính và tiết lộ sản phẩm bùng nổ."
              )
            }
            className="text-[11px] text-blue-400 hover:text-blue-300"
          >
            Sử dụng mẫu brief chuẩn
          </button>
        </div>
        <Textarea
          rows={4}
          value={formData.brief}
          placeholder="Mô tả ý tưởng cốt lõi, đối tượng khách hàng mục tiêu, thông điệp cần truyền tải, tông giọng và các yêu cầu kỹ xảo..."
          onChange={(e) => onChangeField("brief", e.target.value)}
          className="bg-[#0E131E] border-[#1E2638] focus:border-blue-500 resize-none leading-relaxed text-xs"
        />
      </div>

      {/* Section 3: Multi-file Upload */}
      <MultiFileUploadZone
        files={formData.files}
        onAddFile={onAddFile}
        onRemoveFile={onRemoveFile}
        onAddDemoFiles={onAddDemoFiles}
      />

      {/* Section 4: Video Format & Technical Specs */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#1C2436]">
          <Sliders className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Cấu hình Sản xuất & Định dạng Video
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Duration */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
              Thời lượng mục tiêu
            </label>
            <div className="grid grid-cols-3 gap-1">
              {["15s", "30s", "60s"].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => onChangeField("duration", dur)}
                  className={`py-1.5 text-xs rounded font-mono font-medium transition-colors ${
                    formData.duration === dur
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-[#0E131E] text-slate-400 border border-[#1E2638] hover:text-slate-200"
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
              Tỷ lệ khung hình
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: "16:9", label: "16:9" },
                { id: "9:16", label: "9:16" },
                { id: "1:1", label: "1:1" },
              ].map((ratio) => (
                <button
                  key={ratio.id}
                  type="button"
                  onClick={() => onChangeField("aspectRatio", ratio.id)}
                  className={`py-1.5 text-xs rounded font-mono font-medium transition-colors ${
                    formData.aspectRatio === ratio.id
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-[#0E131E] text-slate-400 border border-[#1E2638] hover:text-slate-200"
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
              Độ phân giải Render
            </label>
            <div className="grid grid-cols-2 gap-1">
              {["1080p", "4K UHD"].map((res) => (
                <button
                  key={res}
                  type="button"
                  onClick={() => onChangeField("resolution", res)}
                  className={`py-1.5 text-xs rounded font-mono font-medium transition-colors ${
                    formData.resolution === res
                      ? "bg-cyan-600 text-white font-bold"
                      : "bg-[#0E131E] text-slate-400 border border-[#1E2638] hover:text-slate-200"
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          {/* Style Preference */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
              Phong cách thị giác
            </label>
            <Input
              value={formData.stylePreference}
              onChange={(e) => onChangeField("stylePreference", e.target.value)}
              className="bg-[#0E131E] border-[#1E2638] h-8 text-xs"
            />
          </div>
        </div>

        {/* Brand Colors */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1C2436]/60">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-medium">Bảng màu thương hiệu:</span>
            <div className="flex items-center gap-2">
              {formData.brandColors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded border border-slate-700 shadow-sm flex items-center justify-center text-[9px] font-mono text-white"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Font: {formData.typeface}
          </span>
        </div>
      </div>

      {/* Main Action Trigger */}
      <div className="flex justify-end pt-2 pb-6">
        <Button
          type="button"
          onClick={onSubmitAnalyze}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm h-11 px-8 rounded-lg shadow-lg shadow-blue-500/25 flex items-center gap-2.5 transition-all hover:scale-[1.01]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Khởi chạy Phân tích AI (LLM + Vision + Prompt Builder + Schema) ➔</span>
        </Button>
      </div>
    </div>
  );
}
