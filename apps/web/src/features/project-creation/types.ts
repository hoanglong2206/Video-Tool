export type MediaCategory = "image" | "video" | "logo" | "pdf" | "doc";

export interface AssetVersionSnapshot {
  versionNumber: number;
  filePath: string;
  changeDescription: string;
  isTransparent: boolean;
  fileSizeBytes: number;
  createdAt: string;
}

export interface UploadedMediaItem {
  id: string;
  name: string;
  size: string;
  category: MediaCategory;
  previewUrl?: string;
  visionTags?: string[];
  dimensions?: string;
  fileSizeBytes?: number;
  activeVersion?: number;
  versions?: AssetVersionSnapshot[];
}

export interface SceneVersionSnapshot {
  versionNumber: number;
  title: string;
  visualPrompt: string;
  voiceover: string;
  cameraMovement: string;
  createdAt: string;
  role: string;
}

export interface SceneCamera3dParams {
  fov: number;
  lens: string;
  dof: number;
  orbit: string;
}

export interface SceneLightingRig {
  rimLight: string;
  keyRatio: string;
  style: string;
}

export interface SceneBreakdownItem {
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  visualPrompt: string;
  voiceover: string;
  cameraMovement: string;
  activeVersion?: number;
  versions?: SceneVersionSnapshot[];
  camera3dParams?: SceneCamera3dParams;
  lightingRig?: SceneLightingRig;
}

export interface BrandKitItem {
  id: string;
  name: string;
  clientName: string;
  colors: string[];
  typeface: string;
  toneOfVoice: string;
  rulesGuidelines?: string;
}

export interface SceneTemplateItem {
  id: string;
  title: string;
  category: string;
  defaultDuration: number;
  sceneCount: number;
  description: string;
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
  brandKitId?: string;
  templateId?: string;
  autoDucking?: boolean;
  voiceoverVoice?: string;
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
  temporalWorkflowId?: string;
}

export interface AiBriefAnalysis {
  missingItems: string[];
  suggestedStructure: string;
  isComplete: boolean;
}

export type CreationStep = "input" | "processing" | "inspection";
