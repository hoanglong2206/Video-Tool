"use client";

import React, { useState, useEffect } from "react";
import type { StoryboardScene } from "../types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, Pause, X, RotateCcw, Volume2 } from "lucide-react";

interface AnimaticsPreviewModalProps {
  isOpen: boolean;
  scenes: StoryboardScene[];
  onClose: () => void;
}

export function AnimaticsPreviewModal({
  isOpen,
  scenes,
  onClose,
}: AnimaticsPreviewModalProps): React.ReactElement | null {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentScene = scenes[currentIndex] || scenes[0];

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setIsPlaying(true);
      return;
    }

    if (!isPlaying || scenes.length === 0) return;

    const durationMs = (currentScene?.durationSeconds || 5) * 1000;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % scenes.length);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentIndex, currentScene, scenes.length]);

  if (!isOpen || !currentScene) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-[#070A10] border-[#1E2638] p-4 rounded-2xl shadow-2xl text-slate-100 flex flex-col gap-3 [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">Trình chiếu Animatics Storyboard</DialogTitle>
        {/* Header bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#1C2436]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
              Trình chiếu Animatics · Cảnh 0{currentScene.sceneNumber} / 0{scenes.length}
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
              {currentScene.durationSeconds}s
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#141B2B] hover:bg-[#1E293F] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 16:9 Cinema Canvas */}
        <div className="w-full aspect-video rounded-xl bg-black overflow-hidden relative flex items-center justify-center border border-[#1C2436]">
          {currentScene.thumbnailUrl ? (
            <img
              src={currentScene.thumbnailUrl}
              alt={currentScene.title}
              className="w-full h-full object-cover animate-fade-in"
            />
          ) : (
            <div className="text-slate-500 font-mono text-xs">Không có ảnh frame</div>
          )}

          {/* Subtitles Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/10 flex items-start gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200 leading-relaxed italic">
              "{currentScene.voiceover || currentScene.description || currentScene.title}"
            </p>
          </div>
        </div>

        {/* Footer Playback Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Tạm dừng" : "Tiếp tục"}</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex(0)}
              className="h-8 px-2.5 rounded-lg bg-[#141B2B] hover:bg-[#1E293F] text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Phát lại</span>
            </button>
          </div>

          {/* Scene navigation dots */}
          <div className="flex items-center gap-1.5">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? "w-6 bg-cyan-400" : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
                title={`Chuyển tới cảnh ${s.sceneNumber}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
