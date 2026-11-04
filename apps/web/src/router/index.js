// @purpose: cấu hình định tuyến cho các trang trong web app

import { createRouter, createWebHistory } from 'vue-router';
import VideoCreatePage from '../pages/VideoCreatePage.vue';
import ComingSoonPage from '../pages/ComingSoonPage.vue';

const routes = [
  { path: '/', name: 'video-create', component: VideoCreatePage },
  { path: '/coming-soon', name: 'coming-soon', component: ComingSoonPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
