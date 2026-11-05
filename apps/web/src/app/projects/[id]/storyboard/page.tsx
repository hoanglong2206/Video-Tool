import React from "react";
import { StoryboardStudio } from "@/features/storyboard";

interface StoryboardPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectStoryboardPage({
  params,
}: StoryboardPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <StoryboardStudio
      projectName={
        resolvedParams.id === "proj-1"
          ? "Aurora X1 Launch"
          : `Project ${resolvedParams.id}`
      }
    />
  );
}
