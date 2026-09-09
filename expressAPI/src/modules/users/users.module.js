const express = require('express')
const { badRequest, notFound } = require('../../shared/errors')
const { asyncHandler } = require('../../shared/asyncHandler')
const { validateRequiredFields, isNonEmptyString } = require('../../utils/validation')

const ADMIN_ROLE = 'Admin'
const USER_ROLES = [ADMIN_ROLE, 'Usuario']

function parseUserId(value) {
  const id = Number(value)

  if (!Number.isInteger(id) || id <= 0) {
    throw badRequest('Invalid user id', 'INVALID_USER_ID')
  }

  return id
}

function createUsersRepository(db) {
  return {
    async findPublicDataById(id) {
      const [rows] = await db.execute('SELECT nombre, correo FROM USUARIO WHERE id = ?', [id])
      return rows[0] || null
    },

    async findCredentialsById(id) {
      const [rows] = await db.execute('SELECT id, nombre, contrasena, rol FROM USUARIO WHERE id = ?', [id])
      return rows[0] || null
    },

    async listUsers() {
      const [rows] = await db.execute('SELECT id, nombre, correo, rol, fecha_registro FROM USUARIO ORDER BY fecha_registro DESC')
      return rows
    },

    async updateUsername(id, nombre) {
      await db.execute('UPDATE USUARIO SET nombre = ? WHERE id = ?', [nombre, id])
    },

    async updatePassword(id, contrasena) {
      await db.execute('UPDATE USUARIO SET contrasena = ? WHERE id = ?', [contrasena, id])
    },

    async updateAdminUser({ id, nombre, contrasena, rol }) {
      await db.execute(
        'UPDATE USUARIO SET nombre = ?, contrasena = ?, rol = ? WHERE id = ?',
        [nombre, contrasena, rol, id]
      )
    },

    async deleteUserById(id) {
      if (typeof db.getConnection === 'function') {
        const connection = await db.getConnection()

        try {
          await connection.beginTransaction()
          await connection.execute('DELETE FROM RETROALIMENTACION WHERE usuario_id = ?', [id])
          await connection.execute('DELETE FROM PRUEBA WHERE usuario_id = ?', [id])
          await connection.execute('DELETE FROM USUARIO WHERE id = ?', [id])
          await connection.commit()
        } catch (error) {
          await connection.rollback()
          throw error
        } finally {
          connection.release()
        }

        return
      }

      await db.execute('DELETE FROM RETROALIMENTACION WHERE usuario_id = ?', [id])
      await db.execute('DELETE FROM PRUEBA WHERE usuario_id = ?', [id])
      await db.execute('DELETE FROM USUARIO WHERE id = ?', [id])
    }
  }
}

