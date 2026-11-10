"use client";

import { useEffect, useRef } from "react";
import { useStoryboardStore } from "../store";

export function useStoryboardPlayback(totalDuration: number) {
  const isPlaying = useStoryboardStore((s) => s.isPlayingAnimatics);
  const currentTime = useStoryboardStore((s) => s.playbackCurrentTime);
  const setIsPlaying = useStoryboardStore((s) => s.setIsPlayingAnimatics);
  const setCurrentTime = useStoryboardStore((s) => s.setPlaybackCurrentTime);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        const cur = useStoryboardStore.getState().playbackCurrentTime;
        if (cur >= totalDuration) {
          setIsPlaying(false);
          setCurrentTime(0);
        } else {
          setCurrentTime(Math.min(totalDuration, +(cur + 0.1).toFixed(2)));
        }
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalDuration, setIsPlaying, setCurrentTime]);

  return {
    isPlaying,
    currentTime,
    setIsPlaying,
    setCurrentTime,
  };
}

