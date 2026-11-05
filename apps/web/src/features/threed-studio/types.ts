export interface SceneGraphNode {
  id: string;
  name: string;
  type: "camera" | "light" | "mesh" | "floor";
  selected?: boolean;
}

export interface PbrMaterial {
  name: string;
  metalness: number;
  roughness: number;
}

export interface LightSetting {
  name: string;
  colorTempK: number;
  intensityPercent: number;
}

export interface Camera3DSettings {
  orbitTrajectory: string;
  focalLengthMm: number;
  aperture: string;
}

export interface ThreeDTimelineTrack {
  id: string;
  name: string;
  startPercent: number;
  durationPercent: number;
  colorClass: string;
}
