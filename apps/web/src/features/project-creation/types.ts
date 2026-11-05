export interface ProjectBriefFormData {
  projectName: string;
  client: string;
  brief: string;
  duration: string;
  aspectRatio: string;
  stylePreference: string;
  brandColors: string[];
  typeface: string;
}

export interface AiBriefAnalysis {
  missingItems: string[];
  suggestedStructure: string;
  isComplete: boolean;
}

export interface ProgressStep {
  number: number;
  label: string;
  isDone: boolean;
  isActive: boolean;
}
