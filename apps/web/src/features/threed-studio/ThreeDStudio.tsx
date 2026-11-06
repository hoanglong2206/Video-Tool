"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useThreeDStudio } from "./hooks/useThreeDStudio";
import { ThreeDHeader } from "./components/ThreeDHeader";
import { ThreeDJourneyBar } from "./components/ThreeDJourneyBar";
import { HierarchySidebar } from "./components/HierarchySidebar";
import { ThreeDViewport } from "./components/ThreeDViewport";
import { ThreeDTimeline } from "./components/ThreeDTimeline";
import { ThreeDInspector } from "./components/ThreeDInspector";

interface ThreeDStudioProps {
  projectName?: string;
  projectId?: string;
}

export function ThreeDStudio({
  projectName = "Aurora X1 Launch",
  projectId = "proj-1",
}: ThreeDStudioProps): React.ReactElement {
  const {
    sceneTitle,
    nodes,
    selectedNodeId,
    isOrbitMode,
    isRendering,
    isApproved,
    material,
    lights,
    camera,
    tracks,
    setSelectedNodeId,
    setIsOrbitMode,
    setMaterial,
    handleRenderPreview,
    handleApproveScene,
  } = useThreeDStudio(projectName, projectId);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <ThreeDHeader
          projectName={projectName}
          sceneTitle={sceneTitle}
          isOrbitMode={isOrbitMode}
          isRendering={isRendering}
          isApproved={isApproved}
          onToggleOrbit={() => setIsOrbitMode((prev) => !prev)}
          onRenderPreview={handleRenderPreview}
          onApproveScene={handleApproveScene}
        />

        {/* Pipeline Journey Bar */}
        <ThreeDJourneyBar />

        {/* Studio Workspace Layout */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left Hierarchy */}
          <HierarchySidebar
            nodes={nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
          />

          {/* Center 3D Viewport & Bottom Timeline */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <ThreeDViewport
              camera={camera}
              material={material}
              lights={lights}
              isOrbitMode={isOrbitMode}
            />
            <ThreeDTimeline tracks={tracks} />
          </div>

          {/* Right Material, Lighting & Camera Inspector */}
          <ThreeDInspector
            material={material}
            lights={lights}
            camera={camera}
            onMaterialChange={setMaterial}
          />
        </main>
      </div>
    </div>
  );
}
