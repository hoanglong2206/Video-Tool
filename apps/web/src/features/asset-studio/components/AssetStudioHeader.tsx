"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { StudioHeader } from "@/components/shared";

interface AssetStudioHeaderProps {
  projectName: string;
  isApproving?: boolean;
  onUpload?: () => void;
  onGenerateImage?: () => void;
  onApproveSelected?: () => void;
}

export function AssetStudioHeader({
  projectName,
  isApproving = false,
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

      <Button
        size="sm"
        disabled={isApproving}
        onClick={onApproveSelected}
        className="flex items-center gap-1.5 min-w-[120px] justify-center"
      >
        {isApproving ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Đang duyệt...</span>
          </>
        ) : (
          <span>Approve selected</span>
        )}
      </Button>
    </StudioHeader>
  );
}
