"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, GitFork, Monitor, Check, Play } from "lucide-react";

export function DashboardSidebar(): React.ReactElement {
  const pathname = usePathname();

  const isDashboard = pathname === "/" || pathname === "/projects/new";
  const isWorkflow = pathname.startsWith("/workflow");
  const isStoryboard =
    pathname.startsWith("/storyboard") ||
    pathname.startsWith("/editor") ||
    pathname.startsWith("/threed");
  const isApprovals = pathname.startsWith("/approvals");
  const isRender = pathname.startsWith("/render");

  const getItemClass = (isActive: boolean) =>
    `w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
      isActive
        ? "text-slate-100 bg-[#141B29] border border-[#28354D] shadow-sm"
        : "text-slate-500 hover:text-slate-300 hover:bg-[#161D2B]"
    }`;

  return (
    <aside className="w-14 border-r border-[#1E2638] bg-[#0A0E17] flex flex-col items-center py-4 select-none shrink-0">
      {/* Top Main Logo / Active Section */}
      <Link
        href="/"
        aria-label="Dashboard"
        className={getItemClass(isDashboard)}
      >
        <LayoutGrid className="w-5 h-5" />
      </Link>

      {/* Nav Actions */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <Link
          href="/workflow"
          aria-label="Production Workflow"
          className={getItemClass(isWorkflow)}
        >
          <GitFork className="w-4 h-4 rotate-180" />
        </Link>

        <Link
          href="/storyboard"
          aria-label="Storyboard Studio"
          className={getItemClass(isStoryboard)}
        >
          <Monitor className="w-4 h-4" />
        </Link>

        <Link
          href="/approvals"
          aria-label="Approval Center"
          className={getItemClass(isApprovals)}
        >
          <Check className="w-4 h-4" />
        </Link>

        <Link
          href="/render"
          aria-label="Render & Export Center"
          className={getItemClass(isRender)}
        >
          <Play className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
