// @purpose: kết nối và khởi tạo cơ sở dữ liệu sqlite

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { env } from '../config/env.js';

let dbInstance = null;

function migrateSchema(db) {
  try {
    const existingCols = new Set(
      db.prepare('PRAGMA table_info(videos)').all().map((c) => c.name)
    );

    const cols = [
      { name: 'model_image_url', def: 'TEXT' },
      { name: 'garment_image_url', def: 'TEXT' },
      { name: 'reference_video_url', def: 'TEXT' },
      { name: 'stage', def: "TEXT NOT NULL DEFAULT 'init'" },
      { name: 'keyframe_url', def: 'TEXT' },
      { name: 'critic_verdict', def: 'TEXT' },
      { name: 'critic_feedback', def: 'TEXT' },
      { name: 'retry_count', def: 'INTEGER NOT NULL DEFAULT 0' },
      { name: 'error_code', def: 'TEXT' },
      { name: 'error_detail', def: 'TEXT' },
    ];

    for (const col of cols) {
      if (!existingCols.has(col.name)) {
        db.exec(`ALTER TABLE videos ADD COLUMN ${col.name} ${col.def}`);
      }
    }
  } catch (err) {
    console.error('Migration warning:', err.message);
  }
}

export function getDb() {
  if (dbInstance) return dbInstance;

  const dbDir = env.STORAGE_DIR;
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'db.sqlite');
  dbInstance = new DatabaseSync(dbPath);

  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const schemaPath = path.resolve(currentDir, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    dbInstance.exec(schemaSql);
  }

  migrateSchema(dbInstance);

  return dbInstance;
}
