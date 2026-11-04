// @purpose: cấu hình axios client cho toàn bộ ứng dụng web

import axios from 'axios';

export const http = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Lỗi kết nối máy chủ';
    return Promise.reject(new Error(message));
  },
);
