import { useCallback, useEffect, useState } from 'react'
import { deleteUser, getUsers, updateUser } from '../services/dbLearningApi'
import { getApiErrorMessage } from '../services/apiClient'

export function useUsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const userList = await getUsers()
      setUsers(userList)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Se ha producido un error al recuperar los usuarios.'))
    } finally {
      setLoading(false)
    }
  }, [])

  const editUser = async ({ usuarioId, nuevoNombre, nuevaContrasena, rol }) => {
    setActionLoading(true)
    setError('')

    try {
      await updateUser({ usuarioId, nuevoNombre, nuevaContrasena, rol })
      await loadUsers()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Error al modificar el usuario, inténtelo de nuevo.'))
      throw requestError
    } finally {
      setActionLoading(false)
    }
  }

  const removeUser = async (usuarioId) => {
    setActionLoading(true)
    setError('')

    try {
      await deleteUser(usuarioId)
      await loadUsers()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Se ha producido un error al borrar el usuario, inténtelo de nuevo.'))
      throw requestError
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return {
    users,
    loading,
    actionLoading,
    error,
    setError,
    loadUsers,
    editUser,
    removeUser
  }
}
