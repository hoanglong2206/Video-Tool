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
  description?: string;
  durationSeconds?: number;
  transitionType?: string;
}

