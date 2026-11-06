import React from "react";
import { AssetStudio } from "@/features/asset-studio";

interface AssetPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectAssetsPage({
  params,
}: AssetPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <AssetStudio
      projectId={resolvedParams.id}
      projectName={
        resolvedParams.id === "proj-1"
          ? "Aurora X1 Launch"
          : `Project ${resolvedParams.id}`
      }
    />
  );
}
