"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useStoryboard } from "./hooks/useStoryboard";
import { StoryboardHeader } from "./components/StoryboardHeader";
import { JourneySubheader } from "./components/JourneySubheader";
import { SceneGrid } from "./components/SceneGrid";
import { SceneInspector } from "./components/SceneInspector";

interface StoryboardStudioProps {
  projectName?: string;
}

export function StoryboardStudio({
  projectName = "Aurora X1 Launch",
}: StoryboardStudioProps): React.ReactElement {
  const {
    scenes,
    selectedScene,
    totalDuration,
    setSelectedSceneId,
    updateSelectedScene,
    handleAddScene,
    handleDuplicate,
    handleRemove,
  } = useStoryboard(projectName);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <StoryboardHeader
          projectName={projectName}
          onPreview={() => console.log("Preview storyboard")}
          onReopenRevision={() => console.log("Reopen revision")}
        />

        {/* Pipeline Journey Bar */}
        <JourneySubheader />

        {/* Matrix Grid vs Inspector Split */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          <SceneGrid
            scenes={scenes}
            totalDuration={totalDuration}
            selectedSceneId={selectedScene.id}
            onSelectScene={setSelectedSceneId}
            onAddScene={handleAddScene}
          />

          <SceneInspector
            scene={selectedScene}
            onChangeDescription={(desc) => updateSelectedScene("description", desc)}
            onDuplicate={handleDuplicate}
            onRemove={handleRemove}
            onRegenerateFrame={() => console.log("Regenerating AI frame")}
          />
        </main>
      </div>
    </div>
  );
}
