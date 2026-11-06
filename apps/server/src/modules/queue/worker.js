// @purpose: tiến trình worker thực thi job sinh video và cập nhật tiến độ

import { getProvider } from '../provider/index.js';
import { videosRepo } from '../videos/videos.repo.js';

export async function processVideoJob(videoId) {
  const video = videosRepo.findById(videoId);
  if (!video) return;

  const provider = getProvider();
  videosRepo.update(videoId, { status: 'processing', progress: 5, error_message: null });

  try {
    const { remoteId } = await provider.generateVideo({
      prompt: video.prompt,
      mode: video.mode,
      camera: video.camera,
      style: video.style,
      aspect: video.aspect,
      duration: video.duration,
    });

    videosRepo.update(videoId, { remote_id: remoteId, progress: 10 });

    let isDone = false;
    while (!isDone) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const exists = videosRepo.findById(videoId);
      if (!exists) break;

      const statusRes = await provider.checkStatus(remoteId);

      if (statusRes.status === 'completed') {
        videosRepo.update(videoId, {
          status: 'completed',
          progress: 100,
          video_url: statusRes.videoUrl || '/storage/videos/sample.mp4',
        });
        isDone = true;
      } else if (statusRes.status === 'failed') {
        videosRepo.update(videoId, {
          status: 'failed',
          error_message: statusRes.error || 'Tạo video thất bại',
        });
        isDone = true;
      } else {
        videosRepo.update(videoId, {
          progress: statusRes.progress || 10,
        });
      }
    }
  } catch (err) {
    videosRepo.update(videoId, {
      status: 'failed',
      error_message: err.message || 'Lỗi xử lý video',
    });
  }
}
