"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface StudioHeaderProps {
  rootTitle?: string;
  rootHref?: string;
  subTitle: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function StudioHeader({
  rootTitle = "Aurora X1 Launch",
  rootHref,
  subTitle,
  badge,
  children,
  className,
}: StudioHeaderProps): React.ReactElement {
  const pathname = usePathname();
  const projectMatch = pathname?.match(/^\/projects\/([^/]+)/);
  const currentProjectId =
    projectMatch && projectMatch[1] !== "new" ? projectMatch[1] : null;

  const resolvedRootHref =
    rootHref && rootHref !== "/"
      ? rootHref
      : currentProjectId
      ? `/projects/${currentProjectId}/workflow`
      : "/";

  return (
    <header
      className={cn(
        "h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17] shrink-0 select-none",
        className
      )}
    >
      {/* Breadcrumb Section */}
      <div className="flex items-center gap-2.5 text-xs">
        {resolvedRootHref ? (
          <Link
            href={resolvedRootHref}
            className="font-medium text-slate-100 hover:text-white transition-colors cursor-pointer"
          >
            {rootTitle}
          </Link>
        ) : (
          <span className="font-medium text-slate-100">{rootTitle}</span>
        )}
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">{subTitle}</span>
        {badge}
      </div>

      {/* Action Buttons Section */}
      {children && (
        <div className="flex items-center gap-2.5">{children}</div>
      )}
    </header>
  );
}


