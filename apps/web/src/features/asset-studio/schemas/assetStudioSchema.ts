import { z } from "zod";

export const categoryCountSchema = z.object({
  id: z.string(),
  label: z.string(),
  count: z.number().int().nonnegative(),
});

export const assetItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  sourceType: z.string(),
  resolution: z.string(),
  format: z.string(),
  scenesUsed: z.array(z.number()),
  version: z.number().int().positive(),
  totalVersions: z.number().int().positive(),
  isTransparent: z.boolean().default(false),
});

export const assetStudioResponseSchema = z.object({
  projectName: z.string(),
  categories: z.array(categoryCountSchema),
  assets: z.array(assetItemSchema),
});

export type CategoryCountSchema = z.infer<typeof categoryCountSchema>;
export type AssetItemSchema = z.infer<typeof assetItemSchema>;
export type AssetStudioResponseSchema = z.infer<typeof assetStudioResponseSchema>;

