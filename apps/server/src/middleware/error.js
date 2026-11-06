// @purpose: middleware xử lý lỗi tập trung và trả format thống nhất

export function errorHandler(err, _req, res, _next) {
  let statusCode = err.status || err.statusCode || 500;
  let code = err.code || 'INTERNAL_ERROR';
  let message = err.message || 'Đã có lỗi xảy ra trên hệ thống';

  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      code = 'FILE_TOO_LARGE';
      message = 'Kích thước file vượt quá giới hạn cho phép (10MB)';
    } else {
      code = 'UPLOAD_ERROR';
    }
  }

  res.status(statusCode).json({
    success: false,
    code,
    message,
  });
}
