import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface ExportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExportPage({
  params,
}: ExportPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="export"
      projectName="Aurora X1 Launch"
    />
  );
}

