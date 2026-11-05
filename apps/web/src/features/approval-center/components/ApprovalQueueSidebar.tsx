import React from "react";
import type { PendingApprovalItem } from "../types";

interface ApprovalQueueSidebarProps {
  items: PendingApprovalItem[];
  selectedItemId: string;
  onSelectItem: (id: string) => void;
}

export function ApprovalQueueSidebar({
  items,
  selectedItemId,
  onSelectItem,
}: ApprovalQueueSidebarProps): React.ReactElement {
  return (
    <aside className="w-60 border-r border-[#1E2638] bg-[#0A0E17] p-5 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Stage 05 Group */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
        Stage 05 · Composition
      </h2>

      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isSelected = item.id === selectedItemId;
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className={`rounded-lg p-3 cursor-pointer transition-all border ${
                isSelected
                  ? "bg-[#141824] border-[#B45309] shadow-[0_0_12px_-4px_rgba(245,158,11,0.2)]"
                  : "bg-[#101520] border-[#1C2436] hover:border-[#28354D]"
              }`}
            >
              <h3 className="text-xs font-medium text-slate-100">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                {item.versionLabel}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stage 06 Group */}
      <div className="mt-6 pt-4 border-t border-[#1C2436]/60">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Stage 06 · Motion
        </h2>
        <p className="text-xs text-slate-500">Nothing pending</p>
      </div>
    </aside>
  );
}
