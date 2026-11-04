// @purpose: khởi động http server lắng nghe kết nối từ client

import { createApp } from './app.js';
import { env } from './config/env.js';
import { recoverPendingJobs } from './modules/queue/recovery.js';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`VideoStudio server running on http://localhost:${env.PORT}`);
  recoverPendingJobs();
});
