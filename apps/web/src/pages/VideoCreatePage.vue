<!-- @purpose: trang tạo video thời trang ráp các feature component -->
<template>
  <MainLayout>
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1>Tạo Video Thời Trang AI</h1>
          <p>Biến ý tưởng thiết kế và hình ảnh mẫu thành video catwalk sống động</p>
        </div>
        <button type="button" class="btn-settings" title="Cài đặt API Token AI" @click="showSettings = true">
          ⚙️ Cài đặt API
        </button>
      </header>

      <div class="content-grid">
        <section class="form-section">
          <form class="create-form" @submit.prevent="submit">
            <ModeToggle v-model="form.mode" />
            <FashionAssetUpload
              v-if="form.mode === 'image'"
              v-model:model-image-url="form.modelImageUrl"
              v-model:garment-image-url="form.garmentImageUrl"
              v-model:reference-video-url="form.referenceVideoUrl"
            />
            <div v-else-if="form.mode === 'text'" class="quick-ref-box">
              <label class="ref-label">🎬 Link Video TikTok / Douyin tham chiếu (Tùy chọn)</label>
              <input
                v-model="form.referenceVideoUrl"
                type="url"
                placeholder="https://www.tiktok.com/@... hoặc https://v.douyin.com/..."
                class="ref-input"
              />
            </div>
            <PromptBox v-model="form.prompt" @open-library="showLibrary = true" />
            <CameraChips v-model="form.camera" />
            <StyleGrid v-model="form.style" />
            <AspectDuration v-model:aspect="form.aspect" v-model:duration="form.duration" />

            <div v-if="error" class="error-msg">{{ error }}</div>

            <BaseButton type="submit" :loading="loading" class="w-full">
              ✨ Khởi tạo Video AI
            </BaseButton>
          </form>
        </section>

        <section class="results-section">
          <VideoList
            :videos="videoStore.videos"
            @retry="videoStore.retryVideo"
            @resume="videoStore.resumeVideo"
            @override="videoStore.overrideVideo"
            @delete="videoStore.deleteVideo"
          />
        </section>
      </div>

      <PromptLibraryModal
        :is-open="showLibrary"
        @close="showLibrary = false"
        @select="applyTemplate"
      />

      <SettingsModal
        :is-open="showSettings"
        @close="showSettings = false"
      />
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import ModeToggle from '../features/video-create/components/ModeToggle.vue';
import FashionAssetUpload from '../features/video-create/components/FashionAssetUpload.vue';
import PromptBox from '../features/video-create/components/PromptBox.vue';
import CameraChips from '../features/video-create/components/CameraChips.vue';
import StyleGrid from '../features/video-create/components/StyleGrid.vue';
import AspectDuration from '../features/video-create/components/AspectDuration.vue';
import VideoList from '../features/video-results/components/VideoList.vue';
import PromptLibraryModal from '../features/prompt-library/PromptLibraryModal.vue';
import SettingsModal from '../features/settings/SettingsModal.vue';
import BaseButton from '../shared/ui/BaseButton.vue';
import { useCreateVideo } from '../features/video-create/composables/useCreateVideo.js';
import { useVideoResultsStore } from '../features/video-results/store.js';
import { usePolling } from '../features/video-results/composables/usePolling.js';

const showLibrary = ref(false);
const showSettings = ref(false);
const videoStore = useVideoResultsStore();

usePolling(2000);

const { form, loading, error, submit, applyTemplate } = useCreateVideo((newVideo) => {
  videoStore.addVideo(newVideo);
});
</script>

<style scoped>
.page-container { display: flex; flex-direction: column; gap: 1.5rem; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.page-header h1 { font-size: 1.5rem; font-weight: 700; color: #f8fafc; }
.page-header p { color: #94a3b8; font-size: 0.9rem; margin-top: 0.25rem; }
.btn-settings { background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 0.45rem 0.85rem; color: #cbd5e1; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
.btn-settings:hover { border-color: #38bdf8; color: #38bdf8; background: #0284c715; }
.content-grid { display: grid; grid-template-columns: 460px 1fr; gap: 2rem; align-items: start; }
@media (max-width: 1024px) {
  .content-grid { grid-template-columns: 1fr; }
}
.create-form {
  background: #1e293b60;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.w-full { width: 100%; }
.error-msg {
  color: #ef4444;
  font-size: 0.85rem;
  background: #ef444415;
  padding: 0.5rem;
  border-radius: 4px;
}
.quick-ref-box { display: flex; flex-direction: column; gap: 0.35rem; }
.ref-label { font-size: 0.75rem; color: #94a3b8; }
.ref-input {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #f8fafc;
  padding: 0.5rem;
  font-size: 0.8rem;
  outline: none;
}
</style>
