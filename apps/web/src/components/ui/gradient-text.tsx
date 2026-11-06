import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string;
  via?: string;
  to?: string;
  direction?: "to-r" | "to-br" | "to-b" | "to-tr";
}

export function GradientText({
  from = "from-blue-400",
  via = "via-cyan-300",
  to = "to-emerald-400",
  direction = "to-r",
  className,
  children,
  ...props
}: GradientTextProps): React.ReactElement {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r font-bold",
        `bg-gradient-${direction}`,
        from,
        via,
        to,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

