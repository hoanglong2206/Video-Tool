export interface LibraryCategory {
  id: string;
  name: string;
  count: number;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: "scene" | "motion";
}

export interface BrandKitInfo {
  name: string;
  colors: string[];
  typeface: string;
  guidelines: string;
  usageCount: number;
}

