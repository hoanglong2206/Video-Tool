import React from "react";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";

interface StoryboardHeaderProps {
  projectName: string;
  onPreview?: () => void;
  onReopenRevision?: () => void;
  onGenerateWithAi?: () => void;
  isGenerating?: boolean;
}

export function StoryboardHeader({
  projectName,
  onPreview,
  onReopenRevision,
  onGenerateWithAi,
  isGenerating = false,
}: StoryboardHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      {/* Breadcrumb with status */}
      <div className="flex items-center gap-2.5 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          {projectName}
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">Storyboard Studio</span>
        <Badge variant="success" className="ml-1">
          ✓ Synced with Supabase
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="default"
          size="sm"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-sm transition-all"
          disabled={isGenerating}
          onClick={onGenerateWithAi}
        >
          {isGenerating ? "Synthesizing AI Scenes..." : "✨ Generate with AI"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
        >
          Preview storyboard
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onReopenRevision}
        >
          Reopen for revision
        </Button>
      </div>
    </header>
  );
}
