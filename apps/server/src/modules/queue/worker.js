// @purpose: tiến trình worker thực thi job sinh video và cập nhật tiến độ

import { getProvider } from '../provider/index.js';
import { videosRepo } from '../videos/videos.repo.js';

export async function processVideoJob(videoId) {
  const video = videosRepo.findById(videoId);
  if (!video) return;

  const provider = getProvider();
  videosRepo.update(videoId, { status: 'processing', progress: 10 });

  try {
    const { remoteId } = await provider.generateVideo({
      prompt: video.prompt,
      mode: video.mode,
      camera: video.camera,
      style: video.style,
      aspect: video.aspect,
      duration: video.duration,
    });

    videosRepo.update(videoId, { remote_id: remoteId, progress: 25 });

    let isDone = false;
    while (!isDone) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const statusRes = await provider.checkStatus(remoteId);

      if (statusRes.status === 'completed') {
        videosRepo.update(videoId, {
          status: 'completed',
          progress: 100,
          video_url: statusRes.videoUrl || 'https://example.com/result.mp4',
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
          progress: statusRes.progress || 50,
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
