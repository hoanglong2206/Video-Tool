"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { PipelineJourneyBar } from "@/features/pipeline/components/PipelineJourneyBar";
import { useStoryboard } from "./hooks/useStoryboard";
import { StoryboardHeader } from "./components/StoryboardHeader";
import { SceneGrid } from "./components/SceneGrid";
import { SceneInspector } from "./components/SceneInspector";
import { AnimaticsTimelineDock } from "./components/AnimaticsTimelineDock";
import { LightboxModal } from "./components/LightboxModal";
import { AnimaticsPreviewModal } from "./components/AnimaticsPreviewModal";

interface StoryboardStudioProps {
  projectName?: string;
  projectId?: string;
}

export function StoryboardStudio({
  projectName = "Aurora X1 Launch",
  projectId = "proj-1",
}: StoryboardStudioProps): React.ReactElement {
  const {
    projectName: resolvedProjectName,
    scenes,
    selectedScene,
    totalDuration,
    isLoading,
    isGenerating,
    viewMode,
    isPlayingAnimatics,
    playbackCurrentTime,
    setViewMode,
    setIsPlayingAnimatics,
    setPlaybackCurrentTime,
    setSelectedSceneId,
    updateSelectedScene,
    handleAddScene,
    handleDuplicate,
    handleRemove,
    handleMoveScene,
    handleGenerateWithAi,
    handleApproveAndProceed,
  } = useStoryboard(projectName, projectId);

  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [showAnimaticsModal, setShowAnimaticsModal] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* 1. Left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* 2. Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header with Studio Actions */}
        <StoryboardHeader
          projectName={resolvedProjectName}
          projectId={projectId}
          totalScenes={scenes.length}
          totalDuration={totalDuration}
          viewMode={viewMode}
          isGenerating={isGenerating}
          onToggleViewMode={setViewMode}
          onGenerateWithAi={handleGenerateWithAi}
          onPlayAnimatics={() => setShowAnimaticsModal(true)}
          onApproveAndProceed={handleApproveAndProceed}
        />

        {/* 9-Stage Pipeline Journey Bar */}
        <PipelineJourneyBar
          projectId={projectId}
          currentStageId="storyboard"
        />

        {/* Center Canvas vs Right Inspector */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          <SceneGrid
            scenes={scenes}
            totalDuration={totalDuration}
            selectedSceneId={selectedScene.id}
            viewMode={viewMode}
            isLoading={isLoading || isGenerating}
            onSelectScene={setSelectedSceneId}
            onAddScene={handleAddScene}
            onDuplicateScene={(id) => handleDuplicate(id)}
            onRemoveScene={(id) => handleRemove(id)}
            onMoveScene={handleMoveScene}
            onOpenPreview={setLightboxImageUrl}
          />

          <SceneInspector
            scene={selectedScene}
            onChangeField={updateSelectedScene}
            onDuplicate={() => handleDuplicate(selectedScene.id)}
            onRemove={() => handleRemove(selectedScene.id)}
            onRegenerateFrame={handleGenerateWithAi}
          />
        </main>

        {/* Bottom Animatics Timeline Dock */}
        <AnimaticsTimelineDock
          scenes={scenes}
          selectedSceneId={selectedScene.id}
          totalDuration={totalDuration}
          isPlaying={isPlayingAnimatics}
          currentTime={playbackCurrentTime}
          onTogglePlay={setIsPlayingAnimatics}
          onSeek={setPlaybackCurrentTime}
          onSelectScene={setSelectedSceneId}
        />
      </div>

      {/* Modals & Overlays */}
      <LightboxModal
        isOpen={!!lightboxImageUrl}
        imageUrl={lightboxImageUrl}
        onClose={() => setLightboxImageUrl(null)}
      />

      <AnimaticsPreviewModal
        isOpen={showAnimaticsModal}
        scenes={scenes}
        onClose={() => setShowAnimaticsModal(false)}
      />
    </div>
  );
}
