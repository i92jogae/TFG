const test = require('node:test')
const assert = require('node:assert/strict')
const {
  hasRequiredValue,
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

test('hasRequiredValue accepts valid non-string payload values', () => {
  assert.equal(hasRequiredValue(1), true)
  assert.equal(hasRequiredValue(0), true)
  assert.equal(hasRequiredValue(false), true)
  assert.equal(hasRequiredValue(null), false)
  assert.equal(hasRequiredValue(undefined), false)
  assert.equal(hasRequiredValue('   '), false)
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

test('validateRequiredFields returns missing fields without rejecting numeric ids', () => {
  const missingFields = validateRequiredFields({ usuario_id: 12, query: 'Explain SQL joins', respuesta: '' }, [
    'usuario_id',
    'query',
    'respuesta'
  ])

  assert.deepEqual(missingFields, ['respuesta'])
})
