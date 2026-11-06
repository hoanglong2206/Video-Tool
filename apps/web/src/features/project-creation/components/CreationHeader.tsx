import React from "react";
import { Button } from "@/components/ui";
import { StudioHeader } from "@/components/shared";

interface CreationHeaderProps {
  isSaving: boolean;
  onSaveDraft: () => void;
  onContinue: () => void;
}

export function CreationHeader({
  isSaving,
  onSaveDraft,
  onContinue,
}: CreationHeaderProps): React.ReactElement {
  return (
    <StudioHeader
      rootTitle="New project"
      rootHref="/"
      subTitle="Step 2 of 5 · Brief & materials"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={onSaveDraft}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save draft"}
      </Button>

      <Button size="sm" onClick={onContinue}>
        Continue
      </Button>
    </StudioHeader>
  );
}


