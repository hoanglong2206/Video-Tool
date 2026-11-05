import React from "react";
import { ProductionWorkflow } from "@/features/production-workflow";

interface WorkflowPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectWorkflowPage({
  params,
}: WorkflowPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <ProductionWorkflow
      projectName={
        resolvedParams.id === "proj-1"
          ? "Aurora X1 Launch"
          : `Project ${resolvedParams.id}`
      }
    />
  );
}
