import { create } from "zustand";
import type {
  ProjectBriefFormData,
  FullAiAnalysisOutput,
  CreationStep,
  UploadedMediaItem,
  SceneBreakdownItem,
} from "../types";

export const DEMO_FILES: UploadedMediaItem[] = [
  {
    id: "f-1",
    name: "aurora-logo-vector.svg",
    size: "142 KB",
    category: "logo",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60",
    visionTags: ["Vector Logo", "High Contrast", "Cyan & Indigo"],
  },
  {
    id: "f-2",
    name: "aurora-headphones-hero.png",
    size: "3.4 MB",
    category: "image",
    previewUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60",
    visionTags: ["Matte Black", "Metallic Hinge", "Studio Lighting"],
  },
  {
    id: "f-3",
    name: "soundwave-reference.mp4",
    size: "18.2 MB",
    category: "video",
    previewUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=60",
    visionTags: ["Kinetic Motion", "Pacing 120BPM", "Neon Blue Wave"],
  },
  {
    id: "f-4",
    name: "Aurora-Brand-Guidelines-2026.pdf",
    size: "5.1 MB",
    category: "pdf",
    visionTags: ["Brand Spec", "Dark Theme", "Font: Inter 700"],
  },
];

export const INITIAL_FORM: ProjectBriefFormData = {
  projectName: "Aurora X1 Launch",
  client: "Aurora Audio",
  brief:
    "Video giới thiệu sản phẩm cao cấp tai nghe không dây chống ồn Aurora X1. Phong cách cinematic tối màu, ánh sáng viền studio (rim-light), hiệu ứng chuyển động kim loại phản chiếu, âm thanh dồn dập kịch tính và tiết lộ sản phẩm bùng nổ.",
  duration: "30s",
  aspectRatio: "16:9",
  stylePreference: "3D Cinematic Minimal Tech",
  resolution: "4K UHD",
  brandColors: ["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"],
  typeface: "Inter Display",
  files: DEMO_FILES,
};

export const INITIAL_SCENES: SceneBreakdownItem[] = [
  {
    sceneNumber: 1,
    title: "Khởi đầu bóng tối & Nhịp đập âm thanh",
    durationSeconds: 5,
    visualPrompt: "Extreme macro shot of brushed titanium headband emerging from pitch-black darkness, subtle neon cyan edge glow.",
    voiceover: "Trong thế giới hỗn tạp, âm thanh đích thực bắt đầu từ sự tĩnh lặng.",
    cameraMovement: "Slow push-in with 24fps orbit",
  },
  {
    sceneNumber: 2,
    title: "Cận cảnh đệm tai & Công nghệ chống ồn",
    durationSeconds: 5,
    visualPrompt: "Ultra-detailed shot of memory foam earcup, acoustic mesh micro-textures reacting to invisible sound waves.",
    voiceover: "Công nghệ Adaptive Hybrid ANC thế hệ mới — loại bỏ 99.8% tạp âm.",
    cameraMovement: "Horizontal tracking right, depth of field shift",
  },
  {
    sceneNumber: 3,
    title: "Bóc tách linh kiện 3D Exploded View",
    durationSeconds: 6,
    visualPrompt: "Seamless 3D exploded diagram of 40mm Beryllium driver, acoustic chamber and Bluetooth 5.4 chip floating in zero gravity.",
    voiceover: "Driver Beryllium 40mm tùy biến, tái tạo dải âm từ 10Hz đến 45kHz.",
    cameraMovement: "Rotational slow-motion twist around driver core",
  },
  {
    sceneNumber: 4,
    title: "Hiệu ứng sóng âm Kinetic Soundwave",
    durationSeconds: 5,
    visualPrompt: "Volumetric kinetic particle waves pulsing from earcups, syncing dynamically to deep bass frequencies.",
    voiceover: "Âm thanh vòm Spatial Audio định vị chuẩn từng nhịp điệu.",
    cameraMovement: "Fast kinetic whip-pan zoom into acoustic cavity",
  },
  {
    sceneNumber: 5,
    title: "Toàn cảnh sản phẩm hoàn thiện",
    durationSeconds: 5,
    visualPrompt: "Full beauty turntable reveal of Aurora X1 in dramatic studio rim-lighting, glowing metallic accents.",
    voiceover: "Thời lượng pin 40 giờ. Đỉnh cao của nghệ thuật cơ khí và âm học.",
    cameraMovement: "Crane down wide shot to hero beauty angle",
  },
  {
    sceneNumber: 6,
    title: "Logo Reveal & Kêu gọi hành động (CTA)",
    durationSeconds: 4,
    visualPrompt: "Aurora Audio vector logo debossed into matte carbon surface, with website CTA and pre-order badge.",
    voiceover: "Aurora X1 — Đặt trước ngay hôm nay để nhận ưu đãi giới hạn.",
    cameraMovement: "Locked static hero shot with glowing light flare",
  },
];

