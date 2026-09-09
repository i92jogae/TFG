import { useCallback, useEffect, useState } from 'react'
import { getUserData, updatePassword, updateUsername } from '../services/dbLearningApi'
import { getApiErrorMessage } from '../services/apiClient'
import { getCurrentUser, setStoredToken } from '../utils/auth'

function normalizeProfileResponse(userData) {
  if (Array.isArray(userData)) {
    return userData[0] || null
  }

  return userData || null
}

export function useUserProfile() {
  const currentUser = getCurrentUser()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')

  const loadProfile = useCallback(async () => {
    if (!currentUser?.id) return

    setLoading(true)
    setError('')

    try {
      const userData = await getUserData(currentUser.id)
      const normalizedProfile = normalizeProfileResponse(userData)
      setProfile(normalizedProfile)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Se ha producido un error al recuperar los datos del usuario.'))
    } finally {
      setLoading(false)
    }
  }, [currentUser?.id])

  const changeUsername = async (nuevoNombre) => {
    setActionLoading(true)
    setError('')

    try {
      const response = await updateUsername({ usuarioId: currentUser?.id, nuevoNombre })

      if (response?.token) {
        setStoredToken(response.token)
      }

      await loadProfile()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Se ha producido un error al cambiar el nombre de usuario.'))
      throw requestError
    } finally {
      setActionLoading(false)
    }
  }

  const changePassword = async (nuevaContrasena) => {
    setActionLoading(true)
    setError('')

    try {
      await updatePassword({ usuarioId: currentUser?.id, nuevaContrasena })
      await loadProfile()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Se ha producido un error al cambiar la contraseña.'))
      throw requestError
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return {
    profile: profile ? { ...currentUser, ...profile } : currentUser,
    loading,
    actionLoading,
    error,
    setError,
    changeUsername,
    changePassword
  }
}
