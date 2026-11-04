<!-- @purpose: tải lên và xem trước ảnh mẫu thời trang -->
<template>
  <div class="image-upload-box">
    <div v-if="!modelValue" class="upload-placeholder">
      <input type="file" accept="image/*" @change="onFileChange" />
      <span>📸 Chọn ảnh mẫu trang phục</span>
    </div>
    <div v-else class="preview-box">
      <img :src="modelValue" alt="Preview" />
      <button type="button" class="remove-btn" @click="$emit('update:modelValue', '')">&times;</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
});
const emit = defineEmits(['update:modelValue']);

const onFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => emit('update:modelValue', event.target.result);
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.image-upload-box {
  border: 2px dashed #334155;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  position: relative;
}
.upload-placeholder input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.preview-box img {
  max-height: 180px;
  border-radius: 6px;
}
.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
