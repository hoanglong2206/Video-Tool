import React from "react";
import { AssetPlanningStudio } from "@/features/asset-planning";

interface AssetPlanningPageProps {
  params: Promise<{ id: string }>;
}

export default async function AssetPlanningPage({
  params,
}: AssetPlanningPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <AssetPlanningStudio
      projectId={resolvedParams.id}
      projectName={
        resolvedParams.id === "proj-1"
          ? "Aurora X1 Launch"
          : `Project ${resolvedParams.id}`
      }
    />
  );
}
