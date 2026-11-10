"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useProductionWorkflow } from "./hooks/useProductionWorkflow";
import { WorkflowHeader } from "./components/WorkflowHeader";
import { StageGrid } from "./components/StageGrid";
import { ExecutionLogPanel } from "./components/ExecutionLogPanel";
import { StageInspector } from "./components/StageInspector";

interface ProductionWorkflowProps {
  projectName?: string;
  projectId?: string;
}

export function ProductionWorkflow({
  projectName = "Aurora X1 Launch",
  projectId = "proj-1",
}: ProductionWorkflowProps): React.ReactElement {
  const {
    overallProgress,
    stages,
    selectedStage,
    logs,
    isLoading,
    isAdvancing,
    handleStartPipeline,
    setSelectedStageId,
    handleApprove,
    handleRequestRevision,
  } = useProductionWorkflow(projectName, projectId);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <WorkflowHeader
          projectName={projectName}
          overallProgress={overallProgress}
          isAdvancing={isAdvancing}
          onStartPipeline={handleStartPipeline}
          onOpenApprovals={() => setSelectedStageId("stage-05")}
        />

        {/* Pipeline Body & Inspector Split */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left Grid & Execution Log */}
          <div className="flex-1 p-6 overflow-y-auto">
            <StageGrid
              stages={stages}
              selectedStageId={selectedStage?.id || ""}
              isLoading={isLoading}
              onSelectStage={setSelectedStageId}
            />

            <div className="mt-6">
              <ExecutionLogPanel logs={logs} />
            </div>
          </div>

          {/* Right Stage Inspector */}
          {selectedStage && (
            <StageInspector
              stage={selectedStage}
              isApproving={isAdvancing}
              onApprove={handleApprove}
              onRequestRevision={handleRequestRevision}
            />
          )}
        </main>
      </div>
    </div>
  );
}
