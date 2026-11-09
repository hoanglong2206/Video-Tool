"use client";

import React from "react";
import { PauseCircle } from "lucide-react";
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

interface StopProjectConfirmModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (project: ProjectItem) => void;
  isStopping?: boolean;
}

export function StopProjectConfirmModal({
  project,
  isOpen,
  onClose,
  onConfirm,
  isStopping,
}: StopProjectConfirmModalProps): React.ReactElement | null {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#0F1420] border-[#1E2638] text-slate-100 p-5 select-none">
        <DialogHeader className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-950/70 border border-amber-600/40 flex items-center justify-center text-amber-400">
            <PauseCircle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-base font-semibold text-slate-100">
            Tạm dừng tiến trình sản xuất?
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 leading-relaxed">
            Bạn có chắc chắn muốn tạm dừng tiến trình của dự án{" "}
            <span className="font-semibold text-amber-300">"{project.name}"</span> không?
            Các tác vụ render GPU và pipeline AI nền sẽ được dừng lại. Bạn có thể xóa hoặc tiếp tục sau.
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
            variant="destructive"
            size="sm"
            disabled={isStopping}
            onClick={() => onConfirm(project)}
            className="h-8 text-xs bg-amber-600 hover:bg-amber-500 text-white font-medium cursor-pointer"
          >
            {isStopping ? "Đang dừng..." : "Xác nhận dừng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

