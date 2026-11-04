<!-- @purpose: thẻ hiển thị thông tin và video kết quả -->
<template>
  <div class="video-card">
    <div class="card-media">
      <video v-if="video.video_url" :src="video.video_url" controls></video>
      <div v-else class="media-placeholder">
        <div v-if="video.status === 'processing'" class="progress-info">
          <span>{{ video.progress }}%</span>
          <div class="bar"><div class="fill" :style="{ width: video.progress + '%' }"></div></div>
        </div>
        <span v-else>Chưa có video</span>
      </div>
    </div>
    <div class="card-info">
      <div class="info-top">
        <QueueBadge :status="video.status" />
        <span class="duration">{{ formatDuration(video.duration) }}</span>
      </div>
      <p class="prompt-text">{{ video.prompt }}</p>
    </div>
  </div>
</template>

<script setup>
import QueueBadge from './QueueBadge.vue';
import { formatDuration } from '../../../shared/utils/formatDuration.js';

defineProps({
  video: { type: Object, required: true },
});
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
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 280px;
}
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-placeholder {
  color: #64748b;
  font-size: 0.85rem;
  width: 80%;
  text-align: center;
}
.bar {
  background: #334155;
  height: 6px;
  border-radius: 3px;
  margin-top: 6px;
  overflow: hidden;
}
.fill {
  background: #38bdf8;
  height: 100%;
  transition: width 0.3s;
}
.card-info {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.duration {
  font-size: 0.75rem;
  color: #94a3b8;
}
.prompt-text {
  font-size: 0.85rem;
  color: #cbd5e1;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
