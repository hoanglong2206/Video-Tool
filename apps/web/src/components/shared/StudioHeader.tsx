import React from "react";
import Link from "next/link";
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
  rootHref = "/",
  subTitle,
  badge,
  children,
  className,
}: StudioHeaderProps): React.ReactElement {
  return (
    <header
      className={cn(
        "h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]",
        className
      )}
    >
      {/* Breadcrumb Section */}
      <div className="flex items-center gap-2.5 text-xs">
        {rootHref ? (
          <Link
            href={rootHref}
            className="font-medium text-slate-100 hover:text-white transition-colors"
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

