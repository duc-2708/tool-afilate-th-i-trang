// @purpose: tiến trình worker thực thi job theo state machine multi-agent

import { PIPELINE_STAGES, STAGE_PROGRESS, MAX_CRITIC_RETRIES } from '@videostudio/shared';
import { videosRepo } from '../videos/videos.repo.js';
import { veoProvider } from '../provider/index.js';
import { imageProvider } from '../provider/image.provider.js';
import { trendScoutAgent } from '../agents/trend.scout.js';
import { fashionPrompterAgent } from '../agents/fashion.prompter.js';
import { fashionCriticAgent } from '../agents/fashion.critic.js';
import { videoEditorAgent } from '../agents/video.editor.js';
import { handleJobError } from './error.shield.js';

function handleCriticResult(review, retryCount, nextSuccess, retryFallback) {
  if (review.verdict === 'passed') {
    return { nextStage: nextSuccess, updates: { critic_verdict: 'passed', critic_feedback: review.feedback } };
  }
  if ((retryCount || 0) < MAX_CRITIC_RETRIES) {
    return {
      nextStage: retryFallback,
      updates: { retry_count: (retryCount || 0) + 1, critic_verdict: 'rejected', critic_feedback: review.feedback },
    };
  }
  return {
    nextStage: PIPELINE_STAGES.PAUSED_NEEDS_ACTION,
    updates: {
      critic_verdict: 'rejected',
      critic_feedback: review.feedback,
      error_code: 'ERR_CRITIC_REJECTED_MAX',
      error_detail: `Critic từ chối 2 lần: ${review.feedback}. Bạn có thể Duyệt ép buộc (Override) để đi tiếp.`,
    },
  };
}

export async function processStageStep(video) {
  switch (video.stage) {
    case PIPELINE_STAGES.INIT:
      return { nextStage: PIPELINE_STAGES.SCOUT };

    case PIPELINE_STAGES.SCOUT: {
      const scout = await trendScoutAgent.scoutTrend({ style: video.style, referenceUrl: video.reference_video_url });
      return {
        nextStage: PIPELINE_STAGES.PROMPT_IMAGE,
        updates: { reference_video_url: scout.sourceUrl || scout.poseTitle, camera: scout.cameraMotion || video.camera },
      };
    }

    case PIPELINE_STAGES.PROMPT_IMAGE: {
      fashionPrompterAgent.composeImagePrompt({ userPrompt: video.prompt, style: video.style, criticFeedback: video.critic_feedback });
      return { nextStage: PIPELINE_STAGES.GEN_IMAGE };
    }

    case PIPELINE_STAGES.GEN_IMAGE: {
      const kf = await imageProvider.generateKeyframe({
        prompt: video.prompt, modelImageUrl: video.model_image_url || video.image_url,
        garmentImageUrl: video.garment_image_url || video.image_url, aspect: video.aspect,
      });
      return { nextStage: PIPELINE_STAGES.CRITIC_IMAGE, updates: { keyframe_url: kf.keyframeUrl } };
    }

    case PIPELINE_STAGES.CRITIC_IMAGE: {
      const rev = await fashionCriticAgent.reviewKeyframe({
        keyframeUrl: video.keyframe_url, prompt: video.prompt, garmentUrl: video.garment_image_url, retryCount: video.retry_count || 0,
      });
      return handleCriticResult(rev, video.retry_count, PIPELINE_STAGES.PROMPT_VIDEO, PIPELINE_STAGES.PROMPT_IMAGE);
    }

    case PIPELINE_STAGES.PROMPT_VIDEO: {
      fashionPrompterAgent.composeVideoMotionPrompt({ userPrompt: video.prompt, camera: video.camera, criticFeedback: video.critic_feedback });
      return { nextStage: PIPELINE_STAGES.GEN_VIDEO };
    }

    case PIPELINE_STAGES.GEN_VIDEO: {
      const res = await veoProvider.generateVideo({
        prompt: video.prompt, keyframeUrl: video.keyframe_url, camera: video.camera, duration: 8, aspect: video.aspect,
      });
      let done = false;
      let clipRes = null;
      while (!done) {
        await new Promise((r) => setTimeout(r, 300));
        clipRes = await veoProvider.checkStatus(res.remoteId);
        if (clipRes.status === 'completed') done = true;
      }
      return { nextStage: PIPELINE_STAGES.CRITIC_VIDEO, updates: { remote_id: res.remoteId, video_url: clipRes.videoUrl } };
    }

    case PIPELINE_STAGES.CRITIC_VIDEO: {
      const rev = await fashionCriticAgent.reviewMotionClip({
        remoteId: video.remote_id, prompt: video.prompt, camera: video.camera, retryCount: video.retry_count || 0,
      });
      return handleCriticResult(rev, video.retry_count, PIPELINE_STAGES.EDITING, PIPELINE_STAGES.PROMPT_VIDEO);
    }

    case PIPELINE_STAGES.EDITING: {
      const editRes = await videoEditorAgent.composeFinalVideo({
        mainClipUrl: video.video_url, style: video.style, aspect: video.aspect,
      });
      return { nextStage: PIPELINE_STAGES.CRITIC_FINAL, updates: { video_url: editRes.finalVideoUrl } };
    }

    case PIPELINE_STAGES.CRITIC_FINAL: {
      const rev = await fashionCriticAgent.reviewFinalVideo({ videoUrl: video.video_url, retryCount: video.retry_count || 0 });
      if (rev.verdict === 'passed') {
        return { nextStage: PIPELINE_STAGES.COMPLETED, updates: { critic_verdict: 'passed', critic_feedback: rev.feedback, status: 'completed' } };
      }
      return handleCriticResult(rev, video.retry_count, PIPELINE_STAGES.COMPLETED, PIPELINE_STAGES.EDITING);
    }

    default:
      return { nextStage: PIPELINE_STAGES.COMPLETED };
  }
}

export async function processVideoJob(videoId) {
  let video = videosRepo.findById(videoId);
  if (!video || video.status === 'completed' || video.status === 'failed') return;

  videosRepo.update(videoId, { status: 'processing', error_message: null });

  try {
    while (video && video.stage !== PIPELINE_STAGES.COMPLETED && video.stage !== PIPELINE_STAGES.PAUSED_NEEDS_ACTION) {
      const current = videosRepo.findById(videoId);
      if (!current) break;

      const progress = STAGE_PROGRESS[current.stage] || current.progress || 10;
      videosRepo.update(videoId, { progress });

      const step = await processStageStep(current);
      const updates = { stage: step.nextStage, ...(step.updates || {}) };

      if (step.nextStage === PIPELINE_STAGES.COMPLETED) {
        updates.status = 'completed';
        updates.progress = 100;
      } else if (step.nextStage === PIPELINE_STAGES.PAUSED_NEEDS_ACTION) {
        updates.status = 'paused_needs_action';
      }

      video = videosRepo.update(videoId, updates);
      await new Promise((r) => setTimeout(r, 400));
    }
  } catch (err) {
    handleJobError(videoId, err, video?.stage);
  }
}
