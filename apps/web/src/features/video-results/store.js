// @purpose: pinia store quản lý danh sách video và polling trạng thái

import { defineStore } from 'pinia';
import { videoResultsApi } from './api.js';

export const useVideoResultsStore = defineStore('videoResults', {
  state: () => ({
    videos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async loadVideos() {
      this.loading = true;
      try {
        this.videos = await videoResultsApi.fetchVideos();
      } catch (err) {
        this.error = err.message || 'Lỗi tải danh sách video';
      } finally {
        this.loading = false;
      }
    },
    addVideo(video) {
      this.videos.unshift(video);
    },
    updateVideo(id, updates) {
      const idx = this.videos.findIndex((v) => v.id === id);
      if (idx !== -1) {
        this.videos[idx] = { ...this.videos[idx], ...updates };
      }
    },
  },
});
