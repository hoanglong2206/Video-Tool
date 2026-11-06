import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textUnderlineVariants = cva("relative inline-block font-semibold", {
  variants: {
    variant: {
      default:
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-500 after:rounded-full",
      gradient:
        "after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:bg-gradient-to-r after:from-blue-500 after:via-cyan-400 after:to-emerald-400 after:rounded-full",
      glow:
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-400 after:shadow-[0_0_8px_rgba(59,130,246,0.8)] after:rounded-full",
      dashed:
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:border-b-2 after:border-dashed after:border-slate-400",
      wavy:
        "underline decoration-wavy decoration-cyan-400 underline-offset-4",
      highlight:
        "relative after:absolute after:bottom-0.5 after:left-0 after:-z-10 after:h-[35%] after:w-full after:bg-blue-500/25 after:rounded",
    },
    color: {
      blue: "text-blue-400",
      emerald: "text-emerald-400",
      amber: "text-amber-400",
      purple: "text-purple-400",
      cyan: "text-cyan-400",
      neutral: "text-slate-100",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "neutral",
  },
});

export interface TextUnderlineProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof textUnderlineVariants> {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
}

export function TextUnderline({
  className,
  variant,
  color,
  as: Component = "span",
  children,
  ...props
}: TextUnderlineProps): React.ReactElement {
  return (
    <Component
      className={cn(textUnderlineVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
