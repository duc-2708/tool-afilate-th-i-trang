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

  const applyTemplate = (sample) => {
    form.prompt = sample.prompt;
    if (sample.style) form.style = sample.style;
    if (sample.camera) form.camera = sample.camera;
  };

  const submit = async () => {
    if (!form.prompt || form.prompt.trim().length < 3) {
      error.value = 'Vui lòng nhập mô tả video tối thiểu 3 ký tự';
      return;
    }
    if (form.mode === 'image' && !form.imageUrl) {
      error.value = 'Chế độ ảnh yêu cầu tải lên ảnh mẫu trước';
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const res = await videoCreateApi.createVideo(form);
      if (onSuccess) onSuccess(res);
      form.prompt = '';
      form.imageUrl = '';
    } catch (err) {
      error.value = err.message || 'Lỗi khi tạo video';
    } finally {
      loading.value = false;
    }
  };

  return { form, loading, error, submit, applyTemplate };
}
