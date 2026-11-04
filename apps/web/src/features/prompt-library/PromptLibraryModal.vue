<!-- @purpose: modal hiển thị thư viện prompt mẫu cho người dùng chọn nhanh -->
<template>
  <BaseModal :is-open="isOpen" title="Thư viện gợi ý Prompt Thời trang" @close="$emit('close')">
    <div class="library-list">
      <div
        v-for="item in FASHION_PROMPT_SAMPLES"
        :key="item.id"
        class="sample-item"
        @click="select(item.prompt)"
      >
        <div class="sample-top">
          <span class="category">{{ item.category }}</span>
          <h4>{{ item.title }}</h4>
        </div>
        <p class="sample-prompt">{{ item.prompt }}</p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from '../../shared/ui/BaseModal.vue';
import { FASHION_PROMPT_SAMPLES } from './prompts.data.js';

defineProps({
  isOpen: { type: Boolean, default: false },
});
const emit = defineEmits(['close', 'select']);

const select = (prompt) => {
  emit('select', prompt);
  emit('close');
};
</script>

<style scoped>
.library-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.sample-item {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}
.sample-item:hover {
  border-color: #0284c7;
  background: #0284c715;
}
.sample-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.category {
  font-size: 0.7rem;
  background: #334155;
  color: #38bdf8;
  padding: 2px 6px;
  border-radius: 4px;
}
h4 {
  font-size: 0.9rem;
  color: #f8fafc;
}
.sample-prompt {
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.3;
}
</style>
