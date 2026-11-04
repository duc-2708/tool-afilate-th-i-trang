// @purpose: tiện ích chuyển đổi số giây sang chuỗi hiển thị mm:ss

export function formatDuration(seconds = 0) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
