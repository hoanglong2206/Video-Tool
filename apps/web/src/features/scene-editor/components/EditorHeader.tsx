import React from "react";
import Link from "next/link";
import { Play, Pause, Undo2, Redo2 } from "lucide-react";

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
          <span className="bg-[#132E27] text-[#10B981] border border-[#065F46] rounded-full text-[10px] px-2 py-0.5 font-medium ml-1">
            ✓ Approved
          </span>
        ) : (
          <span className="bg-[#2D2111] text-[#F59E0B] border border-[#784D16] rounded-full text-[10px] px-2 py-0.5 font-medium ml-1">
            Waiting for approval
          </span>
        )}
      </div>

      {/* Scrub & Action Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-200 bg-[#141A27] border border-[#242D40]"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-200 bg-[#141A27] border border-[#242D40]"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={onTogglePlay}
          className="h-8 px-3 rounded-md text-xs font-medium text-slate-200 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] flex items-center gap-1.5 shadow-sm"
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>

        <span className="text-xs font-mono text-slate-300">
          00:03:12 <span className="text-slate-500">/ 00:06:00</span>
        </span>

        <span className="h-8 px-2.5 rounded-md text-xs font-medium text-slate-400 bg-[#101520] border border-[#1C2436] flex items-center">
          100%
        </span>

        <button
          type="button"
          onClick={onSaveVersion}
          className="h-8 px-3 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] shadow-sm"
        >
          Save version
        </button>

        <button
          type="button"
          onClick={onApproveScene}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] shadow-sm"
        >
          Approve scene
        </button>
      </div>
    </header>
  );
}
