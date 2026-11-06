export interface ApprovalGateItem {
  id: string;
  stageName: string;
  title: string;
  versionLabel: string;
  previousVersionLabel: string;
  previousDescription: string;
  currentVersionLabel: string;
  currentDescription: string;
  aiSummary: string;
}

export interface ApprovalCenterResponse {
  projectName: string;
  pendingCount: number;
  items: ApprovalGateItem[];
}

export interface ApprovalDecisionInput {
  decision: "approve" | "revision" | "reject";
  comment?: string;
}

export interface ApprovalDecisionResponse {
  status: string;
  approvalId: string;
  decision: string;
  reviewerComment?: string;
  decidedAt: string;
}

