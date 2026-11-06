<!-- @purpose: khung nhập mô tả prompt và nút mở mẫu thư viện -->
<template>
  <div class="prompt-box">
    <div class="prompt-header">
      <label>Mô tả chi tiết video:</label>
      <button type="button" class="btn-sample" @click="$emit('open-library')">
        💡 Thư viện prompt mẫu
      </button>
    </div>
    <div class="textarea-wrapper">
      <textarea
        :value="modelValue"
        placeholder="Ví dụ: Người mẫu bước đi tự tin trên sàn diễn runway, diện đầm lụa satin đỏ quét sàn..."
        rows="4"
        maxlength="1000"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      <div class="char-counter">{{ (modelValue || '').length }}/1000</div>
    </div>
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
  font-weight: 500;
  transition: color 0.2s;
}
.btn-sample:hover {
  color: #7dd3fc;
  text-decoration: underline;
}
.textarea-wrapper {
  position: relative;
}
textarea {
  width: 100%;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #f8fafc;
  padding: 0.75rem;
  padding-bottom: 1.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.4;
  resize: vertical;
}
textarea:focus {
  outline: none;
  border-color: #0284c7;
}
.char-counter {
  position: absolute;
  bottom: 6px;
  right: 10px;
  font-size: 0.75rem;
  color: #64748b;
  pointer-events: none;
}
</style>
