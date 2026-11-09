import type {
  ProjectBriefFormData,
  FullAiAnalysisOutput,
  SceneBreakdownItem,
} from "../types";

export function generateDynamicAiAnalysis(
  formData: ProjectBriefFormData
): FullAiAnalysisOutput {
  const is15s = formData.duration === "15s";
  const is60s = formData.duration === "60s";

  // Durations for 6 scenes
  const sceneDurations = is15s
    ? [2, 3, 3, 3, 2, 2]
    : is60s
    ? [10, 10, 12, 10, 10, 8]
    : [5, 5, 6, 5, 5, 4]; // 30s

  const projectName = formData.projectName || "Dự án Video AI";
  const clientName = formData.client || "Thương hiệu";
  const style = formData.stylePreference || "3D Cinematic Minimal Tech";

  const scenes: SceneBreakdownItem[] = [
    {
      sceneNumber: 1,
      title: "Mở đầu ấn tượng & Thiết lập bối cảnh",
      durationSeconds: sceneDurations[0],
      visualPrompt: `Extreme macro cinematic close-up introducing ${projectName}, subtle lighting reflection with ${style} atmosphere, 8K hyper-detailed.`,
      voiceover: `Khởi đầu với ${clientName} — nơi chuẩn mực mới được định hình.`,
      cameraMovement: "Slow push-in with 24fps smooth orbit",
    },
    {
      sceneNumber: 2,
      title: "Cận cảnh chi tiết & Vật liệu độc bản",
      durationSeconds: sceneDurations[1],
      visualPrompt: `Ultra-detailed shot showcasing premium textures and acoustic ergonomics in ${style} aesthetic, ray-traced reflections.`,
      voiceover: "Thiết kế cơ học chính xác, mang đến sự tinh tế trong từng đường nét.",
      cameraMovement: "Horizontal tracking right, shallow depth of field",
    },
    {
      sceneNumber: 3,
      title: "Bóc tách công nghệ & Trọng tâm tính năng",
      durationSeconds: sceneDurations[2],
      visualPrompt: `Seamless 3D exploded diagram of internal components, floating precision engineering elements with dynamic glow.`,
      voiceover: "Công nghệ tiên phong được tối ưu hóa cho hiệu năng vượt trội.",
      cameraMovement: "Rotational slow-motion twist around core component",
    },
    {
      sceneNumber: 4,
      title: "Chuyển động năng động & Hiệu ứng tương tác",
      durationSeconds: sceneDurations[3],
      visualPrompt: `Volumetric kinetic particle effects syncing dynamically to audio rhythms, high contrast cinematic motion.`,
      voiceover: "Trải nghiệm liền mạch và bứt phá mọi giới hạn âm học.",
      cameraMovement: "Fast kinetic whip-pan zoom into product silhouette",
    },
    {
      sceneNumber: 5,
      title: "Toàn cảnh sản phẩm & Định vị thương hiệu",
      durationSeconds: sceneDurations[4],
      visualPrompt: `Full beauty turntable reveal of ${projectName} in dramatic studio rim-lighting, glowing metallic accents.`,
      voiceover: `${projectName} — Khẳng định đẳng cấp dẫn đầu thế hệ mới.`,
      cameraMovement: "Crane down wide shot to hero beauty angle",
    },
    {
      sceneNumber: 6,
      title: "Logo Reveal & Kêu gọi hành động (CTA)",
      durationSeconds: sceneDurations[5],
      visualPrompt: `${clientName} brand logo debossed into matte surface, official CTA badge and website link animation.`,
      voiceover: "Đặt trước ngay hôm nay để trở thành người dẫn đầu.",
      cameraMovement: "Locked static hero shot with glowing light flare",
    },
  ];

  const brandColors =
    formData.brandColors && formData.brandColors.length > 0
      ? formData.brandColors
      : ["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"];

  const detectedObjects = [
    `${projectName} (Sản phẩm chính)`,
    "Vật liệu hoàn thiện cao cấp",
    "Logo & Nhận diện vector",
    "Bảng màu ánh sáng Studio",
  ];
  if (formData.files && formData.files.length > 0) {
    formData.files.slice(0, 3).forEach((f) => {
      detectedObjects.push(`${f.name} (${f.category.toUpperCase()})`);
    });
  }

  return {
    llm: {
      coreMessage: `Định vị ${projectName} cho ${clientName}: Truyền tải thông điệp đột phá, phong cách ${style} và giá trị vượt trội.`,
      targetAudience: `Nhà sáng tạo, chuyên gia công nghệ và khách hàng cao cấp từ 20-45 tuổi theo kênh ${formData.targetChannel || "Đa nền tảng"}.`,
      toneOfVoice: `Cinematic, Tinh tế, Uy quyền công nghệ, Trực quan (${style}).`,
      keyHooks: [
        `Công nghệ độc quyền từ ${clientName}`,
        `Thiết kế tối ưu theo phong cách ${style}`,
        `Thời lượng cô đọng ${formData.duration} tối ưu tỷ lệ giữ chân người xem`,
      ],
      pacingStructure: is15s
        ? "0-3s Hook cuốn hút -> 3-11s Trình diễn công nghệ -> 11-15s CTA chốt đơn."
        : is60s
        ? "0-10s Khơi gợi vấn đề -> 10-40s Bóc tách công nghệ sâu -> 40-60s Cao trào & CTA."
        : "0-5s Hook ấn tượng -> 5-22s Chứng minh tính năng -> 22-30s Bùng nổ thương hiệu & CTA.",
    },
    vision: {
      detectedObjects,
      lightingStyle: `Studio Rim Lighting, 4:1 Contrast Ratio (${style})`,
      colorPalette: brandColors,
      compositionRatio: `${formData.aspectRatio || "16:9"} High Definition Standard`,
      brandIdentityScore: 98,
    },
    promptBuilder: {
      generatedPromptsCount: 6,
      targetEngines: ["Remotion 4.x", "ComfyUI SDXL", "Blender Cycles 4.2"],
      motionStyle: "Kinetic Easing Curves (Cubic Bezier 0.16, 1, 0.3, 1)",
    },
    schemaValidator: {
      isValid: true,
      schemaName: "ProjectSpec.v2.json",
      schemaVersion: "2.4.0",
      validatedFieldsCount: 24,
      validationTimestamp: new Date().toISOString(),
      errors: [],
    },
    scenes,
  };
}

