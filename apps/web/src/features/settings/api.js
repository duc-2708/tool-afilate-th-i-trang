// @purpose: gọi api quản lý và kiểm tra kết nối api key cho các mô hình ai

import { http } from '../../shared/http.js';

export const settingsApi = {
  async fetchKeys() {
    const res = await http.get('/settings/keys');
    return res.data;
  },

  async saveKeys(payload) {
    const res = await http.post('/settings/keys', payload);
    return res.data;
  },

  async testApiKey({ provider, apiKey }) {
    const res = await http.post('/settings/test', { provider, apiKey });
    return res.data;
  },
};
