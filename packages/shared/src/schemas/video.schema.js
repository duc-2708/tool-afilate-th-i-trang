// @purpose: định nghĩa zod schema xác thực request tạo video thời trang

import { z } from 'zod';
import { CAMERA_IDS } from '../constants/camera.js';
import { STYLE_IDS } from '../constants/styles.js';
import { ASPECT_VALUES, DURATION_VALUES } from '../constants/aspect.js';

export const createVideoSchema = z.object({
  prompt: z
    .string({ required_error: 'Prompt không được để trống' })
    .min(3, 'Prompt tối thiểu 3 ký tự')
    .max(1000, 'Prompt không vượt quá 1000 ký tự'),
  mode: z.enum(['text', 'image']).default('text'),
  imageUrl: z.string().url('URL ảnh không hợp lệ').optional().or(z.literal('')),
  camera: z.enum(CAMERA_IDS).default('static'),
  style: z.enum(STYLE_IDS).default('studio_clean'),
  aspect: z.enum(ASPECT_VALUES).default('9:16'),
  duration: z.number().refine((val) => DURATION_VALUES.includes(val), {
    message: 'Thời lượng chỉ hỗ trợ 5s hoặc 10s',
  }).default(5),
});

export const videoQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});
