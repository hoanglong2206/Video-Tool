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
import { ArrowLeft, Sparkles, Loader2, Save, Shield } from "lucide-react";

interface InspectionStudioViewProps {
  formData: ProjectBriefFormData;
  aiOutput: FullAiAnalysisOutput;
  isSaving: boolean;
  onChangeField: <K extends keyof ProjectBriefFormData>(
    field: K,
    value: ProjectBriefFormData[K]
  ) => void;
  onUpdateScene: (index: number, updated: Partial<SceneBreakdownItem>) => void;
  onRegenerateScene?: (index: number, updated: Partial<SceneBreakdownItem>) => void;
  onCreateSnapshot?: (index: number, description?: string) => void;
  onRollbackSceneVersion?: (sceneIndex: number, versionNumber: number) => void;
  onSelectAssetVersion?: (assetId: string, versionNumber: number) => void;
  onBackToInput: () => void;
  onBackToProcessing?: () => void;
  onSaveDraft: () => void;
  onConfirmCreate: () => void;
}

export function InspectionStudioView({
  formData,
  aiOutput,
  isSaving,
  onChangeField,
  onUpdateScene,
  onRegenerateScene,
  onCreateSnapshot,
  onRollbackSceneVersion,
  onSelectAssetVersion,
  onBackToInput,
  onBackToProcessing,
  onSaveDraft,
  onConfirmCreate,
}: InspectionStudioViewProps): React.ReactElement {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden select-none">
      {/* Top Studio Control Bar */}
      <div className="bg-[#0F172A] border-b border-[#1E2638] px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs font-semibold text-emerald-400 truncate">
            Giao diện kiểm tra & Chuẩn hóa Brief
          </span>
          <span className="text-slate-400 text-xs hidden md:inline truncate">
            — Rà soát 3D camera, voiceover & lịch sử phân cảnh AI
          </span>
          {formData.client && (
            <span className="hidden xl:flex items-center gap-1 text-[10px] bg-blue-950/60 border border-blue-800/40 text-blue-300 px-2 py-0.5 rounded font-mono shrink-0">
              <Shield className="w-2.5 h-2.5" /> Kit: {formData.client}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToInput}
            className="h-7 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            title="Quay lại bước 1 để chỉnh sửa form brief và tệp media"
          >
            <ArrowLeft className="w-3 h-3" /> Bước 1: File & Brief
          </Button>

          {onBackToProcessing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onBackToProcessing}
              className="h-7 text-xs bg-[#101520] border-[#1E2638] text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title="Xem lại tiến trình phân tích AI đa tầng (Bước 2)"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Bước 2: Phân tích AI</span>
            </Button>
          )}

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
          onRegenerateScene={onRegenerateScene}
          onCreateSnapshot={onCreateSnapshot}
          onRollbackSceneVersion={onRollbackSceneVersion}
        />

        <ReferenceMediaBoard
          files={formData.files}
          aiOutput={aiOutput}
          onSelectAssetVersion={onSelectAssetVersion}
        />
      </div>
    </div>
  );
}
