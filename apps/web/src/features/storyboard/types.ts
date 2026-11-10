import type { StoryboardScene, SceneVersionItem } from "@/services/storyboard/types";

export type { StoryboardScene, SceneVersionItem };

export type StoryboardViewMode = "grid" | "timeline";

export interface StoryboardData {
  projectName: string;
  approvalStatus: string;
  version: string;
  totalDurationSeconds: number;
  scenes: StoryboardScene[];
}
