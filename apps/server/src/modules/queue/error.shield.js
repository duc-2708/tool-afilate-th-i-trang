// @purpose: bộ chặn và phân loại lỗi hạn mức số dư và trạng thái tạm dừng pipeline

import { PIPELINE_STAGES, PIPELINE_ERRORS } from '@videostudio/shared';
import { videosRepo } from '../videos/videos.repo.js';

export const ERROR_ACTIONS = {
  ERR_INSUFFICIENT_FUNDS: {
    action: 'resume',
    label: 'Nạp tiền & Tiếp tục',
    guidance: 'Tài khoản API Google Veo/Cloud không đủ số dư. Vui lòng nạp thêm tiền rồi nhấn Tiếp tục.',
    pause: true,
  },
  ERR_TOKEN_EXCEEDED: {
    action: 'resume',
    label: 'Rút ngắn & Tiếp tục',
    guidance: 'Ngữ cảnh hoặc prompt vượt quá giới hạn token. Hãy rút ngắn mô tả rồi bấm Tiếp tục.',
    pause: true,
  },
  ERR_CRITIC_REJECTED_MAX: {
    action: 'override',
    label: 'Duyệt ép buộc hoặc Thử lại',
    guidance: 'Critic từ chối 2 lần liên tiếp do chưa đạt chuẩn. Bạn có thể Duyệt ép buộc (Override) hoặc Sửa prompt.',
    pause: true,
  },
  ERR_RENDER_FAILED: {
    action: 'retry',
    label: 'Thử lại chặng này',
    guidance: 'Máy chủ sinh AI bị timeout hoặc lỗi GPU. Bấm Thử lại để chạy lại tác vụ.',
    pause: false,
  },
  ERR_INVALID_ASSETS: {
    action: 'retry',
    label: 'Kiểm tra lại ảnh',
    guidance: 'Ảnh người mẫu hoặc trang phục không hợp lệ hoặc thiếu dữ liệu.',
    pause: false,
  },
};

export function classifyPipelineError(err) {
  const code = err?.code || (err?.message?.includes('token') ? 'ERR_TOKEN_EXCEEDED'
    : err?.message?.includes('số dư') || err?.message?.includes('funds') ? 'ERR_INSUFFICIENT_FUNDS'
    : 'ERR_RENDER_FAILED');

  const config = ERROR_ACTIONS[code] || ERROR_ACTIONS.ERR_RENDER_FAILED;
  const message = err?.message || PIPELINE_ERRORS[code] || 'Lỗi không xác định trong pipeline';

  return {
    code,
    isPaused: Boolean(config.pause),
    message,
    guidance: config.guidance,
    recommendedAction: config.action,
    actionLabel: config.label,
  };
}

export function handleJobError(videoId, err, currentStage = null) {
  const classified = classifyPipelineError(err);
  const targetStage = classified.isPaused ? PIPELINE_STAGES.PAUSED_NEEDS_ACTION : PIPELINE_STAGES.FAILED;
  const targetStatus = classified.isPaused ? 'paused_needs_action' : 'failed';

  const updates = {
    status: targetStatus,
    stage: targetStage,
    error_code: classified.code,
    error_message: classified.message,
    error_detail: classified.guidance,
  };

  return videosRepo.update(videoId, updates);
}
