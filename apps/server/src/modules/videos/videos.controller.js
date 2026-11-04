// @purpose: tiếp nhận request, validate và trả response cho video API

import { createVideoSchema, videoQuerySchema } from '@videostudio/shared';
import { videosService } from './videos.service.js';

export const videosController = {
  async create(req, res, next) {
    try {
      const parsed = createVideoSchema.parse(req.body);
      const video = await videosService.createVideo(parsed);
      res.status(201).json({ success: true, data: video });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          code: 'VALIDATION_ERROR',
          message: err.errors[0]?.message || 'Dữ liệu không hợp lệ',
          errors: err.errors,
        });
      }
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const video = await videosService.getVideoById(req.params.id);
      res.json({ success: true, data: video });
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const query = videoQuerySchema.parse(req.query);
      const list = await videosService.listVideos(query);
      res.json({ success: true, data: list });
    } catch (err) {
      next(err);
    }
  },
};
