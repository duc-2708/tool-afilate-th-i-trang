// @purpose: định nghĩa router quản lý và kiểm tra kết nối api key

import { Router } from 'express';
import { settingsService } from './settings.service.js';

export const settingsRouter = Router();

settingsRouter.get('/keys', (_req, res, next) => {
  try {
    const keys = settingsService.getConfiguredKeys();
    res.json({ success: true, data: keys });
  } catch (err) {
    next(err);
  }
});

settingsRouter.post('/keys', (req, res, next) => {
  try {
    const updated = settingsService.saveKeys(req.body);
    res.json({ success: true, message: 'Đã lưu cấu hình API Keys thành công', data: updated });
  } catch (err) {
    next(err);
  }
});

settingsRouter.post('/test', async (req, res, next) => {
  try {
    const { provider, apiKey } = req.body;
    if (!provider) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin provider cần kiểm tra' });
    }
    const result = await settingsService.testApiKey({ provider, apiKey });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});
