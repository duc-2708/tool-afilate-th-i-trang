// @purpose: agent 2 soạn prompt ảnh keyframe và chuyển động video 8s thời trang

export const STYLE_ENHANCERS = {
  runway: 'high-end runway fashion show, Milan fashion week catwalk, dramatic stage spotlight, sleek professional model pose',
  streetwear: 'urban streetwear aesthetic, Shibuya Tokyo street style, natural daylight, candid energetic attitude, crisp sneaker focus',
  studio_clean: 'minimalist clean studio lookbook, neutral seamless background, softbox commercial lighting, sharp fabric texture',
  luxury_glam: 'opulent luxury gala, evening banquet ambience, golden hour champagne reflections, elegant couture poise',
  vintage_retro: '90s nostalgic editorial, warm vintage color grading, film grain texture, classic haute couture demeanor',
};

export const fashionPrompterAgent = {
  composeImagePrompt({ userPrompt = '', style = 'studio_clean', trend = {}, criticFeedback = '' } = {}) {
    const styleEnhancer = STYLE_ENHANCERS[style] || STYLE_ENHANCERS.studio_clean;
    const poseDetail = trend.poseDescription || 'poised standing pose showcasing full outfit silhouette';
    const lightDetail = trend.lighting || 'balanced soft commercial fashion lighting';

    let prompt = `Fashion photography, a stunning professional model wearing: ${userPrompt}. Model pose: ${poseDetail}. Environment & Lighting: ${lightDetail}, ${styleEnhancer}. Ultra-high resolution, 8k, photorealistic fabric weave details, authentic garment folds, Vogue editorial standard.`;

    if (criticFeedback && criticFeedback.trim().length > 0) {
      prompt += ` [CRITIC ADJUSTMENT: ${criticFeedback}. Strictly preserve exact garment colors, patterns, and anatomically correct hands/fingers.]`;
    }

    const negativePrompt = 'deformed fingers, extra limbs, distorted hands, altered clothing patterns, blurry fabric, low resolution, plastic skin, cartoonish, asymmetrical eyes, bad anatomy';

    return {
      prompt,
      negativePrompt,
      targetAspect: '9:16',
      styleGuidance: style,
    };
  },

  composeVideoMotionPrompt({ userPrompt = '', camera = 'slow_pan', trend = {}, criticFeedback = '' } = {}) {
    const pacing = trend.pacing || 'smooth rhythmic 8-second pacing';
    const breakdownGuide = Array.isArray(trend.breakdown)
      ? trend.breakdown.map((b) => `${b.startSec}-${b.endSec}s: ${b.focus} with ${b.camera}`).join('; ')
      : '0-3s: full body walk; 3-6s: elegant turn; 6-8s: close up fabric and poise';

    let motionPrompt = `8-second high fashion runway motion video. Model moves gracefully: ${userPrompt}. Pacing: ${pacing}. Timeline movement: ${breakdownGuide}. Camera motion: cinematic ${camera}, maintaining sharp focus on garment texture and realistic fabric physics. Natural cloth inertia and fluid drapery, consistent facial features and body proportions throughout the entire 8 seconds.`;

    if (criticFeedback && criticFeedback.trim().length > 0) {
      motionPrompt += ` [MOTION CORRECTION: ${criticFeedback}. No temporal flickering, zero body morphing, smooth continuous gait.]`;
    }

    return {
      motionPrompt,
      duration: 8,
      cameraTrajectory: camera,
      fps: 24,
    };
  },
};
