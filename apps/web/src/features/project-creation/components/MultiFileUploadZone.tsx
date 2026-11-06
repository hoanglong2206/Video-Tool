"use client";

import React, { useRef } from "react";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Video,
  Sparkles,
  Trash2,
  FileCheck,
} from "lucide-react";
import type { UploadedMediaItem, MediaCategory } from "../types";
import { Button } from "@/components/ui";

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
        return <span className="bg-indigo-950/80 text-indigo-400 border border-indigo-800/40 text-[9px] px-1.5 py-0.5 rounded font-mono">LOGO</span>;
      case "image":
        return <span className="bg-blue-950/80 text-blue-400 border border-blue-800/40 text-[9px] px-1.5 py-0.5 rounded font-mono">ẢNH</span>;
      case "video":
        return <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 text-[9px] px-1.5 py-0.5 rounded font-mono">VIDEO</span>;
      case "pdf":
        return <span className="bg-red-950/80 text-red-400 border border-red-800/40 text-[9px] px-1.5 py-0.5 rounded font-mono">PDF</span>;
      case "doc":
        return <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 text-[9px] px-1.5 py-0.5 rounded font-mono">TÀI LIỆU</span>;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            Tài liệu & Media khách hàng
            <span className="text-[10px] text-slate-400 font-normal normal-case">
              (Hỗ trợ nhiều file: Logo, Ảnh, Video, PDF, Brand Guidelines)
            </span>
          </label>
        </div>
        <button
          type="button"
          onClick={onAddDemoFiles}
          className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3" /> Nạp file mẫu Aurora X1
        </button>
      </div>

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx,.txt,.svg"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Dropzone Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#242D40] hover:border-blue-500/60 bg-[#0E131E] rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[#111724] group text-center"
      >
        <div className="w-10 h-10 rounded-full bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform mb-2">
          <UploadCloud className="w-5 h-5" />
        </div>
        <span className="text-xs font-medium text-slate-200">
          Kéo thả hoặc click để tải lên nhiều file cùng lúc
        </span>
        <span className="text-[11px] text-slate-400 mt-1">
          Hỗ trợ Logo (.png, .svg), Ảnh tham chiếu (.jpg, .png), Video mẫu (.mp4, .mov), Tài liệu (.pdf, .docx)
        </span>
      </div>

      {/* Uploaded Files Gallery */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-1">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-[#121824] border border-[#1E2638] hover:border-[#2C3852] rounded-lg p-2.5 flex flex-col justify-between group relative transition-colors"
            >
              {/* Top thumbnail or file icon */}
              <div className="w-full aspect-[16/9] rounded bg-[#0A0D14] border border-[#1A2234] flex items-center justify-center relative overflow-hidden mb-2">
                {file.previewUrl ? (
                  <img
                    src={file.previewUrl}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : file.category === "video" ? (
                  <Video className="w-6 h-6 text-cyan-400" />
                ) : file.category === "pdf" ? (
                  <FileText className="w-6 h-6 text-red-400" />
                ) : (
                  <FileCheck className="w-6 h-6 text-blue-400" />
                )}

                {/* Badge top left */}
                <div className="absolute top-1 left-1">
                  {getCategoryBadge(file.category)}
                </div>

                {/* Delete button top right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(file.id);
                  }}
                  className="absolute top-1 right-1 w-5 h-5 rounded bg-black/70 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Xoá file"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              {/* File Info */}
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-slate-200 truncate" title={file.name}>
                  {file.name}
                </span>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                  <span>{file.size}</span>
                  <span className="text-emerald-400 text-[9px]">Sẵn sàng</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

