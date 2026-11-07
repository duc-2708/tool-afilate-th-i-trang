<!-- @purpose: timeline stepper hiển thị tiến trình thời gian thực của các agent -->
<template>
  <div class="agent-stepper" :class="status">
    <div class="stepper-header">
      <div class="current-stage-info">
        <span class="pulse-dot" :class="status"></span>
        <span class="stage-name">{{ currentLabel }}</span>
      </div>
      <span class="progress-pct">{{ progress || 0 }}%</span>
    </div>

    <!-- 5 Chặng chính của Multi-Agent -->
    <div class="steps-row">
      <div
        v-for="(step, idx) in PIPELINE_STEPS"
        :key="step.id"
        class="step-item"
        :class="getStepState(step, idx)"
        :title="step.title"
      >
        <div class="step-circle">
          <span v-if="getStepState(step, idx) === 'done'">✓</span>
          <span v-else-if="getStepState(step, idx) === 'paused'">⏸</span>
          <span v-else-if="getStepState(step, idx) === 'failed'">✕</span>
          <span v-else-if="getStepState(step, idx) === 'active'">{{ step.icon }}</span>
          <span v-else class="dot-num">{{ idx + 1 }}</span>
        </div>
        <span class="step-label">{{ step.shortName }}</span>
      </div>
    </div>

    <!-- Thanh tiến độ chạy -->
    <div class="stepper-bar">
      <div class="bar-fill" :class="status" :style="{ width: (progress || 0) + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { STAGE_LABELS } from '@videostudio/shared';

const props = defineProps({
  stage: { type: String, default: 'init' },
  status: { type: String, default: 'pending' },
  progress: { type: Number, default: 0 },
});

const PIPELINE_STEPS = [
  { id: 'scout', shortName: 'Scout A1', icon: '🔍', title: 'Agent 1: Phân tích Trend TikTok/Douyin', stages: ['scout'] },
  { id: 'image', shortName: 'Ảnh A2-A3', icon: '🎨', title: 'Agent 2 & 3: Sinh & Duyệt Ảnh Keyframe', stages: ['prompt_image', 'gen_image', 'critic_image'] },
  { id: 'video', shortName: 'Clip 8s A5', icon: '🎬', title: 'Agent 5: Sinh & Duyệt Clip 8s Veo', stages: ['prompt_video', 'gen_video', 'critic_video'] },
  { id: 'editor', shortName: 'Dựng A6', icon: '✂️', title: 'Agent 6: Ghép & Hòa âm Catwalk BGM', stages: ['editing', 'critic_final'] },
  { id: 'export', shortName: 'Xuất bản', icon: '✨', title: 'Hoàn tất xuất video hoàn chỉnh', stages: ['completed'] },
];

const currentLabel = computed(() => {
  if (props.status === 'paused_needs_action') return 'Tạm dừng: Chờ người dùng xử lý';
  if (props.status === 'failed') return 'Tác vụ gặp sự cố';
  return STAGE_LABELS[props.stage] || 'Đang khởi tạo tác vụ...';
});

const activeStepIdx = computed(() => {
  if (props.stage === 'completed' || props.status === 'completed') return 4;
  for (let i = 0; i < PIPELINE_STEPS.length; i++) {
    if (PIPELINE_STEPS[i].stages.includes(props.stage)) return i;
  }
  return 0;
});

const getStepState = (step, idx) => {
  const currentIdx = activeStepIdx.value;
  if (props.status === 'completed' || idx < currentIdx) return 'done';
  if (idx === currentIdx) {
    if (props.status === 'paused_needs_action') return 'paused';
    if (props.status === 'failed') return 'failed';
    return 'active';
  }
  return 'pending';
};
</script>

<style scoped>
.agent-stepper { display: flex; flex-direction: column; gap: 0.6rem; padding: 0.75rem; background: #0f172a95; border: 1px solid #334155; border-radius: 8px; }
.stepper-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; }
.current-stage-info { display: flex; align-items: center; gap: 0.4rem; font-weight: 500; color: #38bdf8; }
.paused .current-stage-info { color: #f59e0b; }
.failed .current-stage-info { color: #ef4444; }
.progress-pct { font-weight: 600; color: #94a3b8; font-size: 0.75rem; }
.pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #0284c7; animation: pulse 1.4s infinite; }
.pulse-dot.paused_needs_action { background: #f59e0b; animation: none; }
.pulse-dot.failed { background: #ef4444; animation: none; }
@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
.steps-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.25rem; align-items: center; }
.step-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
.step-circle { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; background: #1e293b; border: 1px solid #475569; color: #94a3b8; }
.step-item.done .step-circle { background: #15803d; border-color: #22c55e; color: #fff; font-weight: bold; }
.step-item.active .step-circle { background: #0369a1; border-color: #38bdf8; color: #fff; box-shadow: 0 0 8px #38bdf860; }
.step-item.paused .step-circle { background: #b45309; border-color: #f59e0b; color: #fff; }
.step-item.failed .step-circle { background: #b91c1c; border-color: #ef4444; color: #fff; }
.step-label { font-size: 0.65rem; color: #94a3b8; text-align: center; white-space: nowrap; }
.step-item.active .step-label { color: #38bdf8; font-weight: 600; }
.step-item.paused .step-label { color: #f59e0b; font-weight: 600; }
.stepper-bar { height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden; }
.bar-fill { height: 100%; background: #0284c7; transition: width 0.3s; }
.bar-fill.paused_needs_action { background: #f59e0b; }
.bar-fill.failed { background: #ef4444; }
.bar-fill.completed { background: #22c55e; }
</style>
