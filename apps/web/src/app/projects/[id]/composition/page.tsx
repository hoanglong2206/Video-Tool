import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface CompositionPageProps {
  params: Promise<{ id: string }>;
}

export default async function CompositionPage({
  params,
}: CompositionPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="composition"
      projectName="Aurora X1 Launch"
    />
  );
}

