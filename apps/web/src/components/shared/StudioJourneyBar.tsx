"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type StudioStageId =
  | "brief"
  | "direction"
  | "storyboard"
  | "assets"
  | "composition"
  | "motion"
  | "threed"
  | "sound"
  | "render"
  | "export";

export interface JourneyStageConfig {
  id: StudioStageId;
  label: string;
  href?: string;
  isCompleted?: boolean;
  isAttention?: boolean;
  isOptional?: boolean;
}

export const DEFAULT_JOURNEY_STAGES: JourneyStageConfig[] = [
  { id: "brief", label: "Brief", href: "/projects/new", isCompleted: true },
  { id: "direction", label: "Direction", isCompleted: true },
  { id: "storyboard", label: "Storyboard", href: "/storyboard", isCompleted: true },
  { id: "assets", label: "Assets", href: "/assets", isCompleted: true },
  { id: "composition", label: "Composition", href: "/workflow", isAttention: true },
  { id: "motion", label: "Motion", href: "/editor" },
  { id: "threed", label: "3D (optional)", href: "/threed", isOptional: true },
  { id: "sound", label: "Sound", isOptional: true },
  { id: "render", label: "Render", href: "/render" },
  { id: "export", label: "Export" },
];

export interface StudioJourneyBarProps {
  currentStageId: StudioStageId;
  previousStage?: { label: string; href: string };
  nextStage?: { label: string; href?: string; isLocked?: boolean };
  className?: string;
}

export function StudioJourneyBar({
  currentStageId,
  previousStage,
  nextStage,
  className,
}: StudioJourneyBarProps): React.ReactElement {
  const pathname = usePathname();
  const projectMatch = pathname?.match(/^\/projects\/([^/]+)/);
  const currentProjectId =
    projectMatch && projectMatch[1] !== "new" ? projectMatch[1] : null;

  const resolveStageHref = (stageId: StudioStageId, fallbackHref?: string) => {
    if (!currentProjectId) return fallbackHref;
    switch (stageId) {
      case "brief":
        return `/projects/${currentProjectId}/workflow`;
      case "storyboard":
        return `/projects/${currentProjectId}/storyboard`;
      case "assets":
        return `/projects/${currentProjectId}/assets`;
      case "composition":
        return `/projects/${currentProjectId}/workflow`;
      case "motion":
        return `/projects/${currentProjectId}/scenes/scene-01`;
      case "threed":
        return `/projects/${currentProjectId}/3d`;
      case "render":
        return `/projects/${currentProjectId}/render`;
      default:
        return fallbackHref;
    }
  };

  const resolveNavHref = (href?: string) => {
    if (!href || !currentProjectId) return href;
    if (href.startsWith("/projects/")) return href;
    const cleanRoute = href.replace(/^\//, "");
    switch (cleanRoute) {
      case "workflow":
      case "composition":
        return `/projects/${currentProjectId}/workflow`;
      case "storyboard":
        return `/projects/${currentProjectId}/storyboard`;
      case "assets":
        return `/projects/${currentProjectId}/assets`;
      case "editor":
      case "motion":
        return `/projects/${currentProjectId}/scenes/scene-01`;
      case "threed":
      case "3d":
        return `/projects/${currentProjectId}/3d`;
      case "render":
        return `/projects/${currentProjectId}/render`;
      case "approvals":
        return `/projects/${currentProjectId}/approvals`;
      default:
        return href;
    }
  };

  return (
    <div
      className={cn(
        "h-11 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#080C14] text-[11px] select-none shrink-0",
        className
      )}
    >
      {/* Journey Stages List */}
      <div className="flex items-center gap-3 overflow-x-auto py-1">
        <span className="text-slate-500 font-medium mr-1 shrink-0">Journey</span>

        {DEFAULT_JOURNEY_STAGES.map((stage) => {
          const isActive = stage.id === currentStageId;
          const stageHref = resolveStageHref(stage.id, stage.href);

          if (isActive) {
            return (
              <span
                key={stage.id}
                className={cn(
                  "px-2 py-0.5 rounded font-medium shadow-sm shrink-0",
                  stage.isAttention
                    ? "bg-[#101520] border border-[#B45309] text-amber-400"
                    : "bg-[#101520] border border-[#242D40] text-emerald-400"
                )}
              >
                {stage.isAttention ? "! " : "✓ "}
                {stage.label}
              </span>
            );
          }

          if (stageHref && stage.isCompleted) {
            return (
              <Link
                key={stage.id}
                href={stageHref}
                className="text-emerald-400 hover:underline shrink-0 cursor-pointer"
              >
                ✓ {stage.label}
              </Link>
            );
          }

          if (stageHref) {
            return (
              <Link
                key={stage.id}
                href={stageHref}
                className="text-slate-400 hover:text-slate-200 hover:underline shrink-0 cursor-pointer"
              >
                {stage.isAttention ? "! " : "- "}
                {stage.label}
              </Link>
            );
          }

          return (
            <span
              key={stage.id}
              className={cn(
                "shrink-0",
                stage.isCompleted
                  ? "text-emerald-400"
                  : stage.isAttention
                  ? "text-amber-400"
                  : "text-slate-600"
              )}
            >
              {stage.isCompleted ? "✓ " : stage.isAttention ? "! " : "- "}
              {stage.label}
            </span>
          );
        })}
      </div>

      {/* Prev / Next Navigation Controls */}
      <div className="flex items-center gap-2 shrink-0 ml-4">
        {previousStage && (
          <Link
            href={resolveNavHref(previousStage.href) || previousStage.href}
            className="h-7 px-2.5 rounded text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            ← {previousStage.label}
          </Link>
        )}

        {nextStage &&
          (nextStage.isLocked || !nextStage.href ? (
            <span className="h-7 px-3 rounded text-[11px] font-medium text-slate-500 bg-[#101520] border border-[#1C2436] flex items-center justify-center cursor-not-allowed opacity-50">
              {nextStage.label} → locked
            </span>
          ) : (
            <Link
              href={resolveNavHref(nextStage.href) || nextStage.href}
              className="h-7 px-3 rounded text-[11px] font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] flex items-center justify-center active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              {nextStage.label} →
            </Link>
          ))}
      </div>
    </div>
  );
}

