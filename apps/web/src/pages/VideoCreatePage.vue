<!-- @purpose: trang tạo video thời trang ráp các feature component -->
<template>
  <MainLayout>
    <div class="page-container">
      <header class="page-header">
        <h1>Tạo Video Thời Trang AI</h1>
        <p>Biến ý tưởng thiết kế và hình ảnh mẫu thành video catwalk sống động</p>
      </header>

      <div class="content-grid">
        <section class="form-section">
          <form class="create-form" @submit.prevent="submit">
            <ModeToggle v-model="form.mode" />
            <ImageUpload v-if="form.mode === 'image'" v-model="form.imageUrl" />
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
            @delete="videoStore.deleteVideo"
          />
        </section>
      </div>

      <PromptLibraryModal
        :is-open="showLibrary"
        @close="showLibrary = false"
        @select="applyTemplate"
      />
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import ModeToggle from '../features/video-create/components/ModeToggle.vue';
import ImageUpload from '../features/video-create/components/ImageUpload.vue';
import PromptBox from '../features/video-create/components/PromptBox.vue';
import CameraChips from '../features/video-create/components/CameraChips.vue';
import StyleGrid from '../features/video-create/components/StyleGrid.vue';
import AspectDuration from '../features/video-create/components/AspectDuration.vue';
import VideoList from '../features/video-results/components/VideoList.vue';
import PromptLibraryModal from '../features/prompt-library/PromptLibraryModal.vue';
import BaseButton from '../shared/ui/BaseButton.vue';
import { useCreateVideo } from '../features/video-create/composables/useCreateVideo.js';
import { useVideoResultsStore } from '../features/video-results/store.js';
import { usePolling } from '../features/video-results/composables/usePolling.js';

const showLibrary = ref(false);
const videoStore = useVideoResultsStore();

usePolling(2000);

const { form, loading, error, submit, applyTemplate } = useCreateVideo((newVideo) => {
  videoStore.addVideo(newVideo);
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.page-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
}
.page-header p {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
.content-grid {
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 2rem;
  align-items: start;
}
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
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
.w-full {
  width: 100%;
}
.error-msg {
  color: #ef4444;
  font-size: 0.85rem;
  background: #ef444415;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
