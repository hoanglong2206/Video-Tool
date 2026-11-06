import { z } from "zod";

export const approvalGateItemSchema = z.object({
  id: z.string(),
  stageName: z.string(),
  title: z.string(),
  versionLabel: z.string(),
  previousVersionLabel: z.string(),
  previousDescription: z.string(),
  currentVersionLabel: z.string(),
  currentDescription: z.string(),
  aiSummary: z.string(),
});

export const approvalDecisionSchema = z.object({
  decision: z.enum(["approve", "revision", "reject"]),
  comment: z.string().optional(),
});

export type ApprovalGateItemSchema = z.infer<typeof approvalGateItemSchema>;
export type ApprovalDecisionSchema = z.infer<typeof approvalDecisionSchema>;

