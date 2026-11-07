// @purpose: gọi api lấy danh sách chi tiết retry resume override và xóa video

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

  async retryVideo(id) {
    const res = await http.post(`/videos/${id}/retry`);
    return res.data;
  },

  async resumeVideo(id, payload = {}) {
    const res = await http.post(`/videos/${id}/resume`, payload);
    return res.data;
  },

  async overrideVideo(id) {
    const res = await http.post(`/videos/${id}/override`);
    return res.data;
  },

  async deleteVideo(id) {
    const res = await http.delete(`/videos/${id}`);
    return res.data;
  },
};
