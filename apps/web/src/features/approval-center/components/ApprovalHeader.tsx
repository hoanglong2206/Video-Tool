import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge, Button } from "@/components/ui";

interface ApprovalHeaderProps {
  pendingCount: number;
}

export function ApprovalHeader({ pendingCount }: ApprovalHeaderProps): React.ReactElement {
  const pathname = usePathname();
  const projectMatch = pathname?.match(/^\/projects\/([^/]+)/);
  const currentProjectId =
    projectMatch && projectMatch[1] !== "new" ? projectMatch[1] : null;

  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17] select-none shrink-0">
      {/* Title & Pending Pill */}
      <div className="flex items-center gap-2.5">
        <h1 className="text-sm font-semibold text-slate-100 tracking-tight">
          Approval Center
        </h1>
        <Badge variant="warning">
          {pendingCount} pending
        </Badge>
      </div>

      {/* Editor Jump */}
      <Button variant="outline" size="sm" asChild className="cursor-pointer">
        <Link
          href={
            currentProjectId
              ? `/projects/${currentProjectId}/scenes/scene-01`
              : "/editor"
          }
          className="cursor-pointer"
        >
          Open in editor
        </Link>
      </Button>
    </header>
  );
}


