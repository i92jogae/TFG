const test = require('node:test')
const assert = require('node:assert/strict')
const {
  isNonEmptyString,
  isValidEmail,
  validateLoginPayload,
  validateRegisterPayload,
  validateRequiredFields
} = require('./validation')

test('isNonEmptyString validates trimmed strings', () => {
  assert.equal(isNonEmptyString('DB Learning'), true)
  assert.equal(isNonEmptyString('   '), false)
  assert.equal(isNonEmptyString(null), false)
})

test('isValidEmail validates common email format', () => {
  assert.equal(isValidEmail('student@example.com'), true)
  assert.equal(isValidEmail('wrong-email'), false)
  assert.equal(isValidEmail(''), false)
})

test('validateRegisterPayload returns all missing field errors', () => {
  const errors = validateRegisterPayload({ nombre: '', correo: 'wrong', contrasena: '123' })

  assert.equal(errors.length, 3)
  assert.ok(errors.includes('El nombre es obligatorio'))
  assert.ok(errors.includes('El correo no tiene un formato válido'))
  assert.ok(errors.includes('La contraseña debe tener al menos 6 caracteres'))
})

test('validateLoginPayload accepts valid credentials payload', () => {
  const errors = validateLoginPayload({ correo: 'student@example.com', contrasena: 'secret123' })

  assert.deepEqual(errors, [])
})

test('validateRequiredFields returns missing fields', () => {
  const missingFields = validateRequiredFields({ query: 'Explain SQL joins', respuesta: '' }, [
    'query',
    'respuesta'
  ])

  assert.deepEqual(missingFields, ['respuesta'])
})
