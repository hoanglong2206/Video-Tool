import { z } from "zod";

export const layerItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  assetRef: z.string().optional(),
});

export const layerPropertiesSchema = z.object({
  x: z.number(),
  y: z.number(),
  scalePercent: z.number().min(0).max(1000),
  rotateDeg: z.number().min(-360).max(360),
  opacityPercent: z.number().min(0).max(100),
  easing: z.string(),
});

export const timelineTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  startSec: z.number().nonnegative(),
  durationSec: z.number().positive(),
  colorClass: z.string(),
  keyframes: z.array(z.number()),
});

export type LayerItemSchema = z.infer<typeof layerItemSchema>;
export type LayerPropertiesSchema = z.infer<typeof layerPropertiesSchema>;
export type TimelineTrackSchema = z.infer<typeof timelineTrackSchema>;

