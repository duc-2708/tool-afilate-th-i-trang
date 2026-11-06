<!-- @purpose: danh sách lưới hiển thị các thẻ video đã tạo -->
<template>
  <div class="video-list-section">
    <div class="list-header">
      <div class="title-row">
        <h3>Lịch sử tạo Video</h3>
        <span class="count-badge">{{ videos.length }} video</span>
      </div>
      <div v-if="activeCount > 0" class="active-indicator">
        <span class="pulse-dot"></span> {{ activeCount }} tác vụ đang xử lý
      </div>
    </div>

    <div v-if="videos.length === 0" class="empty">
      <span class="empty-icon">🎬</span>
      <p>Chưa có video nào được tạo.</p>
      <span class="empty-hint">Hãy điền form bên trái và khởi tạo video thời trang đầu tiên của bạn!</span>
    </div>
    <div v-else class="video-grid">
      <VideoCard
        v-for="video in videos"
        :key="video.id"
        :video="video"
        @retry="$emit('retry', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VideoCard from './VideoCard.vue';

const props = defineProps({
  videos: { type: Array, default: () => [] },
});
defineEmits(['retry', 'delete']);

const activeCount = computed(() => {
  return props.videos.filter((v) => ['pending', 'processing'].includes(v.status)).length;
});
</script>

<style scoped>
.video-list-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
h3 {
  font-size: 1.1rem;
  color: #f1f5f9;
}
.count-badge {
  font-size: 0.75rem;
  background: #334155;
  color: #94a3b8;
  padding: 2px 8px;
  border-radius: 12px;
}
.active-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #38bdf8;
}
.pulse-dot {
  width: 8px;
  height: 8px;
  background: #38bdf8;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}
.empty {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #94a3b8;
  background: #1e293b40;
  border: 1px dashed #334155;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.empty-icon { font-size: 2.5rem; }
.empty-hint { font-size: 0.8rem; color: #64748b; }
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
