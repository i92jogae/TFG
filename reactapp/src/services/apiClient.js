import axios from 'axios'
import API_BASE_URL from '../config/api'
import { getStoredToken } from '../utils/auth'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function getApiErrorMessage(error, fallbackMessage = 'Se ha producido un error inesperado') {
  return error?.response?.data?.message || error?.response?.data?.error || fallbackMessage
}

export default apiClient
