# CODEMAP

## docs
docs/CODEMAP.md | bản đồ định vị code toàn dự án | không
docs/API.md | danh sách và đặc tả endpoints api | không
docs/PIPELINE_FLOW.md | kịch bản và checklist multi-agent flow | không

## packages/shared
packages/shared/package.json | cấu hình package shared | zod
packages/shared/src/index.js | export chung schemas và constants | schemas, constants
packages/shared/src/schemas/video.schema.js | zod schema tạo video | zod, constants
packages/shared/src/constants/camera.js | danh sách chuyển động camera | không
packages/shared/src/constants/styles.js | danh sách phong cách thời trang | không
packages/shared/src/constants/aspect.js | danh sách tỷ lệ và thời lượng | không
packages/shared/src/constants/pipeline.js | hằng số chặng pipeline critic và mã lỗi | không

## apps/server/config & db & middleware
apps/server/package.json | cấu hình package server | express, shared
apps/server/src/index.js | khởi động http server | app.js, env.js
apps/server/src/app.js | ráp middleware và routes | express, routes, middleware
apps/server/src/config/env.js | đọc và validate biến môi trường | dotenv
apps/server/src/db/connection.js | kết nối sqlite | node:sqlite, env.js
apps/server/src/db/schema.sql | ddl bảng video và queue | không
apps/server/src/middleware/upload.js | middleware upload và kiểm tra ảnh | multer, env.js
apps/server/src/middleware/error.js | middleware xử lý lỗi tập trung | không
apps/server/src/middleware/rateLimit.js | middleware giới hạn tần suất gọi | không

## apps/server/modules/videos
apps/server/src/modules/videos/videos.routes.js | định nghĩa endpoint videos | videos.controller, upload.js
apps/server/src/modules/videos/videos.controller.js | tiếp nhận request videos | videos.service
apps/server/src/modules/videos/videos.service.js | nghiệp vụ quản lý video resume override | videos.repo, queue, shared
apps/server/src/modules/videos/videos.repo.js | thao tác dữ liệu video sqlite | connection.js

## apps/server/modules/prompts
apps/server/src/modules/prompts/prompts.routes.js | định nghĩa endpoint prompts | prompts.service
apps/server/src/modules/prompts/prompts.service.js | logic xử lý và gợi ý prompt | templates.js
apps/server/src/modules/prompts/templates.js | danh sách prompt mẫu thời trang | không

## apps/server/modules/settings
apps/server/src/modules/settings/settings.routes.js | định nghĩa endpoint cấu hình và test api key | settings.service
apps/server/src/modules/settings/settings.service.js | quản lý và test kết nối các provider ai | env.js

## apps/server/modules/agents
apps/server/src/modules/agents/trend.scout.js | agent 1 phân tích xu hướng video tiktok douyin | không
apps/server/src/modules/agents/fashion.prompter.js | agent 2 soạn prompt ảnh keyframe và video 8s | không
apps/server/src/modules/agents/fashion.critic.js | agent 4 giám định 3 lớp ảnh clip video | shared
apps/server/src/modules/agents/video.editor.js | agent 6 biên tập video thời trang và hòa âm bgm | env.js

## apps/server/modules/queue
apps/server/src/modules/queue/queue.js | hàng đợi in-memory và điều phối | worker.js
apps/server/src/modules/queue/worker.js | điều phối state machine các chặng | provider, videos.repo, shared
apps/server/src/modules/queue/error.shield.js | bộ chặn và phân loại lỗi hạn mức tạm dừng | shared, videos.repo
apps/server/src/modules/queue/recovery.js | phục hồi job bị lỗi sau crash | videos.repo, queue

## apps/server/modules/provider
apps/server/src/modules/provider/provider.interface.js | interface chuẩn cho ai provider | không
apps/server/src/modules/provider/image.provider.js | agent 3 sinh ảnh keyframe người mẫu trang phục | env.js
apps/server/src/modules/provider/mock.provider.js | provider giả lập tạo video | provider.interface
apps/server/src/modules/provider/veo.provider.js | agent 5 tích hợp google veo sinh clip 8s | provider.interface, env.js
apps/server/src/modules/provider/replicate.provider.js | provider tích hợp replicate | provider.interface
apps/server/src/modules/provider/index.js | factory lấy video provider | mock, veo, replicate

