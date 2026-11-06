import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface WorkflowPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectWorkflowPage({
  params,
}: WorkflowPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="storyboard"
      projectName="Aurora X1 Launch"
    />
  );
}
