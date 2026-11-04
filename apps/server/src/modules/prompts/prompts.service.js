// @purpose: xử lý nghiệp vụ lấy và tìm kiếm prompt mẫu

import { PROMPT_TEMPLATES } from './templates.js';

export const promptsService = {
  getTemplates() {
    return PROMPT_TEMPLATES;
  },

  getTemplateById(id) {
    return PROMPT_TEMPLATES.find((item) => item.id === id) || null;
  },
};
