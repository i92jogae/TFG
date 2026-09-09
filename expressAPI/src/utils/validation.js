function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function hasRequiredValue(value) {
  if (value === undefined || value === null) {
    return false
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  return true
}

function isValidEmail(value) {
  return isNonEmptyString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function validateRegisterPayload(payload = {}) {
  const errors = []

  if (!isNonEmptyString(payload.nombre)) {
    errors.push('El nombre es obligatorio')
  }

  if (!isValidEmail(payload.correo)) {
    errors.push('El correo no tiene un formato válido')
  }

  if (!isNonEmptyString(payload.contrasena) || payload.contrasena.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres')
  }

  return errors
}

function validateLoginPayload(payload = {}) {
  const errors = []

  if (!isValidEmail(payload.correo)) {
    errors.push('El correo no tiene un formato válido')
  }

  if (!isNonEmptyString(payload.contrasena)) {
    errors.push('La contraseña es obligatoria')
  }

  return errors
}

function validateRequiredFields(payload = {}, fields = []) {
  return fields.filter((field) => !hasRequiredValue(payload[field]))
}

module.exports = {
  hasRequiredValue,
  isNonEmptyString,
  isValidEmail,
  validateLoginPayload,
  validateRegisterPayload,
  validateRequiredFields
}
