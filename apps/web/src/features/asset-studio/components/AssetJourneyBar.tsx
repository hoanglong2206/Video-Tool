import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function AssetJourneyBar(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="assets"
      previousStage={{ label: "Storyboard", href: "/storyboard" }}
      nextStage={{ label: "Composition", href: "/workflow" }}
    />
  );
}
