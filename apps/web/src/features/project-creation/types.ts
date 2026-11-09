export type MediaCategory = "image" | "video" | "logo" | "pdf" | "doc";

export interface UploadedMediaItem {
  id: string;
  name: string;
  size: string;
  category: MediaCategory;
  previewUrl?: string;
  visionTags?: string[];
}

export interface SceneBreakdownItem {
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  visualPrompt: string;
  voiceover: string;
  cameraMovement: string;
}

export interface AiVisionAnalysisResult {
  detectedObjects: string[];
  lightingStyle: string;
  colorPalette: string[];
  compositionRatio: string;
  brandIdentityScore: number;
}

export interface AiLlmAnalysisResult {
  coreMessage: string;
  targetAudience: string;
  toneOfVoice: string;
  keyHooks: string[];
  pacingStructure: string;
}

export interface JsonSchemaValidationResult {
  isValid: boolean;
  schemaName: string;
  schemaVersion: string;
  validatedFieldsCount: number;
  validationTimestamp: string;
  errors: string[];
}

export interface ProjectBriefFormData {
  projectName: string;
  client: string;
  brief: string;
  duration: string;
  aspectRatio: string;
  stylePreference: string;
  resolution: string;
  brandColors: string[];
  typeface: string;
  files: UploadedMediaItem[];
  bgmMood?: string;
  soundMode?: string;
}

export interface FullAiAnalysisOutput {
  llm: AiLlmAnalysisResult;
  vision: AiVisionAnalysisResult;
  promptBuilder: {
    generatedPromptsCount: number;
    targetEngines: string[];
    motionStyle: string;
  };
  schemaValidator: JsonSchemaValidationResult;
  scenes: SceneBreakdownItem[];
}

export interface AiBriefAnalysis {
  missingItems: string[];
  suggestedStructure: string;
  isComplete: boolean;
}

export type CreationStep = "input" | "processing" | "inspection";
