// @purpose: composable định kỳ polling cập nhật tiến độ các job đang xử lý

import { onMounted, onUnmounted } from 'vue';
import { useVideoResultsStore } from '../store.js';
import { videoResultsApi } from '../api.js';

export function usePolling(intervalMs = 3000) {
  const store = useVideoResultsStore();
  let timer = null;

  const poll = async () => {
    const processing = store.videos.filter((v) => ['pending', 'processing'].includes(v.status));
    for (const v of processing) {
      try {
        const latest = await videoResultsApi.fetchVideoById(v.id);
        store.updateVideo(v.id, latest);
      } catch (err) {
        console.error('Polling error:', err);
      }
    }
  };

  onMounted(() => {
    store.loadVideos();
    timer = setInterval(poll, intervalMs);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });
}
