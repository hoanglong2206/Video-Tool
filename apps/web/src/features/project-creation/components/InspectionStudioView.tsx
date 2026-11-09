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
import { ArrowLeft, Sparkles, Loader2, Save } from "lucide-react";

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
      {/* Top Studio Control Bar */}
      <div className="bg-[#0F172A] border-b border-[#1E2638] px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400">
            Giao diện kiểm tra & Chuẩn hóa Brief
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">
            — Rà soát thông số & 6 phân cảnh AI trước khi sinh Storyboard
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToInput}
            className="h-7 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Sửa lại file & brief
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSaveDraft}
            disabled={isSaving}
            className="h-7 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Save className="w-3 h-3" /> Lưu nháp
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onConfirmCreate}
            disabled={isSaving}
            className="h-7 text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-1 shadow-md shadow-blue-600/30 cursor-pointer transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" /> Đang khởi tạo
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" /> Xác nhận & Tạo Storyboard ➔
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Studio Viewport: Balanced Left Scenes vs Right AI Insights */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <EditableBriefForm
          formData={formData}
          aiOutput={aiOutput}
          onChangeField={onChangeField}
          onUpdateScene={onUpdateScene}
        />

        <ReferenceMediaBoard
          files={formData.files}
          aiOutput={aiOutput}
        />
      </div>
    </div>
  );
}
