import { z } from "zod";

export const pipelineStageSchema = z.object({
  id: z.string(),
  stageNumber: z.string(),
  name: z.string(),
  status: z.enum(["approved", "waiting_approval", "running", "skipped", "pending"]),
  progressPercent: z.number().min(0).max(100).optional(),
  dependsOn: z.string().optional(),
  approvalHistory: z.string().optional(),
  hasPreview: z.boolean().default(false),
});

export const executionLogEntrySchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  stageLabel: z.string(),
  message: z.string(),
});

export const projectWorkflowResponseSchema = z.object({
  projectName: z.string(),
  overallProgress: z.number().min(0).max(100),
  stages: z.array(pipelineStageSchema),
  logs: z.array(executionLogEntrySchema),
});

export type PipelineStageSchema = z.infer<typeof pipelineStageSchema>;
export type ExecutionLogEntrySchema = z.infer<typeof executionLogEntrySchema>;
export type ProjectWorkflowResponseSchema = z.infer<typeof projectWorkflowResponseSchema>;

