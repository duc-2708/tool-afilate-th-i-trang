// @purpose: provider factory khởi tạo provider dựa trên cấu hình

import { env } from '../../config/env.js';
import { MockProvider } from './mock.provider.js';
import { VeoProvider } from './veo.provider.js';
import { ReplicateProvider } from './replicate.provider.js';

let activeProvider = null;

export function getProvider() {
  if (activeProvider) return activeProvider;

  switch (env.VIDEO_PROVIDER) {
    case 'veo':
      activeProvider = new VeoProvider();
      break;
    case 'replicate':
      activeProvider = new ReplicateProvider();
      break;
    case 'mock':
    default:
      activeProvider = new MockProvider();
      break;
  }

  return activeProvider;
}
