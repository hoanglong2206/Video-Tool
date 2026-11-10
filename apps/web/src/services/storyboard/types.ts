export interface SceneVersionItem {
  versionNumber: number;
  title: string;
  visualPrompt?: string;
  voiceover?: string;
  cameraMovement?: string;
  createdAt?: string;
  role?: string;
}

export interface StoryboardScene {
  id: string;
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  cameraMovement: string;
  transitionType: string;
  description: string;
  creativeDirection?: string;
  hasVisualDraft?: boolean;

  // Enhanced Cinematic & Audio Parameters
  visualPrompt?: string;
  voiceover?: string;
  thumbnailUrl?: string;
  cameraLens?: string;
  cameraFov?: number;
  cameraDof?: number;
  lightingRimColor?: string;
  activeVersion?: number;
  versions?: SceneVersionItem[];
}

export interface StoryboardResponse {
  projectName: string;
  approvalStatus: string;
  version: string;
  totalDurationSeconds: number;
  scenes: StoryboardScene[];
}

export interface GenerateStoryboardInput {
  brief?: string;
  num_scenes?: number;
}

export interface GenerateStoryboardResponse {
  status: string;
  scenesGenerated: number;
  scenes: StoryboardScene[];
}

export interface UpdateSceneInput {
  title?: string;
  description?: string;
  durationSeconds?: number;
  transitionType?: string;
  cameraMovement?: string;
  visualPrompt?: string;
  voiceover?: string;
  thumbnailUrl?: string;
  cameraLens?: string;
  cameraFov?: number;
  cameraDof?: number;
  lightingRimColor?: string;
}

export interface CreateSceneInput {
  title?: string;
  durationSeconds?: number;
  cameraMovement?: string;
  transitionType?: string;
  visualPrompt?: string;
  voiceover?: string;
  cameraLens?: string;
  thumbnailUrl?: string;
}

export interface ReorderScenesInput {
  sceneIds: string[];
}
