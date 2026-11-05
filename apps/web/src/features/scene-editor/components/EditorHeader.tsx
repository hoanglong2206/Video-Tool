import React from "react";
import Link from "next/link";
import { Play, Pause, Undo2, Redo2 } from "lucide-react";
import { Badge, Button } from "@/components/ui";

interface EditorHeaderProps {
  projectName: string;
  sceneName: string;
  isPlaying: boolean;
  isApproved: boolean;
  onTogglePlay: () => void;
  onApproveScene: () => void;
  onSaveVersion?: () => void;
}

export function EditorHeader({
  projectName,
  sceneName,
  isPlaying,
  isApproved,
  onTogglePlay,
  onApproveScene,
  onSaveVersion,
}: EditorHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17] select-none">
      {/* Breadcrumb with Status */}
      <div className="flex items-center gap-2.5 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          {projectName}
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">{sceneName}</span>
        {isApproved ? (
          <Badge variant="success" className="ml-1">
            ✓ Approved
          </Badge>
        ) : (
          <Badge variant="warning" className="ml-1">
            Waiting for approval
          </Badge>
        )}
      </div>

      {/* Scrub & Action Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-200"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-200"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onTogglePlay}
          className="flex items-center gap-1.5"
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
        >
          Save version
        </Button>

        <Button
          size="sm"
          onClick={onApproveScene}
        >
          Approve scene
        </Button>
      </div>
    </header>
  );
}

