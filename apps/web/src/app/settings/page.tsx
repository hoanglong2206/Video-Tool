"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { usePipelineSettingsStore } from "@/features/pipeline";
import { PipelineAutomationSection } from "@/features/settings/components/PipelineAutomationSection";
import { AiInferenceSection } from "@/features/settings/components/AiInferenceSection";
import { RenderEngineSection } from "@/features/settings/components/RenderEngineSection";
import { StorageSchemaSection } from "@/features/settings/components/StorageSchemaSection";
import { Button } from "@/components/ui";
import { CheckCircle2, RotateCcw, Sliders } from "lucide-react";

export default function SettingsPage(): React.ReactElement {
  const [saved, setSaved] = useState(false);
  const settings = usePipelineSettingsStore();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    settings.resetToDefaults();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <h1 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
              Cài đặt Hệ thống Studio
            </h1>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded font-mono hidden sm:inline">
              ✓ Pro Studio Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-7 text-xs bg-[#101520] border-[#1E2638] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Đặt lại mặc định
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1 shadow-sm shadow-blue-600/30 cursor-pointer"
            >
              {saved ? (
                <span className="flex items-center gap-1 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã lưu cấu hình
                </span>
              ) : (
                "Lưu cấu hình"
              )}
            </Button>
          </div>
        </header>

        {/* Content: 2-Column Balanced Grid (Full Screen 100% Viewport) */}
        <main className="flex-1 min-h-0 w-full p-4 md:p-5 flex flex-col overflow-y-auto lg:overflow-hidden">
          <div className="w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Column 1: Pipeline Automation & AI Engines */}
            <div className="flex flex-col gap-4 h-full min-h-0">
              <PipelineAutomationSection
                approvalMode={settings.approvalMode}
                autoProceedDelaySeconds={settings.autoProceedDelaySeconds}
                autoSaveCheckpoint={settings.autoSaveCheckpoint}
                audioNotification={settings.audioNotification}
                onSetApprovalMode={(mode) => settings.setApprovalMode(mode)}
                onSetDelay={(sec) => settings.setAutoProceedDelaySeconds(sec)}
                onSetAutoSave={(val) => settings.updateSetting("autoSaveCheckpoint", val)}
                onSetAudioNotification={(val) => settings.updateSetting("audioNotification", val)}
              />

              <AiInferenceSection
                aiProvider={settings.aiProvider}
                llmModel={settings.llmModel}
                visionModel={settings.visionModel}
                aiTemperature={settings.aiTemperature}
                onSetProvider={(p) => settings.updateSetting("aiProvider", p)}
                onSetLlmModel={(m) => settings.updateSetting("llmModel", m)}
                onSetVisionModel={(m) => settings.updateSetting("visionModel", m)}
                onSetTemperature={(t) => settings.updateSetting("aiTemperature", t)}
              />
            </div>

            {/* Column 2: Render & Storage Engine */}
            <div className="flex flex-col gap-4 h-full min-h-0">
              <RenderEngineSection
                gpuHardware={settings.gpuHardware}
                renderConcurrency={settings.renderConcurrency}
                renderPreset={settings.renderPreset}
                videoCodec={settings.videoCodec}
                onSetGpu={(g) => settings.updateSetting("gpuHardware", g)}
                onSetConcurrency={(c) => settings.updateSetting("renderConcurrency", c)}
                onSetPreset={(p) => settings.updateSetting("renderPreset", p)}
                onSetCodec={(c) => settings.updateSetting("videoCodec", c)}
              />

              <StorageSchemaSection
                storageLocation={settings.storageLocation}
                schemaMode={settings.schemaMode}
                autoCleanCache={settings.autoCleanCache}
                onSetStorage={(loc) => settings.updateSetting("storageLocation", loc)}
                onSetSchemaMode={(mode) => settings.updateSetting("schemaMode", mode)}
                onSetCleanCache={(val) => settings.updateSetting("autoCleanCache", val)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
