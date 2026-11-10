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

  const sceneDurations = is15s
    ? [2, 3, 3, 3, 2, 2]
    : is60s
    ? [10, 10, 12, 10, 10, 8]
    : [5, 5, 6, 5, 5, 4]; // 30s

  const projectName = formData.projectName || "Aurora X1 Launch";
  const clientName = formData.client || "Aurora Audio";

  let style = formData.stylePreference || "3D Cinematic Minimal Tech";
  if (style.toLowerCase().includes("auto")) {
    const briefLower = (formData.brief || "").toLowerCase();
    if (briefLower.includes("neon") || briefLower.includes("cyber")) {
      style = "Cyberpunk Neon";
    } else if (briefLower.includes("sang") || briefLower.includes("luxury")) {
      style = "Minimal Luxury";
    } else if (briefLower.includes("motion") || briefLower.includes("nhanh")) {
      style = "Kinetic Motion";
    } else {
      style = "3D Cinematic Minimal Tech";
    }
  }

  const brandColors =
    formData.brandColors && formData.brandColors.length > 0
      ? formData.brandColors
      : ["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"];

  const primaryCol = brandColors[1] || "#3B82F6";
  const accentCol = brandColors[2] || "#06B6D4";
  const aspect = formData.aspectRatio || "16:9";

  const baseScenes: Omit<SceneBreakdownItem, "camera3dParams" | "lightingRig">[] = [
    {
      sceneNumber: 1,
      title: "Mở đầu ấn tượng & Thiết lập bối cảnh",
      durationSeconds: sceneDurations[0],
      visualPrompt: `Extreme macro cinematic shot of ${projectName} emerging from pitch-black infinity cove; 85mm anamorphic prime lens, f/1.8 shallow depth of field. 4:1 low-key dramatic studio rim-lighting in neon cyan (${accentCol}) and deep cobalt (${primaryCol}) tracing brushed titanium chamfers; subtle volumetric haze, optical anamorphic streak flare. ACEScc color graded, Octane Render 2024, Unreal Engine 5.4 Lumen ray-tracing, photorealistic PBR shaders, 8K ultra-detailed --ar ${aspect} --style raw.`,
      voiceover: `Khởi đầu với ${clientName} — nơi chuẩn mực âm học và cơ khí chính xác được tái định nghĩa.`,
      cameraMovement: "Slow push-in 24fps với rotational orbit 15° arc, tiêu cự 85mm anamorphic prime, f/1.8 shallow DoF, studio rim-light",
    },
    {
      sceneNumber: 2,
      title: "Cận cảnh chi tiết & Vật liệu độc bản",
      durationSeconds: sceneDurations[1],
      visualPrompt: `Ultra-macro 100mm optical shot focusing on ${projectName} acoustic ear cushions and micro-perforated dual microphone grille; breathable memory foam weave, laser-etched debossed branding. Razor-sharp specular edge highlights, soft top diffusion lighting with high-contrast shadows. Subsurface scattering on premium composite polymer, microscopic dust particles suspended in light beam, 8K hyper-detailed photorealism --ar ${aspect}.`,
      voiceover: "Thiết kế công thái học hoàn hảo kết hợp vật liệu hàng không, mang đến sự tinh tế trong từng điểm chạm.",
      cameraMovement: "Ultra-macro horizontal tracking glide lướt cạnh viền titanium vát chamfer, depth of field rack focus mượt mà",
    },
    {
      sceneNumber: 3,
      title: "Bóc tách công nghệ 3D Exploded View",
      durationSeconds: sceneDurations[2],
      visualPrompt: `Seamless 3D exploded engineering diagram of ${projectName}: custom 40mm Beryllium acoustic driver, acoustic resonance chamber, Bluetooth 5.4 chipset and neodymium motor assembly suspended in zero-gravity. Multi-point rim lighting with glowing neon telemetry lines (${accentCol}), ray-traced reflections on copper voice coil, Cinema 4D + Redshift render, crystal-clear schematic presentation, 8K broadcast quality --ar ${aspect}.`,
      voiceover: "Driver Beryllium 40mm tùy biến cùng công nghệ Hybrid ANC loại bỏ 99.8% tạp âm ngoại cảnh.",
      cameraMovement: "Rotational slow-motion 360° twist quanh lõi driver bóc tách đa tầng, dynamic exploded parts expansion",
    },
    {
      sceneNumber: 4,
      title: "Chuyển động sóng âm & Năng lượng Kinetic",
      durationSeconds: sceneDurations[3],
      visualPrompt: `Volumetric kinetic particle waves pulsing dynamically from ${projectName} acoustic drivers, pulsing synchronously to deep sub-bass frequencies. Shockwave ripples in glowing electric cyan (${accentCol}) and cobalt (${primaryCol}) distorting background reflections; high-speed 180° shutter angle, kinetic motion blur, Houdini particle simulation, Unreal Engine 5.4 Niagara VFX, ACEScc color science, 8K masterpiece --ar ${aspect}.`,
      voiceover: "Âm thanh vòm Spatial Audio định vị chuẩn xác từng nhịp điệu, đưa bạn vào tâm điểm của buổi hòa nhạc.",
      cameraMovement: "Fast kinetic whip-pan zoom vào buồng âm học, 180° shutter angle, motion blur dồn dập kèm rung camera nhẹ",
    },
    {
      sceneNumber: 5,
      title: "Toàn cảnh sản phẩm hoàn thiện & Đẳng cấp",
      durationSeconds: sceneDurations[4],
      visualPrompt: `Full beauty turntable reveal of the assembled ${projectName} resting on an acrylic pedestal with subtle mirrored reflections; dramatic 3-point studio lighting, dual-tone edge glow highlighting aerospace titanium headband and obsidian earcups. Golden ratio composition, soft atmospheric backlighting, Octane Render photorealistic studio commercial look, 8K pristine finish --ar ${aspect}.`,
      voiceover: `${projectName} — Thời lượng pin 40 giờ, biểu tượng đỉnh cao của nghệ thuật cơ khí và âm học tương lai.`,
      cameraMovement: "Sweeping crane down wide shot hạ xuống góc 3/4 hero beauty angle, khóa tiêu cự trung tâm tôn dáng sản phẩm",
    },
    {
      sceneNumber: 6,
      title: "Logo Reveal & Kêu gọi hành động (CTA)",
      durationSeconds: sceneDurations[5],
      visualPrompt: `Official vector logo of ${clientName} debossed into matte carbon texture with anamorphic specular light flare sweeping across bevels. Sleek typography subtitle '${projectName} Launch' with animated glowing CTA badge 'Order Now'. Minimalist obsidian background, high-contrast center symmetry, After Effects kinetic typography, 8K ultra-clean commercial lockup --ar ${aspect}.`,
      voiceover: `${clientName} — Đặt trước ngay hôm nay để nhận ưu đãi giới hạn.`,
      cameraMovement: "Locked static hero lockup chính diện đối xứng, specular light flare quét ngang logo kim loại hoàn thiện",
    },
  ];

  const cameraPresets = [
    { fov: 35, lens: "85mm", dof: 1.8, orbit: "Slow Orbit 15° Arc" },
    { fov: 28, lens: "100mm", dof: 2.0, orbit: "Horizontal Glide" },
    { fov: 45, lens: "50mm", dof: 2.8, orbit: "Rotational 360° Twist" },
    { fov: 50, lens: "35mm", dof: 4.0, orbit: "Fast Whip-Pan Zoom" },
    { fov: 40, lens: "50mm", dof: 2.0, orbit: "Sweeping Crane Down 3/4" },
    { fov: 35, lens: "85mm", dof: 5.6, orbit: "Locked Static Frontal" },
  ];

  const scenes: SceneBreakdownItem[] = baseScenes.map((s, idx) => ({
    ...s,
    activeVersion: 1,
    camera3dParams: cameraPresets[idx],
    lightingRig: { rimLight: accentCol, keyRatio: "4:1", style: `${style} Studio Rig` },
    versions: [
      {
        versionNumber: 1,
        title: s.title,
        visualPrompt: s.visualPrompt,
        voiceover: s.voiceover,
        cameraMovement: s.cameraMovement,
        createdAt: "AI Đã tối ưu",
        role: "ai_llm",
      },
    ],
  }));

  const detectedObjects = [
    `${projectName} (Sản phẩm chính)`,
    "Vật liệu hoàn thiện cao cấp (Aerospace Titanium)",
    "Logo & Nhận diện vector debossed",
    "Hệ màu ánh sáng Studio 4:1",
  ];
  if (formData.files && formData.files.length > 0) {
    formData.files.slice(0, 3).forEach((f) => {
      detectedObjects.push(`${f.name} (${f.category.toUpperCase()})`);
    });
  }

  return {
    llm: {
      coreMessage: `Định vị ${projectName} cho ${clientName}: Truyền tải thông điệp đột phá, phong cách ${style} và giá trị vượt trội.`,
      targetAudience: `Nhà sáng tạo, chuyên gia công nghệ và khách hàng cao cấp từ 20-45 tuổi (Đa nền tảng).`,
      toneOfVoice: `Cinematic, Tinh tế, Uy quyền công nghệ, Trực quan (${style}).`,
      keyHooks: [
        `Công nghệ âm học độc quyền từ ${clientName}`,
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
    temporalWorkflowId: `wf-temporal-${Math.random().toString(36).substring(2, 8)}`,
  };
}
