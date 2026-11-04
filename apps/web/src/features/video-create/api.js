// @purpose: gọi api tạo video mới từ backend server

import { http } from '../../shared/http.js';

export const videoCreateApi = {
  async createVideo(payload) {
    const res = await http.post('/videos', payload);
    return res.data;
  },
};
