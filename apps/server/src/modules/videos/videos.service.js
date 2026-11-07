// @purpose: xử lý logic nghiệp vụ tạo tra cứu điều phối resume và override video

import { randomUUID } from 'node:crypto';
import { PIPELINE_STAGES } from '@videostudio/shared';
import { videosRepo } from './videos.repo.js';
import { queue } from '../queue/queue.js';

export const videosService = {
  async createVideo(payload) {
    const id = randomUUID();
    const videoData = {
      id,
      ...payload,
      status: 'pending',
      stage: payload.stage || 'init',
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

  async retryVideo(id) {
    await this.getVideoById(id);
    const updated = videosRepo.update(id, {
      status: 'pending',
      stage: 'init',
      progress: 0,
      retry_count: 0,
      error_code: null,
      error_detail: null,
      error_message: null,
      remote_id: null,
    });
    await queue.enqueue(id);
    return updated;
  },

  async resumeVideo(id, { prompt } = {}) {
    const video = await this.getVideoById(id);
    if (video.status !== 'paused_needs_action' && video.status !== 'failed') {
      const err = new Error('Chỉ có thể tiếp tục tác vụ khi đang ở trạng thái tạm dừng hoặc lỗi');
      err.status = 400;
      throw err;
    }

    let nextStage = PIPELINE_STAGES.PROMPT_IMAGE;
    if (video.video_url) {
      nextStage = PIPELINE_STAGES.EDITING;
    } else if (video.keyframe_url) {
      nextStage = prompt ? PIPELINE_STAGES.PROMPT_VIDEO : PIPELINE_STAGES.GEN_VIDEO;
    }

    const updates = {
      status: 'pending',
      stage: nextStage,
      error_code: null,
      error_detail: null,
      error_message: null,
      retry_count: 0,
      ...(prompt ? { prompt } : {}),
    };

    const updated = videosRepo.update(id, updates);
    await queue.enqueue(id);
    return updated;
  },

  async overrideVideo(id) {
    const video = await this.getVideoById(id);
    if (video.status !== 'paused_needs_action') {
      const err = new Error('Chỉ có thể duyệt ép buộc khi tác vụ đang tạm dừng chờ xử lý');
      err.status = 400;
      throw err;
    }

    if (video.video_url) {
      return videosRepo.update(id, {
        status: 'completed',
        stage: PIPELINE_STAGES.COMPLETED,
        progress: 100,
        critic_verdict: 'passed_override',
        critic_feedback: 'Người dùng đã duyệt ép buộc (Override) video hoàn chỉnh',
        error_code: null,
        error_detail: null,
        error_message: null,
      });
    }

    const updates = {
      status: 'pending',
      stage: PIPELINE_STAGES.PROMPT_VIDEO,
      critic_verdict: 'passed_override',
      critic_feedback: 'Người dùng đã duyệt ép buộc (Override) ảnh keyframe',
      error_code: null,
      error_detail: null,
      error_message: null,
      retry_count: 0,
    };
    const updated = videosRepo.update(id, updates);
    await queue.enqueue(id);
    return updated;
  },

  async deleteVideo(id) {
    await this.getVideoById(id);
    queue.remove(id);
    return videosRepo.delete(id);
  },
};
