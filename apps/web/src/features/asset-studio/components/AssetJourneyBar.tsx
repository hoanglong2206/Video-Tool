import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function AssetJourneyBar(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="assets"
      previousStage={{ label: "Storyboard", href: "/projects/proj-1/storyboard" }}
      nextStage={{ label: "Composition", href: "/projects/proj-1/workflow" }}
    />
  );
}
