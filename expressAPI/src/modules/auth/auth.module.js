const express = require('express')
const { badRequest, unauthorized } = require('../../shared/errors')
const { asyncHandler } = require('../../shared/asyncHandler')
const { validateLoginPayload, validateRegisterPayload } = require('../../utils/validation')

function createAuthRepository(db) {
  return {
    async findByEmail(correo) {
      const [rows] = await db.execute('SELECT id, nombre, correo, contrasena, rol FROM USUARIO WHERE correo = ?', [correo])
      return rows[0] || null
    },

    async createUser({ nombre, correo, contrasena }) {
      const [result] = await db.execute(
        'INSERT INTO USUARIO (nombre, correo, contrasena) VALUES (?, ?, ?)',
        [nombre, correo, contrasena]
      )

      return result.insertId
    }
  }
}

function createAuthService({ authRepository, bcrypt, jwt, jwtSecret }) {
  return {
    async register(payload) {
      const errors = validateRegisterPayload(payload)

      if (errors.length > 0) {
        throw badRequest(errors.join('. '), 'INVALID_REGISTER_PAYLOAD')
      }

      const nombre = payload.nombre.trim()
      const correo = payload.correo.trim().toLowerCase()
      const existingUser = await authRepository.findByEmail(correo)

      if (existingUser) {
        throw badRequest('User already exists', 'USER_ALREADY_EXISTS')
      }

      const hashedPassword = await bcrypt.hash(payload.contrasena, 10)
      await authRepository.createUser({ nombre, correo, contrasena: hashedPassword })
    },

    async login(payload) {
      const errors = validateLoginPayload(payload)

      if (errors.length > 0) {
        throw badRequest(errors.join('. '), 'INVALID_LOGIN_PAYLOAD')
      }

      const correo = payload.correo.trim().toLowerCase()
      const user = await authRepository.findByEmail(correo)

      if (!user) {
        throw unauthorized('Authentication failed', 'AUTHENTICATION_FAILED')
      }

      const passwordMatch = await bcrypt.compare(payload.contrasena, user.contrasena)

      if (!passwordMatch) {
        throw unauthorized('Authentication failed', 'AUTHENTICATION_FAILED')
      }

      return jwt.sign(
        { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol },
        jwtSecret,
        { expiresIn: '3h' }
      )
    }
  }
}

function createAuthRouter({ authService }) {
  const router = express.Router()

  router.post('/register', asyncHandler(async (req, res) => {
    await authService.register(req.body)
    res.status(201).json({ message: 'User registered successfully' })
  }))

  router.post('/login', asyncHandler(async (req, res) => {
    const token = await authService.login(req.body)
    res.json({ token })
  }))

  return router
}

module.exports = {
  createAuthRepository,
  createAuthRouter,
  createAuthService
}
