"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, Sparkles, Palette } from "lucide-react";
import type { UploadedMediaItem, MediaCategory } from "../types";
import { MediaPreviewDialog } from "./MediaPreviewDialog";
import { UploadedFileCard } from "./UploadedFileCard";
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
  const [isDragging, setIsDragging] = useState(false);

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

  const processFiles = async (uploadedFiles: File[]) => {
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
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await processFiles(Array.from(e.target.files));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
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

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
      {/* Header - Fixed layout with 0 shifts */}
      <div className="flex items-center justify-between shrink-0 h-6">
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span>Tài liệu & Media ({files.length})</span>
          <span className="text-[10px] text-slate-400 font-normal lowercase">(click xem popup)</span>
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

      {/* Upload Dropzone with Native Drag & Drop and Static Height Status */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border border-dashed rounded-xl p-3 flex items-center justify-between transition-all cursor-pointer shrink-0 select-none",
          isDragging
            ? "border-blue-400 bg-blue-950/60 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/20"
            : "border-[#222E45] hover:border-blue-500/60 bg-[#0B0F17]/90 hover:bg-[#0F1626]/80"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              isDragging
                ? "bg-blue-600 text-white"
                : "bg-blue-600/10 border border-blue-500/20 text-blue-400"
            )}
          >
            <UploadCloud className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-200 truncate">
              {isDragging ? "Thả tệp vào đây để tải lên ngay" : "Kéo thả hoặc click để tải thêm file"}
            </p>
            <div className="h-4 flex items-center min-w-0">
              {extractedBanner ? (
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium truncate animate-in fade-in-0 duration-200">
                  <Palette className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Đã trích xuất & kết hợp màu: {extractedBanner}</span>
                </p>
              ) : (
                <p className="text-[10px] text-slate-400 truncate">
                  Hỗ trợ PNG, JPG, MP4, MOV, PDF, Word, SVG • Tự trích màu Logo
                </p>
              )}
            </div>
          </div>
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-md shrink-0 ml-2 transition-colors",
            isDragging
              ? "bg-blue-600 text-white font-bold"
              : "text-blue-400 bg-blue-950/50 border border-blue-800/40"
          )}
        >
          {isDragging ? "Thả tệp" : "Browse"}
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
              <UploadedFileCard
                key={file.id}
                file={file}
                onPreview={(f) => setSelectedPreviewFile(f)}
                onRemove={handleRemoveItem}
              />
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
