import React from "react";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";

interface StoryboardHeaderProps {
  projectName: string;
  onPreview?: () => void;
  onReopenRevision?: () => void;
}

export function StoryboardHeader({
  projectName,
  onPreview,
  onReopenRevision,
}: StoryboardHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      {/* Breadcrumb with Approved status */}
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
          ✓ Approved
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
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

        <Badge variant="secondary" className="h-8 px-3 rounded-md">
          Approved v2
        </Badge>
      </div>
    </header>
  );
}

