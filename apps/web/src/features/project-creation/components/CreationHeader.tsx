import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

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
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      {/* Breadcrumb path */}
      <div className="flex items-center gap-2 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          New project
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400 font-normal">
          Step 2 of 5 · Brief & materials
        </span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
}

