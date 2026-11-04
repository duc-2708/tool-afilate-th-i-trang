// @purpose: gọi api lấy danh sách và chi tiết trạng thái video

import { http } from '../../shared/http.js';

export const videoResultsApi = {
  async fetchVideos() {
    const res = await http.get('/videos');
    return res.data;
  },

  async fetchVideoById(id) {
    const res = await http.get(`/videos/${id}`);
    return res.data;
  },
};
