"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  Video,
  Sparkles,
  Trash2,
  FileCheck,
  Eye,
  Palette,
} from "lucide-react";
import type { UploadedMediaItem, MediaCategory } from "../types";
import { MediaPreviewDialog } from "./MediaPreviewDialog";
import { extractPaletteFromImageFile } from "../utils/colorExtractor";

interface MultiFileUploadZoneProps {
  files: UploadedMediaItem[];
  onAddFile: (file: UploadedMediaItem) => void;
  onRemoveFile: (id: string) => void;
  onAddDemoFiles: () => void;
  onAutoExtractedColors?: (colors: string[], sourceName: string) => void;
}

export function MultiFileUploadZone({
  files,
  onAddFile,
  onRemoveFile,
  onAddDemoFiles,
  onAutoExtractedColors,
}: MultiFileUploadZoneProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef<Set<string>>(new Set());
  const [selectedPreviewFile, setSelectedPreviewFile] = useState<UploadedMediaItem | null>(null);
  const [extractedBanner, setExtractedBanner] = useState<string | null>(null);

  // Cleanup object URLs on unmount to completely prevent memory leaks
  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          // ignore
        }
      });
      urls.clear();
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files);

    for (const f of uploadedFiles) {
      let category: MediaCategory = "image";
      const name = f.name.toLowerCase();
      if (name.endsWith(".mp4") || name.endsWith(".mov") || name.endsWith(".webm")) {
        category = "video";
      } else if (name.endsWith(".pdf")) {
        category = "pdf";
      } else if (name.endsWith(".doc") || name.endsWith(".docx") || name.endsWith(".txt")) {
        category = "doc";
      } else if (name.includes("logo") || name.endsWith(".svg")) {
        category = "logo";
      }

      let previewUrl: string | undefined;
      if (f.type.startsWith("image/")) {
        previewUrl = URL.createObjectURL(f);
        objectUrlsRef.current.add(previewUrl);

        // Auto-extract brand color palette from uploaded logo or primary image
        if (onAutoExtractedColors) {
          extractPaletteFromImageFile(f).then((colors) => {
            onAutoExtractedColors(colors, f.name);
            setExtractedBanner(f.name);
            setTimeout(() => setExtractedBanner(null), 3500);
          });
        }
      }

      const sizeStr = `${(f.size / (1024 * 1024)).toFixed(1)} MB`;
      const newItem: UploadedMediaItem = {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: f.name,
        size: sizeStr === "0.0 MB" ? `${Math.round(f.size / 1024)} KB` : sizeStr,
        category,
        previewUrl,
        visionTags: ["Tài liệu người dùng", category.toUpperCase()],
      };
      onAddFile(newItem);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveItem = (id: string) => {
    const target = files.find((f) => f.id === id);
    if (target?.previewUrl && objectUrlsRef.current.has(target.previewUrl)) {
      try {
        URL.revokeObjectURL(target.previewUrl);
        objectUrlsRef.current.delete(target.previewUrl);
      } catch (e) {
        // ignore
      }
    }
    onRemoveFile(id);
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
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>Tài liệu & Media ({files.length})</span>
            <span className="text-[10px] text-slate-400 font-normal lowercase">(click xem popup)</span>
          </label>
          {extractedBanner && (
            <span className="text-[10px] text-cyan-300 bg-cyan-950/70 border border-cyan-700/50 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
              <Palette className="w-2.5 h-2.5 text-cyan-400" />
              <span>Đã trích màu từ logo</span>
            </span>
          )}
        </div>
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

      {/* Upload Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border border-dashed border-[#222E45] hover:border-blue-500/60 bg-[#0B0F17]/90 hover:bg-[#0F1626]/80 rounded-xl p-3 flex items-center justify-between transition-colors cursor-pointer shrink-0"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">
              Kéo thả hoặc click để tải thêm file
            </p>
            <p className="text-[10px] text-slate-400">
              Hỗ trợ PNG, JPG, MP4, MOV, PDF, Word, SVG • Tự trích màu Logo
            </p>
          </div>
        </div>
        <span className="text-xs text-blue-400 font-medium px-2.5 py-1 rounded-md bg-blue-950/50 border border-blue-800/40">
          Browse
        </span>
      </div>

      {/* Uploaded File Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {files.length === 0 ? (
          <div className="h-full min-h-[90px] flex flex-col items-center justify-center text-slate-400 text-xs border border-dashed border-[#1C2436] rounded-xl">
            Chưa có media nào được tải lên
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedPreviewFile(file)}
                className="bg-[#0A0D15] border border-[#1E2638] hover:border-blue-500/40 rounded-lg p-2 flex items-center gap-2.5 relative group cursor-pointer transition-colors"
              >
                {/* Thumbnail Icon */}
                <div className="w-9 h-9 rounded-md bg-[#121927] border border-[#223048] flex items-center justify-center shrink-0 overflow-hidden relative">
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : file.category === "video" ? (
                    <Video className="w-4 h-4 text-cyan-400" />
                  ) : file.category === "pdf" ? (
                    <FileText className="w-4 h-4 text-red-400" />
                  ) : (
                    <FileCheck className="w-4 h-4 text-blue-400" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Eye className="w-3.5 h-3.5 text-white" />
                  </div>
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

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveItem(file.id);
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

      {/* Central Media Preview Modal */}
      <MediaPreviewDialog
        file={selectedPreviewFile}
        isOpen={Boolean(selectedPreviewFile)}
        onClose={() => setSelectedPreviewFile(null)}
        onRemoveFile={handleRemoveItem}
      />
    </div>
  );
}
