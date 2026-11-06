"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useApprovalCenter } from "./hooks/useApprovalCenter";
import { ApprovalHeader } from "./components/ApprovalHeader";
import { ApprovalQueueSidebar } from "./components/ApprovalQueueSidebar";
import { ComparisonViewport } from "./components/ComparisonViewport";
import { ApprovalDecisionPanel } from "./components/ApprovalDecisionPanel";

interface ApprovalCenterProps {
  projectName?: string;
  projectId?: string;
}

export function ApprovalCenter({
  projectName = "Aurora X1 Launch",
  projectId = "proj-1",
}: ApprovalCenterProps): React.ReactElement {
  const {
    items,
    selectedItem,
    comment,
    setComment,
    setSelectedItemId,
    handleDecision,
  } = useApprovalCenter(projectName, projectId);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <ApprovalHeader pendingCount={items.length} />

        {/* 3-Column Studio Body Split */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          {items.length > 0 ? (
            <>
              <ApprovalQueueSidebar
                items={items}
                selectedItemId={selectedItem?.id || ""}
                onSelectItem={setSelectedItemId}
              />

              {selectedItem && (
                <>
                  <ComparisonViewport item={selectedItem} />
                  <ApprovalDecisionPanel
                    item={selectedItem}
                    comment={comment}
                    onCommentChange={setComment}
                    onDecision={handleDecision}
                  />
                </>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium">All review gates are clear.</p>
              <p className="text-xs text-slate-600 mt-1">No items currently awaiting Creative Director signoff.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
