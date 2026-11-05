"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useRenderExport } from "./hooks/useRenderExport";
import { RenderHeader } from "./components/RenderHeader";
import { RenderPipelineNav } from "./components/RenderPipelineNav";
import { ExportSettingsPanel } from "./components/ExportSettingsPanel";
import { RenderPreviewPanel } from "./components/RenderPreviewPanel";

interface RenderExportProps {
  projectName?: string;
}

export function RenderExport({
  projectName = "Aurora X1 Launch",
}: RenderExportProps): React.ReactElement {
  const {
    settings,
    updateSetting,
    renders,
    progress,
    isRendering,
    startRender,
    downloadMasterVideo,
    cancelRender,
    retryFailed,
  } = useRenderExport(projectName);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main Studio View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <RenderHeader
          projectName={projectName}
          isRendering={isRendering}
          onCancel={cancelRender}
          onExport={downloadMasterVideo}
          onStart={startRender}
        />

        {/* Pipeline Breadcrumb Journey */}
        <RenderPipelineNav />

        {/* 2-Column Split Studio Body */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          <ExportSettingsPanel
            settings={settings}
            onUpdateSetting={updateSetting}
            renders={renders}
          />

          <RenderPreviewPanel
            progress={progress}
            onRetry={retryFailed}
          />
        </main>
      </div>
    </div>
  );
}

