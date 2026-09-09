import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

export function ProtectedRoute({ children, requireAdmin = false, isAllowed }) {
  const authenticated = isAuthenticated()

  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAllowed?.()) {
    return <Navigate to="/" replace />
  }

  return children
}

export function GuestRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : children
}
