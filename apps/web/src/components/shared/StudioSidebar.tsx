"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  GitFork,
  Monitor,
  Check,
  Play,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudioSidebarProps {
  className?: string;
}

export function StudioSidebar({ className }: StudioSidebarProps): React.ReactElement {
  const pathname = usePathname();

  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  const currentProjectId =
    projectMatch && projectMatch[1] !== "new" ? projectMatch[1] : null;

  const getHref = (route: string) => {
    const pId = currentProjectId || "proj-1";
    switch (route) {
      case "workflow":
        return `/projects/${pId}/workflow`;
      case "storyboard":
        return `/projects/${pId}/storyboard`;
      case "assets":
        return `/projects/${pId}/assets`;
      case "approvals":
        return `/projects/${pId}/approvals`;
      case "render":
        return `/projects/${pId}/render`;
      case "assistant":
        return `/projects/${pId}/assistant`;
      default:
        return `/${route}`;
    }
  };

  const isDashboard =
    pathname === "/" ||
    pathname === "/projects/new" ||
    pathname === "/library" ||
    pathname === "/brand-kit";
  const isWorkflow = pathname.includes("/workflow");
  const isStoryboard =
    pathname.includes("/storyboard") ||
    pathname.includes("/editor") ||
    pathname.includes("/scenes") ||
    pathname.includes("/threed") ||
    pathname.includes("/3d");
  const isAssets = pathname.includes("/assets");
  const isApprovals = pathname.includes("/approvals");
  const isRender = pathname.includes("/render");
  const isAssistant = pathname.includes("/assistant");

  const getItemClass = (isActive: boolean) =>
    cn(
      "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
      isActive
        ? "text-slate-100 bg-[#141B29] border border-[#28354D] shadow-sm"
        : "text-slate-500 hover:text-slate-300 hover:bg-[#161D2B]"
    );

  return (
    <aside
      className={cn(
        "w-14 border-r border-[#1E2638] bg-[#0A0E17] flex flex-col items-center py-4 select-none shrink-0",
        className
      )}
    >
      {/* Dashboard Top Link */}
      <Link href="/" aria-label="Dashboard" className={getItemClass(isDashboard)}>
        <LayoutGrid className="w-5 h-5" />
      </Link>

      {/* Main Studio Navigation */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <Link
          href={getHref("workflow")}
          aria-label="Production Workflow"
          className={getItemClass(isWorkflow)}
          title="Workflow Pipeline"
        >
          <GitFork className="w-4 h-4 rotate-180" />
        </Link>

        <Link
          href={getHref("storyboard")}
          aria-label="Storyboard Studio"
          className={getItemClass(isStoryboard)}
          title="Storyboard Studio"
        >
          <Monitor className="w-4 h-4" />
        </Link>

        <Link
          href={getHref("assets")}
          aria-label="Asset Studio"
          className={getItemClass(isAssets)}
          title="Asset Studio"
        >
          <Layers className="w-4 h-4" />
        </Link>

        <Link
          href={getHref("approvals")}
          aria-label="Approval Center"
          className={getItemClass(isApprovals)}
          title="Approval Center"
        >
          <Check className="w-4 h-4" />
        </Link>

        <Link
          href={getHref("render")}
          aria-label="Render & Export"
          className={getItemClass(isRender)}
          title="Render & Export"
        >
          <Play className="w-4 h-4" />
        </Link>

        <Link
          href={getHref("assistant")}
          aria-label="AI Copilot Assistant"
          className={getItemClass(isAssistant)}
          title="AI Assistant"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </Link>
      </div>
    </aside>
  );
}

