<!-- @purpose: thanh điều hướng bên sườn của ứng dụng -->
<template>
  <aside class="sidebar">
    <div class="brand">
      <h2>VideoStudio</h2>
      <span class="badge">Fashion AI</span>
    </div>
    <nav class="nav-links">
      <router-link to="/" class="nav-item" active-class="active">
        <span>🎬</span> Tạo video
      </router-link>
      <router-link to="/coming-soon" class="nav-item" active-class="active">
        <span>✨</span> Bộ sưu tập
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: #1e293b;
  min-height: 100vh;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-right: 1px solid #334155;
}
.brand h2 {
  font-size: 1.25rem;
  color: #38bdf8;
}
.badge {
  font-size: 0.75rem;
  background: #0284c7;
  padding: 2px 6px;
  border-radius: 4px;
}
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #94a3b8;
  text-decoration: none;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
}
.nav-item:hover, .nav-item.active {
  background: #334155;
  color: #ffffff;
}
</style>
