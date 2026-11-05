"use client";

import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useAssetStudio } from "./hooks/useAssetStudio";
import { AssetStudioHeader } from "./components/AssetStudioHeader";
import { AssetJourneyBar } from "./components/AssetJourneyBar";
import { CategorySidebar } from "./components/CategorySidebar";
import { AssetGrid } from "./components/AssetGrid";
import { AssetInspector } from "./components/AssetInspector";

interface AssetStudioProps {
  projectName?: string;
}

export function AssetStudio({
  projectName = "Aurora X1 Launch",
}: AssetStudioProps): React.ReactElement {
  const {
    categories,
    selectedCategoryId,
    sourceFilter,
    searchQuery,
    filteredAssets,
    selectedAsset,
    isRemovingBg,
    handleRemoveBackground,
    setSelectedCategoryId,
    setSourceFilter,
    setSearchQuery,
    setSelectedAssetId,
  } = useAssetStudio(projectName);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <AssetStudioHeader
          projectName={projectName}
          onUpload={() => console.log("Upload asset")}
          onGenerateImage={() => console.log("Generate AI image")}
          onApproveSelected={() => console.log("Approve selected asset")}
        />

        {/* Pipeline Journey Bar */}
        <AssetJourneyBar />

        {/* 3-Column Studio Body Split */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />

          <AssetGrid
            assets={filteredAssets}
            selectedAssetId={selectedAsset.id}
            sourceFilter={sourceFilter}
            searchQuery={searchQuery}
            onSelectAsset={setSelectedAssetId}
            onSourceFilterChange={setSourceFilter}
            onSearchChange={setSearchQuery}
          />

          <AssetInspector
            asset={selectedAsset}
            isRemovingBg={isRemovingBg}
            onRemoveBackground={() => handleRemoveBackground(selectedAsset.id)}
            onVariations={() => console.log("Generate variations")}
            onEditWithAi={() => console.log("Edit with AI")}
            onCompareVersions={() => console.log("Compare versions")}
          />
        </main>
      </div>
    </div>
  );
}

