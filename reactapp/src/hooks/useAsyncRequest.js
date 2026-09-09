import { useCallback, useState } from 'react'
import { getApiErrorMessage } from '../services/apiClient'

export function useAsyncRequest(defaultErrorMessage = 'Se ha producido un error inesperado') {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const run = useCallback(async (request, fallbackMessage = defaultErrorMessage) => {
    setLoading(true)
    setError('')

    try {
      return await request()
    } catch (requestError) {
      const message = getApiErrorMessage(requestError, fallbackMessage)
      setError(message)
      throw requestError
    } finally {
      setLoading(false)
    }
  }, [defaultErrorMessage])

  return { loading, error, setError, run }
}
