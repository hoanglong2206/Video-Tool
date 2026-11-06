import React from "react";
import { Button } from "@/components/ui";
import { StudioHeader } from "@/components/shared";

interface AssetStudioHeaderProps {
  projectName: string;
  onUpload?: () => void;
  onGenerateImage?: () => void;
  onApproveSelected?: () => void;
}

export function AssetStudioHeader({
  projectName,
  onUpload,
  onGenerateImage,
  onApproveSelected,
}: AssetStudioHeaderProps): React.ReactElement {
  return (
    <StudioHeader rootTitle="Asset Studio" rootHref="/" subTitle={projectName}>
      <Button variant="outline" size="sm" onClick={onUpload}>
        Upload
      </Button>

      <Button variant="outline" size="sm" onClick={onGenerateImage}>
        Generate image
      </Button>

      <Button size="sm" onClick={onApproveSelected}>
        Approve selected
      </Button>
    </StudioHeader>
  );
}


