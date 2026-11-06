import { create } from "zustand";
import type { ProjectBriefFormData, AiBriefAnalysis } from "../types";

interface ProjectCreationState {
  formData: ProjectBriefFormData;
  analysis: AiBriefAnalysis;
  isSaving: boolean;
  isCheckingBrief: boolean;
  setFormData: (data: Partial<ProjectBriefFormData>) => void;
  updateField: (field: keyof ProjectBriefFormData, value: string) => void;
  setAnalysis: (analysis: AiBriefAnalysis) => void;
  setIsSaving: (saving: boolean) => void;
  setIsCheckingBrief: (checking: boolean) => void;
  resetForm: () => void;
}

export const INITIAL_FORM: ProjectBriefFormData = {
  projectName: "Aurora X1 Launch",
  client: "Aurora Audio",
  brief:
    "Premium cinematic launch video for the Aurora X1 wireless headphones. Dark studio mood, slow reveals, metallic reflections.",
  duration: "30 seconds",
  aspectRatio: "16:9",
  stylePreference: "Cinematic, minimal",
  brandColors: ["#0E131D", "#E2E8F0", "#3B82F6"],
  typeface: "Inter",
};

export const INITIAL_ANALYSIS: AiBriefAnalysis = {
  missingItems: ["target audience.", "call-to-action text."],
  suggestedStructure: "6 scenes, about 5 s each.",
  isComplete: false,
};

export const useProjectCreationStore = create<ProjectCreationState>((set) => ({
  formData: INITIAL_FORM,
  analysis: INITIAL_ANALYSIS,
  isSaving: false,
  isCheckingBrief: false,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  updateField: (field, value) =>
    set((state) => ({ formData: { ...state.formData, [field]: value } })),
  setAnalysis: (analysis) => set({ analysis }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setIsCheckingBrief: (isCheckingBrief) => set({ isCheckingBrief }),
  resetForm: () =>
    set({
      formData: INITIAL_FORM,
      analysis: INITIAL_ANALYSIS,
      isSaving: false,
      isCheckingBrief: false,
    }),
}));

