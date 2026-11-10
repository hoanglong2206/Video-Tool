"use client";

import React from "react";
import { useToastStore, type ToastItem, type ToastType } from "./toastStore";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TOAST_ICONS: Record<ToastType, React.ElementType> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const TOAST_STYLES: Record<ToastType, { border: string; bg: string; iconColor: string; titleColor: string }> = {
  success: {
    border: "border-emerald-500/40 shadow-emerald-950/40",
    bg: "bg-[#0A121A]/95",
    iconColor: "text-emerald-400",
    titleColor: "text-emerald-300",
  },
  error: {
    border: "border-rose-500/40 shadow-rose-950/40",
    bg: "bg-[#180C14]/95",
    iconColor: "text-rose-400",
    titleColor: "text-rose-300",
  },
  info: {
    border: "border-blue-500/40 shadow-blue-950/40",
    bg: "bg-[#0B101E]/95",
    iconColor: "text-cyan-400",
    titleColor: "text-cyan-300",
  },
  warning: {
    border: "border-amber-500/40 shadow-amber-950/40",
    bg: "bg-[#161208]/95",
    iconColor: "text-amber-400",
    titleColor: "text-amber-300",
  },
};

export function ToastContainer(): React.ReactElement | null {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-[99999] flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none px-2 sm:px-0"
    >
      {toasts.map((item: ToastItem) => {
        const Icon = TOAST_ICONS[item.type];
        const style = TOAST_STYLES[item.type];

        return (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-3",
              style.bg,
              style.border
            )}
          >
            <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", style.iconColor)} />

            <div className="flex-1 min-w-0 pr-1">
              {item.title && (
                <h5 className={cn("text-[11px] font-bold tracking-wide leading-tight", style.titleColor)}>
                  {item.title}
                </h5>
              )}
              <p className="text-xs text-slate-200 leading-snug break-words mt-0.5">
                {item.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(item.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Đóng thông báo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