## apps/web/core & layouts & pages
apps/web/package.json | cấu hình package web | vue, vite, pinia, shared
apps/web/vite.config.js | cấu hình vite build và proxy | @vitejs/plugin-vue
apps/web/index.html | html mount point cho vue | main.js
apps/web/src/main.js | entry point ứng dụng vue | App.vue, router, pinia
apps/web/src/App.vue | component gốc render router | router-view
apps/web/src/router/index.js | cấu hình định tuyến web | vue-router, pages
apps/web/src/layouts/MainLayout.vue | layout chính chứa sidebar | SidebarNav
apps/web/src/layouts/SidebarNav.vue | thanh menu điều hướng | router-link
apps/web/src/pages/VideoCreatePage.vue | trang tạo video thời trang | MainLayout, features
apps/web/src/pages/ComingSoonPage.vue | trang tính năng sắp ra mắt | MainLayout

## apps/web/features/video-create
apps/web/src/features/video-create/components/ModeToggle.vue | toggle text/image to video | không
apps/web/src/features/video-create/components/FashionAssetUpload.vue | nạp tài nguyên người mẫu trang phục và link tiktok douyin | api.js
apps/web/src/features/video-create/components/ImageUpload.vue | upload và preview ảnh mẫu | api.js
apps/web/src/features/video-create/components/PromptBox.vue | nhập prompt và mở mẫu gợi ý | không
apps/web/src/features/video-create/components/CameraChips.vue | chip chọn góc máy camera | shared/camera
apps/web/src/features/video-create/components/StyleGrid.vue | lưới chọn style thời trang | shared/styles
apps/web/src/features/video-create/components/AspectDuration.vue | chọn tỷ lệ và thời lượng | shared/aspect
apps/web/src/features/video-create/composables/useCreateVideo.js | state form và logic gửi tạo | api.js
apps/web/src/features/video-create/api.js | gọi api server tạo video và upload | shared/http

## apps/web/features/video-results
apps/web/src/features/video-results/components/AgentTimelineStepper.vue | timeline stepper các agent theo chặng thực thi | shared
apps/web/src/features/video-results/components/CriticFeedbackCard.vue | bảng kết quả kiểm duyệt của critic và nút điều khiển | không
apps/web/src/features/video-results/components/VideoCard.vue | hiển thị video card và status | formatDuration, QueueBadge, AgentTimelineStepper, CriticFeedbackCard
apps/web/src/features/video-results/components/VideoList.vue | danh sách các video card | VideoCard
apps/web/src/features/video-results/components/QueueBadge.vue | badge trạng thái hàng đợi | không
apps/web/src/features/video-results/composables/usePolling.js | định kỳ gọi api lấy tiến độ | store.js, api.js
apps/web/src/features/video-results/store.js | state danh sách video retry resume override | api.js
apps/web/src/features/video-results/api.js | gọi api lấy danh sách retry resume override xóa video | shared/http

## apps/web/features/prompt-library
apps/web/src/features/prompt-library/PromptLibraryModal.vue | popup chọn prompt thời trang | BaseModal, prompts.data.js
apps/web/src/features/prompt-library/prompts.data.js | danh sách prompt mẫu thời trang | không

## apps/web/features/settings
apps/web/src/features/settings/SettingsModal.vue | modal cài đặt và test api key ai | BaseModal, api.js
apps/web/src/features/settings/api.js | gọi api cấu hình và test kết nối | shared/http

## apps/web/shared
apps/web/src/shared/ui/BaseButton.vue | nút bấm dùng chung | không
apps/web/src/shared/ui/BaseModal.vue | modal dùng chung | không
apps/web/src/shared/ui/BaseToast.vue | toast thông báo dùng chung | không
apps/web/src/shared/ui/BaseSpinner.vue | spinner tải dữ liệu | không
apps/web/src/shared/http.js | cấu hình axios client | axios
apps/web/src/shared/utils/formatDuration.js | format giây thành mm:ss | không

## apps/desktop (giai đoạn 2)
apps/desktop/package.json | cấu hình package desktop | electron
apps/desktop/main.js | electron main process | electron, server-launcher
apps/desktop/preload.js | electron preload script | electron
apps/desktop/server-launcher.js | khởi động express ngầm desktop | child_process
apps/desktop/electron-builder.yml | cấu hình build electron | không
