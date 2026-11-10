"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { dashboardService } from "@/services/dashboard";
import { projectService } from "@/services/project";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Button, Input, toast, Skeleton } from "@/components/ui";
import { Plus, Search, Film } from "lucide-react";
import type { ProjectItem } from "@/services/dashboard";
import { getProjectStageRoute } from "@/features/pipeline";
import {
  ProjectCardItem,
  StopProjectConfirmModal,
  ResumeProjectConfirmModal,
  DeleteProjectConfirmModal,
  VideoPreviewModal,
} from "@/features/projects";

type ProjectFilterTab = "all" | "in_progress" | "waiting_approval" | "completed" | "stopped";

export default function ProjectsPage(): React.ReactElement {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProjectFilterTab>("all");

  const [stopModalProject, setStopModalProject] = useState<ProjectItem | null>(null);
  const [resumeModalProject, setResumeModalProject] = useState<ProjectItem | null>(null);
  const [deleteModalProject, setDeleteModalProject] = useState<ProjectItem | null>(null);
  const [previewModalProject, setPreviewModalProject] = useState<ProjectItem | null>(null);
  const [isStopping, setIsStopping] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.dashboard.stats(),
    queryFn: () => dashboardService.getOverview(),
  });

  const projects = data?.projects || [];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleConfirmStop = async (project: ProjectItem) => {
    setIsStopping(true);
    try {
      await projectService.updateProjectStatus(project.id, "stopped");
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
      setStopModalProject(null);
      toast.info(`Đã tạm dừng dự án "${project.name}"`);
    } catch (err) {
      console.error("Failed to stop project:", err);
      toast.error("Không thể tạm dừng dự án. Vui lòng thử lại!");
    } finally {
      setIsStopping(false);
    }
  };

  const handleConfirmResume = async (project: ProjectItem) => {
    setIsResuming(true);
    try {
      await projectService.updateProjectStatus(project.id, "in_progress");
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
      setResumeModalProject(null);
      toast.success(`Đã tiếp tục tiến trình dự án "${project.name}"`);
    } catch (err) {
      console.error("Failed to resume project:", err);
      toast.error("Không thể tiếp tục dự án. Vui lòng thử lại!");
    } finally {
      setIsResuming(false);
    }
  };

  const handleConfirmDelete = async (project: ProjectItem) => {
    setIsDeleting(true);
    try {
      await projectService.deleteProject(project.id);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
      setDeleteModalProject(null);
      toast.success(`Đã xóa vĩnh viễn dự án "${project.name}"`);
    } catch (err) {
      console.error("Failed to delete project:", err);
      toast.error("Không thể xóa dự án. Vui lòng thử lại!");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNavigate = (project: ProjectItem) => {
    router.push(getProjectStageRoute(project));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-12 border-b border-[#1E2638] px-5 flex items-center justify-between bg-[#0A0E17] shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
              Danh sách Dự án
            </h1>
            <span className="text-[10px] text-slate-400 font-mono bg-[#141B29] px-2 py-0.5 rounded border border-[#1E2638]">
              {filteredProjects.length} dự án
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm dự án..."
                className="h-7 pl-8 text-xs bg-[#101520] border-[#1E2638]"
              />
            </div>

            <Button
              size="sm"
              onClick={() => router.push("/projects/new")}
              className="h-7 text-xs px-2.5 bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo mới dự án</span>
            </Button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="px-5 py-2.5 border-b border-[#1E2638] bg-[#0C101A] flex items-center gap-2 shrink-0">
          {[
            { id: "all", label: "Tất cả" },
            { id: "in_progress", label: "Đang sản xuất" },
            { id: "waiting_approval", label: "Chờ phê duyệt" },
            { id: "completed", label: "Đã hoàn thành" },
            { id: "stopped", label: "Đã dừng" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as ProjectFilterTab)}
              className={`text-xs px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filter === tab.id
                  ? "bg-blue-600 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141B29]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <main className="flex-1 min-h-0 overflow-y-auto p-5">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded" />
                  </div>
                  <Skeleton className="h-5 w-3/4 rounded mt-1" />
                  <Skeleton className="h-3.5 w-1/2 rounded" />
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-1.5 w-full rounded-full" />
                  </div>
                  <div className="pt-3 border-t border-[#1C2436]/60 flex items-center justify-between">
                    <Skeleton className="h-3 w-24" />
                    <div className="flex gap-1.5">
                      <Skeleton className="h-6 w-6 rounded" />
                      <Skeleton className="h-6 w-6 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[#1E2638] rounded-xl bg-[#0E131E] my-8 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-3">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200">Không tìm thấy dự án phù hợp</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Không có dự án nào thỏa mãn điều kiện lọc. Chọn tab khác hoặc tạo dự án mới.
              </p>
              <Button
                size="sm"
                onClick={() => router.push("/projects/new")}
                className="mt-4 h-8 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Tạo mới dự án
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCardItem
                  key={project.id}
                  project={project}
                  onOpenStopModal={(p) => setStopModalProject(p)}
                  onOpenResumeModal={(p) => setResumeModalProject(p)}
                  onOpenDeleteModal={(p) => setDeleteModalProject(p)}
                  onOpenVideoPreview={(p) => setPreviewModalProject(p)}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <StopProjectConfirmModal
        project={stopModalProject}
        isOpen={Boolean(stopModalProject)}
        onClose={() => setStopModalProject(null)}
        onConfirm={handleConfirmStop}
        isStopping={isStopping}
      />

      <ResumeProjectConfirmModal
        project={resumeModalProject}
        isOpen={Boolean(resumeModalProject)}
        onClose={() => setResumeModalProject(null)}
        onConfirm={handleConfirmResume}
        isResuming={isResuming}
      />

      <DeleteProjectConfirmModal
        project={deleteModalProject}
        isOpen={Boolean(deleteModalProject)}
        onClose={() => setDeleteModalProject(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <VideoPreviewModal
        project={previewModalProject}
        isOpen={Boolean(previewModalProject)}
        onClose={() => setPreviewModalProject(null)}
        onNavigateDetail={handleNavigate}
      />
    </div>
  );
}
