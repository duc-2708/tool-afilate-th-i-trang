<!-- @purpose: component thông báo toast góc màn hình -->
<template>
  <div v-if="visible" class="toast" :class="type">
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  message: { type: String, default: '' },
  type: { type: String, default: 'info' },
});
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  color: #fff;
  z-index: 2000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
.info { background: #0284c7; }
.success { background: #16a34a; }
.error { background: #dc2626; }
</style>
