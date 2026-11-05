import React from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { Badge, Button } from "@/components/ui";

interface RenderHeaderProps {
  projectName: string;
  isRendering: boolean;
  onCancel: () => void;
  onExport: () => void;
  onStart: () => void;
}

export function RenderHeader({
  projectName,
  isRendering,
  onCancel,
  onExport,
  onStart,
}: RenderHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] bg-[#0D121F] px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-[#161F30] rounded-md transition-colors"
          title="Back to Dashboard"
        >
          <LayoutGrid className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-100">Render & Export</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-300">{projectName}</span>
          <Badge variant="warning" className="ml-2">
            – Blocked: stages 05–08 not approved
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={!isRendering}
        >
          Cancel render
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
        >
          Export MP4
        </Button>
        <Button
          variant="subtle"
          size="sm"
          onClick={onStart}
        >
          Start render
        </Button>
      </div>
    </header>
  );
}

