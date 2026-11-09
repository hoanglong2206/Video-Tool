"use client";

import React from "react";
import { Trash2 } from "lucide-react";
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

interface DeleteProjectConfirmModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (project: ProjectItem) => void;
  isDeleting?: boolean;
}

export function DeleteProjectConfirmModal({
  project,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteProjectConfirmModalProps): React.ReactElement | null {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#0F1420] border-[#1E2638] text-slate-100 p-5 select-none">
        <DialogHeader className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-rose-950/70 border border-rose-600/40 flex items-center justify-center text-rose-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <DialogTitle className="text-base font-semibold text-slate-100">
            Xác nhận xóa vĩnh viễn dự án?
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 leading-relaxed">
            Hành động này sẽ xóa hoàn toàn dự án{" "}
            <span className="font-semibold text-rose-300">"{project.name}"</span> cùng
            toàn bộ phân cảnh storyboard, tài nguyên và log render khỏi hệ thống.
            Hành động này <span className="text-rose-400 font-semibold">không thể hoàn tác</span>.
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
            disabled={isDeleting}
            onClick={() => onConfirm(project)}
            className="h-8 text-xs bg-rose-600 hover:bg-rose-500 text-white font-medium cursor-pointer"
          >
            {isDeleting ? "Đang xóa..." : "Xóa vĩnh viễn"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

