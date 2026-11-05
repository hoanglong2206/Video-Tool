import React from "react";
import type { ApprovalItem } from "../types";

interface ApprovalPanelProps {
  approvals: ApprovalItem[];
  onSelectApproval?: (item: ApprovalItem) => void;
}

export function ApprovalPanel({
  approvals,
  onSelectApproval,
}: ApprovalPanelProps): React.ReactElement {
  return (
    <div className="flex flex-col">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Needs Your Approval
      </h2>

      <div className="flex flex-col gap-2">
        {approvals.map((item) => {
          const isUrgent = item.isUrgent;
          return (
            <div
              key={item.id}
              onClick={() => onSelectApproval?.(item)}
              className={`rounded-lg p-3 cursor-pointer transition-all ${
                isUrgent
                  ? "bg-[#141824] border border-[#B45309] shadow-[0_0_12px_-4px_rgba(245,158,11,0.2)]"
                  : "bg-[#101520] border border-[#1C2436] hover:border-[#28354D]"
              }`}
            >
              <h3 className="text-xs font-medium text-slate-100">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                {item.stage} · {item.timeAgo}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

