// @purpose: khởi tạo express ráp middleware routes và xử lý lỗi

import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error.js';
import { rateLimit } from './middleware/rateLimit.js';
import { videosRouter } from './modules/videos/videos.routes.js';
import { promptsRouter } from './modules/prompts/prompts.routes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(rateLimit(200, 60 * 1000));

  // Serve static files (uploads and videos)
  app.use('/storage', express.static(env.STORAGE_DIR));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // Module routes
  app.use('/api/videos', videosRouter);
  app.use('/api/prompts', promptsRouter);

  // Error handling middleware
  app.use(errorHandler);

  return app;
}
