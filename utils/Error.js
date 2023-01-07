class CustomError extends Error {
  constructor(message, statusCode) {
    super(message || '알 수 없는 에러입니다.');
    this.statusCode = statusCode || 500;
  }
}

module.exports = { CustomError };
