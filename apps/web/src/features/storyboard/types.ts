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

export interface StoryboardData {
  projectName: string;
  approvalStatus: "Approved" | "Revision" | "Draft";
  version: string;
  totalDurationSeconds: number;
  scenes: StoryboardScene[];
}
