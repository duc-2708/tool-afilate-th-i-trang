// @purpose: định nghĩa hằng số các chặng xử lý pipeline critic và mã lỗi hệ thống

export const PIPELINE_STAGES = {
  INIT: 'init',
  SCOUT: 'scout',
  PROMPT_IMAGE: 'prompt_image',
  GEN_IMAGE: 'gen_image',
  CRITIC_IMAGE: 'critic_image',
  PROMPT_VIDEO: 'prompt_video',
  GEN_VIDEO: 'gen_video',
  CRITIC_VIDEO: 'critic_video',
  EDITING: 'editing',
  CRITIC_FINAL: 'critic_final',
  COMPLETED: 'completed',
  PAUSED_NEEDS_ACTION: 'paused_needs_action',
  FAILED: 'failed',
};

export const PIPELINE_STAGE_LIST = Object.values(PIPELINE_STAGES);

export const STAGE_LABELS = {
  [PIPELINE_STAGES.INIT]: 'Khởi tạo tác vụ',
  [PIPELINE_STAGES.SCOUT]: 'Agent 1: Phân tích xu hướng TikTok/Douyin',
  [PIPELINE_STAGES.PROMPT_IMAGE]: 'Agent 2: Soạn kịch bản ảnh thời trang',
  [PIPELINE_STAGES.GEN_IMAGE]: 'Agent 3: Sinh ảnh Keyframe người mẫu & đồ',
  [PIPELINE_STAGES.CRITIC_IMAGE]: 'Agent 4: Giám định chất lượng ảnh',
  [PIPELINE_STAGES.PROMPT_VIDEO]: 'Agent 2: Soạn chuyển động video 8s',
  [PIPELINE_STAGES.GEN_VIDEO]: 'Agent 5: Sinh clip chuyển động 8s (Veo)',
  [PIPELINE_STAGES.CRITIC_VIDEO]: 'Agent 4: Giám định clip chuyển động',
  [PIPELINE_STAGES.EDITING]: 'Agent 6: Dựng phim & khớp nhạc catwalk',
  [PIPELINE_STAGES.CRITIC_FINAL]: 'Agent 4: Kiểm duyệt video hoàn chỉnh',
  [PIPELINE_STAGES.COMPLETED]: 'Hoàn thành xuất video',
  [PIPELINE_STAGES.PAUSED_NEEDS_ACTION]: 'Tạm dừng chờ người dùng xử lý',
  [PIPELINE_STAGES.FAILED]: 'Tác vụ thất bại',
};

export const STAGE_PROGRESS = {
  [PIPELINE_STAGES.INIT]: 5,
  [PIPELINE_STAGES.SCOUT]: 15,
  [PIPELINE_STAGES.PROMPT_IMAGE]: 25,
  [PIPELINE_STAGES.GEN_IMAGE]: 40,
  [PIPELINE_STAGES.CRITIC_IMAGE]: 50,
  [PIPELINE_STAGES.PROMPT_VIDEO]: 60,
  [PIPELINE_STAGES.GEN_VIDEO]: 75,
  [PIPELINE_STAGES.CRITIC_VIDEO]: 85,
  [PIPELINE_STAGES.EDITING]: 95,
  [PIPELINE_STAGES.CRITIC_FINAL]: 98,
  [PIPELINE_STAGES.COMPLETED]: 100,
};

export const CRITIC_VERDICTS = {
  PASSED: 'passed',
  REJECTED: 'rejected',
  NEEDS_REVIEW: 'needs_review',
};

export const MAX_CRITIC_RETRIES = 2;

export const PIPELINE_ERRORS = {
  ERR_INSUFFICIENT_FUNDS: 'Tài khoản API không đủ số dư để tiếp tục',
  ERR_TOKEN_EXCEEDED: 'Vượt quá hạn mức token ngữ cảnh của mô hình',
  ERR_CRITIC_REJECTED_MAX: 'Critic từ chối vượt quá 2 lần tự sửa, cần người dùng can thiệp',
  ERR_RENDER_FAILED: 'Lỗi sinh media từ AI provider',
  ERR_INVALID_ASSETS: 'Tài nguyên hình ảnh người mẫu hoặc trang phục không hợp lệ',
};
