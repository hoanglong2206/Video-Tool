"use client";

import React from "react";
import type { ProjectBriefFormData, UploadedMediaItem } from "../types";
import { BrandKitPicker } from "./BrandKitPicker";
import { SceneTemplatePicker } from "./SceneTemplatePicker";
import { MultiFileUploadZone } from "./MultiFileUploadZone";
import { AudioAtmosphereSelector } from "./AudioAtmosphereSelector";
import { mergeColorPalettes } from "../utils/colorExtractor";
import { Input, Textarea, Button } from "@/components/ui";
import { Sparkles, Sliders, CheckCircle2 } from "lucide-react";

interface BriefFormProps {
  formData: ProjectBriefFormData;
  onChangeField: <K extends keyof ProjectBriefFormData>(
    field: K,
    value: ProjectBriefFormData[K]
  ) => void;
  onAddFile: (file: UploadedMediaItem) => void;
  onRemoveFile: (id: string) => void;
  onAddDemoFiles: () => void;
  onSelectBrandKit?: (kitId?: string) => void;
  onSelectTemplate?: (templateId?: string) => void;
  onSubmitAnalyze: () => void;
}

export function BriefForm({
  formData,
  onChangeField,
  onAddFile,
  onRemoveFile,
  onAddDemoFiles,
  onSelectBrandKit,
  onSelectTemplate,
  onSubmitAnalyze,
}: BriefFormProps): React.ReactElement {
  return (
    <div className="flex-1 h-full min-h-0 w-full flex flex-col p-4 gap-3 overflow-hidden select-none">
      {/* Top Banner with Action CTA */}
      <div className="bg-gradient-to-r from-[#121826] to-[#0D121D] border border-[#1E2638] rounded-xl px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold text-slate-100 flex items-center gap-2 truncate">
              <span>Khởi tạo Dự án & Trích xuất Dữ liệu Thông minh</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded font-normal shrink-0">
                4 AI Agents Active
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              Tích hợp Brand Kit V2, Mẫu layout phân cảnh và phân luồng âm thanh đa kênh tự động.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-slate-400 border-r border-[#1E2638] pr-3">
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-blue-400" /> LLM
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Vision AI
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-indigo-400" /> Spatial 3D
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Audio Sync
            </span>
          </div>

          <Button
            type="button"
            onClick={onSubmitAnalyze}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs h-8.5 px-4 rounded-lg shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Khởi chạy Phân tích AI ➔</span>
          </Button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3.5 overflow-hidden">
        {/* Left Column: Metadata & Brief + Brand Kit + Scene Template */}
        <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden">
          {/* Left Card 1: Project Metadata & Brief */}
          <div className="flex-1 min-h-0 bg-[#0F141F] border border-[#1C2436] rounded-xl p-3.5 flex flex-col gap-2.5 overflow-hidden">
            <div className="grid grid-cols-2 gap-2.5 shrink-0">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Tên dự án <span className="text-blue-400">*</span>
                </label>
                <Input
                  value={formData.projectName}
                  placeholder="Ví dụ: Aurora X1 Launch Commercial"
                  onChange={(e) => onChangeField("projectName", e.target.value)}
                  className="bg-[#0E131E] border-[#1E2638] focus:border-blue-500 h-8 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Khách hàng / Thương hiệu <span className="text-blue-400">*</span>
                </label>
                <Input
                  value={formData.client}
                  placeholder="Ví dụ: Aurora Audio Inc."
                  onChange={(e) => onChangeField("client", e.target.value)}
                  className="bg-[#0E131E] border-[#1E2638] focus:border-blue-500 h-8 text-xs"
                />
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex items-center justify-between mb-1 shrink-0">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Yêu cầu & Kịch bản (Brief) <span className="text-blue-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    onChangeField(
                      "brief",
                      "Video giới thiệu sản phẩm cao cấp tai nghe không dây chống ồn Aurora X1. Phong cách cinematic tối màu, ánh sáng viền studio (rim-light), hiệu ứng chuyển động kim loại phản chiếu, âm thanh dồn dập kịch tính và tiết lộ sản phẩm bùng nổ."
                    )
                  }
                  className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Sử dụng mẫu brief chuẩn
                </button>
              </div>
              <Textarea
                value={formData.brief}
                placeholder="Mô tả ý tưởng cốt lõi, thông điệp truyền tải, phong cách và yêu cầu..."
                onChange={(e) => onChangeField("brief", e.target.value)}
                className="bg-[#0E131E] border-[#1E2638] focus:border-blue-500 resize-none leading-relaxed text-xs flex-1 min-h-0"
              />
            </div>
          </div>

          {/* Left Card 2: Brand Kit 1-Click Picker */}
          <div className="shrink-0 bg-[#0F141F] border border-[#1C2436] rounded-xl p-3 flex flex-col">
            <BrandKitPicker
              selectedKitId={formData.brandKitId}
              onSelectKit={(kitId) => onSelectBrandKit && onSelectBrandKit(kitId)}
            />
          </div>

          {/* Left Card 3: Scene Template Quick Picker */}
          <div className="shrink-0 bg-[#0F141F] border border-[#1C2436] rounded-xl p-3 flex flex-col">
            <SceneTemplatePicker
              selectedTemplateId={formData.templateId}
              onSelectTemplate={(tmplId) => onSelectTemplate && onSelectTemplate(tmplId)}
            />
          </div>
        </div>

        {/* Right Column: Media Upload + Multi-Track Audio + Production Specs */}
        <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden">
          {/* Right Card 1: Media Zone */}
          <div className="flex-1 min-h-0 bg-[#0F141F] border border-[#1C2436] rounded-xl p-3.5 flex flex-col overflow-hidden">
            <MultiFileUploadZone
              files={formData.files}
              onAddFile={onAddFile}
              onRemoveFile={onRemoveFile}
              onAddDemoFiles={onAddDemoFiles}
              onAutoExtractedColors={(newColors) => {
                const merged = mergeColorPalettes(formData.brandColors || [], newColors);
                onChangeField("brandColors", merged);
              }}
            />
          </div>

          {/* Right Card 2: Âm thanh & Multi-Track Audio */}
          <div className="shrink-0 bg-[#0F141F] border border-[#1C2436] rounded-xl p-3.5 flex flex-col">
            <AudioAtmosphereSelector
              bgmMood={formData.bgmMood}
              soundMode={formData.soundMode}
              autoDucking={formData.autoDucking}
              onChangeBgm={(b) => onChangeField("bgmMood", b)}
              onChangeSoundMode={(m) => onChangeField("soundMode", m)}
              onToggleAutoDucking={(d) => onChangeField("autoDucking", d)}
            />
          </div>

          {/* Right Card 3: Cấu hình Sản xuất & Định dạng Video */}
          <div className="shrink-0 bg-[#0F141F] border border-[#1C2436] rounded-xl p-3.5 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 pb-1 border-b border-[#1C2436]">
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                Cấu hình Sản xuất & Định dạng Video
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Duration */}
              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1">
                  Thời lượng mục tiêu
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {["15s", "30s", "60s"].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => onChangeField("duration", dur)}
                      className={`py-1 text-xs rounded font-mono font-medium transition-colors cursor-pointer ${
                        formData.duration === dur
                          ? "bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/30"
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
                <label className="block text-[10px] font-medium text-slate-400 mb-1">
                  Tỷ lệ khung hình
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {["16:9", "9:16", "1:1"].map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => onChangeField("aspectRatio", ratio)}
                      className={`py-1 text-xs rounded font-mono font-medium transition-colors cursor-pointer ${
                        formData.aspectRatio === ratio
                          ? "bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/30"
                          : "bg-[#0E131E] text-slate-400 border border-[#1E2638] hover:text-slate-200"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1">
                  Độ phân giải Render
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {["1080p", "4K UHD"].map((res) => (
                    <button
                      key={res}
                      type="button"
                      onClick={() => onChangeField("resolution", res)}
                      className={`py-1 text-xs rounded font-mono font-medium transition-colors cursor-pointer ${
                        formData.resolution === res
                          ? "bg-cyan-600 text-white font-bold shadow-xs shadow-cyan-500/30"
                          : "bg-[#0E131E] text-slate-400 border border-[#1E2638] hover:text-slate-200"
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
