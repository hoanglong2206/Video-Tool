import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
  {
    variants: {
      variant: {
        default:
          "border border-blue-500/30 bg-[#1D2B4A] text-blue-400",
        secondary:
          "border border-[#222E44] bg-[#121826] text-slate-300",
        destructive:
          "border border-red-500/30 bg-red-950/40 text-red-400",
        warning:
          "border border-amber-500/30 bg-[#2D2111] text-[#F59E0B]",
        success:
          "border border-emerald-500/30 bg-[#132E27] text-[#10B981]",
        outline:
          "border border-[#222E44] text-slate-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
