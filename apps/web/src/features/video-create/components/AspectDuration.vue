<!-- @purpose: bộ chọn tỷ lệ khung hình và thời lượng video -->
<template>
  <div class="row">
    <div class="field">
      <label>Tỷ lệ khung hình:</label>
      <select :value="aspect" @change="$emit('update:aspect', $event.target.value)">
        <option v-for="item in ASPECT_RATIOS" :key="item.id" :value="item.id">
          {{ item.label }}
        </option>
      </select>
    </div>
    <div class="field">
      <label>Thời lượng video:</label>
      <select :value="duration" @change="$emit('update:duration', Number($event.target.value))">
        <option v-for="item in ALLOWED_DURATIONS" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ASPECT_RATIOS, ALLOWED_DURATIONS } from '@videostudio/shared';

defineProps({
  aspect: { type: String, default: '9:16' },
  duration: { type: Number, default: 5 },
});
defineEmits(['update:aspect', 'update:duration']);
</script>

<style scoped>
.row {
  display: flex;
  gap: 1rem;
}
.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-size: 0.9rem;
  color: #cbd5e1;
}
select {
  background: #1e293b;
  border: 1px solid #334155;
  color: #f8fafc;
  padding: 0.6rem;
  border-radius: 6px;
  outline: none;
}
</style>
