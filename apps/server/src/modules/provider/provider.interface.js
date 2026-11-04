// @purpose: interface trừu tượng cho các nhà cung cấp sinh video AI

/**
 * @interface IVideoProvider
 */
export class VideoProviderInterface {
  /**
   * @param {object} _params
   * @returns {Promise<{ remoteId: string, status: string }>}
   */
  async generateVideo(_params) {
    throw new Error('Method generateVideo() must be implemented');
  }

  /**
   * @param {string} _remoteId
   * @returns {Promise<{ status: string, progress: number, videoUrl?: string, error?: string }>}
   */
  async checkStatus(_remoteId) {
    throw new Error('Method checkStatus() must be implemented');
  }
}
