// @purpose: hàng đợi nhiệm vụ xử lý sinh video ngầm

import { processVideoJob } from './worker.js';

class VideoQueue {
  constructor() {
    this.items = [];
    this.isProcessing = false;
    this.activeJobId = null;
  }

  async enqueue(videoId) {
    if (!this.items.includes(videoId)) {
      this.items.push(videoId);
    }
    this.processNext();
  }

  remove(videoId) {
    this.items = this.items.filter((id) => id !== videoId);
  }

  async processNext() {
    if (this.isProcessing || this.items.length === 0) return;
    this.isProcessing = true;

    const videoId = this.items.shift();
    this.activeJobId = videoId;
    try {
      await processVideoJob(videoId);
    } catch (err) {
      console.error('Queue job failed:', err);
    } finally {
      this.activeJobId = null;
      this.isProcessing = false;
      this.processNext();
    }
  }

  size() {
    return this.items.length;
  }
}

export const queue = new VideoQueue();
