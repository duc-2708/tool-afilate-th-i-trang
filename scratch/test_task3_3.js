// @purpose: kiểm thử task 3.3 agent 6 video editor và tích hợp worker

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const serverDir = path.join(projectRoot, 'apps/server');
const { videoEditorAgent, FASHION_BGM_TRACKS } = await import(
  `file:///${path.join(serverDir, 'src/modules/agents/video.editor.js').replace(/\\/g, '/')}`
);
const { processStageStep } = await import(
  `file:///${path.join(serverDir, 'src/modules/queue/worker.js').replace(/\\/g, '/')}`
);
const { PIPELINE_STAGES } = await import(
  `file:///${path.join(projectRoot, 'packages/shared/src/constants/pipeline.js').replace(/\\/g, '/')}`
);

console.log('=== TEST 1: Kiểm tra BGM catalog và phong cách ===');
const tracks = videoEditorAgent.getAvailableBgmTracks();
assert(tracks.length >= 6, 'Danh sách BGM phải có ít nhất 6 track');
console.log(`✓ Số track BGM có sẵn: ${tracks.length}`);

const streetwearBgm = videoEditorAgent.getBgmForStyle('streetwear');
assert.strictEqual(streetwearBgm.id, 'bgm_urban');
console.log(`✓ Style streetwear map đúng: ${streetwearBgm.name} (${streetwearBgm.bpm} BPM)`);

const hauteBgm = videoEditorAgent.getBgmForStyle('haute_couture');
assert.strictEqual(hauteBgm.id, 'bgm_luxury');
console.log(`✓ Style haute_couture map đúng: ${hauteBgm.name}`);

console.log('\n=== TEST 2: Biên tập Video MP4 hoàn chỉnh ===');
const editResult = await videoEditorAgent.composeFinalVideo({
  mainClipUrl: '/storage/videos/sample.mp4',
  style: 'haute_couture',
  aspect: '9:16',
  transition: 'crossfade',
});

assert(editResult.finalVideoUrl.startsWith('/storage/videos/final_'), 'URL video phải có tiền tố /storage/videos/final_');
assert.strictEqual(editResult.duration, 8, 'Thời lượng phải là 8s');
assert.strictEqual(editResult.resolution, '720x1280', 'Độ phân giải 9:16 phải là 720x1280');
assert.strictEqual(editResult.bgmTrack, hauteBgm.name, 'Tên bài BGM phải khớp');
assert(editResult.fileSize > 0, 'Dung lượng file vật lý > 0');

const diskFilePath = path.join(projectRoot, editResult.finalVideoUrl.replace(/^\//, ''));
assert(fs.existsSync(diskFilePath), `File thực tế phải tồn tại trên ổ đĩa: ${diskFilePath}`);
console.log(`✓ File video hoàn thiện đã xuất: ${editResult.finalVideoUrl} (${editResult.fileSize} bytes)`);

console.log('\n=== TEST 3: Tích hợp Worker stage EDITING -> CRITIC_FINAL ===');
const fakeVideo = {
  id: 'vid_test_editor_123',
  stage: PIPELINE_STAGES.EDITING,
  style: 'cyberpunk_neon',
  aspect: '9:16',
  video_url: editResult.finalVideoUrl,
};

const stepResult = await processStageStep(fakeVideo);
assert.strictEqual(stepResult.nextStage, PIPELINE_STAGES.CRITIC_FINAL, 'Stage kế tiếp phải là CRITIC_FINAL');
assert(stepResult.updates.video_url.startsWith('/storage/videos/final_'), 'Video URL cập nhật phải là video hoàn thiện');
console.log(`✓ Worker stage EDITING chuyển tiếp thành công sang: ${stepResult.nextStage}`);
console.log(`✓ Video URL cho Critic Final: ${stepResult.updates.video_url}`);

console.log('\n>>> TẤT CẢ KIỂM THỬ TASK 3.3 ĐỀU THÀNH CÔNG! <<<');
