export interface LibraryCategory {
  id: string;
  name: string;
  count: number;
  isActive?: boolean;
}

export interface SceneTemplate {
  id: string;
  title: string;
  category: "scene" | "motion" | "lighting" | "3d_model" | string;
  isSelected?: boolean;
}

export interface BrandKit {
  id: string;
  name: string;
  colors: string[];
  typeface: string;
  guideline: string;
  usageCount: number;
  logoUrl?: string;
}

export interface AssetLibraryResponse {
  categories: LibraryCategory[];
  templates: SceneTemplate[];
  brandKits: BrandKit[];
}

export interface ApplyBrandKitInput {
  project_id: string;
  brand_kit_id: string;
}

export interface ApplyBrandKitResponse {
  status: string;
  projectId: string;
  appliedBrandKit: BrandKit;
}

