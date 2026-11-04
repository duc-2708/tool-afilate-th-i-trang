<!-- @purpose: layout khung chính gồm sidebar và khu vực nội dung -->
<template>
  <div class="layout-container">
    <SidebarNav />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import SidebarNav from './SidebarNav.vue';
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding: 2rem;
  background: #0f172a;
  overflow-y: auto;
}
</style>
