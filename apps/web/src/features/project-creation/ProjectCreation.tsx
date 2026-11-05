"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useProjectCreation } from "./hooks/useProjectCreation";
import { CreationHeader } from "./components/CreationHeader";
import { ProgressSidebar } from "./components/ProgressSidebar";
import { BriefForm } from "./components/BriefForm";
import { AiBriefCheckPanel } from "./components/AiBriefCheckPanel";

export function ProjectCreation(): React.ReactElement {
  const {
    formData,
    analysis,
    isSaving,
    updateField,
    handleFillFromNotes,
    handleSaveDraft,
    handleContinue,
  } = useProjectCreation();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Progress Sidebar */}
      <ProgressSidebar />

      {/* Center & Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <CreationHeader
          isSaving={isSaving}
          onSaveDraft={handleSaveDraft}
          onContinue={handleContinue}
        />

        {/* Main Split: Form Inputs vs AI Brief Check */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          <BriefForm formData={formData} onChangeField={updateField} />
          <AiBriefCheckPanel
            analysis={analysis}
            onFillFromNotes={handleFillFromNotes}
          />
        </main>
      </div>
    </div>
  );
}

