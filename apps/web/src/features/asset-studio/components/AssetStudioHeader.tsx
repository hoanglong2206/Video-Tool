import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

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
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          Asset Studio
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">{projectName}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onUpload}
        >
          Upload
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onGenerateImage}
        >
          Generate image
        </Button>

        <Button
          size="sm"
          onClick={onApproveSelected}
        >
          Approve selected
        </Button>
      </div>
    </header>
  );
}

