import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  message?: string;
  className?: string;
  fullscreen?: boolean;
}

export function LoadingState({
  message = "Đang tải dữ liệu studio",
  className,
  fullscreen = false,
}: LoadingStateProps): React.ReactElement {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F17]/80 backdrop-blur-sm">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
        <p className="text-xs font-medium text-slate-300 animate-pulse">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center text-slate-400",
        className
      )}
    >
      <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-2" />
      <span className="text-xs font-medium">{message}</span>
    </div>
  );
}

