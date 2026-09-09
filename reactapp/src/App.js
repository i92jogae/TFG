import './styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './views/Home.js'
import Login from './views/Login.js'
import Register from './views/Register'
import ConsultIA from './views/ConsultIA'
import MyConsults from './views/MyConsults'
import TestIA from './views/TestIA'
import MyResults from './views/MyResults'
import MyProfile from './views/MyProfile'
import UsersManagement from './views/UsersManagement.js'
import { GuestRoute, ProtectedRoute } from './routes/ProtectedRoute'
import { isAdmin } from './utils/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultIA"
          element={
            <ProtectedRoute>
              <ConsultIA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myconsults"
          element={
            <ProtectedRoute>
              <MyConsults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/testIA"
          element={
            <ProtectedRoute>
              <TestIA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myresults"
          element={
            <ProtectedRoute>
              <MyResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usersmanagement"
          element={
            <ProtectedRoute requireAdmin isAllowed={isAdmin}>
              <UsersManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
