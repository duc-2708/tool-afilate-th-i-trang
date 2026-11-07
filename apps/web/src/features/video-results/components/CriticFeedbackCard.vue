<!-- @purpose: bảng hiển thị kết quả kiểm duyệt của critic và các nút điều khiển tương tác -->
<template>
  <div v-if="shouldShow" class="critic-card" :class="cardClass">
    <div class="critic-header">
      <div class="header-left">
        <span class="critic-icon">⚖️</span>
        <span class="critic-title">Agent 4 Critic</span>
      </div>
      <div class="header-right">
        <span v-if="video.retry_count > 0" class="retry-pill">
          Tự sửa: {{ video.retry_count }}/2
        </span>
        <span class="verdict-badge" :class="verdictClass">
          {{ verdictLabel }}
        </span>
      </div>
    </div>

    <!-- Chi tiết phản hồi Critic -->
    <div v-if="video.critic_feedback" class="critic-body">
      <p class="feedback-text">{{ video.critic_feedback }}</p>
    </div>

    <!-- Chi tiết lỗi & hướng dẫn giải quyết khi Pause -->
    <div v-if="video.error_detail" class="guidance-box">
      <span class="guidance-icon">💡</span>
      <span class="guidance-text">{{ video.error_detail }}</span>
    </div>

    <!-- Hàng nút điều khiển tương tác theo tình huống -->
    <div v-if="video.status === 'paused_needs_action'" class="action-buttons-row">
      <button
        v-if="video.error_code === 'ERR_CRITIC_REJECTED_MAX'"
        type="button"
        class="btn-control override"
        title="Bỏ qua đánh giá của Critic và đi tiếp"
        @click="$emit('override', video.id)"
      >
        ⚡ Duyệt ép buộc (Override)
      </button>
      <button
        v-else
        type="button"
        class="btn-control resume"
        title="Tiếp tục chạy lại chặng bị tạm dừng"
        @click="$emit('resume', video.id)"
      >
        ▶️ Tiếp tục (Resume)
      </button>

      <button
        type="button"
        class="btn-control retry-inline"
        title="Chạy lại từ đầu"
        @click="$emit('retry', video.id)"
      >
        🔄 Thử lại
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  video: { type: Object, required: true },
});

defineEmits(['resume', 'override', 'retry']);

const shouldShow = computed(() => {
  return Boolean(
    props.video.critic_feedback ||
    props.video.status === 'paused_needs_action' ||
    props.video.error_code
  );
});

const cardClass = computed(() => {
  if (props.video.status === 'paused_needs_action') return 'paused-border';
  if (props.video.critic_verdict === 'passed' || props.video.critic_verdict === 'passed_override') return 'passed-border';
  return 'rejected-border';
});

const verdictClass = computed(() => props.video.critic_verdict || 'rejected');

const verdictLabel = computed(() => {
  switch (props.video.critic_verdict) {
    case 'passed': return 'Đạt chuẩn';
    case 'passed_override': return 'Duyệt ép buộc';
    case 'rejected': return 'Chưa đạt';
    default: return props.video.status === 'paused_needs_action' ? 'Cần can thiệp' : 'Đang soi';
  }
});
</script>

<style scoped>
.critic-card { background: #0b1329; border: 1px solid #334155; border-radius: 6px; padding: 0.65rem; display: flex; flex-direction: column; gap: 0.5rem; }
.critic-card.paused-border { border-color: #f59e0b; background: #1c1503; }
.critic-card.passed-border { border-color: #22c55e40; }
.critic-card.rejected-border { border-color: #ef444440; }
.critic-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; }
.header-left { display: flex; align-items: center; gap: 0.35rem; font-weight: 600; color: #a855f7; }
.header-right { display: flex; align-items: center; gap: 0.35rem; }
.retry-pill { font-size: 0.65rem; background: #334155; color: #94a3b8; padding: 1px 5px; border-radius: 4px; }
.verdict-badge { font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
.verdict-badge.passed { background: #15803d; color: #fff; }
.verdict-badge.passed_override { background: #7e22ce; color: #fff; }
.verdict-badge.rejected { background: #b91c1c; color: #fff; }
.verdict-badge.needs_review { background: #b45309; color: #fff; }
.critic-body { font-size: 0.72rem; color: #cbd5e1; line-height: 1.35; background: #1e293b60; padding: 0.4rem; border-radius: 4px; }
.feedback-text { margin: 0; }
.guidance-box { display: flex; align-items: flex-start; gap: 0.35rem; font-size: 0.7rem; color: #fbbf24; background: #78350f25; padding: 0.4rem; border-radius: 4px; border: 1px dashed #f59e0b60; }
.action-buttons-row { display: flex; gap: 0.4rem; margin-top: 0.2rem; }
.btn-control { flex: 1; border: none; border-radius: 4px; padding: 6px 8px; font-size: 0.72rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-control.override { background: #7e22ce; color: #fff; }
.btn-control.override:hover { background: #9333ea; }
.btn-control.resume { background: #0284c7; color: #fff; }
.btn-control.resume:hover { background: #0369a1; }
.btn-control.retry-inline { background: #334155; color: #f8fafc; flex: 0.5; }
.btn-control.retry-inline:hover { background: #475569; }
</style>
