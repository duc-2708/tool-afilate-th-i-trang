<!-- @purpose: huy hiệu hiển thị trạng thái của video trong hàng đợi -->
<template>
  <span class="badge" :class="status">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: { type: String, default: 'pending' },
});

const label = computed(() => {
  switch (props.status) {
    case 'pending': return 'Đang chờ';
    case 'processing': return 'Đang sinh video';
    case 'completed': return 'Hoàn thành';
    case 'failed': return 'Thất bại';
    default: return props.status;
  }
});
</script>

<style scoped>
.badge {
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
}
.pending { background: #64748b; color: #fff; }
.processing { background: #0284c7; color: #fff; }
.completed { background: #16a34a; color: #fff; }
.failed { background: #dc2626; color: #fff; }
</style>
