import { z } from "zod";

export const storyboardSceneSchema = z.object({
  id: z.string(),
  sceneNumber: z.number().int().positive(),
  title: z.string().min(1),
  durationSeconds: z.number().int().positive(),
  cameraMovement: z.string(),
  transitionType: z.string(),
  description: z.string(),
  creativeDirection: z.string().optional(),
  hasVisualDraft: z.boolean().default(false),
});

export const updateSceneSchema = z.object({
  description: z.string().optional(),
  durationSeconds: z.number().int().positive().optional(),
  transitionType: z.string().optional(),
});

export const generateStoryboardSchema = z.object({
  brief: z.string().optional(),
  num_scenes: z.number().int().min(1).max(20).default(6),
});

export type StoryboardSceneSchema = z.infer<typeof storyboardSceneSchema>;
export type UpdateSceneSchema = z.infer<typeof updateSceneSchema>;
export type GenerateStoryboardSchema = z.infer<typeof generateStoryboardSchema>;

