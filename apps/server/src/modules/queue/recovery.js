// @purpose: phục hồi các tác vụ đang treo khi server khởi động lại

import { getDb } from '../../db/connection.js';
import { queue } from './queue.js';

export function recoverPendingJobs() {
  const db = getDb();
  const stmt = db.prepare(`SELECT id FROM videos WHERE status IN ('pending', 'processing')`);
  const rows = stmt.all();

  for (const row of rows) {
    queue.enqueue(row.id);
  }
}
