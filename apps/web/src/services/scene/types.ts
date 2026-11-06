export type LayerType =
  | "camera"
  | "product"
  | "title"
  | "light_sweep"
  | "particles"
  | "background";

export interface LayerItem {
  id: string;
  name: string;
  type: LayerType;
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
  keyframes: number[];
}

export interface MotionSuggestion {
  prompt: string;
  description: string;
  cameraOrbitDeg: number;
  sweepDurationSec: number;
}

export interface SceneDetailsResponse {
  projectName: string;
  sceneName: string;
  layers: LayerItem[];
  properties: LayerProperties;
  tracks: TimelineTrack[];
  suggestion: MotionSuggestion;
}

