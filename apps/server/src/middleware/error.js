// @purpose: middleware xử lý lỗi tập trung và trả format thống nhất

export function errorHandler(err, req, res, _next) {
  const statusCode = err.status || err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';

  res.status(statusCode).json({
    success: false,
    code,
    message: err.message || 'Đã có lỗi xảy ra trên hệ thống',
  });
}
