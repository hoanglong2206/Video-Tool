import React from "react";
import Link from "next/link";

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
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save draft"}
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="h-8 px-4 rounded-md text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] transition-all shadow-sm"
        >
          Continue
        </button>
      </div>
    </header>
  );
}

