// @purpose: thao tác lưu trữ và truy vấn dữ liệu video trong sqlite

import { getDb } from '../../db/connection.js';

export const videosRepo = {
  create(video) {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO videos (id, prompt, mode, image_url, camera, style, aspect, duration, status, progress, provider, remote_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      video.id,
      video.prompt,
      video.mode || 'text',
      video.imageUrl || null,
      video.camera || 'static',
      video.style || 'studio_clean',
      video.aspect || '9:16',
      video.duration || 5,
      video.status || 'pending',
      video.progress || 0,
      video.provider || 'mock',
      video.remoteId || null,
    );
    return this.findById(video.id);
  },

  findById(id) {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM videos WHERE id = ?');
    return stmt.get(id);
  },

  list({ limit = 20, offset = 0 } = {}) {
    const db = getDb();
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
};
