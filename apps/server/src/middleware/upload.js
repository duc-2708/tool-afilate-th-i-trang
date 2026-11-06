// @purpose: middleware xử lý và giới hạn upload file ảnh

import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';

const uploadDir = path.join(env.STORAGE_DIR, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${randomUUID()}${ext}`);
  },
});

const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];

function fileFilter(_req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    const err = new Error('Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc WEBP');
    err.status = 400;
    err.code = 'INVALID_FILE_TYPE';
    cb(err);
  }
}

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('image');
