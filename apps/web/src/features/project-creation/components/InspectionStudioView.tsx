"use client";

import React from "react";
import type {
  ProjectBriefFormData,
  FullAiAnalysisOutput,
  SceneBreakdownItem,
} from "../types";
import { EditableBriefForm } from "./EditableBriefForm";
import { ReferenceMediaBoard } from "./ReferenceMediaBoard";
import { Button } from "@/components/ui";
import { CheckCircle2, ArrowLeft, Sparkles, Loader2, Save } from "lucide-react";

interface InspectionStudioViewProps {
  formData: ProjectBriefFormData;
  aiOutput: FullAiAnalysisOutput;
  isSaving: boolean;
  onChangeField: <K extends keyof ProjectBriefFormData>(
    field: K,
    value: ProjectBriefFormData[K]
  ) => void;
  onUpdateScene: (index: number, updated: Partial<SceneBreakdownItem>) => void;
  onBackToInput: () => void;
  onSaveDraft: () => void;
  onConfirmCreate: () => void;
}

export function InspectionStudioView({
  formData,
  aiOutput,
  isSaving,
  onChangeField,
  onUpdateScene,
  onBackToInput,
  onSaveDraft,
  onConfirmCreate,
}: InspectionStudioViewProps): React.ReactElement {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden select-none">
      {/* Top Notification Banner */}
      <div className="bg-[#0F172A] border-b border-[#1E2638] px-5 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400">
            ✓ Giao diện kiểm tra & Chuẩn hóa Brief
          </span>
          <span className="text-slate-400 text-xs">
            — Vui lòng rà soát hoặc điều chỉnh các trường trước khi tạo Storyboard
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToInput}
            className="h-7 text-xs bg-[#101520] border-[#1E2638] text-slate-300 flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Sửa lại file & brief
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveDraft}
            disabled={isSaving}
            className="h-7 text-xs bg-[#101520] border-[#1E2638] text-slate-300 flex items-center gap-1"
          >
            <Save className="w-3 h-3" /> Lưu nháp
          </Button>
          <Button
            size="sm"
            onClick={onConfirmCreate}
            disabled={isSaving}
            className="h-7 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center gap-1 shadow-md shadow-blue-600/30"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" /> Đang khởi tạo...
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" /> Xác nhận & Tạo Storyboard ➔
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Split: Left Form vs Right Reference Media & AI Insights */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left: Editable Form */}
        <EditableBriefForm
          formData={formData}
          aiOutput={aiOutput}
          onChangeField={onChangeField}
          onUpdateScene={onUpdateScene}
        />

        {/* Right: Reference Media & AI Insights */}
        <ReferenceMediaBoard
          files={formData.files}
          aiOutput={aiOutput}
        />
      </div>
    </div>
  );
}

