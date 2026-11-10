"use client";

import React, { useState } from "react";
import type { StoryboardScene, SceneVersionItem } from "../../types";
import { History, Plus, RotateCcw, Trash2, Camera, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VersionHistorySectionProps {
  scene: StoryboardScene;
  isCreatingVersion?: boolean;
  isDeletingVersion?: boolean;
  onCreateSnapshot: () => void;
  onDeleteVersion: (versionId: string) => void;
  onRollbackVersion: (version: SceneVersionItem) => void;
}

export function VersionHistorySection({
  scene,
  isCreatingVersion,
  isDeletingVersion,
  onCreateSnapshot,
  onDeleteVersion,
  onRollbackVersion,
}: VersionHistorySectionProps): React.ReactElement {
  const versions = scene.versions || [];
  const nextVerNum = versions.length > 0 ? Math.max(...versions.map((v) => v.versionNumber)) + 1 : 2;
  const [hoveredVerId, setHoveredVerId] = useState<string | null>(null);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="pt-2 border-t border-[#1C2436] flex flex-col gap-1.5">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-300 uppercase font-semibold flex items-center gap-1 tracking-wider">
              <History className="w-3 h-3 text-cyan-400" /> Lịch sử ({versions.length} phiên bản)
            </span>
          </div>

          <button
            type="button"
            onClick={onCreateSnapshot}
            disabled={isCreatingVersion}
            className="text-[9px] px-2 py-0.5 rounded bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-mono cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Lưu trạng thái hiện tại thành snapshot mới"
          >
            <Camera className="w-2.5 h-2.5" />
            <span>+ Lưu snapshot (v{nextVerNum})</span>
          </button>
        </div>

        {/* Versions List */}
        <div className="flex flex-col gap-1 max-h-36 overflow-y-auto pr-1">
          {versions.map((ver, idx) => {
            const verId = ver.id || `ver-${ver.versionNumber}`;
            const isLatest = idx === versions.length - 1;
            const isProtected = versions.length <= 1;

            return (
              <div
                key={verId}
                onMouseEnter={() => setHoveredVerId(verId)}
                onMouseLeave={() => setHoveredVerId(null)}
                className={`bg-[#070A10] p-1.5 rounded border transition-colors flex flex-col gap-0.5 ${
                  isLatest ? "border-cyan-900/60 bg-[#090E1A]" : "border-[#1A2234] hover:border-[#2A3750]"
                }`}
              >
                {/* Meta Row */}
                <div className="flex items-center justify-between text-[9px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-cyan-300 font-mono bg-cyan-950/90 border border-cyan-800/80 px-1 rounded text-[8.5px] tabular-nums">
                      v{ver.versionNumber}
                    </span>
                    <span className="text-[8px] px-1 py-0.2 rounded bg-[#161F30] text-slate-400 font-mono">
                      {ver.role === "ai_llm" ? "AI Draft" : "Bạn lưu"}
                    </span>
                    <span className="text-slate-500 text-[8px] font-mono truncate">
                      {ver.createdAt || "Đã lưu"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => onRollbackVersion(ver)}
                          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-mono bg-blue-950/70 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-800/50 cursor-pointer transition-colors"
                        >
                          <RotateCcw className="w-2 h-2" />
                          <span>Khôi phục</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-[10px]">Khôi phục phân cảnh về nội dung bản v{ver.versionNumber}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => onDeleteVersion(verId)}
                          disabled={isProtected || isDeletingVersion}
                          className={`p-1 rounded text-[8px] transition-colors ${
                            isProtected
                              ? "text-slate-600 cursor-not-allowed opacity-40"
                              : "text-slate-400 hover:text-red-400 hover:bg-red-950/50 cursor-pointer"
                          }`}
                          title={isProtected ? "Không thể xóa bản duy nhất" : "Xóa phiên bản này"}
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-[10px]">
                          {isProtected ? "Cần giữ tối thiểu 1 phiên bản" : `Xóa bản ghi v${ver.versionNumber}`}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Title & Preview Row */}
                <div className="flex items-center justify-between text-[9px] min-w-0">
                  <span className="text-slate-300 truncate font-medium text-[8.5px]">
                    {ver.title || scene.title}
                  </span>
                  {ver.visualPrompt && (
                    <span className="text-slate-500 truncate max-w-[150px] text-[8px] italic ml-2">
                      {ver.visualPrompt}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
