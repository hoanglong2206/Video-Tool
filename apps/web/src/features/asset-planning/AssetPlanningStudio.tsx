"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { PipelineJourneyBar } from "@/features/pipeline/components/PipelineJourneyBar";
import { useAssetPlanning } from "./hooks/useAssetPlanning";
import { AssetPlanningHeader } from "./components/AssetPlanningHeader";
import { SceneCoverageSidebar } from "./components/SceneCoverageSidebar";
import { AssetMatrixGrid } from "./components/AssetMatrixGrid";
import { DualEngineInspector } from "./components/DualEngineInspector";

interface AssetPlanningStudioProps {
  projectId?: string;
  projectName?: string;
}

export function AssetPlanningStudio({
  projectId = "proj-1",
  projectName: initialProjectName,
}: AssetPlanningStudioProps): React.ReactElement {
  const {
    projectName,
    coverage,
    scenes,
    groundTruth,
    filteredAssets,
    selectedAsset,
    isGenerating,
    progressPercent,
    store,
    handleGenerateAsset,
    handleBulkGenerate,
    handleApproveStage,
    isApproving,
  } = useAssetPlanning(projectId);

  const displayProjectName = initialProjectName || projectName;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* 1. Far-left Global Sidebar Navigation */}
      <DashboardSidebar />

      {/* 2. Main Studio Pipeline Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header with Dual-Engine and HITL Gate */}
        <AssetPlanningHeader
          projectName={displayProjectName}
          coverage={coverage}
          engineMode={store.engineMode}
          isGenerating={isGenerating}
          isApproving={isApproving}
          onEngineChange={store.setEngineMode}
          onBulkGenerate={handleBulkGenerate}
          onApprove={handleApproveStage}
        />

        {/* 10-Stage Pipeline Journey Bar */}
        <PipelineJourneyBar
          projectId={projectId}
          currentStageId="asset-planning"
        />

        {/* 3-Column Studio Body Split */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          {/* Column 1: Client Ground Truth & Scene Coverage */}
          <SceneCoverageSidebar
            activeTab={store.activeTabLeft}
            groundTruth={groundTruth}
            scenes={scenes}
            selectedSceneNumber={store.selectedSceneNumber}
            onSelectTab={store.setActiveTabLeft}
            onSelectScene={store.setSelectedSceneNumber}
          />

          {/* Column 2: 4-Layer Asset Matrix Canvas */}
          <AssetMatrixGrid
            assets={filteredAssets}
            selectedLayerGroup={store.selectedLayerGroup}
            selectedSceneNumber={store.selectedSceneNumber}
            selectedAssetId={store.selectedAssetId}
            generatingAssetId={store.generatingAssetId}
            onSelectGroup={store.setSelectedLayerGroup}
            onClearSceneFilter={() => store.setSelectedSceneNumber(null)}
            onSelectAsset={store.setSelectedAssetId}
            onQuickAction={handleGenerateAsset}
          />

          {/* Column 3: Dual-Engine Inspector & Preset Controls */}
          <DualEngineInspector
            asset={selectedAsset}
            engineMode={store.engineMode}
            activePreset={store.activePreset}
            activeRatio={store.activeRatio}
            isGenerating={isGenerating}
            progressPercent={progressPercent}
            onEngineChange={store.setEngineMode}
            onPresetChange={store.setActivePreset}
            onRatioChange={store.setActiveRatio}
            onTriggerGenerate={() => handleGenerateAsset(selectedAsset.id)}
          />
        </main>
      </div>
    </div>
  );
}
