export interface PendingApprovalItem {
  id: string;
  stageName: string;
  title: string;
  versionLabel: string;
  timeAgo?: string;
  previousVersionLabel: string;
  previousDescription: string;
  currentVersionLabel: string;
  currentDescription: string;
  aiSummary: string;
}

export type DecisionType = "approve" | "revision" | "reject";
