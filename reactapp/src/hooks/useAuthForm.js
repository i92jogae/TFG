import { useState } from 'react'
import { loginUser, registerUser } from '../services/dbLearningApi'
import { getApiErrorMessage } from '../services/apiClient'
import { setStoredToken } from '../utils/auth'

const initialLoginValues = {
  correo: '',
  contrasena: ''
}

const initialRegisterValues = {
  nombre: '',
  correo: '',
  contrasena: ''
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginForm({ correo, contrasena }) {
  if (!correo.trim() || !contrasena.trim()) {
    return 'Debe introducir su email y contraseña.'
  }

  if (!EMAIL_REGEX.test(correo.trim())) {
    return 'Debe introducir un email válido.'
  }

  return ''
}

export function validateRegisterForm({ nombre, correo, contrasena }) {
  if (!nombre.trim() || !correo.trim() || !contrasena.trim()) {
    return 'Debe introducir un usuario, email y contraseña.'
  }

  if (!EMAIL_REGEX.test(correo.trim())) {
    return 'Debe introducir un email válido.'
  }

  if (contrasena.length < 8 || !/\d/.test(contrasena)) {
    return 'La contraseña debe tener al menos 8 caracteres y un número.'
  }

  return ''
}

export function useLoginForm({ onSuccess } = {}) {
  const [values, setValues] = useState(initialLoginValues)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (field) => (event) => {
    setValues((currentValues) => ({ ...currentValues, [field]: event.target.value }))
    setError('')
  }

  const submit = async (event) => {
    event?.preventDefault()

    const validationError = validateLoginForm(values)

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await loginUser({
        correo: values.correo.trim(),
        contrasena: values.contrasena
      })

      setStoredToken(data.token)
      onSuccess?.(data)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Email o contraseña incorrectos.'))
    } finally {
      setLoading(false)
    }
  }

  return {
    values,
    error,
    loading,
    updateField,
    submit,
    setError
  }
}

export function useRegisterForm({ onSuccess } = {}) {
  const [values, setValues] = useState(initialRegisterValues)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (field) => (event) => {
    setValues((currentValues) => ({ ...currentValues, [field]: event.target.value }))
    setError('')
  }

  const submit = async (event) => {
    event?.preventDefault()

    const validationError = validateRegisterForm(values)

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      await registerUser({
        nombre: values.nombre.trim(),
        correo: values.correo.trim(),
        contrasena: values.contrasena
      })

      onSuccess?.()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Este correo ya está registrado o no se ha podido completar el registro.'))
    } finally {
      setLoading(false)
    }
  }

  return {
    values,
    error,
    loading,
    updateField,
    submit,
    setError
  }
}
