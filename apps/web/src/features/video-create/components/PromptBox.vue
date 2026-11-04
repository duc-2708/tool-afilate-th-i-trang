<!-- @purpose: khung nhập mô tả prompt và nút mở mẫu thư viện -->
<template>
  <div class="prompt-box">
    <div class="prompt-header">
      <label>Mô tả chi tiết video:</label>
      <button type="button" class="btn-sample" @click="$emit('open-library')">
        💡 Xem mẫu gợi ý
      </button>
    </div>
    <textarea
      :value="modelValue"
      placeholder="Ví dụ: Người mẫu bước đi tự tin trên sàn diễn runway, diện đầm lụa dài quét đất..."
      rows="4"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
});
defineEmits(['update:modelValue', 'open-library']);
</script>

<style scoped>
.prompt-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.prompt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #cbd5e1;
}
.btn-sample {
  background: none;
  border: none;
  color: #38bdf8;
  font-size: 0.85rem;
  cursor: pointer;
}
textarea {
  width: 100%;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #f8fafc;
  padding: 0.75rem;
  font-family: inherit;
  resize: vertical;
}
textarea:focus {
  outline: none;
  border-color: #0284c7;
}
</style>
