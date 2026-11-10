export interface CameraLensOption {
  id: string;
  name: string;
  desc: string;
}

export interface DofPresetOption {
  val: number;
  desc: string;
}

export interface TransitionPresetOption {
  id: string;
  label: string;
  desc: string;
}

export const CAMERA_LENSES: CameraLensOption[] = [
  { id: "24mm", name: "24mm Wide", desc: "Góc rộng bao quát toàn cảnh không gian" },
  { id: "35mm", name: "35mm Standard", desc: "Góc nhìn tự nhiên chuẩn mắt người" },
  { id: "50mm", name: "50mm Prime", desc: "Chuẩn nhiếp ảnh sản phẩm thương mại" },
  { id: "85mm", name: "85mm Tele", desc: "Xóa phông nén không gian tôn nổi bật sản phẩm" },
  { id: "100mm", name: "100mm Macro", desc: "Siêu cận cảnh phóng đại chi tiết vật liệu tinh xảo" },
];

export const DOF_PRESETS: DofPresetOption[] = [
  { val: 1.4, desc: "Xóa phông mờ mịt cực mạnh, hút mắt vào chi tiết chính" },
  { val: 1.8, desc: "Độ sâu trường nông điện ảnh, tách lớp chủ thể mượt mà" },
  { val: 2.8, desc: "Hậu cảnh rõ nét vừa phải, cân đối không gian" },
  { val: 5.6, desc: "Toàn cảnh sắc nét chi tiết từ tiền cảnh đến hậu cảnh" },
];

export const TRANSITION_PRESETS: TransitionPresetOption[] = [
  { id: "Cut", label: "Cut", desc: "Cắt trực tiếp dứt khoát chuẩn điện ảnh" },
  { id: "Cross Dissolve", label: "Dissolve", desc: "Hòa tan êm dịu, chuyển tiếp tự nhiên giữa các phân đoạn" },
  { id: "Whip Pan Blur", label: "Whip-Pan", desc: "Gia tốc chuyển động vệt mờ dồn dập, tạo nhịp phim kịch tính" },
  { id: "Zoom Push", label: "Zoom Push", desc: "Đẩy phóng nhanh xuyên thấu tâm điểm sản phẩm" },
  { id: "Light Leak", label: "Light Leak", desc: "Vệt tia sáng lóa studio cao cấp tôn chất liệu bóng bẩy" },
  { id: "Fade to Black", label: "Fade Black", desc: "Chìm dần vào bóng tối kết thúc trường đoạn" },
  { id: "Fade to White", label: "Fade White", desc: "Lóa sáng rực rỡ mở ra phân đoạn bừng sáng mới" },
  { id: "Glitch Digital", label: "Glitch", desc: "Nhiễu hạt quang sai kỹ thuật số phong cách Cyberpunk & Tech" },
  { id: "Film Burn", label: "Film Burn", desc: "Cháy phim cổ điển ấm áp tạo cảm giác sang trọng thủ công" },
  { id: "Spin Orbit 360", label: "Spin Orbit", desc: "Xoay vòng gia tốc xoắn ốc 360° khóa tâm điểm sản phẩm" },
  { id: "RGB Split Wipe", label: "RGB Split", desc: "Tách lớp quang phổ 3D tương lai ấn tượng" },
  { id: "Optical Flare Wipe", label: "Flare Wipe", desc: "Quét vệt lóa ngang ống kính anamorphic điện ảnh Hollywood" },
  { id: "Speed Ramp Impact", label: "Speed Ramp", desc: "Tăng giảm tốc độ đột ngột tạo cú hích thị giác mạnh mẽ" },
  { id: "Directional Slide", label: "Slide", desc: "Trượt định hướng ngang dứt khoát chuyển cảnh tiếp theo" },
];

export const CAMERA_MOVEMENTS_QUICK: string[] = [
  "Slow push-in 24fps orbit 15° arc",
  "Orbit 360° xoay quanh sản phẩm khóa tâm",
  "Macro tracking glide lướt cạnh viền titanium",
  "Locked static hero lockup chính diện đối xứng",
];
