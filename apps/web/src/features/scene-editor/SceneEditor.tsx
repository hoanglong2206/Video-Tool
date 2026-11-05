"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useSceneEditor } from "./hooks/useSceneEditor";
import { EditorHeader } from "./components/EditorHeader";
import { EditorJourneyBar } from "./components/EditorJourneyBar";
import { LayersSidebar } from "./components/LayersSidebar";
import { CanvasViewport } from "./components/CanvasViewport";
import { TimelineRuler } from "./components/TimelineRuler";
import { MotionInspector } from "./components/MotionInspector";

interface SceneEditorProps {
  projectName?: string;
}

export function SceneEditor({
  projectName = "Aurora X1 Launch",
}: SceneEditorProps): React.ReactElement {
  const {
    sceneName,
    layers,
    selectedLayerId,
    tracks,
    properties,
    isPlaying,
    currentTimeSec,
    isApproved,
    suggestion,
    setSelectedLayerId,
    togglePlay,
    applySuggestion,
    handleApproveScene,
  } = useSceneEditor(projectName);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <EditorHeader
          projectName={projectName}
          sceneName={sceneName}
          isPlaying={isPlaying}
          isApproved={isApproved}
          onTogglePlay={togglePlay}
          onApproveScene={handleApproveScene}
          onSaveVersion={() => console.log("Save version")}
        />

        {/* Pipeline Journey Bar */}
        <EditorJourneyBar />

        {/* Studio Workspace Layout */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left Layers & Assets */}
          <LayersSidebar
            layers={layers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
          />

          {/* Center Canvas Viewport & Bottom Timeline */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <CanvasViewport properties={properties} />
            <TimelineRuler
              tracks={tracks}
              currentTimeSec={currentTimeSec}
            />
          </div>

          {/* Right Properties & AI Motion Assistant */}
          <MotionInspector
            properties={properties}
            suggestion={suggestion}
            onApplySuggestion={applySuggestion}
          />
        </main>
      </div>
    </div>
  );
}

