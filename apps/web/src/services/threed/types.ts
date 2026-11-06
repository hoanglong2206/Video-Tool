export type SceneNodeType = "camera" | "light" | "mesh" | "floor";

export interface SceneGraphNode {
  id: string;
  name: string;
  type: SceneNodeType;
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

export interface ThreeDSceneResponse {
  projectName: string;
  sceneTitle: string;
  status: string;
  nodes: SceneGraphNode[];
  material: PbrMaterial;
  lights: LightSetting[];
  camera: Camera3DSettings;
  tracks: ThreeDTimelineTrack[];
}

