"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw, AlertCircle } from "lucide-react";

interface ResetDraftConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export function ResetDraftConfirmDialog({
  isOpen,
  onClose,
  onConfirmReset,
}: ResetDraftConfirmDialogProps): React.ReactElement {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#0D121F] border-[#1E2638] text-slate-100 p-5 rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-row items-center gap-3 pb-2 border-b border-[#1E2638]">
          <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <DialogTitle className="text-sm font-bold text-slate-100">
              Làm mới & Xóa bản nháp?
            </DialogTitle>
            <span className="text-[11px] text-red-400 font-mono">
              Xóa sạch dữ liệu đã lưu trong LocalStorage
            </span>
          </div>
        </DialogHeader>

        <p className="text-xs text-slate-300 leading-relaxed py-2">
          Hành động này sẽ xóa toàn bộ nội dung brief, các tùy chọn thiết lập phong cách và kết quả phân tích 6 phân cảnh AI hiện tại. Form sẽ trở về trạng thái mẫu ban đầu.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1E2638]">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white cursor-pointer"
          >
            Hủy bỏ
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onConfirmReset}
            className="h-8 text-xs bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-600/30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xác nhận xóa nháp</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
