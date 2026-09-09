import jwtDecode from 'jwt-decode'
import { clearStoredToken, getCurrentUser, hasRole, isAuthenticated, isTokenExpired, setStoredToken } from './auth'

jest.mock('jwt-decode', () => jest.fn())

describe('auth utilities', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test('returns false when there is no token', () => {
    expect(isAuthenticated()).toBe(false)
  })

  test('detects expired tokens', () => {
    const expiredToken = { exp: Date.now() / 1000 - 10 }

    expect(isTokenExpired(expiredToken)).toBe(true)
  })

  test('returns the current user when the stored token is valid', () => {
    const user = {
      id: 1,
      nombre: 'Enrique',
      correo: 'enrique@example.com',
      rol: 'Admin',
      exp: Date.now() / 1000 + 3600
    }

    jwtDecode.mockReturnValue(user)
    setStoredToken('valid-token')

    expect(isAuthenticated()).toBe(true)
    expect(getCurrentUser()).toEqual(user)
    expect(hasRole('Admin')).toBe(true)
  })

  test('clears the stored token', () => {
    setStoredToken('token')
    clearStoredToken()

    expect(localStorage.getItem('token')).toBeNull()
  })
})
