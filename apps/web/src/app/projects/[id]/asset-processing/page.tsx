import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface AssetProcessingPageProps {
  params: Promise<{ id: string }>;
}

export default async function AssetProcessingPage({
  params,
}: AssetProcessingPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="asset-processing"
      projectName="Aurora X1 Launch"
    />
  );
}

