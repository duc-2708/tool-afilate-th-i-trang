// @purpose: tiếp nhận request, validate và trả response cho video API

import { createVideoSchema, videoQuerySchema, videoIdSchema } from '@videostudio/shared';
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
      const { id } = videoIdSchema.parse(req.params);
      const video = await videosService.getVideoById(id);
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

  async retry(req, res, next) {
    try {
      const { id } = videoIdSchema.parse(req.params);
      const video = await videosService.retryVideo(id);
      res.json({ success: true, message: 'Đã đưa video vào hàng đợi xử lý lại', data: video });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = videoIdSchema.parse(req.params);
      const deleted = await videosService.deleteVideo(id);
      res.json({ success: true, message: 'Đã xóa video thành công', data: { id: deleted.id } });
    } catch (err) {
      next(err);
    }
  },

  async resume(req, res, next) {
    try {
      const { id } = videoIdSchema.parse(req.params);
      const video = await videosService.resumeVideo(id, req.body);
      res.json({ success: true, message: 'Đã tiếp tục tác vụ thành công', data: video });
    } catch (err) {
      next(err);
    }
  },

  async override(req, res, next) {
    try {
      const { id } = videoIdSchema.parse(req.params);
      const video = await videosService.overrideVideo(id);
      res.json({ success: true, message: 'Đã duyệt ép buộc tác vụ thành công', data: video });
    } catch (err) {
      next(err);
    }
  },

  upload(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          code: 'FILE_REQUIRED',
          message: 'Vui lòng đính kèm file ảnh hợp lệ (field name: "image")',
        });
      }
      const fileUrl = `/storage/uploads/${req.file.filename}`;
      res.status(201).json({
        success: true,
        data: {
          url: fileUrl,
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
