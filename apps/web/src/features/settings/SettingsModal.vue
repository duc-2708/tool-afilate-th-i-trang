<!-- @purpose: modal cài đặt và kiểm tra kết nối api key cho các mô hình ai -->
<template>
  <BaseModal :is-open="isOpen" title="⚙️ Cài đặt API Token AI" @close="$emit('close')">
    <div class="settings-form">
      <p class="settings-desc">
        Nhập khóa API cho các mô hình sinh ảnh & video. Bấm <strong>Kiểm tra</strong> để xác thực kết nối trước khi khởi tạo pipeline.
      </p>

      <div v-for="prov in PROVIDERS" :key="prov.id" class="provider-row">
        <div class="row-header">
          <div class="prov-info">
            <span class="prov-icon">{{ prov.icon }}</span>
            <span class="prov-name">{{ prov.name }}</span>
          </div>
          <span v-if="testStates[prov.id]?.status" class="test-badge" :class="testStates[prov.id].status">
            {{ testStates[prov.id].message }}
          </span>
        </div>

        <div class="input-actions-group">
          <input
            v-model="keyInputs[prov.id]"
            type="password"
            :placeholder="placeholders[prov.id] || 'Nhập ' + prov.name + ' API Key...'"
            class="key-input"
          />
          <button
            type="button"
            class="btn-test"
            :disabled="testStates[prov.id]?.loading"
            @click="testConnection(prov.id)"
          >
            {{ testStates[prov.id]?.loading ? 'Đang test...' : 'Kiểm tra' }}
          </button>
        </div>
      </div>

      <div class="modal-footer">
        <span v-if="saveMessage" class="save-msg">{{ saveMessage }}</span>
        <div class="footer-btns">
          <button type="button" class="btn-cancel" @click="$emit('close')">Đóng</button>
          <button type="button" class="btn-save" :disabled="saving" @click="saveAllKeys">
            {{ saving ? 'Đang lưu...' : '💾 Lưu cài đặt' }}
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import BaseModal from '../../shared/ui/BaseModal.vue';
import { settingsApi } from './api.js';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});
defineEmits(['close']);

const PROVIDERS = [
  { id: 'gemini', name: 'Google Gemini (Prompter & Critic)', icon: '♊' },
  { id: 'veo', name: 'Google Veo 3 (Video Engine 8s)', icon: '🎬' },
  { id: 'banana', name: 'Banana Pro (Keyframe Image AI)', icon: '🍌' },
];

const keyInputs = reactive({ gemini: '', veo: '', banana: '' });
const placeholders = reactive({ gemini: '', veo: '', banana: '' });
const testStates = reactive({ gemini: {}, veo: {}, banana: {} });
const saving = ref(false);
const saveMessage = ref('');

const loadConfiguredKeys = async () => {
  try {
    const keys = await settingsApi.fetchKeys();
    for (const id of ['gemini', 'veo', 'banana']) {
      if (keys[id]?.configured) {
        placeholders[id] = `Đã cấu hình (${keys[id].masked})`;
      }
    }
  } catch {}
};

watch(() => props.isOpen, (open) => {
  if (open) {
    saveMessage.value = '';
    loadConfiguredKeys();
  }
});

const testConnection = async (provider) => {
  testStates[provider] = { loading: true, status: 'loading', message: 'Đang kiểm tra kết nối...' };
  try {
    const res = await settingsApi.testApiKey({ provider, apiKey: keyInputs[provider] });
    if (res.success) {
      testStates[provider] = { status: 'success', message: `✓ Hoạt động (${res.latencyMs}ms)` };
    } else {
      testStates[provider] = { status: 'error', message: `✕ ${res.message}` };
    }
  } catch (err) {
    testStates[provider] = { status: 'error', message: `✕ ${err.message || 'Lỗi kiểm tra'}` };
  }
};

const saveAllKeys = async () => {
  saving.value = true;
  saveMessage.value = '';
  try {
    const payload = {};
    for (const id of ['gemini', 'veo', 'banana']) {
      if (keyInputs[id]) payload[id] = keyInputs[id];
    }
    await settingsApi.saveKeys(payload);
    saveMessage.value = '✓ Đã lưu cài đặt API Key thành công!';
    await loadConfiguredKeys();
  } catch (err) {
    saveMessage.value = `✕ Lỗi: ${err.message}`;
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.settings-form { display: flex; flex-direction: column; gap: 1rem; }
.settings-desc { font-size: 0.8rem; color: #94a3b8; line-height: 1.4; margin: 0; }
.provider-row { display: flex; flex-direction: column; gap: 0.35rem; background: #0f172a; padding: 0.75rem; border-radius: 6px; border: 1px solid #334155; }
.row-header { display: flex; justify-content: space-between; align-items: center; }
.prov-info { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; font-weight: 600; color: #f8fafc; }
.test-badge { font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; }
.test-badge.success { background: #166534; color: #4ade80; }
.test-badge.error { background: #7f1d1d; color: #f87171; }
.test-badge.loading { background: #075985; color: #38bdf8; }
.input-actions-group { display: flex; gap: 0.5rem; }
.key-input { flex: 1; background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 0.45rem 0.6rem; color: #f8fafc; font-size: 0.78rem; outline: none; }
.key-input:focus { border-color: #38bdf8; }
.btn-test { background: #334155; border: none; border-radius: 6px; padding: 0 0.85rem; color: #f8fafc; font-size: 0.75rem; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
.btn-test:hover:not(:disabled) { background: #0284c7; }
.btn-test:disabled { opacity: 0.6; cursor: not-allowed; }
.modal-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; flex-wrap: wrap; gap: 0.5rem; }
.save-msg { font-size: 0.75rem; color: #4ade80; }
.footer-btns { display: flex; gap: 0.5rem; margin-left: auto; }
.btn-cancel { background: #334155; border: none; border-radius: 6px; padding: 0.5rem 1rem; color: #cbd5e1; font-size: 0.8rem; cursor: pointer; }
.btn-save { background: #0284c7; border: none; border-radius: 6px; padding: 0.5rem 1rem; color: #fff; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
.btn-save:hover:not(:disabled) { background: #0369a1; }
</style>
