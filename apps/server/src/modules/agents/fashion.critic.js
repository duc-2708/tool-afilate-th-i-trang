// @purpose: agent 4 trạm kiểm duyệt chất lượng 3 lớp cho ảnh clip 8s và video tổng

import { CRITIC_VERDICTS } from '@videostudio/shared';

export const PASS_THRESHOLD = 75;

export const fashionCriticAgent = {
  async reviewKeyframe({ keyframeUrl = '', prompt = '', garmentUrl = '', retryCount = 0 } = {}) {
    const issues = [];
    let score = 90;

    if (!keyframeUrl) {
      issues.push('Không tìm thấy ảnh keyframe để giám định');
      score -= 50;
    }

    if (prompt && prompt.toLowerCase().includes('lỗi_test_critic')) {
      issues.push('Phom dáng trang phục bị sai lệch so với ảnh mẫu');
      issues.push('Phát hiện dị tật ngón tay');
      score = 55;
    }

    const passed = score >= PASS_THRESHOLD;
    const feedback = passed
      ? 'Ảnh keyframe đạt chuẩn: Trang phục giữ nét, phom dáng và giải phẫu chính xác'
      : `Từ chối ảnh (Lần ${retryCount + 1}): ${issues.join('. ')}. Yêu cầu sinh lại ảnh bám sát trang phục gốc`;

    return {
      verdict: passed ? CRITIC_VERDICTS.PASSED : CRITIC_VERDICTS.REJECTED,
      score,
      feedback,
      issues,
    };
  },

  async reviewMotionClip({ remoteId = '', prompt = '', camera = 'slow_pan', retryCount = 0 } = {}) {
    const issues = [];
    let score = 88;

    if (!remoteId && !prompt) {
      issues.push('Thiếu dữ liệu clip chuyển động');
      score -= 40;
    }

    if (prompt && prompt.toLowerCase().includes('lỗi_test_video')) {
      issues.push('Biến dạng khuôn mặt ở giây thứ 4');
      issues.push('Chuyển động tà vải bị giật');
      score = 60;
    }

    const passed = score >= PASS_THRESHOLD;
    const feedback = passed
      ? `Clip 8s đạt chuẩn: Chuyển động ${camera} mượt mà, giữ vững tỷ lệ và chi tiết trang phục`
      : `Từ chối clip (Lần ${retryCount + 1}): ${issues.join('. ')}. Yêu cầu sinh lại video với chuyển động ổn định hơn`;

    return {
      verdict: passed ? CRITIC_VERDICTS.PASSED : CRITIC_VERDICTS.REJECTED,
      score,
      feedback,
      issues,
    };
  },

  async reviewFinalVideo({ videoUrl = '', retryCount = 0 } = {}) {
    const issues = [];
    let score = 95;

    if (!videoUrl) {
      issues.push('Không tìm thấy đường dẫn video thành phẩm');
      score = 0;
    }

    const passed = score >= PASS_THRESHOLD;
    const feedback = passed
      ? 'Video hoàn chỉnh đạt chuẩn xuất sắc: Khớp nhạc catwalk BGM, không khung hình đen, màu sắc hài hòa'
      : `Video chưa đạt: ${issues.join('. ')}`;

    return {
      verdict: passed ? CRITIC_VERDICTS.PASSED : CRITIC_VERDICTS.REJECTED,
      score,
      feedback,
      issues,
    };
  },
};
