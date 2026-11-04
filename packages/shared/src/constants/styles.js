// @purpose: định nghĩa danh sách phong cách thời trang áp dụng khi tạo video

export const FASHION_STYLES = [
  { id: 'runway', label: 'Sàn diễn Runway', description: 'Ánh sáng sân khấu high-end, người mẫu catwalk tự tin' },
  { id: 'streetwear', label: 'Streetwear cá tính', description: 'Bối cảnh đường phố đô thị hiện đại, năng động' },
  { id: 'studio_clean', label: 'Studio tối giản', description: 'Phông nền đơn sắc, ánh sáng mềm, tôn chi tiết vải' },
  { id: 'cinematic_editorial', label: 'Cinematic Tạp chí', description: 'Màu phim điện ảnh sang trọng, độ tương phản nghệ thuật' },
  { id: 'vintage_retro', label: 'Retro cổ điển', description: 'Tông màu ấm, chất phim hoài niệm thập niên 90s' },
  { id: 'luxury_glam', label: 'Sang trọng Dạ tiệc', description: 'Ánh kim lấp lánh, không gian tiệc tối quý phái' },
];

export const STYLE_IDS = FASHION_STYLES.map((item) => item.id);
