<!-- @purpose: thẻ hiển thị thông tin và video kết quả -->
<template>
  <div class="video-card" :class="video.status">
    <div class="card-media">
      <video v-if="video.status === 'completed' && video.video_url" :src="video.video_url" controls preload="metadata"></video>
      <div v-else class="media-placeholder">
        <div v-if="video.status === 'processing'" class="progress-box">
          <div class="progress-label">Đang sinh video ({{ video.progress || 0 }}%)</div>
          <div class="bar"><div class="fill" :style="{ width: (video.progress || 0) + '%' }"></div></div>
        </div>
        <div v-else-if="video.status === 'failed'" class="error-box">
          <span class="error-icon">⚠️</span>
          <span class="error-text">{{ video.error_message || 'Xử lý thất bại' }}</span>
        </div>
        <div v-else class="pending-box">
          <span class="spinner"></span>
          <span>Đang xếp hàng...</span>
        </div>
      </div>
    </div>

    <div class="card-info">
      <div class="info-top">
        <QueueBadge :status="video.status" />
        <span class="meta-item">{{ formatDuration(video.duration) }} • {{ video.aspect }}</span>
      </div>
      <p class="prompt-text" :title="video.prompt">{{ video.prompt }}</p>
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
import { formatDuration } from '../../../shared/utils/formatDuration.js';

defineProps({
  video: { type: Object, required: true },
});
defineEmits(['retry', 'delete']);
</script>

<style scoped>
.video-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card-media {
  aspect-ratio: 9/16;
  background: #090d16;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 260px;
}
video { width: 100%; height: 100%; object-fit: cover; }
.media-placeholder { width: 85%; text-align: center; color: #94a3b8; font-size: 0.85rem; }
.progress-box { display: flex; flex-direction: column; gap: 0.5rem; }
.progress-label { font-size: 0.8rem; color: #38bdf8; font-weight: 500; }
.bar { background: #334155; height: 6px; border-radius: 3px; overflow: hidden; }
.fill { background: #0284c7; height: 100%; transition: width 0.3s; }
.error-box { color: #ef4444; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.25rem; }
.pending-box { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8rem; }
.spinner { width: 14px; height: 14px; border: 2px solid #334155; border-top-color: #94a3b8; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.card-info { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
.info-top { display: flex; justify-content: space-between; align-items: center; }
.meta-item { font-size: 0.75rem; color: #94a3b8; }
.prompt-text {
  font-size: 0.85rem; color: #cbd5e1; line-height: 1.35;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.card-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.25rem; }
.btn-action {
  background: #334155; border: none; border-radius: 4px; padding: 4px 8px;
  font-size: 0.75rem; color: #f8fafc; cursor: pointer; transition: background 0.2s;
}
.btn-action.retry:hover { background: #0284c7; }
.btn-action.delete:hover { background: #ef4444; }
</style>
