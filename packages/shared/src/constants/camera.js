// @purpose: định nghĩa danh sách chuyển động và góc quay camera cho video

export const CAMERA_MOTIONS = [
  { id: 'static', label: 'Cố định', description: 'Góc máy đứng yên, tập trung vào chi tiết trang phục' },
  { id: 'slow_pan', label: 'Lia chậm', description: 'Lia máy nhẹ từ trái sang phải hoặc ngược lại' },
  { id: 'zoom_in', label: 'Zoom vào', description: 'Từ từ zoom cận cảnh chi tiết chất liệu hoặc phụ kiện' },
  { id: 'zoom_out', label: 'Zoom ra', description: 'Lùi máy để thấy toàn bộ trang phục và bối cảnh' },
  { id: 'orbital', label: 'Xoay tròn', description: 'Xoay quanh người mẫu làm nổi bật phom dáng 360 độ' },
  { id: 'pedestal', label: 'Lướt dọc', description: 'Di chuyển máy dọc từ giày lên trang phục và phụ kiện' },
];

export const CAMERA_IDS = CAMERA_MOTIONS.map((item) => item.id);
