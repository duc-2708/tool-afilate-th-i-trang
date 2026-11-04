-- @purpose: cấu trúc bảng sqlite cho video và queue

CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  prompt TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'text',
  image_url TEXT,
  camera TEXT NOT NULL DEFAULT 'static',
  style TEXT NOT NULL DEFAULT 'studio_clean',
  aspect TEXT NOT NULL DEFAULT '9:16',
  duration INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'pending',
  progress INTEGER NOT NULL DEFAULT 0,
  video_url TEXT,
  error_message TEXT,
  provider TEXT NOT NULL DEFAULT 'mock',
  remote_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS queue_tasks (
  id TEXT PRIMARY KEY,
  video_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id) REFERENCES videos(id)
);
