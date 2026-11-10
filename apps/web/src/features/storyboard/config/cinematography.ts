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
  { id: "24mm", name: "24mm Wide", desc: "Góc rộng bao quát toàn cảnh" },
  { id: "35mm", name: "35mm Standard", desc: "Góc nhìn tự nhiên chuẩn mắt người" },
  { id: "50mm", name: "50mm Prime", desc: "Chuẩn nhiếp ảnh thương mại" },
  { id: "85mm", name: "85mm Tele", desc: "Xóa phông nén không gian tôn sản phẩm" },
  { id: "100mm", name: "100mm Macro", desc: "Siêu cận cảnh chi tiết vật liệu" },
];

export const DOF_PRESETS: DofPresetOption[] = [
  { val: 1.4, desc: "Xóa phông cực mạnh" },
  { val: 1.8, desc: "Độ sâu trường nông điện ảnh" },
  { val: 2.8, desc: "Hậu cảnh rõ nét vừa" },
  { val: 5.6, desc: "Toàn cảnh sâu rõ chi tiết" },
];

export const TRANSITION_PRESETS: TransitionPresetOption[] = [
  { id: "Cut", label: "Cut", desc: "Cắt trực tiếp dứt khoát" },
  { id: "Cross Dissolve", label: "Dissolve", desc: "Hòa tan êm dịu mượt mà" },
  { id: "Whip Pan Blur", label: "Whip-Pan", desc: "Gia tốc chuyển động dồn dập" },
  { id: "Zoom Push", label: "Zoom Push", desc: "Đẩy nhanh xuyên thấu tâm điểm" },
  { id: "Light Leak", label: "Light Leak", desc: "Vệt tia sáng lóa studio" },
  { id: "Fade to Black", label: "Fade Black", desc: "Chìm dần vào bóng tối" },
];

export const CAMERA_MOVEMENTS_QUICK: string[] = [
  "Slow push-in 24fps orbit 15° arc",
  "Orbit 360° xoay quanh sản phẩm khóa tâm",
  "Macro tracking glide lướt cạnh viền titanium",
  "Locked static hero lockup chính diện đối xứng",
];
