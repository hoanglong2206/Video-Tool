import {
  Film,
  ImagePlus,
  Layers,
  LayoutGrid,
  PlaySquare,
  Box,
  Volume2,
  Cpu,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export type PipelineStageId =
  | "storyboard"
  | "asset-planning"
  | "asset-processing"
  | "composition"
  | "motion"
  | "3d"
  | "sound"
  | "render"
  | "export";

export interface PipelineStageConfig {
  id: PipelineStageId;
  stepNumber: number;
  shortName: string;
  fullName: string;
  description: string;
  approvalLabel: string;
  icon: LucideIcon;
  badgeColor: string;
}

export const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    id: "storyboard",
    stepNumber: 2,
    shortName: "Storyboard",
    fullName: "Creative Direction & Storyboard",
    description: "AI tạo ý tưởng, kịch bản, shot list, storyboard và phong cách hình ảnh.",
    approvalLabel: "Human approval #2",
    icon: Film,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "asset-planning",
    stepNumber: 3,
    shortName: "Asset Gen",
    fullName: "Asset Planning & Generation",
    description: "Lập danh sách asset, tạo ảnh mới và chỉnh sửa ảnh khách hàng.",
    approvalLabel: "Human approval #3",
    icon: ImagePlus,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "asset-processing",
    stepNumber: 4,
    shortName: "Asset Prep",
    fullName: "Asset Processing & Organization",
    description: "Tách nền, tạo mask, chuẩn hóa kích thước, tạo phiên bản asset.",
    approvalLabel: "Human approval #4",
    icon: Layers,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "composition",
    stepNumber: 5,
    shortName: "Composition",
    fullName: "Scene Composition",
    description: "Đưa asset vào từng scene, bố cục, màu sắc, ánh sáng và typography.",
    approvalLabel: "Human approval #5",
    icon: LayoutGrid,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "motion",
    stepNumber: 6,
    shortName: "Motion",
    fullName: "Motion Design",
    description: "Xây dựng animation, camera movement, transition và visual effects.",
    approvalLabel: "Human approval #6",
    icon: PlaySquare,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "3d",
    stepNumber: 7,
    shortName: "3D Production",
    fullName: "3D Production",
    description: "Tạo sản phẩm 3D, camera, lighting, material và rendering.",
    approvalLabel: "Human approval #7",
    icon: Box,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "sound",
    stepNumber: 8,
    shortName: "Sound",
    fullName: "Sound Design",
    description: "Voice-over, background music, sound effects và đồng bộ nhịp.",
    approvalLabel: "Human approval #8",
    icon: Volume2,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "render",
    stepNumber: 9,
    shortName: "Rendering",
    fullName: "Video Rendering & Post-production",
    description: "Render scene, ghép timeline, chỉnh màu, audio và encoding.",
    approvalLabel: "Human approval #9",
    icon: Cpu,
    badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-700/60",
  },
  {
    id: "export",
    stepNumber: 10,
    shortName: "QC & Export",
    fullName: "Quality Control & Export",
    description: "Kiểm tra video, xuất các phiên bản và bàn giao khách hàng.",
    approvalLabel: "Final approval",
    icon: CheckCircle2,
    badgeColor: "bg-emerald-900 text-emerald-300 border-emerald-500",
  },
];

export const getStageById = (id: string): PipelineStageConfig | undefined => {
  return PIPELINE_STAGES.find((s) => s.id === id);
};

export const getNextStageId = (currentId: PipelineStageId): PipelineStageId | null => {
  const index = PIPELINE_STAGES.findIndex((s) => s.id === currentId);
  if (index >= 0 && index < PIPELINE_STAGES.length - 1) {
    return PIPELINE_STAGES[index + 1].id;
  }
  return null;
};

export const getPrevStageId = (currentId: PipelineStageId): PipelineStageId | null => {
  const index = PIPELINE_STAGES.findIndex((s) => s.id === currentId);
  if (index > 0) {
    return PIPELINE_STAGES[index - 1].id;
  }
  return null;
};

