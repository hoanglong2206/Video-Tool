import React from "react";
import Link from "next/link";

interface WorkflowHeaderProps {
  projectName: string;
  overallProgress: number;
  pendingApprovalsCount?: number;
  onOpenApprovals?: () => void;
}

export function WorkflowHeader({
  projectName,
  overallProgress,
  pendingApprovalsCount = 2,
  onOpenApprovals,
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
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 font-normal">
          Overall <strong className="text-slate-200 font-semibold">{overallProgress}%</strong>
        </span>

        <Link
          href="/approvals"
          className="h-8 px-3.5 rounded-md text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center"
        >
          Open approvals ({pendingApprovalsCount})
        </Link>
      </div>
    </header>
  );
}

