import React from "react";
import { ThreeDStudio } from "@/features/threed-studio";

interface ThreeDPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectThreeDPage({
  params,
}: ThreeDPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <ThreeDStudio
      projectName={
        resolvedParams.id === "proj-1"
          ? "Aurora X1 Launch"
          : `Project ${resolvedParams.id}`
      }
    />
  );
}

