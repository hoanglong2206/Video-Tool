"use client";

import React, { useState } from "react";
import type { StoryboardScene, SceneVersionItem } from "../../types";
import { History, RotateCcw, Trash2, Camera } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VersionHistorySectionProps {
  scene: StoryboardScene;
  hasUnsavedChanges?: boolean;
  isCreatingVersion?: boolean;
  isDeletingVersion?: boolean;
  onCreateSnapshot: () => void;
  onDeleteVersion: (versionId: string) => void;
  onRollbackVersion: (version: SceneVersionItem) => void;
}

export function VersionHistorySection({
  scene,
  hasUnsavedChanges,
  isCreatingVersion,
  isDeletingVersion,
  onCreateSnapshot,
  onDeleteVersion,
  onRollbackVersion,
}: VersionHistorySectionProps): React.ReactElement {
  const versions = scene.versions || [];
  const nextVerNum = versions.length > 0 ? Math.max(...versions.map((v) => v.versionNumber)) + 1 : 2;
  const isSnapshotDisabled = isCreatingVersion || !hasUnsavedChanges;

  // Detect which version currently matches the scene attributes
  const activeVer = versions.find((v) => {
    const cur = [scene.title, scene.visualPrompt || scene.description, scene.voiceover, scene.cameraMovement].map((s) => (s || "").trim());
    const ver = [v.title, v.visualPrompt, v.voiceover, v.cameraMovement].map((s) => (s || "").trim());
    return cur[0] === ver[0] && cur[1] === ver[1] && cur[2] === ver[2] && (!ver[3] || cur[3] === ver[3]);
  });

  return (
    <TooltipProvider delayDuration={200}>
      <div className="pt-2 border-t border-[#1C2436] flex flex-col gap-1.5">
        {/* Header Bar with Active Version Tracking */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-300 uppercase font-semibold flex items-center gap-1 tracking-wider">
              <History className="w-3 h-3 text-cyan-400" /> Lịch sử ({versions.length})
            </span>
            {hasUnsavedChanges ? (
              <span className="text-[8.5px] font-mono text-amber-400 bg-amber-950/70 border border-amber-800/60 px-1.5 py-0.2 rounded font-bold" title="Có thay đổi mới chưa lưu snapshot">
                ● Đang sửa
              </span>
            ) : activeVer ? (
              <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.2 rounded font-bold" title={`Phân cảnh đang ở phiên bản v${activeVer.versionNumber}`}>
                Đang ở: v{activeVer.versionNumber}
              </span>
            ) : null}
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <button
                  type="button"
                  onClick={onCreateSnapshot}
                  disabled={isSnapshotDisabled}
                  className={`text-[9px] px-2 py-0.5 rounded border flex items-center gap-1 font-mono transition-colors ${
                    isSnapshotDisabled
                      ? "bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed opacity-50"
                      : "bg-cyan-950/70 hover:bg-cyan-900 border-cyan-800/60 text-cyan-300 hover:text-cyan-200 cursor-pointer shadow-xs"
                  }`}
                >
                  <Camera className="w-2.5 h-2.5" />
                  <span>+ Lưu snapshot (v{nextVerNum})</span>
                </button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-[10px]">
                {hasUnsavedChanges
                  ? `Lưu trạng thái hiện tại thành snapshot v${nextVerNum}`
                  : "Chưa có thay đổi mới để tạo snapshot"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Versions List */}
        <div className="flex flex-col gap-1 max-h-36 overflow-y-auto pr-1">
          {versions.map((ver) => {
            const verId = ver.id || `ver-${ver.versionNumber}`;
            const isCurrentActive = activeVer?.versionNumber === ver.versionNumber && !hasUnsavedChanges;
            const isProtected = versions.length <= 1;

            return (
              <div
                key={verId}
                className={`p-1.5 rounded border transition-colors flex flex-col gap-0.5 ${
                  isCurrentActive
                    ? "border-emerald-500/70 bg-emerald-950/20 shadow-xs"
                    : "bg-[#070A10] border-[#1A2234] hover:border-[#2A3750]"
                }`}
              >
                {/* Meta Row */}
                <div className="flex items-center justify-between text-[9px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`font-bold font-mono px-1 rounded text-[8.5px] tabular-nums border ${
                      isCurrentActive
                        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                        : "bg-cyan-950/90 text-cyan-300 border-cyan-800/80"
                    }`}>
                      v{ver.versionNumber}
                    </span>
                    {isCurrentActive ? (
                      <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono font-bold">
                        ● Đang dùng
                      </span>
                    ) : (
                      <span className="text-[8px] px-1 py-0.2 rounded bg-[#161F30] text-slate-400 font-mono">
                        {ver.role === "ai_llm" ? "AI Draft" : "Bạn lưu"}
                      </span>
                    )}
                    <span className="text-slate-500 text-[8px] font-mono truncate">
                      {ver.createdAt || "Đã lưu"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {isCurrentActive ? (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-mono bg-emerald-950/40 text-emerald-400/90 border border-emerald-900/40 cursor-default select-none">
                        ✓ Bản hiện tại
                      </span>
                    ) : (
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
                          <p className="text-[10px]">Khôi phục phân cảnh về bản v{ver.versionNumber}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

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
