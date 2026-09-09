const test = require('node:test')
const assert = require('node:assert/strict')
const { createUsersService, normalizeUserRole, parseUserId } = require('./users.module')

test('parseUserId accepts numeric ids', () => {
  assert.equal(parseUserId('12'), 12)
  assert.equal(parseUserId(7), 7)
})

test('parseUserId rejects invalid ids', () => {
  assert.throws(() => parseUserId('wrong-id'), {
    statusCode: 400,
    code: 'INVALID_USER_ID'
  })
})

test('normalizeUserRole accepts frontend and database student role values', () => {
  assert.equal(normalizeUserRole('Estudiante'), 'Usuario Generico')
  assert.equal(normalizeUserRole('Usuario Generico'), 'Usuario Generico')
  assert.equal(normalizeUserRole('Usuario'), 'Usuario Generico')
  assert.equal(normalizeUserRole('Administrador'), 'Admin')
  assert.equal(normalizeUserRole('Admin'), 'Admin')
  assert.equal(normalizeUserRole('Editor'), null)
})

test('deleteUser does not delete admin users', async () => {
  let deleteWasCalled = false
  const usersService = createUsersService({
    bcrypt: {
      compare: async () => false,
      hash: async () => 'hashed-password'
    },
    usersRepository: {
      async findCredentialsById() {
        return { id: 1, nombre: 'Admin', contrasena: 'hash', rol: 'Admin' }
      },
      async deleteUserById() {
        deleteWasCalled = true
      }
    }
  })

  await assert.rejects(() => usersService.deleteUser(1), {
    statusCode: 400,
    code: 'ADMIN_DELETE_FORBIDDEN'
  })

  assert.equal(deleteWasCalled, false)
})

test('updatePassword hashes and delegates valid password updates', async () => {
  let updatedPassword = null
  const usersService = createUsersService({
    bcrypt: {
      compare: async () => false,
      hash: async (value) => `hashed-${value}`
    },
    usersRepository: {
      async findCredentialsById() {
        return { id: 2, nombre: 'Student', contrasena: 'old-hash', rol: 'Usuario' }
      },
      async updatePassword(id, password) {
        updatedPassword = { id, password }
      }
    }
  })

  await usersService.updatePassword({ usuario_id: 2, nueva_contrasena: 'new-secret' })

  assert.deepEqual(updatedPassword, {
    id: 2,
    password: 'hashed-new-secret'
  })
})

test('updateAdminUser stores the normalized student role', async () => {
  let updatedUser = null
  const usersService = createUsersService({
    bcrypt: {
      compare: async () => false,
      hash: async (value) => `hashed-${value}`
    },
    usersRepository: {
      async findCredentialsById() {
        return { id: 3, nombre: 'Jose', contrasena: 'old-hash', rol: 'Usuario Generico' }
      },
      async updateAdminUser(payload) {
        updatedUser = payload
      }
    }
  })

  await usersService.updateAdminUser(3, {
    nuevo_nombre: 'Jose actualizado',
    nueva_contrasena: 'new-secret',
    rol: 'Estudiante'
  })

  assert.deepEqual(updatedUser, {
    id: 3,
    nombre: 'Jose actualizado',
    contrasena: 'hashed-new-secret',
    rol: 'Usuario Generico'
  })
})
