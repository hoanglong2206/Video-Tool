import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function EditorJourneyBar(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="composition"
      previousStage={{ label: "Assets", href: "/assets" }}
      nextStage={{ label: "Motion", isLocked: true }}
    />
  );
}
