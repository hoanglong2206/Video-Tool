"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { PipelineJourneyBar } from "@/features/pipeline/components/PipelineJourneyBar";
import { useStoryboard } from "./hooks/useStoryboard";
import { useStoryboardPlayback } from "./hooks/useStoryboardPlayback";
import { StoryboardHeader } from "./components/StoryboardHeader";
import { SceneGrid } from "./components/SceneGrid";
import { SceneInspector } from "./components/SceneInspector";
import { StoryboardTimelineView } from "./components/timeline/StoryboardTimelineView";
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
    isAddingScene,
    isSavingScene,
    isGenerating,
    viewMode,
    isPlayingAnimatics,
    playbackCurrentTime,
    setViewMode,
    setIsPlayingAnimatics,
    setPlaybackCurrentTime,
    setSelectedSceneId,
    updateSelectedScene,
    handleSaveScene,
    hasUnsavedChanges,
    handleAddScene,
    handleDuplicate,
    handleRemove,
    handleMoveScene,
    handleCreateVersion,
    handleDeleteVersion,
    handleRollbackVersion,
    isCreatingVersion,
    isDeletingVersion,
    handleGenerateWithAi,
    handleApproveAndProceed,
    isApproving,
  } = useStoryboard(projectName, projectId);

  // Centralized playback timer that runs seamlessly across Grid and Timeline views
  useStoryboardPlayback(totalDuration);

  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [showAnimaticsModal, setShowAnimaticsModal] = useState<boolean>(false);

  // Dynamic playhead scene tracking during Animatics playback
  let accumulatedTime = 0;
  let playingActiveScene = selectedScene;
  for (const s of scenes) {
    if (playbackCurrentTime >= accumulatedTime && playbackCurrentTime < accumulatedTime + s.durationSeconds) {
      playingActiveScene = s;
      break;
    }
    accumulatedTime += s.durationSeconds;
  }
  const effectiveScene = isPlayingAnimatics ? playingActiveScene : selectedScene;

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
          isApproving={isApproving}
          onApproveAndProceed={handleApproveAndProceed}
        />

        {/* 9-Stage Pipeline Journey Bar */}
        <PipelineJourneyBar
          projectId={projectId}
          currentStageId="storyboard"
        />

        {/* Center Canvas vs Right Inspector */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          {viewMode === "grid" ? (
            <SceneGrid
              scenes={scenes}
              totalDuration={totalDuration}
              selectedSceneId={effectiveScene.id}
              viewMode={viewMode}
              isLoading={isLoading || isGenerating}
              isAddingScene={isAddingScene}
              onSelectScene={(id) => {
                if (isPlayingAnimatics) setIsPlayingAnimatics(false);
                setSelectedSceneId(id);
              }}
              onAddScene={handleAddScene}
              onDuplicateScene={(id) => handleDuplicate(id)}
              onRemoveScene={(id) => handleRemove(id)}
              onMoveScene={handleMoveScene}
              onOpenPreview={setLightboxImageUrl}
            />
          ) : (
            <StoryboardTimelineView
              scenes={scenes}
              selectedScene={effectiveScene}
              totalDuration={totalDuration}
              isPlaying={isPlayingAnimatics}
              currentTime={playbackCurrentTime}
              onTogglePlay={setIsPlayingAnimatics}
              onSeek={setPlaybackCurrentTime}
              onSelectScene={(id) => {
                if (isPlayingAnimatics) setIsPlayingAnimatics(false);
                setSelectedSceneId(id);
              }}
              onAddScene={handleAddScene}
              onMoveScene={handleMoveScene}
              onUpdateTransition={(sceneId, transition) => {
                updateSelectedScene("transitionType", transition);
                handleSaveScene(sceneId);
              }}
              onOpenPreview={setLightboxImageUrl}
              isAddingScene={isAddingScene}
            />
          )}

          <SceneInspector
            scene={effectiveScene}
            isSaving={isSavingScene}
            hasUnsavedChanges={hasUnsavedChanges}
            onSaveScene={handleSaveScene}
            onChangeField={updateSelectedScene}
            onDuplicate={() => handleDuplicate(effectiveScene.id)}
            onRemove={() => handleRemove(effectiveScene.id)}
            onRegenerateFrame={handleGenerateWithAi}
            onCreateSnapshot={() => handleCreateVersion(effectiveScene.id)}
            onDeleteVersion={(verId) => handleDeleteVersion(effectiveScene.id, verId)}
            onRollbackVersion={(ver) => handleRollbackVersion(effectiveScene, ver)}
            isCreatingVersion={isCreatingVersion}
            isDeletingVersion={isDeletingVersion}
          />
        </main>

        {/* Bottom Animatics Timeline Dock only active in Grid mode */}
        {viewMode === "grid" && (
          <AnimaticsTimelineDock
            scenes={scenes}
            selectedSceneId={effectiveScene.id}
            totalDuration={totalDuration}
            isPlaying={isPlayingAnimatics}
            currentTime={playbackCurrentTime}
            onTogglePlay={setIsPlayingAnimatics}
            onSeek={setPlaybackCurrentTime}
            onSelectScene={(id) => {
              if (isPlayingAnimatics) setIsPlayingAnimatics(false);
              setSelectedSceneId(id);
            }}
          />
        )}
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
