import { z } from "zod";

export const exportSettingsSchema = z.object({
  resolution: z.string().default("3840x2160 (4K)"),
  frame_rate: z.string().default("24 fps"),
  aspect_ratio: z.string().default("16:9"),
  codec: z.string().default("H.264 · MP4"),
});

export const startRenderSchema = z.object({
  project_id: z.string(),
  settings: exportSettingsSchema.optional(),
});

export type ExportSettingsSchema = z.infer<typeof exportSettingsSchema>;
export type StartRenderSchema = z.infer<typeof startRenderSchema>;

