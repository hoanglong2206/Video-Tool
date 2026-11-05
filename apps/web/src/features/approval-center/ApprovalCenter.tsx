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
}

export function ApprovalCenter({
  projectName = "Aurora X1 Launch",
}: ApprovalCenterProps): React.ReactElement {
  const {
    items,
    selectedItem,
    comment,
    setComment,
    setSelectedItemId,
    handleDecision,
  } = useApprovalCenter(projectName);

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
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <span className="text-3xl mb-3">✓</span>
              <h2 className="text-base font-semibold text-slate-200">
                All Approvals Complete
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero items pending review. Video pipeline is progressing forward.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

