// @purpose: quản lý trạng thái form tạo video thời trang đa tài nguyên

import { ref, reactive } from 'vue';
import { videoCreateApi } from '../api.js';

export function useCreateVideo(onSuccess) {
  const loading = ref(false);
  const error = ref(null);

  const form = reactive({
    mode: 'text',
    prompt: '',
    imageUrl: '',
    modelImageUrl: '',
    garmentImageUrl: '',
    referenceVideoUrl: '',
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
    if (form.mode === 'image' && !form.modelImageUrl && !form.garmentImageUrl && !form.imageUrl) {
      error.value = 'Vui lòng nạp ít nhất ảnh người mẫu hoặc ảnh trang phục';
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const payload = {
        ...form,
        imageUrl: form.modelImageUrl || form.garmentImageUrl || form.imageUrl,
      };
      const res = await videoCreateApi.createVideo(payload);
      if (onSuccess) onSuccess(res);
      form.prompt = '';
      form.imageUrl = '';
      form.modelImageUrl = '';
      form.garmentImageUrl = '';
      form.referenceVideoUrl = '';
    } catch (err) {
      error.value = err.message || 'Lỗi khi tạo video';
    } finally {
      loading.value = false;
    }
  };

  return { form, loading, error, submit, applyTemplate };
}
