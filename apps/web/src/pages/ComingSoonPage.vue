<!-- @purpose: trang tính năng sắp ra mắt -->
<template>
  <MainLayout>
    <div class="coming-soon">
      <h2>Tính năng đang phát triển</h2>
      <p>Khu vực này sẽ sớm ra mắt trong các phiên bản kế tiếp.</p>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue';
</script>

<style scoped>
.coming-soon {
  text-align: center;
  padding: 4rem 1rem;
  color: #94a3b8;
}
h2 {
  font-size: 1.5rem;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}
</style>
