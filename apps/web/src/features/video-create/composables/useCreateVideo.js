// @purpose: quản lý trạng thái form tạo video và xử lý gửi dữ liệu

import { ref, reactive } from 'vue';
import { videoCreateApi } from '../api.js';

export function useCreateVideo(onSuccess) {
  const loading = ref(false);
  const error = ref(null);

  const form = reactive({
    mode: 'text',
    prompt: '',
    imageUrl: '',
    camera: 'static',
    style: 'studio_clean',
    aspect: '9:16',
    duration: 5,
  });

  const submit = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await videoCreateApi.createVideo(form);
      if (onSuccess) onSuccess(res);
      form.prompt = '';
    } catch (err) {
      error.value = err.message || 'Lỗi khi tạo video';
    } finally {
      loading.value = false;
    }
  };

  return { form, loading, error, submit };
}
