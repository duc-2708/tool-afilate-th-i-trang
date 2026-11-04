<!-- @purpose: nút chuyển đổi giữa Text-to-Video và Image-to-Video -->
<template>
  <div class="toggle-group">
    <button
      type="button"
      :class="{ active: modelValue === 'text' }"
      @click="$emit('update:modelValue', 'text')"
    >
      📝 Mô tả chữ
    </button>
    <button
      type="button"
      :class="{ active: modelValue === 'image' }"
      @click="$emit('update:modelValue', 'image')"
    >
      🖼️ Từ ảnh mẫu
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: 'text' },
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.toggle-group {
  display: flex;
  background: #1e293b;
  padding: 4px;
  border-radius: 8px;
  gap: 4px;
}
button {
  flex: 1;
  padding: 8px 16px;
  border: none;
  background: none;
  color: #94a3b8;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
button.active {
  background: #0284c7;
  color: #fff;
}
</style>
