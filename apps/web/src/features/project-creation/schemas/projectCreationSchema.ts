import { z } from "zod";

export const projectBriefFormSchema = z.object({
  projectName: z.string().min(1, "Project name is required").max(100),
  client: z.string().min(1, "Client name is required").max(100),
  brief: z.string().min(10, "Brief should contain at least 10 characters"),
  duration: z.string().default("30 seconds"),
  aspectRatio: z.string().default("16:9"),
  stylePreference: z.string().default("Cinematic, minimal"),
  brandColors: z.array(z.string()).default(["#0E131D", "#E2E8F0", "#3B82F6"]),
  typeface: z.string().default("Inter"),
});

export const aiBriefAnalysisSchema = z.object({
  missingItems: z.array(z.string()),
  suggestedStructure: z.string(),
  isComplete: z.boolean(),
});

export type ProjectBriefFormSchema = z.infer<typeof projectBriefFormSchema>;
export type AiBriefAnalysisSchema = z.infer<typeof aiBriefAnalysisSchema>;

