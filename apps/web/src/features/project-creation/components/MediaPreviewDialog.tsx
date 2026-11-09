"use client";

import React from "react";
import type { UploadedMediaItem, MediaCategory } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Video,
  FileCheck,
  Trash2,
  Sparkles,
  ExternalLink,
  Volume2,
} from "lucide-react";

interface MediaPreviewDialogProps {
  file: UploadedMediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRemoveFile?: (id: string) => void;
}

export function MediaPreviewDialog({
  file,
  isOpen,
  onClose,
  onRemoveFile,
}: MediaPreviewDialogProps): React.ReactElement {
  if (!file) return <></>;

  const getCategoryBadge = (cat: MediaCategory) => {
    switch (cat) {
      case "logo":
        return <span className="bg-indigo-950/90 text-indigo-300 border border-indigo-700/50 text-[10px] px-1.5 py-0.5 rounded font-mono">LOGO</span>;
      case "image":
        return <span className="bg-blue-950/90 text-blue-300 border border-blue-700/50 text-[10px] px-1.5 py-0.5 rounded font-mono">ẢNH</span>;
      case "video":
        return <span className="bg-cyan-950/90 text-cyan-300 border border-cyan-700/50 text-[10px] px-1.5 py-0.5 rounded font-mono">VIDEO</span>;
      case "pdf":
        return <span className="bg-red-950/90 text-red-300 border border-red-700/50 text-[10px] px-1.5 py-0.5 rounded font-mono">PDF</span>;
      case "doc":
        return <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-700/50 text-[10px] px-1.5 py-0.5 rounded font-mono">DOC</span>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[#0D121F] border-[#1E2638] text-slate-100 p-5 rounded-2xl shadow-2xl">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between gap-3 pb-3 border-b border-[#1E2638] pr-6">
          <div className="flex items-center gap-2.5 min-w-0">
            {getCategoryBadge(file.category)}
            <DialogTitle className="text-sm font-semibold text-slate-100 truncate">
              {file.name}
            </DialogTitle>
          </div>
          <span className="text-xs text-slate-400 font-mono shrink-0">
            {file.size}
          </span>
        </DialogHeader>

        {/* Media Preview Body */}
        <div className="flex flex-col gap-3 py-1">
          <div className="w-full h-64 rounded-xl bg-[#070A10] border border-[#1E2638] flex items-center justify-center overflow-hidden relative group">
            {file.previewUrl ? (
              <img
                src={file.previewUrl}
                alt={file.name}
                className="w-full h-full object-contain"
              />
            ) : file.category === "video" ? (
              <div className="flex flex-col items-center justify-center gap-2.5 text-center p-4">
                <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
                  <Video className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="font-mono bg-[#111726] px-2 py-0.5 rounded border border-[#1F293D]">1080p 60fps</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono text-cyan-400">
                    <Volume2 className="w-3.5 h-3.5" /> Stereo
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Video mẫu tham chiếu chuyển động nhịp điệu (Kinetic Reference Motion)
                </p>
              </div>
            ) : file.category === "pdf" ? (
              <div className="flex flex-col items-center justify-center gap-2 text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400 shadow-lg">
                  <FileText className="w-7 h-7" />
                </div>
                <h4 className="text-xs font-semibold text-slate-200 mt-1">Tài liệu Brand Guidelines PDF</h4>
                <p className="text-[11px] text-slate-400 max-w-sm">
                  AI Vision đã trích xuất cấu trúc bố cục, hệ màu thương hiệu và logo specifications từ tệp PDF này.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-blue-400 shadow-lg">
                  <FileCheck className="w-7 h-7" />
                </div>
                <p className="text-xs text-slate-300">Tệp văn bản đính kèm</p>
              </div>
            )}
          </div>

          {/* AI Vision Tags */}
          {file.visionTags && file.visionTags.length > 0 && (
            <div className="flex flex-col gap-1.5 p-2.5 rounded-lg bg-[#080C14] border border-[#172033]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Nhãn trích xuất bởi Vision AI</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {file.visionTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#111827] border border-[#202E45] text-cyan-300 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1E2638]">
          {onRemoveFile ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onRemoveFile(file.id);
                onClose();
              }}
              className="h-8 text-xs text-red-400 hover:text-white bg-red-950/30 hover:bg-red-600 border border-red-800/40 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tệp này</span>
            </Button>
          ) : <div />}

          <Button
            type="button"
            size="sm"
            onClick={onClose}
            className="h-8 text-xs bg-[#1E2638] hover:bg-[#2C3852] text-slate-200 cursor-pointer transition-colors px-4"
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
