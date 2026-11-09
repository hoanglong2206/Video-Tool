"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useProjectCreation } from "./hooks/useProjectCreation";
import { CreationHeader } from "./components/CreationHeader";
import { BriefForm } from "./components/BriefForm";
import { AiPipelineProcessingView } from "./components/AiPipelineProcessingView";
import { InspectionStudioView } from "./components/InspectionStudioView";

export function ProjectCreation(): React.ReactElement {
  const router = useRouter();
  const {
    step,
    formData,
    aiOutput,
    activeAiPipelineStage,
    isAnalyzing,
    isSaving,
    setStep,
    updateField,
    addFile,
    removeFile,
    addDemoFiles,
    updateScene,
    handleRunAiPipeline,
    handleConfirmAndCreateProject,
    handleSaveDraft,
    clearDraft,
    lastSavedAt,
  } = useProjectCreation();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* 1. Left Sidebar Navigation */}
      <DashboardSidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <CreationHeader
          step={step}
          onBackToOverview={() => router.push("/")}
          onResetDraft={clearDraft}
          lastSavedAt={lastSavedAt}
        />

        {/* Dynamic Workflow Stage */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          {step === "input" && (
            <BriefForm
              formData={formData}
              onChangeField={updateField}
              onAddFile={addFile}
              onRemoveFile={removeFile}
              onAddDemoFiles={addDemoFiles}
              onSubmitAnalyze={handleRunAiPipeline}
            />
          )}

          {step === "processing" && (
            <AiPipelineProcessingView
              activeStage={activeAiPipelineStage}
              formData={formData}
              aiOutput={aiOutput}
              isAnalyzing={isAnalyzing}
              onProceedToInspection={() => setStep("inspection")}
              onBackToInput={() => setStep("input")}
            />
          )}

          {step === "inspection" && (
            <InspectionStudioView
              formData={formData}
              aiOutput={aiOutput}
              isSaving={isSaving}
              onChangeField={updateField}
              onUpdateScene={updateScene}
              onBackToInput={() => setStep("input")}
              onSaveDraft={handleSaveDraft}
              onConfirmCreate={handleConfirmAndCreateProject}
            />
          )}
        </main>
      </div>
    </div>
  );
}
