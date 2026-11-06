"use client";

import React, { useRef } from "react";
import {
  UploadCloud,
  FileText,
  Video,
  Sparkles,
  Trash2,
  FileCheck,
} from "lucide-react";
import type { UploadedMediaItem, MediaCategory } from "../types";

interface MultiFileUploadZoneProps {
  files: UploadedMediaItem[];
  onAddFile: (file: UploadedMediaItem) => void;
  onRemoveFile: (id: string) => void;
  onAddDemoFiles: () => void;
}

export function MultiFileUploadZone({
  files,
  onAddFile,
  onRemoveFile,
  onAddDemoFiles,
}: MultiFileUploadZoneProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files);

    uploadedFiles.forEach((f) => {
      let category: MediaCategory = "image";
      const name = f.name.toLowerCase();
      if (name.endsWith(".mp4") || name.endsWith(".mov") || name.endsWith(".webm")) {
        category = "video";
      } else if (name.endsWith(".pdf")) {
        category = "pdf";
      } else if (name.endsWith(".doc") || name.endsWith(".docx") || name.endsWith(".txt")) {
        category = "doc";
      } else if (name.includes("logo")) {
        category = "logo";
      }

      const sizeStr = `${(f.size / (1024 * 1024)).toFixed(1)} MB`;
      const newItem: UploadedMediaItem = {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: f.name,
        size: sizeStr === "0.0 MB" ? `${Math.round(f.size / 1024)} KB` : sizeStr,
        category,
        previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
        visionTags: ["Tài liệu người dùng", category.toUpperCase()],
      };
      onAddFile(newItem);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getCategoryBadge = (cat: MediaCategory) => {
    switch (cat) {
      case "logo":
        return <span className="bg-indigo-950/90 text-indigo-300 border border-indigo-700/50 text-[9px] px-1 py-0.5 rounded font-mono">LOGO</span>;
      case "image":
        return <span className="bg-blue-950/90 text-blue-300 border border-blue-700/50 text-[9px] px-1 py-0.5 rounded font-mono">ẢNH</span>;
      case "video":
        return <span className="bg-cyan-950/90 text-cyan-300 border border-cyan-700/50 text-[9px] px-1 py-0.5 rounded font-mono">VIDEO</span>;
      case "pdf":
        return <span className="bg-red-950/90 text-red-300 border border-red-700/50 text-[9px] px-1 py-0.5 rounded font-mono">PDF</span>;
      case "doc":
        return <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-700/50 text-[9px] px-1 py-0.5 rounded font-mono">DOC</span>;
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span>Tài liệu & Media ({files.length})</span>
          <span className="text-[10px] text-slate-400 font-normal lowercase">(logo, ảnh, video, pdf)</span>
        </label>
        <button
          type="button"
          onClick={onAddDemoFiles}
          className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3" /> Nạp file mẫu Aurora X1
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx,.txt,.svg"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Compact Dropzone Button */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="shrink-0 border border-dashed border-[#242D40] hover:border-blue-500/60 bg-[#0A0D15] hover:bg-[#0E1320] rounded-lg p-2.5 flex items-center justify-between cursor-pointer transition-all group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-950/70 border border-blue-800/40 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shrink-0">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-xs font-medium text-slate-200 block group-hover:text-blue-300">
              Kéo thả hoặc click để tải thêm file
            </span>
            <span className="text-[10px] text-slate-400">
              Hỗ trợ PNG, JPG, MP4, MOV, PDF, Word, SVG
            </span>
          </div>
        </div>
        <span className="text-[11px] text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded font-mono">
          Browse
        </span>
      </div>

      {/* Uploaded Files Gallery - Internal Scroll Only */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {files.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-4 border border-dashed border-[#1E2638] rounded-lg">
            <p className="text-xs text-slate-400">
              Chưa có file nào. Hãy click tải lên hoặc bấm <span className="text-cyan-400">"Nạp file mẫu Aurora X1"</span>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-[#0E131E] border border-[#1E2638] hover:border-[#2C3852] rounded-lg p-2 flex items-center gap-2 group relative transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-12 h-10 rounded bg-[#070A10] border border-[#1A2234] flex items-center justify-center shrink-0 overflow-hidden relative">
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : file.category === "video" ? (
                    <Video className="w-4 h-4 text-cyan-400" />
                  ) : file.category === "pdf" ? (
                    <FileText className="w-4 h-4 text-red-400" />
                  ) : (
                    <FileCheck className="w-4 h-4 text-blue-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-5">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {getCategoryBadge(file.category)}
                    <span className="text-[11px] font-medium text-slate-200 truncate" title={file.name}>
                      {file.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {file.size}
                  </span>
                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(file.id);
                  }}
                  className="absolute top-2 right-2 w-5 h-5 rounded bg-slate-800/80 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Xoá file"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
