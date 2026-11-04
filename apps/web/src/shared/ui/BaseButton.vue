<!-- @purpose: component nút bấm dùng chung -->
<template>
  <button :type="type" :disabled="disabled || loading" class="btn" :class="[variant, size]">
    <span v-if="loading" class="spinner"></span>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
});
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.primary {
  background: #0284c7;
  color: #fff;
}
.primary:hover:not(:disabled) {
  background: #0369a1;
}
.secondary {
  background: #334155;
  color: #f8fafc;
}
.md {
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
}
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #ffffff40;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
