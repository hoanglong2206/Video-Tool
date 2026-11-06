import { z } from "zod";

export const dashboardStatsSchema = z.object({
  activeProjects: z.number().int().nonnegative(),
  waitingForApproval: z.number().int().nonnegative(),
  rendersInQueue: z.number().int().nonnegative(),
  aiGenerationsThisMonth: z.number().int().nonnegative(),
});

export const projectItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  stageDescription: z.string(),
  progress: z.number().min(0).max(100),
  status: z.enum(["in_progress", "waiting_approval", "completed", "library"]),
  assetCount: z.number().optional(),
  templateCount: z.number().optional(),
});

export const approvalItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  stage: z.string(),
  timeAgo: z.string(),
  isUrgent: z.boolean().default(false),
});

export const renderQueueItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  progress: z.number().min(0).max(100),
  nextJobTitle: z.string().optional(),
});

export type DashboardStatsSchema = z.infer<typeof dashboardStatsSchema>;
export type ProjectItemSchema = z.infer<typeof projectItemSchema>;
export type ApprovalItemSchema = z.infer<typeof approvalItemSchema>;
export type RenderQueueItemSchema = z.infer<typeof renderQueueItemSchema>;

