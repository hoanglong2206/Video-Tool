"use client";

import React from "react";
import { Video, FileText, FileCheck, Eye, Trash2 } from "lucide-react";
import type { UploadedMediaItem, MediaCategory } from "../types";

interface UploadedFileCardProps {
  file: UploadedMediaItem;
  onPreview: (file: UploadedMediaItem) => void;
  onRemove: (id: string) => void;
}

export function UploadedFileCard({
  file,
  onPreview,
  onRemove,
}: UploadedFileCardProps): React.ReactElement {
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
    <div
      onClick={() => onPreview(file)}
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
          onRemove(file.id);
        }}
        className="absolute top-2 right-2 w-5 h-5 rounded bg-slate-800/80 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        title="Xoá file"
      >
        <Trash2 className="w-2.5 h-2.5" />
      </button>
    </div>
  );
}

