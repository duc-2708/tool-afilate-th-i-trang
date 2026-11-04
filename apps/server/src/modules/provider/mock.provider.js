// @purpose: mock provider giả lập tạo video phục vụ dev và test

import { VideoProviderInterface } from './provider.interface.js';

export class MockProvider extends VideoProviderInterface {
  constructor() {
    super();
    this.jobs = new Map();
  }

  async generateVideo(params) {
    const remoteId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    this.jobs.set(remoteId, {
      progress: 0,
      createdAt: Date.now(),
      params,
    });
    return { remoteId, status: 'processing' };
  }

  async checkStatus(remoteId) {
    const job = this.jobs.get(remoteId);
    if (!job) {
      return { status: 'completed', progress: 100, videoUrl: 'https://example.com/mock.mp4' };
    }

    const elapsed = Date.now() - job.createdAt;
    if (elapsed > 4000) {
      return { status: 'completed', progress: 100, videoUrl: 'https://example.com/mock.mp4' };
    }

    const progress = Math.min(95, Math.floor((elapsed / 4000) * 100));
    return { status: 'processing', progress };
  }
}
