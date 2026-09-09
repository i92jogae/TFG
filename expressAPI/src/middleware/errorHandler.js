const { AppError } = require('../shared/errors')

function notFoundHandler(req, res) {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
    error: `Route ${req.method} ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND'
  })
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      error: error.message,
      code: error.code
    })
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    error: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR'
  })
}

module.exports = {
  errorHandler,
  notFoundHandler
}
