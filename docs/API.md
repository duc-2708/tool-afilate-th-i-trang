# API Documentation

## Hệ thống
- `GET /api/health`
  - Input: None
  - Output: `{ "status": "ok", "uptime": number, "timestamp": string }`

## Videos
- `POST /api/videos`
  - Input (JSON): `{ prompt: string, mode?: "text"|"image", imageUrl?: string, camera?: string, style?: string, aspect?: "9:16"|"16:9"|"1:1", duration?: 5|10 }`
  - Output: `{ "success": true, "data": { "id": string, "status": "pending", "createdAt": string } }`

- `GET /api/videos`
  - Input: Query `{ limit?: number, offset?: number }`
  - Output: `{ "success": true, "data": Array<{ id, prompt, status, progress, videoUrl, createdAt }> }`

- `GET /api/videos/:id`
  - Input: Param `:id`
  - Output: `{ "success": true, "data": { id, prompt, status, progress, videoUrl, error, createdAt, updatedAt } }`

## Prompts
- `GET /api/prompts/templates`
  - Input: None
  - Output: `{ "success": true, "data": Array<{ id, title, style, prompt }> }`
