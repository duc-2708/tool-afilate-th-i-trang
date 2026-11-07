// @purpose: thao tác lưu trữ và truy vấn dữ liệu video trong sqlite

import { getDb } from '../../db/connection.js';

export const videosRepo = {
  create(video) {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO videos (
        id, prompt, mode, image_url, model_image_url, garment_image_url, reference_video_url,
        camera, style, aspect, duration, status, stage, progress, keyframe_url, video_url,
        critic_verdict, critic_feedback, retry_count, error_code, error_detail, error_message, provider, remote_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      video.id,
      video.prompt,
      video.mode || 'text',
      video.imageUrl ?? video.image_url ?? null,
      video.modelImageUrl ?? video.model_image_url ?? null,
      video.garmentImageUrl ?? video.garment_image_url ?? null,
      video.referenceVideoUrl ?? video.reference_video_url ?? null,
      video.camera || 'static',
      video.style || 'studio_clean',
      video.aspect || '9:16',
      video.duration || 5,
      video.status || 'pending',
      video.stage || 'init',
      video.progress || 0,
      video.keyframeUrl ?? video.keyframe_url ?? null,
      video.videoUrl ?? video.video_url ?? null,
      video.criticVerdict ?? video.critic_verdict ?? null,
      video.criticFeedback ?? video.critic_feedback ?? null,
      video.retryCount ?? video.retry_count ?? 0,
      video.errorCode ?? video.error_code ?? null,
      video.errorDetail ?? video.error_detail ?? null,
      video.errorMessage ?? video.error_message ?? null,
      video.provider || 'mock',
      video.remoteId ?? video.remote_id ?? null,
    );
    return this.findById(video.id);
  },

  findById(id) {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM videos WHERE id = ?');
    return stmt.get(id);
  },

  list({ limit = 20, offset = 0, status } = {}) {
    const db = getDb();
    if (status) {
      const stmt = db.prepare('SELECT * FROM videos WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?');
      return stmt.all(status, limit, offset);
    }
    const stmt = db.prepare('SELECT * FROM videos ORDER BY created_at DESC LIMIT ? OFFSET ?');
    return stmt.all(limit, offset);
  },

  update(id, updates) {
    const db = getDb();
    const keys = Object.keys(updates);
    if (keys.length === 0) return this.findById(id);

    const setClauses = keys.map((key) => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    const stmt = db.prepare(`UPDATE videos SET ${setClauses}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
    stmt.run(...values);
    return this.findById(id);
  },

  delete(id) {
    const db = getDb();
    const existing = this.findById(id);
    if (!existing) return null;
    const stmt = db.prepare('DELETE FROM videos WHERE id = ?');
    stmt.run(id);
    return existing;
  },
};
