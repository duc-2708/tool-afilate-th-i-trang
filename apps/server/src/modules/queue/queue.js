// @purpose: hàng đợi nhiệm vụ xử lý sinh video ngầm

import { processVideoJob } from './worker.js';

class VideoQueue {
  constructor() {
    this.items = [];
    this.isProcessing = false;
  }

  async enqueue(videoId) {
    this.items.push(videoId);
    this.processNext();
  }

  async processNext() {
    if (this.isProcessing || this.items.length === 0) return;
    this.isProcessing = true;

    const videoId = this.items.shift();
    try {
      await processVideoJob(videoId);
    } catch (err) {
      console.error('Queue job failed:', err);
    } finally {
      this.isProcessing = false;
      this.processNext();
    }
  }

  size() {
    return this.items.length;
  }
}

export const queue = new VideoQueue();
