<!-- @purpose: component biểu tượng xoay tải dữ liệu -->
<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #334155;
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
