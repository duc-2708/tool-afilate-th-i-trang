<!-- @purpose: tải lên và xem trước ảnh mẫu thời trang -->
<template>
  <div class="image-upload-box" :class="{ dragging: isDragging }" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="onDrop">
    <div v-if="!modelValue" class="upload-placeholder">
      <input type="file" accept="image/jpeg,image/png,image/webp" :disabled="uploading" @change="onFileChange" />
      <div v-if="uploading" class="uploading-state">
        <span class="spinner"></span>
        <span>Đang tải ảnh lên máy chủ...</span>
      </div>
      <div v-else class="idle-state">
        <span class="icon">📸</span>
        <span class="label">Kéo thả hoặc nhấn để chọn ảnh mẫu</span>
        <span class="hint">Hỗ trợ JPG, PNG, WEBP (tối đa 10MB)</span>
      </div>
    </div>
    <div v-else class="preview-box">
      <img :src="modelValue" alt="Preview" />
      <button type="button" class="remove-btn" title="Xóa ảnh" @click="$emit('update:modelValue', '')">&times;</button>
    </div>
    <div v-if="uploadError" class="upload-error">{{ uploadError }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { videoCreateApi } from '../api.js';

defineProps({
  modelValue: { type: String, default: '' },
});
const emit = defineEmits(['update:modelValue']);

const uploading = ref(false);
const uploadError = ref('');
const isDragging = ref(false);

const handleFile = async (file) => {
  if (!file) return;
  uploading.value = true;
  uploadError.value = '';
  try {
    const res = await videoCreateApi.uploadImage(file);
    emit('update:modelValue', res.url);
  } catch (err) {
    uploadError.value = err.message || 'Lỗi khi tải ảnh lên';
  } finally {
    uploading.value = false;
  }
};

const onFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file) handleFile(file);
};

const onDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files?.[0];
  if (file) handleFile(file);
};
</script>

<style scoped>
.image-upload-box {
  border: 2px dashed #334155;
  border-radius: 8px;
  padding: 1.25rem;
  text-align: center;
  position: relative;
  background: #1e293b40;
  transition: all 0.2s ease;
}
.image-upload-box.dragging {
  border-color: #38bdf8;
  background: #0284c715;
}
.upload-placeholder {
  position: relative;
  cursor: pointer;
}
.upload-placeholder input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.idle-state {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: center;
}
.icon { font-size: 1.75rem; }
.label { font-size: 0.9rem; color: #cbd5e1; font-weight: 500; }
.hint { font-size: 0.75rem; color: #64748b; }
.uploading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #38bdf8;
  font-size: 0.85rem;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #38bdf840;
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.preview-box { position: relative; display: inline-block; }
.preview-box img { max-height: 180px; border-radius: 6px; object-fit: contain; }
.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}
.upload-error { color: #ef4444; font-size: 0.8rem; margin-top: 0.5rem; }
</style>
