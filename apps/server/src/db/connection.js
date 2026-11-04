// @purpose: kết nối và khởi tạo cơ sở dữ liệu sqlite

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { env } from '../config/env.js';

let dbInstance = null;

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

  return dbInstance;
}
