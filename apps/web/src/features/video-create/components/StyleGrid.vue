<!-- @purpose: lưới hiển thị và chọn các phong cách thời trang -->
<template>
  <div class="style-grid-container">
    <label>Phong cách thời trang:</label>
    <div class="grid">
      <div
        v-for="item in FASHION_STYLES"
        :key="item.id"
        class="card"
        :class="{ active: modelValue === item.id }"
        @click="$emit('update:modelValue', item.id)"
      >
        <span class="title">{{ item.label }}</span>
        <span class="desc">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FASHION_STYLES } from '@videostudio/shared';

defineProps({
  modelValue: { type: String, default: 'studio_clean' },
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.style-grid-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-size: 0.9rem;
  color: #cbd5e1;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}
.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s ease;
}
.card.active {
  border-color: #0284c7;
  background: #0369a120;
}
.title {
  font-weight: 500;
  font-size: 0.85rem;
  color: #f1f5f9;
}
.desc {
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.2;
}
</style>
