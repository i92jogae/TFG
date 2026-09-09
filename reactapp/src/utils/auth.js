import jwtDecode from 'jwt-decode'

const TOKEN_KEY = 'token'

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function decodeToken(token = getStoredToken()) {
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch {
    return null
  }
}

export function isTokenExpired(decodedToken) {
  if (!decodedToken?.exp) return true

  return decodedToken.exp < Date.now() / 1000
}

export function isAuthenticated() {
  const decodedToken = decodeToken()

  return Boolean(decodedToken && !isTokenExpired(decodedToken))
}

export function getCurrentUser() {
  const decodedToken = decodeToken()

  if (!decodedToken || isTokenExpired(decodedToken)) {
    return null
  }

  return decodedToken
}

export function hasRole(role) {
  return getCurrentUser()?.rol === role
}

export function isAdmin() {
  return hasRole('Admin')
}
