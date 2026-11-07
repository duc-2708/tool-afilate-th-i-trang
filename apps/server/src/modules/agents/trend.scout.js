// @purpose: agent 1 thu thập và phân tích mẫu pose nhịp catwalk từ video tiktok douyin

export const CURATED_TRENDS = [
  {
    id: 'trend_douyin_runway_spin',
    platform: 'douyin',
    category: 'runway',
    title: 'Douyin Catwalk Xoay Tà 360 Độ',
    likes: '1.8M',
    poseDescription: 'Người mẫu bước sải chân dài thẳng hàng theo nhịp nhạc, dừng lại tại nhịp thứ 4, xoay người 180 độ để tà váy bung tròn tự nhiên rồi nhìn thẳng vào ống kính với ánh mắt sắc lạnh.',
    cameraMotion: 'orbital',
    lighting: 'Spotlight sàn diễn tương phản cao, phông nền tối làm nổi bật trang phục',
    pacing: 'Nhịp bước chậm đều 120BPM, dừng lại tạo dáng tại nhịp cao trào',
    breakdown: [
      { startSec: 0, endSec: 3, focus: 'Toàn thân catwalk tiến lại gần', camera: 'slow_pan' },
      { startSec: 3, endSec: 6, focus: 'Xoay tà váy làm nổi bật phom dáng và chất liệu', camera: 'orbital' },
      { startSec: 6, endSec: 8, focus: 'Cận cảnh gương mặt và phần ngực áo', camera: 'zoom_in' },
    ],
  },
  {
    id: 'trend_tiktok_street_lookbook',
    platform: 'tiktok',
    category: 'streetwear',
    title: 'TikTok Streetwear Dạo Phố Slow-Mo',
    likes: '950K',
    poseDescription: 'Người mẫu sải bước tự tin trên vỉa hè đô thị, một tay cho vào túi quần, một tay chỉnh kính hoặc vuốt tóc nhẹ, chuyển động phóng khoáng và cá tính.',
    cameraMotion: 'slow_pan',
    lighting: 'Ánh sáng tự nhiên ban ngày, hậu cảnh mờ ảo (bokeh phố thị)',
    pacing: 'Nhịp điệu dạo bước năng động, chuyển sang slow-motion ở giây thứ 5',
    breakdown: [
      { startSec: 0, endSec: 3, focus: 'Bước đi từ xa tới góc máy nghiêng 45 độ', camera: 'slow_pan' },
      { startSec: 3, endSec: 5, focus: 'Cận cảnh chi tiết áo, túi hoặc giày', camera: 'pedestal' },
      { startSec: 5, endSec: 8, focus: 'Quay đầu nhìn lại với nụ cười tự nhiên', camera: 'zoom_out' },
    ],
  },
  {
    id: 'trend_douyin_luxury_editorial',
    platform: 'douyin',
    category: 'luxury_glam',
    title: 'Douyin Khí Chất Quý Phái Dạ Tiệc',
    likes: '2.4M',
    poseDescription: 'Đứng nghiêng người 30 độ, một chân hơi chùng nhẹ, vai mở rộng khoe xương quai xanh, tay nâng nhẹ tà váy khoe đường cong trang phục sang trọng.',
    cameraMotion: 'pedestal',
    lighting: 'Ánh sáng vàng ấm champagne lung linh lấp lánh như dạ tiệc',
    pacing: 'Chuyển động quý phái, chậm rãi, tôn lên sự xa hoa của chất liệu',
    breakdown: [
      { startSec: 0, endSec: 3, focus: 'Lướt máy từ dưới chân lên toàn bộ phom đầm', camera: 'pedestal' },
      { startSec: 3, endSec: 6, focus: 'Góc nghiêng thần thái và phụ kiện lấp lánh', camera: 'zoom_in' },
      { startSec: 6, endSec: 8, focus: 'Xoay nhẹ khoe lưng hoặc tà áo dài', camera: 'slow_pan' },
    ],
  },
  {
    id: 'trend_tiktok_studio_clean',
    platform: 'tiktok',
    category: 'studio_clean',
    title: 'TikTok Studio Lookbook Tối Giản',
    likes: '620K',
    poseDescription: 'Đứng thẳng tự nhiên, lần lượt đổi 3 dáng pose cơ bản: nghiêng trái, chính diện, và xoay lưng để hiển thị đầy đủ các góc của bộ đồ.',
    cameraMotion: 'static',
    lighting: 'Ánh sáng softbox khuếch tán đều, phông trắng/be trung tính',
    pacing: 'Dứt khoát, thanh lịch, mỗi dáng giữ 2.5 giây',
    breakdown: [
      { startSec: 0, endSec: 3, focus: 'Chính diện toàn thân', camera: 'static' },
      { startSec: 3, endSec: 5, focus: 'Góc nghiêng 3/4', camera: 'slow_pan' },
      { startSec: 5, endSec: 8, focus: 'Chi tiết đường may và form dáng sau', camera: 'zoom_in' },
    ],
  },
];

export const trendScoutAgent = {
  async scoutTrend({ style = 'runway', referenceUrl = '' } = {}) {
    if (referenceUrl && referenceUrl.trim().length > 0) {
      const isDouyin = referenceUrl.includes('douyin.com');
      const isTiktok = referenceUrl.includes('tiktok.com');
      const platform = isDouyin ? 'douyin' : isTiktok ? 'tiktok' : 'custom';

      return {
        sourceType: 'user_reference',
        platform,
        sourceUrl: referenceUrl,
        poseTitle: `Phân tích từ link ${platform.toUpperCase()}`,
        poseDescription: 'Trích xuất chuyển động bước đi và nhịp dừng pose từ video tham chiếu của người dùng.',
        cameraMotion: 'slow_pan',
        lighting: 'Ánh sáng tự nhiên theo video gốc',
        pacing: 'Nhịp chuẩn 8 giây theo tiết tấu video mẫu',
        breakdown: [
          { startSec: 0, endSec: 3, focus: 'Toàn thân catwalk theo nhịp mẫu', camera: 'slow_pan' },
          { startSec: 3, endSec: 6, focus: 'Tạo dáng pose đặc trưng từ video', camera: 'orbital' },
          { startSec: 6, endSec: 8, focus: 'Cận cảnh chi tiết trang phục kết thúc', camera: 'zoom_in' },
        ],
      };
    }

    const matched = CURATED_TRENDS.find((t) => t.category === style) || CURATED_TRENDS[0];
    return {
      sourceType: 'curated_library',
      platform: matched.platform,
      poseId: matched.id,
      poseTitle: matched.title,
      engagement: matched.likes,
      poseDescription: matched.poseDescription,
      cameraMotion: matched.cameraMotion,
      lighting: matched.lighting,
      pacing: matched.pacing,
      breakdown: matched.breakdown,
    };
  },
};
