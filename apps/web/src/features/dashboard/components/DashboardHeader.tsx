import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface DashboardHeaderProps {
  onNewProject?: () => void;
  onRenderHistory?: () => void;
}

export function DashboardHeader({
  onNewProject,
  onRenderHistory,
}: DashboardHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      <h1 className="text-sm font-semibold text-slate-100 tracking-tight">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onRenderHistory}
        >
          Render history
        </Button>

        {onNewProject ? (
          <Button size="sm" onClick={onNewProject}>
            New project
          </Button>
        ) : (
          <Button size="sm" asChild>
            <Link href="/projects/new">New project</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
