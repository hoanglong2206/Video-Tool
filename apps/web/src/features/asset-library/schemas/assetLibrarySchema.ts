import { z } from "zod";

export const libraryCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number().int().nonnegative(),
  isActive: z.boolean().default(false),
});

export const sceneTemplateSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string().default("scene"),
  isSelected: z.boolean().default(false),
});

export const brandKitSchema = z.object({
  id: z.string(),
  name: z.string(),
  colors: z.array(z.string()),
  typeface: z.string(),
  guideline: z.string(),
  usageCount: z.number().int().nonnegative(),
  logoUrl: z.string().optional(),
});

export type LibraryCategorySchema = z.infer<typeof libraryCategorySchema>;
export type SceneTemplateSchema = z.infer<typeof sceneTemplateSchema>;
export type BrandKitSchema = z.infer<typeof brandKitSchema>;

