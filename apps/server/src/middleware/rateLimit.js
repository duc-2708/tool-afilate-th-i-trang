// @purpose: middleware giới hạn số lượt gọi api chống spam

const requestCounts = new Map();

export function rateLimit(limit = 100, windowMs = 60 * 1000) {
  return (req, res, next) => {
    const ip = req.ip || '127.0.0.1';
    const now = Date.now();
    const clientData = requestCounts.get(ip) || { count: 0, resetAt: now + windowMs };

    if (now > clientData.resetAt) {
      clientData.count = 1;
      clientData.resetAt = now + windowMs;
    } else {
      clientData.count += 1;
    }

    requestCounts.set(ip, clientData);

    if (clientData.count > limit) {
      return res.status(429).json({
        success: false,
        code: 'ERR_RATE_LIMIT',
        message: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau',
      });
    }

    next();
  };
}
