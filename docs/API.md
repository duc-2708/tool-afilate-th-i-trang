# API Documentation

## Hệ thống
- `GET /api/health`
  - Input: None
  - Output: `{ "status": "ok", "uptime": number, "timestamp": string }`
- `GET /storage/*`
  - Phục vụ file tĩnh: video kết quả (`/storage/videos/*`) và ảnh tải lên (`/storage/uploads/*`)

## Videos
- `POST /api/videos/upload`
  - Input: `multipart/form-data` với key `image` (chấp nhận JPG, PNG, WEBP, tối đa 10MB)
  - Output: `{ "success": true, "data": { "url": string, "filename": string, "size": number, "mimetype": string } }`

- `POST /api/videos`
  - Input (JSON): `{ prompt: string, mode?: "text"|"image", imageUrl?: string, camera?: string, style?: string, aspect?: "9:16"|"16:9"|"1:1", duration?: 5|10 }`
  - Output: `{ "success": true, "data": { "id": string, "status": "pending", "progress": 0, "createdAt": string } }`

- `GET /api/videos`
  - Input: Query `{ limit?: number, offset?: number, status?: "pending"|"processing"|"completed"|"failed" }`
  - Output: `{ "success": true, "data": Array<{ id, prompt, status, progress, video_url, created_at }> }`

- `GET /api/videos/:id`
  - Input: Param `:id`
  - Output: `{ "success": true, "data": { id, prompt, status, progress, video_url, error_message, created_at, updated_at } }`

- `POST /api/videos/:id/retry`
  - Input: Param `:id`
  - Output: `{ "success": true, "message": string, "data": { id, status: "pending", progress: 0 } }`

- `POST /api/videos/:id/resume`
  - Input: Param `:id`, Body tùy chọn: `{ prompt?: string }`
  - Output: `{ "success": true, "message": string, "data": { id, status: "pending", stage: string } }`

- `POST /api/videos/:id/override`
  - Input: Param `:id` (duyệt ép buộc khi Critic từ chối max lần)
  - Output: `{ "success": true, "message": string, "data": { id, status: string, stage: string, critic_verdict: "passed_override" } }`

- `DELETE /api/videos/:id`
  - Input: Param `:id`
  - Output: `{ "success": true, "message": string, "data": { "id": string } }`

## Prompts
- `GET /api/prompts/templates`
  - Input: None
  - Output: `{ "success": true, "data": Array<{ id, title, style, prompt }> }`

## Settings & API Keys
- `GET /api/settings/keys`
  - Input: None
  - Output: `{ "success": true, "data": { gemini: { configured: boolean, masked: string }, veo: { ... }, banana: { ... } } }`

- `POST /api/settings/keys`
  - Input (JSON): `{ gemini?: string, veo?: string, banana?: string }`
  - Output: `{ "success": true, "message": string, "data": object }`

- `POST /api/settings/test`
  - Input (JSON): `{ provider: "gemini"|"veo"|"banana", apiKey?: string }`
  - Output: `{ "success": true, "data": { success: boolean, provider: string, latencyMs?: number, message: string } }`
