import { z } from "zod";

export const assistantContextSchema = z.object({
  project_id: z.string().default("aurora-x1"),
  stage: z.string().default("Stage 06 · Motion"),
  scene_id: z.string().default("Scene 03"),
  layer_name: z.string().optional(),
});

export const assistantChatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  context: assistantContextSchema.optional(),
});

export const suggestedChangeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  actions: z.array(z.string()),
});

export type AssistantContextSchema = z.infer<typeof assistantContextSchema>;
export type AssistantChatRequestSchema = z.infer<typeof assistantChatRequestSchema>;
export type SuggestedChangeSchema = z.infer<typeof suggestedChangeSchema>;

