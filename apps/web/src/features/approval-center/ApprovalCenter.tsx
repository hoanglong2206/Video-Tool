"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { Skeleton } from "@/components/ui";
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
    isLoading,
    isDeciding,
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
          {isLoading ? (
            <div className="flex-1 flex min-h-0 overflow-hidden">
              {/* Queue Skeleton */}
              <div className="w-72 bg-[#0E131E] border-r border-[#1C2436] p-3 flex flex-col gap-2 shrink-0">
                <Skeleton className="h-4 w-28 rounded mb-2" />
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="bg-[#121826] border border-[#1C2436] rounded-lg p-2.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20 rounded" />
                      <Skeleton className="h-3 w-10 rounded" />
                    </div>
                    <Skeleton className="h-3.5 w-3/4 rounded" />
                    <Skeleton className="h-2.5 w-1/2 rounded" />
                  </div>
                ))}
              </div>

              {/* Viewport Skeleton */}
              <div className="flex-1 bg-[#0B0F17] p-5 flex flex-col gap-3 min-w-0">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-48 rounded" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
                <Skeleton className="flex-1 rounded-xl bg-[#121826]" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-36 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              </div>

              {/* Decision Panel Skeleton */}
              <div className="w-80 bg-[#0E131E] border-l border-[#1C2436] p-4 flex flex-col justify-between shrink-0">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1 rounded-lg" />
                  <Skeleton className="h-9 flex-1 rounded-lg" />
                </div>
              </div>
            </div>
          ) : items.length > 0 ? (
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
                    isDeciding={isDeciding}
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
