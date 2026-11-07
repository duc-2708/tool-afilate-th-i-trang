<!-- @purpose: nạp tài nguyên người mẫu trang phục và link video mẫu tiktok douyin -->
<template>
  <div class="fashion-assets-card">
    <div class="section-title">
      <span>👗 Tài nguyên Thời trang AI</span>
      <span class="badge">Multi-Asset</span>
    </div>

    <div class="dual-upload-grid">
      <!-- Upload Ảnh Người Mẫu -->
      <div class="upload-item">
        <label class="item-label">👤 Người mẫu (Model)</label>
        <div v-if="!modelImageUrl" class="drop-zone" :class="{ loading: uploadingModel }">
          <input type="file" accept="image/*" :disabled="uploadingModel" @change="uploadAsset($event, 'model')" />
          <div class="zone-content">
            <span class="zone-icon">📷</span>
            <span class="zone-text">{{ uploadingModel ? 'Đang nạp...' : 'Tải ảnh người mẫu' }}</span>
          </div>
        </div>
        <div v-else class="preview-mini">
          <img :src="modelImageUrl" alt="Model" />
          <button type="button" class="del-btn" @click="$emit('update:modelImageUrl', '')">&times;</button>
        </div>
      </div>

      <!-- Upload Ảnh Trang Phục -->
      <div class="upload-item">
        <label class="item-label">✨ Trang phục (Garment)</label>
        <div v-if="!garmentImageUrl" class="drop-zone" :class="{ loading: uploadingGarment }">
          <input type="file" accept="image/*" :disabled="uploadingGarment" @change="uploadAsset($event, 'garment')" />
          <div class="zone-content">
            <span class="zone-icon">👗</span>
            <span class="zone-text">{{ uploadingGarment ? 'Đang nạp...' : 'Tải ảnh trang phục' }}</span>
          </div>
        </div>
        <div v-else class="preview-mini">
          <img :src="garmentImageUrl" alt="Garment" />
          <button type="button" class="del-btn" @click="$emit('update:garmentImageUrl', '')">&times;</button>
        </div>
      </div>
    </div>

    <!-- Link Video TikTok/Douyin -->
    <div class="reference-link-box">
      <label class="item-label">
        <span>🎬 Link Video TikTok / Douyin tham chiếu</span>
        <span class="hint-pill">Agent 1 Trend Scout</span>
      </label>
      <div class="input-wrapper">
        <span class="input-prefix">🔗</span>
        <input
          type="url"
          :value="referenceVideoUrl"
          placeholder="https://www.tiktok.com/@... hoặc https://v.douyin.com/..."
          @input="$emit('update:referenceVideoUrl', $event.target.value)"
        />
      </div>
      <p class="desc-hint">AI sẽ phân tích góc quay, dáng pose nhiều tim và nhịp catwalk từ video mẫu.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { videoCreateApi } from '../api.js';

defineProps({
  modelImageUrl: { type: String, default: '' },
  garmentImageUrl: { type: String, default: '' },
  referenceVideoUrl: { type: String, default: '' },
});

const emit = defineEmits(['update:modelImageUrl', 'update:garmentImageUrl', 'update:referenceVideoUrl']);
const uploadingModel = ref(false);
const uploadingGarment = ref(false);

const uploadAsset = async (event, type) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (type === 'model') uploadingModel.value = true;
  else uploadingGarment.value = true;

  try {
    const res = await videoCreateApi.uploadImage(file);
    if (type === 'model') emit('update:modelImageUrl', res.url);
    else emit('update:garmentImageUrl', res.url);
  } catch (err) {
    alert(err.message || 'Lỗi tải ảnh lên');
  } finally {
    if (type === 'model') uploadingModel.value = false;
    else uploadingGarment.value = false;
  }
};
</script>

<style scoped>
.fashion-assets-card { display: flex; flex-direction: column; gap: 0.85rem; background: #0f172a80; border: 1px solid #334155; border-radius: 8px; padding: 0.85rem; }
.section-title { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: #38bdf8; }
.badge { font-size: 0.65rem; background: #0284c725; color: #38bdf8; padding: 2px 6px; border-radius: 4px; border: 1px solid #0284c750; }
.dual-upload-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.item-label { display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.35rem; }
.drop-zone { position: relative; border: 1px dashed #475569; border-radius: 6px; padding: 0.75rem 0.25rem; text-align: center; background: #1e293b50; cursor: pointer; transition: all 0.2s; }
.drop-zone:hover { border-color: #38bdf8; background: #0284c715; }
.drop-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
.zone-icon { font-size: 1.2rem; display: block; }
.zone-text { font-size: 0.7rem; color: #cbd5e1; }
.preview-mini { position: relative; height: 80px; border-radius: 6px; overflow: hidden; border: 1px solid #38bdf8; }
.preview-mini img { width: 100%; height: 100%; object-fit: cover; }
.del-btn { position: absolute; top: 4px; right: 4px; background: #ef4444cc; border: none; color: #fff; border-radius: 50%; width: 18px; height: 18px; cursor: pointer; font-size: 12px; line-height: 1; }
.reference-link-box { display: flex; flex-direction: column; gap: 0.3rem; }
.hint-pill { font-size: 0.65rem; color: #a855f7; }
.input-wrapper { display: flex; align-items: center; background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 0 0.5rem; }
.input-wrapper input { flex: 1; background: transparent; border: none; color: #f8fafc; padding: 0.45rem 0.25rem; font-size: 0.75rem; outline: none; }
.desc-hint { font-size: 0.68rem; color: #64748b; margin: 0; }
</style>
