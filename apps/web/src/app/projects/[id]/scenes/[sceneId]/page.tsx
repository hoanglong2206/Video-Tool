import React from "react";
import { SceneEditor } from "@/features/scene-editor";

interface SceneEditorPageProps {
  params: Promise<{ id: string; sceneId: string }>;
}

export default async function ProjectSceneEditorPage({
  params,
}: SceneEditorPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <SceneEditor
      projectName={
        resolvedParams.id === "proj-1"
          ? "Aurora X1 Launch"
          : `Project ${resolvedParams.id}`
      }
    />
  );
}

