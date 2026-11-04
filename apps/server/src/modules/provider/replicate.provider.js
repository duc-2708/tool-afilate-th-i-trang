// @purpose: provider tích hợp Replicate API sinh video thời trang

import { VideoProviderInterface } from './provider.interface.js';
import { env } from '../../config/env.js';

export class ReplicateProvider extends VideoProviderInterface {
  constructor() {
    super();
    this.token = env.REPLICATE_API_TOKEN;
  }

  async generateVideo(_params) {
    // Skeleton: gửi dự đoán tới Replicate
    return { remoteId: `rep_${Date.now()}`, status: 'pending' };
  }

  async checkStatus(_remoteId) {
    // Skeleton: kiểm tra prediction status trên Replicate
    return { status: 'processing', progress: 40 };
  }
}
