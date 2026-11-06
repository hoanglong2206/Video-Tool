import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { StudioHeader } from "@/components/shared";

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
  const pathname = usePathname();
  const projectMatch = pathname?.match(/^\/projects\/([^/]+)/);
  const currentProjectId =
    projectMatch && projectMatch[1] !== "new" ? projectMatch[1] : null;

  return (
    <StudioHeader
      rootTitle={projectName}
      rootHref="/"
      subTitle="Production workflow"
    >
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
        <Link
          href={
            currentProjectId
              ? `/projects/${currentProjectId}/approvals`
              : "/approvals"
          }
        >
          Open approvals ({pendingApprovalsCount})
        </Link>
      </Button>
    </StudioHeader>
  );
}


