// @purpose: đọc và kiểm tra các biến môi trường cấu hình server

import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
  STORAGE_DIR: process.env.STORAGE_DIR || path.resolve(__dirname, '../../../../storage'),
  VIDEO_PROVIDER: process.env.VIDEO_PROVIDER || 'mock',
  VEO_API_KEY: process.env.VEO_API_KEY || '',
  REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN || '',
};
