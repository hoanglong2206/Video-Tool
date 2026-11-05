import React from "react";
import type { PendingApprovalItem, DecisionType } from "../types";

interface ApprovalDecisionPanelProps {
  item: PendingApprovalItem;
  comment: string;
  onCommentChange: (val: string) => void;
  onDecision: (type: DecisionType) => void;
}

export function ApprovalDecisionPanel({
  item,
  comment,
  onCommentChange,
  onDecision,
}: ApprovalDecisionPanelProps): React.ReactElement {
  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-6 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* AI Summary Section */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
        AI Summary
      </h2>
      <p className="text-xs text-slate-300 leading-relaxed mb-6">
        {item.aiSummary}
      </p>

      {/* Comments Section */}
      <div className="mb-6">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          Comments
        </h2>
        <textarea
          rows={3}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="w-full rounded-md bg-[#101520] border border-[#1C2436] p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Decision Action Buttons Stack */}
      <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-[#1C2436]/60">
        <button
          type="button"
          onClick={() => onDecision("approve")}
          className="w-full py-2 rounded-md text-xs font-semibold text-white bg-[#4F75FF] hover:bg-[#3860FF] active:scale-[0.98] transition-all shadow-sm"
        >
          Approve
        </button>

        <button
          type="button"
          onClick={() => onDecision("revision")}
          className="w-full py-2 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Request revision
        </button>

        <button
          type="button"
          onClick={() => onDecision("reject")}
          className="w-full py-2 rounded-md text-xs font-medium text-slate-400 bg-[#141A27] border border-[#242D40] hover:bg-[#20181E] hover:text-rose-400 transition-all shadow-sm"
        >
          Reject
        </button>
      </div>
    </aside>
  );
}

