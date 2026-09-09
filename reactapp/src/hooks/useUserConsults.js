import { useEffect, useState } from 'react'
import { getUserConsults } from '../services/dbLearningApi'
import { getCurrentUser } from '../utils/auth'
import { useAsyncRequest } from './useAsyncRequest'

export function useUserConsults() {
  const user = getCurrentUser()
  const [consults, setConsults] = useState([])
  const { loading, error, run } = useAsyncRequest('Se ha producido un error al recuperar las consultas.')

  useEffect(() => {
    if (!user?.id) return

    run(() => getUserConsults(user.id))
      .then(setConsults)
      .catch(() => {})
  }, [run, user?.id])

  return { consults, loading, error }
}
