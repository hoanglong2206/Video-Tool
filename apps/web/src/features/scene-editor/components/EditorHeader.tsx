"use client";

import React from "react";
import { Play, Pause, Undo2, Redo2, Loader2 } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { StudioHeader } from "@/components/shared";

interface EditorHeaderProps {
  projectName: string;
  sceneName: string;
  isPlaying: boolean;
  isApproved: boolean;
  isApproving?: boolean;
  onTogglePlay: () => void;
  onApproveScene: () => void;
  onSaveVersion?: () => void;
}

export function EditorHeader({
  projectName,
  sceneName,
  isPlaying,
  isApproved,
  isApproving = false,
  onTogglePlay,
  onApproveScene,
  onSaveVersion,
}: EditorHeaderProps): React.ReactElement {
  return (
    <StudioHeader
      rootTitle={projectName}
      rootHref="/"
      subTitle={sceneName}
      badge={
        isApproved ? (
          <Badge variant="success" className="ml-1">
            ✓ Approved
          </Badge>
        ) : (
          <Badge variant="warning" className="ml-1">
            Waiting for approval
          </Badge>
        )
      }
    >
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onTogglePlay}
        className="flex items-center gap-1.5 cursor-pointer"
      >
        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
        <span>{isPlaying ? "Pause" : "Play"}</span>
      </Button>

      <span className="text-xs font-mono text-slate-300">
        00:03:12 <span className="text-slate-500">/ 00:06:00</span>
      </span>

      <Badge variant="secondary" className="h-8 px-2.5 rounded-md">
        100%
      </Badge>

      <Button
        variant="outline"
        size="sm"
        onClick={onSaveVersion}
        className="cursor-pointer"
      >
        Save version
      </Button>

      <Button
        size="sm"
        disabled={isApproving || isApproved}
        onClick={onApproveScene}
        className="flex items-center gap-1.5 min-w-[110px] justify-center cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
      >
        {isApproving ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Đang duyệt...</span>
          </>
        ) : isApproved ? (
          <span>✓ Đã duyệt</span>
        ) : (
          <span>Approve scene</span>
        )}
      </Button>
    </StudioHeader>
  );
}
