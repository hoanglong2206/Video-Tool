import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
  bgmMood: "Cinematic Epic",
  soundMode: "full",
  files: DEMO_FILES,
};

export const INITIAL_SCENES: SceneBreakdownItem[] = [
  {
    sceneNumber: 1,
    title: "Mở đầu ấn tượng & Thiết lập bối cảnh",
    durationSeconds: 5,
    visualPrompt:
      "Extreme macro cinematic shot of Aurora X1 emerging from pitch-black infinity cove; 85mm anamorphic prime lens, f/1.8 shallow depth of field. 4:1 low-key dramatic studio rim-lighting in neon cyan (#06B6D4) and deep cobalt (#3B82F6) tracing brushed titanium chamfers; subtle volumetric haze, optical anamorphic streak flare. ACEScc color graded, Octane Render 2024, Unreal Engine 5.4 Lumen ray-tracing, photorealistic PBR shaders, 8K ultra-detailed --ar 16:9 --style raw.",
    voiceover:
      "Trong thế giới hỗn tạp, chuẩn mực âm học và cơ khí chính xác được tái định nghĩa.",
    cameraMovement:
      "Slow push-in 24fps với rotational orbit 15° arc, tiêu cự 85mm anamorphic prime, f/1.8 shallow DoF, studio rim-light",
  },
  {
    sceneNumber: 2,
    title: "Cận cảnh chi tiết & Vật liệu độc bản",
    durationSeconds: 5,
    visualPrompt:
      "Ultra-macro 100mm optical shot focusing on Aurora X1 acoustic ear cushions and micro-perforated dual microphone grille; breathable memory foam weave, laser-etched debossed branding. Razor-sharp specular edge highlights, soft top diffusion lighting with high-contrast shadows. Subsurface scattering on premium composite polymer, microscopic dust particles suspended in light beam, 8K hyper-detailed photorealism --ar 16:9.",
    voiceover:
      "Thiết kế công thái học hoàn hảo kết hợp vật liệu hàng không, mang đến sự tinh tế trong từng điểm chạm.",
    cameraMovement:
      "Ultra-macro horizontal tracking glide lướt cạnh viền titanium vát chamfer, depth of field rack focus mượt mà",
  },
  {
    sceneNumber: 3,
    title: "Bóc tách linh kiện 3D Exploded View",
    durationSeconds: 6,
    visualPrompt:
      "Seamless 3D exploded engineering diagram of Aurora X1: custom 40mm Beryllium acoustic driver, acoustic resonance chamber, Bluetooth 5.4 chipset and neodymium motor assembly suspended in zero-gravity. Multi-point rim lighting with glowing neon telemetry lines (#06B6D4), ray-traced reflections on copper voice coil, Cinema 4D + Redshift render, crystal-clear schematic presentation, 8K broadcast quality --ar 16:9.",
    voiceover:
      "Driver Beryllium 40mm tùy biến cùng công nghệ Hybrid ANC loại bỏ 99.8% tạp âm ngoại cảnh.",
    cameraMovement:
      "Rotational slow-motion 360° twist quanh lõi driver bóc tách đa tầng, dynamic exploded parts expansion",
  },
  {
    sceneNumber: 4,
    title: "Hiệu ứng sóng âm Kinetic Soundwave",
    durationSeconds: 5,
    visualPrompt:
      "Volumetric kinetic particle waves pulsing dynamically from Aurora X1 acoustic drivers, pulsing synchronously to deep sub-bass frequencies. Shockwave ripples in glowing electric cyan (#06B6D4) and cobalt (#3B82F6) distorting background reflections; high-speed 180° shutter angle, kinetic motion blur, Houdini particle simulation, Unreal Engine 5.4 Niagara VFX, ACEScc color science, 8K masterpiece --ar 16:9.",
    voiceover:
      "Âm thanh vòm Spatial Audio định vị chuẩn xác từng nhịp điệu, đưa bạn vào tâm điểm của buổi hòa nhạc.",
    cameraMovement:
      "Fast kinetic whip-pan zoom vào buồng âm học, 180° shutter angle, motion blur dồn dập kèm rung camera nhẹ",
  },
  {
    sceneNumber: 5,
    title: "Toàn cảnh sản phẩm hoàn thiện & Đẳng cấp",
    durationSeconds: 5,
    visualPrompt:
      "Full beauty turntable reveal of the assembled Aurora X1 resting on an acrylic pedestal with subtle mirrored reflections; dramatic 3-point studio lighting, dual-tone edge glow highlighting aerospace titanium headband and obsidian earcups. Golden ratio composition, soft atmospheric backlighting, Octane Render photorealistic studio commercial look, 8K pristine finish --ar 16:9.",
    voiceover:
      "Aurora X1 — Thời lượng pin 40 giờ, biểu tượng đỉnh cao của nghệ thuật cơ khí và âm học tương lai.",
    cameraMovement:
      "Sweeping crane down wide shot hạ xuống góc 3/4 hero beauty angle, khóa tiêu cự trung tâm tôn dáng sản phẩm",
  },
  {
    sceneNumber: 6,
    title: "Logo Reveal & Kêu gọi hành động (CTA)",
    durationSeconds: 4,
    visualPrompt:
      "Official vector logo of Aurora Audio debossed into matte carbon texture with anamorphic specular light flare sweeping across bevels. Sleek typography subtitle 'Aurora X1 Launch' with animated glowing CTA badge 'Order Now'. Minimalist obsidian background, high-contrast center symmetry, After Effects kinetic typography, 8K ultra-clean commercial lockup --ar 16:9.",
    voiceover:
      "Aurora Audio — Đặt trước ngay hôm nay để nhận ưu đãi giới hạn.",
    cameraMovement:
      "Locked static hero lockup chính diện đối xứng, specular light flare quét ngang logo kim loại hoàn thiện",
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
  _hasHydrated: boolean;
  step: CreationStep;
  formData: ProjectBriefFormData;
  aiOutput: FullAiAnalysisOutput;
  activeAiPipelineStage: number; // 0 = idle, 1 = LLM, 2 = Vision AI, 3 = Prompt Builder, 4 = JSON Schema Validator, 5 = Done
  isAnalyzing: boolean;
  isSaving: boolean;
  lastSavedAt: number | null;
  setHasHydrated: (hydrated: boolean) => void;
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
          newScenes[index] = { ...newScenes[index], ...updated };
          return {
            aiOutput: {
              ...state.aiOutput,
              scenes: newScenes,
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
