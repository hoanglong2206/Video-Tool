"use client";

import React, { useState } from "react";
import type { UploadedMediaItem, FullAiAnalysisOutput } from "../types";
import { AiInsightsTabPanel } from "./AiInsightsTabPanel";
import { MediaPreviewDialog } from "./MediaPreviewDialog";
import { Image as ImageIcon, Video, FileText, FileCheck, Eye, Layers } from "lucide-react";

interface ReferenceMediaBoardProps {
  files: UploadedMediaItem[];
  aiOutput: FullAiAnalysisOutput;
  onSelectAssetVersion?: (assetId: string, versionNumber: number) => void;
}

export function ReferenceMediaBoard({
  files,
  aiOutput,
  onSelectAssetVersion,
}: ReferenceMediaBoardProps): React.ReactElement {
  const [selectedPreviewFile, setSelectedPreviewFile] = useState<UploadedMediaItem | null>(null);

  return (
    <div className="w-[400px] xl:w-[440px] 2xl:w-[480px] border-l border-[#1C2436] bg-[#0A0E17] p-3.5 flex flex-col gap-3 h-full min-h-0 overflow-hidden shrink-0 select-none">
      {/* 1. Reference Media Gallery & Versions */}
      <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between pb-1 border-b border-[#1C2436]">
          <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kho Media & Phiên Bản Asset</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">
            {files.length} file (cuộn ngang)
          </span>
        </div>

        {/* Media Thumbnails Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {files.length === 0 ? (
            <div className="py-2 text-[11px] text-slate-500 italic">
              Chưa có tài liệu đính kèm
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="w-28 shrink-0 bg-[#0B0F17] border border-[#1A2234] hover:border-blue-500/60 rounded-lg p-1.5 flex flex-col group relative transition-all"
              >
                <div
                  onClick={() => setSelectedPreviewFile(file)}
                  className="w-full aspect-[4/3] rounded bg-[#121723] overflow-hidden relative flex items-center justify-center cursor-pointer"
                  title={`${file.name} (Click xem popup)`}
                >
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

                  {/* Hover Eye Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Eye className="w-3.5 h-3.5 text-white" />
                  </div>

                  <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/80 text-slate-300 px-1 rounded font-mono uppercase">
                    {file.category}
                  </span>
                </div>

                <span className="text-[9px] font-medium text-slate-300 truncate mt-1 block">
                  {file.name}
                </span>

                {/* Asset Version Selector Chips */}
                {file.versions && file.versions.length > 1 ? (
                  <div className="flex items-center gap-1 mt-1 pt-1 border-t border-[#1C2436]/60">
                    <Layers className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                    <div className="flex items-center gap-0.5 flex-1">
                      {file.versions.map((ver, vIdx) => (
                        <button
                          key={`file-${file.id}-v-${ver.versionNumber}-${vIdx}`}
                          type="button"
                          onClick={() => onSelectAssetVersion && onSelectAssetVersion(file.id, ver.versionNumber)}
                          className={`flex-1 text-[8px] font-mono py-0.5 rounded cursor-pointer transition-colors ${
                            file.activeVersion === ver.versionNumber
                              ? "bg-cyan-600 text-white font-bold"
                              : "bg-[#141B29] text-slate-400 hover:text-slate-200"
                          }`}
                          title={ver.changeDescription}
                        >
                          v{ver.versionNumber}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-[8px] font-mono text-slate-500 mt-0.5">
                    {file.dimensions || file.size}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Vision AI Color Palette */}
        <div className="pt-1.5 border-t border-[#1C2436]/70">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Bảng màu Vision AI trích xuất:
          </span>
          <div className="flex items-center gap-1.5">
            {aiOutput.vision.colorPalette.map((hex, i) => (
              <div key={`color-swatch-${hex}-${i}`} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full h-3.5 rounded border border-slate-700 shadow-xs"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
                <span className="text-[8px] font-mono text-slate-400 truncate max-w-full">
                  {hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AI Multi-Agent Insights Panel */}
      <div className="flex-1 min-h-0 bg-[#101520] border border-[#1C2436] rounded-xl p-3 flex flex-col gap-2 overflow-hidden">
        <div className="flex items-center justify-between pb-1 border-b border-[#1C2436] shrink-0">
          <h3 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
            Phân Tích AI Đa Tầng (AI Insights)
          </h3>
          <span className="text-[10px] text-emerald-400 font-mono">
            3 Models Ready
          </span>
        </div>

        <AiInsightsTabPanel aiOutput={aiOutput} />
      </div>

      {/* Central Media Preview Popup */}
      <MediaPreviewDialog
        file={selectedPreviewFile}
        isOpen={Boolean(selectedPreviewFile)}
        onClose={() => setSelectedPreviewFile(null)}
      />
    </div>
  );
}
