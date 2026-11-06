// @purpose: định nghĩa router cho module videos

import { Router } from 'express';
import { videosController } from './videos.controller.js';
import { uploadImage } from '../../middleware/upload.js';

export const videosRouter = Router();

videosRouter.post('/upload', uploadImage, videosController.upload);
videosRouter.post('/', videosController.create);
videosRouter.get('/', videosController.list);
videosRouter.get('/:id', videosController.getById);
videosRouter.post('/:id/retry', videosController.retry);
videosRouter.delete('/:id', videosController.delete);
