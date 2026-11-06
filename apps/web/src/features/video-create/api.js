// @purpose: gọi api tạo video mới và upload ảnh mẫu lên backend

import { http } from '../../shared/http.js';

export const videoCreateApi = {
  async createVideo(payload) {
    const res = await http.post('/videos', payload);
    return res.data;
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await http.post('/videos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};
