"use client";

import React from "react";
import { toast } from "@/components/ui";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useAssetLibrary } from "./hooks/useAssetLibrary";
import { AssetLibraryHeader } from "./components/AssetLibraryHeader";
import { LibrarySidebar } from "./components/LibrarySidebar";
import { TemplatesGrid } from "./components/TemplatesGrid";
import { BrandKitSidebar } from "./components/BrandKitSidebar";

export function AssetLibrary(): React.ReactElement {
  const {
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    tags,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    sceneTemplates,
    motionPresets,
    selectedTemplateId,
    setSelectedTemplateId,
    brandKit,
    isApplied,
    isLoading,
    handleApplyBrandKit,
  } = useAssetLibrary();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main Studio View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <AssetLibraryHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSaveTemplate={() => toast.success("Đã lưu mẫu vào thư viện tài nguyên!")}
        />

        {/* 3-Column Studio Body Split */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          <LibrarySidebar
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            tags={tags}
            selectedTag={selectedTag}
            onSelectTag={(t) => setSelectedTag(selectedTag === t ? null : t)}
          />

          <TemplatesGrid
            sceneTemplates={sceneTemplates}
            motionPresets={motionPresets}
            selectedTemplateId={selectedTemplateId}
            isLoading={isLoading}
            onSelectTemplate={setSelectedTemplateId}
          />

          <BrandKitSidebar
            brandKit={brandKit}
            isApplied={isApplied}
            onApply={handleApplyBrandKit}
          />
        </div>
      </div>
    </div>
  );
}

