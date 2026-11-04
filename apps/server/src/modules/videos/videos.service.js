// @purpose: xử lý logic nghiệp vụ tạo, tra cứu và điều phối sinh video

import { randomUUID } from 'node:crypto';
import { videosRepo } from './videos.repo.js';
import { queue } from '../queue/queue.js';

export const videosService = {
  async createVideo(payload) {
    const id = randomUUID();
    const videoData = {
      id,
      ...payload,
      status: 'pending',
      progress: 0,
    };

    const saved = videosRepo.create(videoData);
    await queue.enqueue(id);
    return saved;
  },

  async getVideoById(id) {
    const video = videosRepo.findById(id);
    if (!video) {
      const err = new Error('Không tìm thấy video');
      err.status = 404;
      err.code = 'NOT_FOUND';
      throw err;
    }
    return video;
  },

  async listVideos(query) {
    return videosRepo.list(query);
  },
};
