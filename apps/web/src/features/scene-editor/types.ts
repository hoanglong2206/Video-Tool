export interface LayerItem {
  id: string;
  name: string;
  type: "camera" | "product" | "title" | "light_sweep" | "particles" | "background";
  assetRef?: string;
}

export interface LayerProperties {
  x: number;
  y: number;
  scalePercent: number;
  rotateDeg: number;
  opacityPercent: number;
  easing: string;
}

export interface TimelineTrack {
  id: string;
  name: string;
  startSec: number;
  durationSec: number;
  colorClass: string;
  keyframes: number[]; // seconds
}

export interface MotionSuggestion {
  prompt: string;
  description: string;
  cameraOrbitDeg: number;
  sweepDurationSec: number;
}

