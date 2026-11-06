"use client";

import React from "react";
import type { ApprovalItem } from "../types";
import { CheckCircle2, Clock, ShieldCheck, Sparkles } from "lucide-react";

interface ApprovalPanelProps {
  approvals: ApprovalItem[];
  onSelectApproval?: (item: ApprovalItem) => void;
}

export function ApprovalPanel({
  approvals,
  onSelectApproval,
}: ApprovalPanelProps): React.ReactElement {
  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3 flex flex-col justify-between flex-1 min-h-0 select-none">
      <div className="flex items-center justify-between shrink-0 mb-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <h2 className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
            Cần Phê Duyệt
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {approvals.length > 0 ? `${approvals.length} việc` : "0 việc"}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-hidden my-1">
        {approvals.length > 0 ? (
          approvals.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectApproval?.(item)}
              className="bg-[#0B0F17] border border-[#B45309]/60 hover:border-amber-400 rounded p-2 cursor-pointer transition-colors"
            >
              <h3 className="text-[11px] font-medium text-amber-300 truncate">
                {item.title}
              </h3>
              <p className="text-[9px] text-slate-400 mt-0.5 flex items-center justify-between font-mono">
                <span>{item.stage}</span>
                <span>{item.timeAgo}</span>
              </p>
            </div>
          ))
        ) : (
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center p-3 border border-dashed border-[#1C2436] rounded-lg bg-[#0B0F17]">
            <CheckCircle2 className="w-5 h-5 text-emerald-400/80 mb-1" />
            <p className="text-xs text-slate-300 font-medium">Không có phê duyệt nào</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Tất cả các khâu đã được xác nhận</p>
          </div>
        )}
      </div>

      <div className="pt-1.5 border-t border-[#1C2436]/60 flex items-center justify-between text-[9px] text-slate-400 shrink-0 font-mono">
        <span className="flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> Human-in-the-Loop AI
        </span>
        <span className="text-emerald-400">Đồng bộ trực tiếp</span>
      </div>
    </div>
  );
}
