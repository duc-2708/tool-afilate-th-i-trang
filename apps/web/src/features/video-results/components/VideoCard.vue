<!-- @purpose: thẻ hiển thị video kết quả timeline stepper và phản hồi critic -->
<template>
  <div class="video-card" :class="video.status">
    <div class="card-media">
      <video v-if="video.status === 'completed' && video.video_url" :src="video.video_url" controls preload="metadata"></video>
      <div v-else-if="video.keyframe_url" class="keyframe-preview">
        <img :src="video.keyframe_url" alt="Keyframe" />
        <span class="preview-badge">Ảnh Keyframe AI</span>
      </div>
      <div v-else class="media-placeholder">
        <div class="pending-box">
          <span class="spinner"></span>
          <span>Khởi tạo tác vụ...</span>
        </div>
      </div>
    </div>

    <div class="card-info">
      <div class="info-top">
        <QueueBadge :status="video.status" />
        <span class="meta-item">{{ formatDuration(video.duration) }} • {{ video.aspect }}</span>
      </div>
      <p class="prompt-text" :title="video.prompt">{{ video.prompt }}</p>

      <!-- Agent Timeline Stepper -->
      <AgentTimelineStepper
        :stage="video.stage"
        :status="video.status"
        :progress="video.progress"
      />

      <!-- Critic Review & Control Actions -->
      <CriticFeedbackCard
        :video="video"
        @resume="$emit('resume', $event)"
        @override="$emit('override', $event)"
        @retry="$emit('retry', $event)"
      />

      <div class="card-actions">
        <button v-if="video.status === 'failed' || video.status === 'completed'" type="button" class="btn-action retry" title="Tạo lại" @click="$emit('retry', video.id)">
          🔄 Thử lại
        </button>
        <button type="button" class="btn-action delete" title="Xóa video" @click="$emit('delete', video.id)">
          🗑️ Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import QueueBadge from './QueueBadge.vue';
import AgentTimelineStepper from './AgentTimelineStepper.vue';
import CriticFeedbackCard from './CriticFeedbackCard.vue';
import { formatDuration } from '../../../shared/utils/formatDuration.js';

defineProps({
  video: { type: Object, required: true },
});
defineEmits(['retry', 'delete', 'resume', 'override']);
</script>

<style scoped>
.video-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
.card-media { aspect-ratio: 9/16; background: #090d16; display: flex; align-items: center; justify-content: center; max-height: 240px; position: relative; overflow: hidden; }
video { width: 100%; height: 100%; object-fit: cover; }
.keyframe-preview { width: 100%; height: 100%; position: relative; }
.keyframe-preview img { width: 100%; height: 100%; object-fit: cover; }
.preview-badge { position: absolute; bottom: 6px; left: 6px; font-size: 0.65rem; background: #000000a0; color: #38bdf8; padding: 2px 6px; border-radius: 4px; backdrop-filter: blur(2px); }
.media-placeholder { width: 85%; text-align: center; color: #94a3b8; font-size: 0.85rem; }
.pending-box { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8rem; }
.spinner { width: 14px; height: 14px; border: 2px solid #334155; border-top-color: #94a3b8; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.card-info { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
.info-top { display: flex; justify-content: space-between; align-items: center; }
.meta-item { font-size: 0.75rem; color: #94a3b8; }
.prompt-text { font-size: 0.82rem; color: #cbd5e1; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.25rem; }
.btn-action { background: #334155; border: none; border-radius: 4px; padding: 4px 8px; font-size: 0.75rem; color: #f8fafc; cursor: pointer; transition: background 0.2s; }
.btn-action.retry:hover { background: #0284c7; }
.btn-action.delete:hover { background: #ef4444; }
</style>
