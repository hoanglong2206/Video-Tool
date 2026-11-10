"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { projectService, type CreateProjectInput } from "@/services/project";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useProjectCreationStore } from "../store";
import type { ProjectBriefFormData, SceneBreakdownItem } from "../types";
import { generateDynamicAiAnalysis } from "../utils/dynamicAiGenerator";
import { toast } from "@/components/ui";

export function useProjectCreation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    step,
    formData,
    aiOutput,
    activeAiPipelineStage,
    isAnalyzing,
    isSaving,
    setStep,
    updateField,
    addFile,
    removeFile,
    addDemoFiles,
    setAiOutput,
    updateScene,
    createSceneVersionSnapshot,
    regenerateScene,
    rollbackSceneVersion,
    selectAssetVersion,
    applyBrandKit,
    applySceneTemplate,
    setActiveAiPipelineStage,
    _hasHydrated,
    lastSavedAt,
    setIsAnalyzing,
    setIsSaving,
    resetForm,
    clearDraft,
  } = useProjectCreationStore(
    useShallow((state) => ({
      step: state.step,
      formData: state.formData,
      aiOutput: state.aiOutput,
      activeAiPipelineStage: state.activeAiPipelineStage,
      isAnalyzing: state.isAnalyzing,
      isSaving: state.isSaving,
      setStep: state.setStep,
      updateField: state.updateField,
      addFile: state.addFile,
      removeFile: state.removeFile,
      addDemoFiles: state.addDemoFiles,
      setAiOutput: state.setAiOutput,
      updateScene: state.updateScene,
      createSceneVersionSnapshot: state.createSceneVersionSnapshot,
      regenerateScene: state.regenerateScene,
      rollbackSceneVersion: state.rollbackSceneVersion,
      selectAssetVersion: state.selectAssetVersion,
      applyBrandKit: state.applyBrandKit,
      applySceneTemplate: state.applySceneTemplate,
      setActiveAiPipelineStage: state.setActiveAiPipelineStage,
      _hasHydrated: state._hasHydrated,
      lastSavedAt: state.lastSavedAt,
      setIsAnalyzing: state.setIsAnalyzing,
      setIsSaving: state.setIsSaving,
      resetForm: state.resetForm,
      clearDraft: state.clearDraft,
    }))
  );

  const createProjectMutation = useMutation({
    mutationFn: (data: CreateProjectInput) => projectService.createProject(data),
    onSuccess: (project) => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.all });
      toast.success(`Đã khởi tạo dự án "${formData.projectName}" thành công!`);
      if (project?.id) {
        router.push(`/projects/${project.id}/storyboard`);
      } else {
        router.push("/projects");
      }
    },
    onError: (err) => {
      console.error("Lỗi khi tạo dự án:", err);
      toast.error("Không thể tạo dự án. Vui lòng thử lại!");
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  const handleRunAiPipeline = async (): Promise<void> => {
    setIsAnalyzing(true);
    setStep("processing");

    const dynamicOutput = generateDynamicAiAnalysis(formData);
    setAiOutput(dynamicOutput);

    try {
      setActiveAiPipelineStage(1);
      try {
        await projectService.checkBrief({
          brief: formData.brief,
          project_name: formData.projectName,
          client: formData.client,
        });
      } catch (err) {
        console.warn("LLM Service fallback engaged:", err);
      }
      await new Promise((r) => setTimeout(r, 700));

      setActiveAiPipelineStage(2);
      await new Promise((r) => setTimeout(r, 800));

      setActiveAiPipelineStage(3);
      await new Promise((r) => setTimeout(r, 700));

      setActiveAiPipelineStage(4);
      await new Promise((r) => setTimeout(r, 600));

      setActiveAiPipelineStage(5);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirmAndCreateProject = async (): Promise<void> => {
    setIsSaving(true);
    const scenesPayload = (aiOutput.scenes || []).map((s) => ({
      scene_number: s.sceneNumber,
      title: s.title,
      duration_seconds: s.durationSeconds,
      camera_movement: s.cameraMovement,
      visual_prompt: s.visualPrompt,
      voiceover: s.voiceover,
      transition_type: "Cut",
    }));

    createProjectMutation.mutate({
      name: formData.projectName,
      client: formData.client,
      brief: formData.brief,
      duration: formData.duration,
      aspect_ratio: formData.aspectRatio,
      style_preference: formData.stylePreference,
      brand_colors: formData.brandColors,
      scenes: scenesPayload,
    });
  };

  const handleSaveDraft = async (): Promise<void> => {
    setIsSaving(true);
    const scenesPayload = (aiOutput.scenes || []).map((s) => ({
      scene_number: s.sceneNumber,
      title: s.title,
      duration_seconds: s.durationSeconds,
      camera_movement: s.cameraMovement,
      visual_prompt: s.visualPrompt,
      voiceover: s.voiceover,
      transition_type: "Cut",
    }));

    createProjectMutation.mutate({
      name: `${formData.projectName} (Bản nháp)`,
      client: formData.client,
      brief: formData.brief,
      duration: formData.duration,
      aspect_ratio: formData.aspectRatio,
      style_preference: formData.stylePreference,
      brand_colors: formData.brandColors,
      status: "DRAFT",
      scenes: scenesPayload,
    });
    toast.info("Đã lưu bản nháp dự án!");
  };

  const handleAddFile = (file: Parameters<typeof addFile>[0]) => {
    addFile(file);
    toast.success(`Đã thêm tài liệu: ${file.name}`);
  };

  const handleRemoveFile = (fileId: string) => {
    removeFile(fileId);
    toast.info("Đã gỡ bỏ tài liệu đính kèm");
  };

  const handleAddDemoFiles = () => {
    addDemoFiles();
    toast.success("Đã tải 4 tài liệu demo mẫu");
  };

  const handleClearDraft = () => {
    clearDraft();
    toast.info("Đã đặt lại dữ liệu biểu mẫu về mặc định");
  };

  return {
    _hasHydrated,
    lastSavedAt,
    step,
    formData,
    aiOutput,
    activeAiPipelineStage,
    isAnalyzing,
    isSaving,
    setStep,
    updateField,
    addFile: handleAddFile,
    removeFile: handleRemoveFile,
    addDemoFiles: handleAddDemoFiles,
    setAiOutput,
    updateScene,
    createSceneVersionSnapshot,
    regenerateScene,
    rollbackSceneVersion,
    selectAssetVersion,
    applyBrandKit,
    applySceneTemplate,
    handleRunAiPipeline,
    handleConfirmAndCreateProject,
    handleSaveDraft,
    resetForm,
    clearDraft: handleClearDraft,
  };
}
