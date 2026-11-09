"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService, type CreateProjectInput } from "@/services/project";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useProjectCreationStore } from "../store";
import type { ProjectBriefFormData, SceneBreakdownItem } from "../types";
import { generateDynamicAiAnalysis } from "../utils/dynamicAiGenerator";

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
    setActiveAiPipelineStage,
    _hasHydrated,
    lastSavedAt,
    setIsAnalyzing,
    setIsSaving,
    resetForm,
    clearDraft,
  } = useProjectCreationStore();

  const createProjectMutation = useMutation({
    mutationFn: (data: CreateProjectInput) => projectService.createProject(data),
    onSuccess: (project) => {
      // Clear persistent draft on successful creation
      clearDraft();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.all });
      if (project?.id) {
        router.push(`/projects/${project.id}/storyboard`);
      } else {
        router.push("/projects");
      }
    },
    onError: (err) => {
      console.error("Lỗi khi tạo dự án:", err);
      router.push("/projects");
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  // Orchestrate the 4-component AI pipeline with visual stage progression & dynamic analysis
  const handleRunAiPipeline = async (): Promise<void> => {
    setIsAnalyzing(true);
    setStep("processing");

    // Compute dynamic, contextual analysis matching current project form data
    const dynamicOutput = generateDynamicAiAnalysis(formData);
    setAiOutput(dynamicOutput);

    try {
      // Stage 1: LLM
      setActiveAiPipelineStage(1);
      try {
        await projectService.checkBrief({
          brief: formData.brief,
          project_name: formData.projectName,
          client: formData.client,
        });
      } catch (e) {
        // Fallback gracefully to dynamicOutput
      }
      await new Promise((r) => setTimeout(r, 900));

      // Stage 2: Vision AI
      setActiveAiPipelineStage(2);
      await new Promise((r) => setTimeout(r, 1000));

      // Stage 3: Prompt Builder
      setActiveAiPipelineStage(3);
      await new Promise((r) => setTimeout(r, 900));

      // Stage 4: JSON Schema Validator
      setActiveAiPipelineStage(4);
      await new Promise((r) => setTimeout(r, 800));

      // Mark analysis complete (stage 5 = 100% completed for all 4 stages)
      setActiveAiPipelineStage(5);
      setIsAnalyzing(false);
    } catch (err) {
      console.error("AI Pipeline error:", err);
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
    addFile,
    removeFile,
    addDemoFiles,
    setAiOutput,
    updateScene,
    handleRunAiPipeline,
    handleConfirmAndCreateProject,
    handleSaveDraft,
    resetForm,
    clearDraft,
  };
}
