const { AppError } = require('../shared/errors')

function notFoundHandler(req, res) {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`
  })
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      code: error.code
    })
  }

  return res.status(500).json({
    message: 'Internal Server Error'
  })
}

module.exports = {
  errorHandler,
  notFoundHandler
}
