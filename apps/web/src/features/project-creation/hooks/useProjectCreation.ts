import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService, type CreateProjectInput, type BriefCheckInput } from "@/services/project";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useProjectCreationStore } from "../store";
import type { ProjectBriefFormData } from "../types";

export function useProjectCreation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    formData,
    analysis,
    isSaving,
    isCheckingBrief,
    updateField,
    setAnalysis,
    setIsSaving,
    setIsCheckingBrief,
  } = useProjectCreationStore();

  const briefCheckMutation = useMutation({
    mutationFn: (data: BriefCheckInput) => projectService.checkBrief(data),
    onSuccess: (data) => {
      setAnalysis({
        missingItems: data.missing_items || [],
        suggestedStructure: data.suggested_structure || "6 scenes, about 5 s each.",
        isComplete: data.is_complete ?? false,
      });
    },
    onSettled: () => {
      setIsCheckingBrief(false);
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: (data: CreateProjectInput) => projectService.createProject(data),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.all });
      if (project.id) {
        router.push(`/projects/${project.id}/storyboard`);
      } else {
        router.push("/");
      }
    },
    onError: (err) => {
      console.error("Error creating project:", err);
      router.push("/");
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  // Debounced live AI Brief analysis
  useEffect(() => {
    if (!formData.brief || formData.brief.length < 15) return;
    const timer = setTimeout(() => {
      setIsCheckingBrief(true);
      briefCheckMutation.mutate({
        brief: formData.brief,
        project_name: formData.projectName,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [formData.brief, formData.projectName]);

  const handleFillFromNotes = (): void => {
    const enrichedBrief =
      formData.brief +
      " Target audience: Tech audiophiles & creative professionals aged 22-40. CTA: Pre-order now at aurora-audio.com to receive exclusive founder engraving.";
    updateField("brief", enrichedBrief);
  };

  const handleSaveDraft = async (): Promise<void> => {
    setIsSaving(true);
    createProjectMutation.mutate({
      name: formData.projectName,
      brief: formData.brief,
      client: formData.client,
      status: "DRAFT",
    });
  };

  const handleContinue = async (): Promise<void> => {
    setIsSaving(true);
    createProjectMutation.mutate({
      name: formData.projectName,
      brief: formData.brief,
      client: formData.client,
      duration: formData.duration,
      aspect_ratio: formData.aspectRatio,
      style_preference: formData.stylePreference,
    });
  };

  return {
    formData,
    analysis,
    isSaving,
    isCheckingBrief,
    updateField: (field: keyof ProjectBriefFormData, value: string) =>
      updateField(field, value),
    handleFillFromNotes,
    handleSaveDraft,
    handleContinue,
  };
}
