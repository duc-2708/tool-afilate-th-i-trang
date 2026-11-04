// @purpose: định nghĩa tỷ lệ khung hình và thời lượng video hợp lệ

export const ASPECT_RATIOS = [
  { id: '9:16', label: '9:16 Dọc', description: 'TikTok, Reels, Shorts' },
  { id: '16:9', label: '16:9 Ngang', description: 'YouTube, Website, TV' },
  { id: '1:1', label: '1:1 Vuông', description: 'Instagram Post, Facebook Feed' },
];

export const ASPECT_VALUES = ASPECT_RATIOS.map((item) => item.id);

export const ALLOWED_DURATIONS = [
  { value: 5, label: '5 giây', note: 'Xem nhanh, preview chất liệu' },
  { value: 10, label: '10 giây', note: 'Catwalk đầy đủ, đổi góc máy' },
];

export const DURATION_VALUES = ALLOWED_DURATIONS.map((item) => item.value);
