import React from "react";
import { ApprovalCenter } from "@/features/approval-center";

interface ApprovalsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectApprovalsPage({
  params,
}: ApprovalsPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <ApprovalCenter
      projectName={
        resolvedParams.id === "proj-1"
          ? "Aurora X1 Launch"
          : `Project ${resolvedParams.id}`
      }
    />
  );
}
