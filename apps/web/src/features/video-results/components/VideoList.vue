<!-- @purpose: danh sách lưới hiển thị các thẻ video đã tạo -->
<template>
  <div class="video-list-section">
    <h3>Video đã tạo</h3>
    <div v-if="videos.length === 0" class="empty">
      Chưa có video nào được tạo. Hãy tạo video đầu tiên của bạn!
    </div>
    <div v-else class="video-grid">
      <VideoCard v-for="video in videos" :key="video.id" :video="video" />
    </div>
  </div>
</template>

<script setup>
import VideoCard from './VideoCard.vue';

defineProps({
  videos: { type: Array, default: () => [] },
});
</script>

<style scoped>
.video-list-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h3 {
  font-size: 1.1rem;
  color: #f1f5f9;
}
.empty {
  padding: 2rem;
  text-align: center;
  color: #64748b;
  background: #1e293b50;
  border-radius: 8px;
}
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
