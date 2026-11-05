import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface WorkflowHeaderProps {
  projectName: string;
  overallProgress: number;
  pendingApprovalsCount?: number;
  isAdvancing?: boolean;
  onOpenApprovals?: () => void;
  onStartPipeline?: () => void;
}

export function WorkflowHeader({
  projectName,
  overallProgress,
  pendingApprovalsCount = 2,
  isAdvancing = false,
  onOpenApprovals,
  onStartPipeline,
}: WorkflowHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      {/* Breadcrumb path */}
      <div className="flex items-center gap-2 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          {projectName}
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400 font-normal">
          Production workflow
        </span>
      </div>

      {/* Header Metrics & Approvals */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 font-normal mr-2">
          Overall <strong className="text-slate-200 font-semibold">{overallProgress}%</strong>
        </span>

        {onStartPipeline && (
          <Button
            size="sm"
            variant="outline"
            disabled={isAdvancing}
            onClick={onStartPipeline}
            className="border-blue-500/40 text-blue-400 hover:bg-blue-500/10 text-xs"
          >
            {isAdvancing ? "Running..." : "▶ Run Next Stage"}
          </Button>
        )}

        <Button size="sm" asChild>
          <Link href="/approvals">
            Open approvals ({pendingApprovalsCount})
          </Link>
        </Button>
      </div>
    </header>
  );
}

