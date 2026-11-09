"use client";

import React from "react";
import { PlayCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProjectItem } from "@/services/dashboard";

interface ResumeProjectConfirmModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (project: ProjectItem) => void;
  isResuming?: boolean;
}

export function ResumeProjectConfirmModal({
  project,
  isOpen,
  onClose,
  onConfirm,
  isResuming,
}: ResumeProjectConfirmModalProps): React.ReactElement | null {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#0F1420] border-[#1E2638] text-slate-100 p-5 select-none">
        <DialogHeader className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-emerald-950/70 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
            <PlayCircle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-base font-semibold text-slate-100">
            Tiếp tục tiến trình sản xuất?
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 leading-relaxed">
            Bạn có chắc chắn muốn tiếp tục tiến trình cho dự án{" "}
            <span className="font-semibold text-emerald-300">"{project.name}"</span>?
            AI Pipeline và các tác vụ dựng video nền sẽ được kích hoạt lại ngay lập tức.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 text-xs border-[#222C42] bg-[#141A28] text-slate-300 hover:bg-[#1A2234] cursor-pointer"
          >
            Hủy bỏ
          </Button>
          <Button
            size="sm"
            disabled={isResuming}
            onClick={() => onConfirm(project)}
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium cursor-pointer flex items-center gap-1.5"
          >
            {isResuming ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang tiếp tục</span>
              </>
            ) : (
              <span>Xác nhận tiếp tục</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

