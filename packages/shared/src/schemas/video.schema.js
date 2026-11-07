// @purpose: định nghĩa zod schema xác thực request tạo video thời trang

import { z } from 'zod';
import { CAMERA_IDS } from '../constants/camera.js';
import { STYLE_IDS } from '../constants/styles.js';
import { ASPECT_VALUES, DURATION_VALUES } from '../constants/aspect.js';
import { PIPELINE_STAGE_LIST, CRITIC_VERDICTS } from '../constants/pipeline.js';

export const createVideoSchema = z.object({
  prompt: z
    .string({ required_error: 'Prompt không được để trống' })
    .min(3, 'Prompt tối thiểu 3 ký tự')
    .max(1000, 'Prompt không vượt quá 1000 ký tự'),
  mode: z.enum(['text', 'image']).default('text'),
  imageUrl: z.string().max(2048, 'Đường dẫn ảnh quá dài').optional().or(z.literal('')),
  modelImageUrl: z.string().max(2048).optional().or(z.literal('')),
  garmentImageUrl: z.string().max(2048).optional().or(z.literal('')),
  referenceVideoUrl: z.string().max(2048).optional().or(z.literal('')),
  camera: z.enum(CAMERA_IDS).default('static'),
  style: z.enum(STYLE_IDS).default('studio_clean'),
  aspect: z.enum(ASPECT_VALUES).default('9:16'),
  duration: z.number().refine((val) => DURATION_VALUES.includes(val), {
    message: 'Thời lượng chỉ hỗ trợ 5s hoặc 10s',
  }).default(5),
  stage: z.enum(PIPELINE_STAGE_LIST).default('init'),
  keyframeUrl: z.string().max(2048).optional().or(z.literal('')),
  criticVerdict: z.enum(Object.values(CRITIC_VERDICTS)).optional(),
  criticFeedback: z.string().max(2000).optional(),
  retryCount: z.number().min(0).default(0),
  errorCode: z.string().max(100).optional(),
  errorDetail: z.string().max(2000).optional(),
});

export const videoQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'paused_needs_action']).optional(),
  stage: z.enum(PIPELINE_STAGE_LIST).optional(),
});

export const videoIdSchema = z.object({
  id: z.string().min(1, 'ID không được để trống'),
});
