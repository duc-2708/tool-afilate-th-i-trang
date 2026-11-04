<!-- @purpose: danh sách chip chọn chuyển động góc máy camera -->
<template>
  <div class="camera-chips">
    <label>Góc quay camera:</label>
    <div class="chips-container">
      <button
        v-for="item in CAMERA_MOTIONS"
        :key="item.id"
        type="button"
        class="chip"
        :class="{ active: modelValue === item.id }"
        @click="$emit('update:modelValue', item.id)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { CAMERA_MOTIONS } from '@videostudio/shared';

defineProps({
  modelValue: { type: String, default: 'static' },
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.camera-chips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-size: 0.9rem;
  color: #cbd5e1;
}
.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.chip {
  padding: 6px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  color: #94a3b8;
  font-size: 0.85rem;
  cursor: pointer;
}
.chip.active {
  background: #0284c7;
  color: #fff;
  border-color: #0284c7;
}
</style>
