// @purpose: provider tích hợp Google Veo API để sinh video thời trang

import { VideoProviderInterface } from './provider.interface.js';
import { env } from '../../config/env.js';

export class VeoProvider extends VideoProviderInterface {
  constructor() {
    super();
    this.apiKey = env.VEO_API_KEY;
  }

  async generateVideo(_params) {
    // Skeleton: gọi Google Veo API
    return { remoteId: `veo_${Date.now()}`, status: 'pending' };
  }

  async checkStatus(_remoteId) {
    // Skeleton: kiểm tra trạng thái job từ Veo API
    return { status: 'processing', progress: 50 };
  }
}
