import { z } from "zod";

export const pbrMaterialSchema = z.object({
  name: z.string(),
  metalness: z.number().min(0).max(1),
  roughness: z.number().min(0).max(1),
});

export const lightSettingSchema = z.object({
  name: z.string(),
  colorTempK: z.number().int().positive(),
  intensityPercent: z.number().min(0).max(500),
});

export const camera3DSettingsSchema = z.object({
  orbitTrajectory: z.string(),
  focalLengthMm: z.number().int().positive(),
  aperture: z.string(),
});

export const threeDTimelineTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  startPercent: z.number().min(0).max(100),
  durationPercent: z.number().min(0).max(100),
  colorClass: z.string(),
});

export type PbrMaterialSchema = z.infer<typeof pbrMaterialSchema>;
export type LightSettingSchema = z.infer<typeof lightSettingSchema>;
export type Camera3DSettingsSchema = z.infer<typeof camera3DSettingsSchema>;
export type ThreeDTimelineTrackSchema = z.infer<typeof threeDTimelineTrackSchema>;

