class AppError extends Error {
  constructor(message, statusCode = 500, code = 'APP_ERROR') {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
  }
}

function badRequest(message, code = 'BAD_REQUEST') {
  return new AppError(message, 400, code)
}

function unauthorized(message = 'Unauthorized', code = 'UNAUTHORIZED') {
  return new AppError(message, 401, code)
}

function forbidden(message = 'Forbidden', code = 'FORBIDDEN') {
  return new AppError(message, 403, code)
}

function notFound(message, code = 'NOT_FOUND') {
  return new AppError(message, 404, code)
}

function serviceUnavailable(message, code = 'SERVICE_UNAVAILABLE') {
  return new AppError(message, 503, code)
}

module.exports = {
  AppError,
  badRequest,
  forbidden,
  notFound,
  serviceUnavailable,
  unauthorized
}
