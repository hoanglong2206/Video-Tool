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
  // If no approvals, show recent system milestones instead of empty blank space
  const recentMilestones = [
    {
      id: "m-1",
      title: "Aurora X1 · Phân tích Brief hoàn tất",
      stage: "Stage 01",
      timeAgo: "2 phút trước",
      type: "success",
    },
    {
      id: "m-2",
      title: "Vision AI · Bóc tách Logo & Palette",
      stage: "Vision Core",
      timeAgo: "8 phút trước",
      type: "info",
    },
    {
      id: "m-3",
      title: "Remotion Composition · Render 4K",
      stage: "Stage 09",
      timeAgo: "15 phút trước",
      type: "render",
    },
  ];

  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3 flex flex-col justify-between flex-1 min-h-0 select-none">
      <div className="flex items-center justify-between shrink-0 mb-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <h2 className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
            {approvals.length > 0 ? "Cần Phê Duyệt" : "Nhật ký Hoạt động Pipeline"}
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {approvals.length > 0 ? `${approvals.length} việc` : "Thời gian thực"}
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
          recentMilestones.map((item) => (
            <div
              key={item.id}
              className="bg-[#0B0F17] border border-[#1A2234] rounded p-2 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-medium text-slate-200 truncate">
                    {item.title}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {item.stage}
                  </span>
                </div>
              </div>
              <span className="text-[9px] text-slate-400 font-mono shrink-0">
                {item.timeAgo}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="pt-1.5 border-t border-[#1C2436]/60 flex items-center justify-between text-[9px] text-slate-400 shrink-0 font-mono">
        <span className="flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> Human-in-the-Loop AI
        </span>
        <span className="text-emerald-400">Tự động đồng bộ</span>
      </div>
    </div>
  );
}
