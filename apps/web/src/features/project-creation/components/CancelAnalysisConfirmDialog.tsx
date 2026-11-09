"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

interface CancelAnalysisConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
}

export function CancelAnalysisConfirmDialog({
  isOpen,
  onClose,
  onConfirmCancel,
}: CancelAnalysisConfirmDialogProps): React.ReactElement {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#0D121F] border-[#1E2638] text-slate-100 p-5 rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-row items-center gap-3 pb-2 border-b border-[#1E2638]">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <DialogTitle className="text-sm font-bold text-slate-100">
              Dừng tiến trình phân tích AI?
            </DialogTitle>
            <span className="text-[11px] text-amber-400 font-mono">
              Đang phân tích dở dang
            </span>
          </div>
        </DialogHeader>

        <p className="text-xs text-slate-300 leading-relaxed py-2">
          Hệ thống đa tác vụ AI đang xử lý kịch bản, thị giác máy tính và kiểm định cấu trúc dữ liệu. Nếu quay lại sửa Brief lúc này, tiến trình hiện tại sẽ bị hủy bỏ và bạn sẽ cần chạy phân tích lại.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1E2638]">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white cursor-pointer"
          >
            Tiếp tục phân tích
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onConfirmCancel}
            className="h-8 text-xs bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-600/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Xác nhận dừng & Sửa Brief</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
