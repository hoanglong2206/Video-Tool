import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ProjectBriefFormData,
  FullAiAnalysisOutput,
  CreationStep,
  UploadedMediaItem,
  SceneBreakdownItem,
} from "../types";
import {
  INITIAL_FORM,
  INITIAL_SCENES,
  INITIAL_AI_OUTPUT,
  DEMO_FILES,
  BRAND_KIT_PRESETS,
  SCENE_TEMPLATE_PRESETS,
} from "./initialData";

interface ProjectCreationStoreState {
  _hasHydrated: boolean;
  step: CreationStep;
  formData: ProjectBriefFormData;
  aiOutput: FullAiAnalysisOutput;
  activeAiPipelineStage: number;
  isAnalyzing: boolean;
  isSaving: boolean;
  lastSavedAt: number | null;
  setHasHydrated: (hydrated: boolean) => void;
  setStep: (step: CreationStep) => void;
  updateField: <K extends keyof ProjectBriefFormData>(
    field: K,
    value: ProjectBriefFormData[K]
  ) => void;
  addFile: (file: UploadedMediaItem) => void;
  removeFile: (id: string) => void;
  addDemoFiles: () => void;
  setAiOutput: (output: FullAiAnalysisOutput) => void;
  updateScene: (index: number, updated: Partial<SceneBreakdownItem>) => void;
  rollbackSceneVersion: (sceneIndex: number, versionNumber: number) => void;
  selectAssetVersion: (assetId: string, versionNumber: number) => void;
  applyBrandKit: (kitId: string) => void;
  applySceneTemplate: (templateId: string) => void;
  setActiveAiPipelineStage: (stage: number) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  resetForm: () => void;
  clearDraft: () => void;
}

export const useProjectCreationStore = create<ProjectCreationStoreState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      step: "input",
      formData: INITIAL_FORM,
      aiOutput: INITIAL_AI_OUTPUT,
      activeAiPipelineStage: 0,
      isAnalyzing: false,
      isSaving: false,
      lastSavedAt: null,
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      setStep: (step) => set({ step, lastSavedAt: Date.now() }),
      updateField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
          lastSavedAt: Date.now(),
        })),
      addFile: (file) =>
        set((state) => ({
          formData: { ...state.formData, files: [...state.formData.files, file] },
          lastSavedAt: Date.now(),
        })),
      removeFile: (id) =>
        set((state) => ({
          formData: {
            ...state.formData,
            files: state.formData.files.filter((f) => f.id !== id),
          },
          lastSavedAt: Date.now(),
        })),
      addDemoFiles: () =>
        set((state) => ({
          formData: { ...state.formData, files: DEMO_FILES },
          lastSavedAt: Date.now(),
        })),
      setAiOutput: (aiOutput) => set({ aiOutput, lastSavedAt: Date.now() }),
      updateScene: (index, updated) =>
        set((state) => {
          const newScenes = [...state.aiOutput.scenes];
          const curr = newScenes[index];
          const prevVersions = curr.versions || [];
          // If title/prompt changed, push to snapshot history if not duplicate
          const nextVerNum = (curr.activeVersion || 1) + 1;
          const updatedVersions = [
            ...prevVersions,
            {
              versionNumber: nextVerNum,
              title: updated.title ?? curr.title,
              visualPrompt: updated.visualPrompt ?? curr.visualPrompt,
              voiceover: updated.voiceover ?? curr.voiceover,
              cameraMovement: updated.cameraMovement ?? curr.cameraMovement,
              createdAt: "Bản sửa đổi",
              role: "human_editor",
            },
          ];
          newScenes[index] = {
            ...curr,
            ...updated,
            activeVersion: nextVerNum,
            versions: updatedVersions,
          };
          return {
            aiOutput: { ...state.aiOutput, scenes: newScenes },
            lastSavedAt: Date.now(),
          };
        }),
      rollbackSceneVersion: (sceneIndex, versionNumber) =>
        set((state) => {
          const newScenes = [...state.aiOutput.scenes];
          const scene = newScenes[sceneIndex];
          const targetVer = scene.versions?.find((v) => v.versionNumber === versionNumber);
          if (targetVer) {
            newScenes[sceneIndex] = {
              ...scene,
              title: targetVer.title,
              visualPrompt: targetVer.visualPrompt,
              voiceover: targetVer.voiceover,
              cameraMovement: targetVer.cameraMovement,
              activeVersion: versionNumber,
            };
          }
          return {
            aiOutput: { ...state.aiOutput, scenes: newScenes },
            lastSavedAt: Date.now(),
          };
        }),
      selectAssetVersion: (assetId, versionNumber) =>
        set((state) => {
          const updatedFiles = state.formData.files.map((file) => {
            if (file.id === assetId) {
              const targetVer = file.versions?.find((v) => v.versionNumber === versionNumber);
              return {
                ...file,
                activeVersion: versionNumber,
                previewUrl: targetVer ? targetVer.filePath : file.previewUrl,
              };
            }
            return file;
          });
          return {
            formData: { ...state.formData, files: updatedFiles },
            lastSavedAt: Date.now(),
          };
        }),
      applyBrandKit: (kitId) =>
        set((state) => {
          const kit = BRAND_KIT_PRESETS.find((k) => k.id === kitId);
          if (!kit) return state;
          return {
            formData: {
              ...state.formData,
              brandKitId: kit.id,
              client: kit.clientName,
              brandColors: kit.colors,
              typeface: kit.typeface,
            },
            lastSavedAt: Date.now(),
          };
        }),
      applySceneTemplate: (templateId) =>
        set((state) => {
          const tmpl = SCENE_TEMPLATE_PRESETS.find((t) => t.id === templateId);
          if (!tmpl) return state;
          return {
            formData: {
              ...state.formData,
              templateId: tmpl.id,
              duration: `${tmpl.defaultDuration}s`,
            },
            lastSavedAt: Date.now(),
          };
        }),
      setActiveAiPipelineStage: (activeAiPipelineStage) =>
        set({ activeAiPipelineStage, lastSavedAt: Date.now() }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      setIsSaving: (isSaving) => set({ isSaving }),
      resetForm: () => {
        set({
          step: "input",
          formData: INITIAL_FORM,
          aiOutput: INITIAL_AI_OUTPUT,
          activeAiPipelineStage: 0,
          isAnalyzing: false,
          isSaving: false,
          lastSavedAt: null,
        });
      },
      clearDraft: () => {
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("video_ai_project_creation_draft_v1");
          } catch (e) {
            console.warn("Could not remove draft from localStorage:", e);
          }
        }
        get().resetForm();
      },
    }),
    {
      name: "video_ai_project_creation_draft_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        step: state.step,
        formData: state.formData,
        aiOutput: state.aiOutput,
        activeAiPipelineStage: state.activeAiPipelineStage,
        lastSavedAt: state.lastSavedAt,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        state?.setIsAnalyzing(false);
        state?.setIsSaving(false);
      },
    }
  )
);

export { BRAND_KIT_PRESETS, SCENE_TEMPLATE_PRESETS, DEMO_FILES, INITIAL_FORM, INITIAL_SCENES, INITIAL_AI_OUTPUT };
