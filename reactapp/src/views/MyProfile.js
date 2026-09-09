import React, { useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  FormControl,
  Slide,
  TextField,
  Typography
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import LockResetIcon from '@mui/icons-material/LockReset'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { PageHeader, PageLayout, SurfaceCard } from '../components/layout/PageLayout'
import { useUserProfile } from '../hooks/useUserProfile'
import colors from '../config/config'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function ProfileInfoCard({ icon: Icon, label, value }) {
  return (
    <SurfaceCard sx={{ p: { xs: 2.5, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Icon sx={{ color: colors.blue }} />
        <Typography sx={{ color: colors.text, fontWeight: 700, fontSize: '.9rem' }}>{label}</Typography>
      </Box>
      <Typography sx={{ color: '#37474f', fontSize: '1.05rem', fontWeight: 700, wordBreak: 'break-word' }}>
        {value || 'No disponible'}
      </Typography>
    </SurfaceCard>
  )
}

function MyProfile() {
  const { profile, loading, actionLoading, error, setError, changeUsername, changePassword } = useUserProfile()
  const [usernameModalOpen, setUsernameModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const userName = profile?.nombre || 'Usuario'
  const userEmail = profile?.correo || 'Correo no disponible'
  const userRole = profile?.rol === 'Admin' ? 'Administrador' : 'Estudiante'
  const userInitial = userName.substring(0, 1).toUpperCase()

  const openUsernameModal = () => {
    setNewUsername(userName)
    setFormError('')
    setError('')
    setUsernameModalOpen(true)
  }

  const closeUsernameModal = () => {
    setUsernameModalOpen(false)
    setNewUsername('')
    setFormError('')
  }

  const openPasswordModal = () => {
    setNewPassword('')
    setConfirmPassword('')
    setShowPassword(false)
    setFormError('')
    setError('')
    setPasswordModalOpen(true)
  }

  const closePasswordModal = () => {
    setPasswordModalOpen(false)
    setNewPassword('')
    setConfirmPassword('')
    setFormError('')
    setShowPassword(false)
  }

  const handleUsernameChange = async () => {
    if (!newUsername.trim()) {
      setFormError('Por favor, introduce un nombre de usuario válido.')
      return
    }

    try {
      await changeUsername(newUsername.trim())
      closeUsernameModal()
      setSuccessMessage('Nombre de usuario actualizado correctamente.')
    } catch {
      setFormError('')
    }
  }

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setFormError('Por favor, completa los dos campos de contraseña.')
      return
    }

    if (newPassword !== confirmPassword) {
      setFormError('Las contraseñas no coinciden.')
      return
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      setFormError('La contraseña debe tener al menos 8 caracteres y un número.')
      return
    }

    try {
      await changePassword(newPassword)
      closePasswordModal()
      setSuccessMessage('Contraseña actualizada correctamente.')
    } catch {
      setFormError('')
    }
  }

  return (
    <PageLayout maxWidth="1060px" spacing={3}>
      <PageHeader
        eyebrow="Área personal"
        title="Mi perfil"
        icon={ManageAccountsOutlinedIcon}
        description="Consulta tus datos de cuenta y actualiza tu nombre de usuario o contraseña cuando lo necesites."
      />

      {loading && <LinearProgress />}
      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
      {successMessage && <Alert severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}

      <SurfaceCard sx={{ p: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 72, height: 72, bgcolor: colors.blue, fontSize: '2rem', fontWeight: 800 }}>
              {userInitial || <AccountCircleIcon />}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ color: colors.blue, fontWeight: 800 }}>
                {userName}
              </Typography>
              <Typography sx={{ color: colors.text, mt: 0.5 }}>{userEmail}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              variant="contained"
              onClick={openUsernameModal}
              disabled={actionLoading}
              sx={{ bgcolor: colors.blue, textTransform: 'none', boxShadow: 0, '&:hover': { bgcolor: colors.blue, boxShadow: 6 } }}
            >
              Cambiar usuario
            </Button>
            <Button
              variant="outlined"
              onClick={openPasswordModal}
              disabled={actionLoading}
              startIcon={<LockResetIcon />}
              sx={{ borderColor: colors.blue, color: colors.blue, textTransform: 'none' }}
            >
              Cambiar contraseña
            </Button>
          </Box>
        </Box>
      </SurfaceCard>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
        <ProfileInfoCard icon={BadgeOutlinedIcon} label="Nombre" value={userName} />
        <ProfileInfoCard icon={EmailOutlinedIcon} label="Correo" value={userEmail} />
        <ProfileInfoCard icon={ShieldOutlinedIcon} label="Rol" value={userRole} />
      </Box>

      <Dialog open={usernameModalOpen} TransitionComponent={Transition} keepMounted onClose={closeUsernameModal} fullWidth maxWidth="sm">
        <DialogTitle color={colors.blue}>Cambiar nombre de usuario</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            El nuevo nombre se usará en la interfaz y se actualizará también en el token de sesión cuando el servidor devuelva uno nuevo.
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            id="username"
            label="Nuevo nombre de usuario"
            variant="standard"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
          />
          {formError && (
            <Typography sx={{ color: '#e57373', mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorOutlineIcon />
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeUsernameModal} disabled={actionLoading}>Cancelar</Button>
          <Button variant="contained" onClick={handleUsernameChange} disabled={actionLoading} sx={{ bgcolor: colors.blue, textTransform: 'none' }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={passwordModalOpen} TransitionComponent={Transition} keepMounted onClose={closePasswordModal} fullWidth maxWidth="sm">
        <DialogTitle color={colors.blue}>Cambiar contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Utiliza una contraseña con al menos 8 caracteres y un número para mantener tu cuenta protegida.
          </DialogContentText>
          <FormControl fullWidth required variant="standard" sx={{ mb: 2 }}>
            <InputLabel>Nueva contraseña</InputLabel>
            <Input
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((currentValue) => !currentValue)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth required variant="standard">
            <InputLabel>Confirmar contraseña</InputLabel>
            <Input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type={showPassword ? 'text' : 'password'}
            />
          </FormControl>
          {formError && (
            <Typography sx={{ color: '#e57373', mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorOutlineIcon />
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closePasswordModal} disabled={actionLoading}>Cancelar</Button>
          <Button variant="contained" onClick={handlePasswordChange} disabled={actionLoading} sx={{ bgcolor: colors.blue, textTransform: 'none' }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  )
}

export default MyProfile
