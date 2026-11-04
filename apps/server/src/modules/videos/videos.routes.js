// @purpose: định nghĩa router cho module videos

import { Router } from 'express';
import { videosController } from './videos.controller.js';

export const videosRouter = Router();

videosRouter.post('/', videosController.create);
videosRouter.get('/', videosController.list);
videosRouter.get('/:id', videosController.getById);
