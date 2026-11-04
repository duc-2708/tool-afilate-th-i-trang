// @purpose: định nghĩa router cho module prompts mẫu

import { Router } from 'express';
import { promptsService } from './prompts.service.js';

export const promptsRouter = Router();

promptsRouter.get('/templates', (_req, res) => {
  const templates = promptsService.getTemplates();
  res.json({ success: true, data: templates });
});
