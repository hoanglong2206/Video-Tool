"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import type { PendingApprovalItem, DecisionType } from "../types";
import { Button, Textarea } from "@/components/ui";

interface ApprovalDecisionPanelProps {
  item: PendingApprovalItem;
  comment: string;
  isDeciding?: boolean;
  onCommentChange: (val: string) => void;
  onDecision: (type: DecisionType) => void;
}

export function ApprovalDecisionPanel({
  item,
  comment,
  isDeciding = false,
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
        <Textarea
          rows={3}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="resize-none leading-relaxed"
        />
      </div>

      {/* Decision Action Buttons Stack */}
      <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-[#1C2436]/60">
        <Button
          size="sm"
          disabled={isDeciding}
          onClick={() => onDecision("approve")}
          className="w-full font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isDeciding ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Đang duyệt...</span>
            </>
          ) : (
            <span>Approve</span>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={isDeciding}
          onClick={() => onDecision("revision")}
          className="w-full cursor-pointer disabled:cursor-not-allowed"
        >
          Request revision
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={isDeciding}
          onClick={() => onDecision("reject")}
          className="w-full text-slate-400 hover:text-rose-400 hover:border-rose-900/40 cursor-pointer disabled:cursor-not-allowed"
        >
          Reject
        </Button>
      </div>
    </aside>
  );
}