export const INITIAL_AI_OUTPUT: FullAiAnalysisOutput = {
  llm: {
    coreMessage: "Định vị Aurora X1 là tai nghe audiophile chống ồn công nghệ cao hàng đầu, kết hợp giữa sự tối giản sang trọng và âm học chính xác.",
    targetAudience: "Nhà sáng tạo nội dung, Audiophile, chuyên gia công nghệ từ 22 - 40 tuổi.",
    toneOfVoice: "Cinematic, Tinh tế, Uy quyền công nghệ, Kịch tính.",
    keyHooks: [
      "Hybrid ANC loại bỏ 99.8% tiếng ồn",
      "Driver Beryllium 40mm độ phân giải cao",
      "Pin 40 giờ & Sạc nhanh 10 phút",
    ],
    pacingStructure: "0-5s bí ẩn cuốn hút -> 5-20s chứng minh công nghệ đỉnh cao -> 20-30s bùng nổ âm thanh & CTA.",
  },
  vision: {
    detectedObjects: [
      "Over-Ear Headphones (Tai nghe chụp tai)",
      "Brushed Titanium Finish (Kim loại phay xước)",
      "Acoustic Foam Cushions (Đệm mút âm học)",
      "Dual Microphone Grille (Lưới mic kép)",
    ],
    lightingStyle: "Low-key Studio Rim Lighting, 4:1 Contrast Ratio, High specular highlights",
    colorPalette: ["#0B0F17", "#1E2638", "#3B82F6", "#06B6D4", "#E2E8F0"],
    compositionRatio: "16:9 Cinema Scope",
    brandIdentityScore: 98,
  },
  promptBuilder: {
    generatedPromptsCount: 6,
    targetEngines: ["Remotion 4.x", "ComfyUI SDXL", "Blender Cycles 4.2"],
    motionStyle: "Kinetic Easing Curves (Cubic Bezier 0.16, 1, 0.3, 1)",
  },
  schemaValidator: {
    isValid: true,
    schemaName: "VideoProductionSpec_v2.json",
    schemaVersion: "2.4.0",
    validatedFieldsCount: 24,
    validationTimestamp: "2026-11-06T14:10:00Z",
    errors: [],
  },
  scenes: INITIAL_SCENES,
};

interface ProjectCreationStoreState {
  step: CreationStep;
  formData: ProjectBriefFormData;
  aiOutput: FullAiAnalysisOutput;
  activeAiPipelineStage: number; // 0 = idle, 1 = LLM, 2 = Vision AI, 3 = Prompt Builder, 4 = JSON Schema Validator
  isAnalyzing: boolean;
  isSaving: boolean;
  setStep: (step: CreationStep) => void;
  updateField: <K extends keyof ProjectBriefFormData>(field: K, value: ProjectBriefFormData[K]) => void;
  addFile: (file: UploadedMediaItem) => void;
  removeFile: (id: string) => void;
  addDemoFiles: () => void;
  setAiOutput: (output: FullAiAnalysisOutput) => void;
  updateScene: (index: number, updated: Partial<SceneBreakdownItem>) => void;
  setActiveAiPipelineStage: (stage: number) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  resetForm: () => void;
}

export const useProjectCreationStore = create<ProjectCreationStoreState>((set) => ({
  step: "input",
  formData: INITIAL_FORM,
  aiOutput: INITIAL_AI_OUTPUT,
  activeAiPipelineStage: 0,
  isAnalyzing: false,
  isSaving: false,
  setStep: (step) => set({ step }),
  updateField: (field, value) =>
    set((state) => ({ formData: { ...state.formData, [field]: value } })),
  addFile: (file) =>
    set((state) => ({
      formData: { ...state.formData, files: [...state.formData.files, file] },
    })),
  removeFile: (id) =>
    set((state) => ({
      formData: {
        ...state.formData,
        files: state.formData.files.filter((f) => f.id !== id),
      },
    })),
  addDemoFiles: () =>
    set((state) => ({
      formData: { ...state.formData, files: DEMO_FILES },
    })),
  setAiOutput: (aiOutput) => set({ aiOutput }),
  updateScene: (index, updated) =>
    set((state) => {
      const newScenes = [...state.aiOutput.scenes];
      newScenes[index] = { ...newScenes[index], ...updated };
      return {
        aiOutput: {
          ...state.aiOutput,
          scenes: newScenes,
        },
      };
    }),
  setActiveAiPipelineStage: (activeAiPipelineStage) =>
    set({ activeAiPipelineStage }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setIsSaving: (isSaving) => set({ isSaving }),
  resetForm: () =>
    set({
      step: "input",
      formData: INITIAL_FORM,
      aiOutput: INITIAL_AI_OUTPUT,
      activeAiPipelineStage: 0,
      isAnalyzing: false,
      isSaving: false,
    }),
}));