function createUsersService({ usersRepository, bcrypt }) {
  return {
    async getUserData(usuarioId) {
      const id = parseUserId(usuarioId)
      const user = await usersRepository.findPublicDataById(id)

      if (!user) {
        throw notFound('User not found', 'USER_NOT_FOUND')
      }

      return [user]
    },

    async updateUsername(payload) {
      const missingFields = validateRequiredFields(payload, ['usuario_id', 'nuevo_nombre'])

      if (missingFields.length > 0) {
        throw badRequest(`Missing required fields: ${missingFields.join(', ')}`, 'MISSING_REQUIRED_FIELDS')
      }

      const id = parseUserId(payload.usuario_id)
      const nuevoNombre = payload.nuevo_nombre.trim()
      const user = await usersRepository.findCredentialsById(id)

      if (!user) {
        throw notFound('User not found', 'USER_NOT_FOUND')
      }

      if (nuevoNombre === user.nombre) {
        throw badRequest('El nuevo nombre es igual al actual', 'SAME_USERNAME')
      }

      await usersRepository.updateUsername(id, nuevoNombre)
    },

    async updatePassword(payload) {
      const missingFields = validateRequiredFields(payload, ['usuario_id', 'nueva_contrasena'])

      if (missingFields.length > 0) {
        throw badRequest(`Missing required fields: ${missingFields.join(', ')}`, 'MISSING_REQUIRED_FIELDS')
      }

      const id = parseUserId(payload.usuario_id)
      const user = await usersRepository.findCredentialsById(id)

      if (!user) {
        throw notFound('User not found', 'USER_NOT_FOUND')
      }

      const passwordMatch = await bcrypt.compare(payload.nueva_contrasena, user.contrasena)

      if (passwordMatch) {
        throw badRequest('La nueva contraseña es igual a la actual', 'SAME_PASSWORD')
      }

      const hashedPassword = await bcrypt.hash(payload.nueva_contrasena, 10)
      await usersRepository.updatePassword(id, hashedPassword)
    },

    async listUsers() {
      return usersRepository.listUsers()
    },

    async deleteUser(usuarioId) {
      const id = parseUserId(usuarioId)
      const user = await usersRepository.findCredentialsById(id)

      if (!user) {
        throw notFound('User not found', 'USER_NOT_FOUND')
      }

      if (user.rol === ADMIN_ROLE) {
        throw badRequest('Admin users cannot be deleted from this endpoint', 'ADMIN_DELETE_FORBIDDEN')
      }

      await usersRepository.deleteUserById(id)
    },

    async updateAdminUser(usuarioId, payload) {
      const missingFields = validateRequiredFields(payload, ['nuevo_nombre', 'nueva_contrasena', 'rol'])

      if (missingFields.length > 0) {
        throw badRequest(`Missing required fields: ${missingFields.join(', ')}`, 'MISSING_REQUIRED_FIELDS')
      }

      const id = parseUserId(usuarioId)
      const user = await usersRepository.findCredentialsById(id)

      if (!user) {
        throw notFound('User not found', 'USER_NOT_FOUND')
      }

      if (!USER_ROLES.includes(payload.rol)) {
        throw badRequest('Invalid user role', 'INVALID_USER_ROLE')
      }

      if (!isNonEmptyString(payload.nueva_contrasena) || payload.nueva_contrasena.length < 6) {
        throw badRequest('La contraseña debe tener al menos 6 caracteres', 'INVALID_PASSWORD')
      }

      const passwordMatch = await bcrypt.compare(payload.nueva_contrasena, user.contrasena)

      if (payload.nuevo_nombre.trim() === user.nombre && passwordMatch && payload.rol === user.rol) {
        throw badRequest('No hay cambios para actualizar', 'NO_CHANGES')
      }

      const hashedPassword = await bcrypt.hash(payload.nueva_contrasena, 10)

      await usersRepository.updateAdminUser({
        id,
        nombre: payload.nuevo_nombre.trim(),
        contrasena: hashedPassword,
        rol: payload.rol
      })
    }
  }
}

function createUsersRouter({ usersService, authenticateToken, requireAdmin }) {
  const router = express.Router()

  router.get('/userData', authenticateToken, asyncHandler(async (req, res) => {
    const userData = await usersService.getUserData(req.query.usuario_id)
    res.json(userData)
  }))

  router.put('/editUsername', authenticateToken, asyncHandler(async (req, res) => {
    await usersService.updateUsername(req.body)
    res.status(200).json({ message: 'Username updated successfully' })
  }))

  router.put('/editPassword', authenticateToken, asyncHandler(async (req, res) => {
    await usersService.updatePassword(req.body)
    res.status(200).json({ message: 'Password updated successfully' })
  }))

  router.get('/users', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
    const users = await usersService.listUsers()
    res.json(users)
  }))

  router.delete('/deleteUser', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
    await usersService.deleteUser(req.query.usuario_id)
    res.status(202).json({ message: 'User deleted correctly' })
  }))

  router.put('/editUser', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
    await usersService.updateAdminUser(req.query.usuario_id, req.body)
    res.status(200).json({ message: 'User updated successfully' })
  }))

  return router
}

module.exports = {
  createUsersRepository,
  createUsersRouter,
  createUsersService,
  parseUserId
}
