"use client";

import React, { useState, useEffect } from "react";
import type { StoryboardScene } from "../../types";
import { TimelineMonitor } from "./TimelineMonitor";
import { TimelineToolbar } from "./TimelineToolbar";
import { TimelineRuler } from "./TimelineRuler";
import { TimelineTracks } from "./TimelineTracks";

interface StoryboardTimelineViewProps {
  scenes: StoryboardScene[];
  selectedScene: StoryboardScene;
  totalDuration: number;
  isPlaying: boolean;
  currentTime: number;
  onTogglePlay: (playing: boolean) => void;
  onSeek: (time: number) => void;
  onSelectScene: (sceneId: string) => void;
  onAddScene: () => void;
  onMoveScene: (fromIndex: number, toIndex: number) => void;
  onUpdateTransition?: (sceneId: string, transition: string) => void;
  onOpenPreview?: (imageUrl: string) => void;
  isAddingScene?: boolean;
}

export function StoryboardTimelineView({
  scenes,
  selectedScene,
  totalDuration,
  isPlaying,
  currentTime,
  onTogglePlay,
  onSeek,
  onSelectScene,
  onAddScene,
  onMoveScene,
  onUpdateTransition,
  onOpenPreview,
  isAddingScene,
}: StoryboardTimelineViewProps): React.ReactElement {
  const [zoomMode, setZoomMode] = useState<"fit" | "1x" | "1.5x">("fit");

  const currentIdx = scenes.findIndex((s) => s.id === selectedScene.id);

  const handlePrevScene = () => {
    if (currentIdx > 0) {
      const prev = scenes[currentIdx - 1];
      onSelectScene(prev.id);
      let acc = 0;
      for (const s of scenes) {
        if (s.id === prev.id) break;
        acc += s.durationSeconds;
      }
      onSeek(acc);
    }
  };

  const handleNextScene = () => {
    if (currentIdx >= 0 && currentIdx < scenes.length - 1) {
      const next = scenes[currentIdx + 1];
      onSelectScene(next.id);
      let acc = 0;
      for (const s of scenes) {
        if (s.id === next.id) break;
        acc += s.durationSeconds;
      }
      onSeek(acc);
    }
  };

  // Keyboard shortcut listener: Spacebar toggles Play/Pause, Arrow keys navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        onTogglePlay(!isPlaying);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrevScene();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNextScene();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentIdx, scenes, onTogglePlay]);

  return (
    <section className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#070A11] select-none">
      {/* 1. Top Section: 16:9 Cinema Monitor & Director Spotlight */}
      <TimelineMonitor
        scene={selectedScene}
        totalScenes={scenes.length}
        isPlaying={isPlaying}
        currentTime={currentTime}
        totalDuration={totalDuration}
        onTogglePlay={onTogglePlay}
        onPrevScene={handlePrevScene}
        onNextScene={handleNextScene}
        onOpenPreview={onOpenPreview}
      />

      {/* 2. Middle Section: Timeline Transport & Tool Controls */}
      <TimelineToolbar
        isPlaying={isPlaying}
        currentTime={currentTime}
        totalDuration={totalDuration}
        totalScenes={scenes.length}
        zoomMode={zoomMode}
        isAddingScene={isAddingScene}
        onTogglePlay={onTogglePlay}
        onRewind={() => {
          onTogglePlay(false);
          onSeek(0);
        }}
        onChangeZoom={setZoomMode}
        onAddScene={onAddScene}
      />

      {/* 3. Timecode Ruler Bar */}
      <TimelineRuler
        totalDuration={totalDuration}
        currentTime={currentTime}
        zoomMode={zoomMode}
        onSeek={onSeek}
      />

      {/* 4. Multi-Track Timeline Editor */}
      <TimelineTracks
        scenes={scenes}
        selectedSceneId={selectedScene.id}
        totalDuration={totalDuration}
        currentTime={currentTime}
        zoomMode={zoomMode}
        onSelectScene={onSelectScene}
        onUpdateTransition={onUpdateTransition}
        onMoveScene={onMoveScene}
        onSeek={onSeek}
      />
    </section>
  );
}

