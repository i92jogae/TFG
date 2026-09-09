const { forbidden, unauthorized } = require('../shared/errors')

function getBearerToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  return authHeader.split(' ')[1]
}

function createAuthenticateToken({ jwt, jwtSecret }) {
  return function authenticateToken(req, res, next) {
    const token = getBearerToken(req)

    if (!token) {
      return next(unauthorized())
    }

    try {
      req.user = jwt.verify(token, jwtSecret)
      return next()
    } catch (error) {
      return next(forbidden())
    }
  }
}

function requireRole(role) {
  return function requireUserRole(req, res, next) {
    if (req.user?.rol !== role) {
      return next(forbidden('You do not have permissions to access this resource'))
    }

    return next()
  }
}

module.exports = {
  createAuthenticateToken,
  getBearerToken,
  requireRole
}
