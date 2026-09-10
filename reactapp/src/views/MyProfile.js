import React, { useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
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
  Stack,
  TextField,
  Typography
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import LockResetIcon from '@mui/icons-material/LockReset'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import SecurityIcon from '@mui/icons-material/Security'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { PageHeader, PageLayout, SectionTitle, SurfaceCard } from '../components/layout/PageLayout'
import { useUserProfile } from '../hooks/useUserProfile'
import colors, { gradients } from '../config/config'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function ProfileInfoCard({ icon: Icon, label, value, helper }) {
  return (
    <SurfaceCard sx={{ p: { xs: 2.5, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Box sx={{ width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: 2.5, bgcolor: colors.surfaceContainer, color: colors.blue }}>
          <Icon sx={{ fontSize: 21 }} />
        </Box>
        <Typography sx={{ color: colors.textMuted, fontWeight: 800, fontSize: '.88rem' }}>{label}</Typography>
      </Box>
      <Typography sx={{ color: colors.text, fontSize: { xs: '1rem', md: '1.08rem' }, fontWeight: 900, wordBreak: 'normal', overflowWrap: 'break-word', lineHeight: 1.4 }}>
        {value || 'No disponible'}
      </Typography>
      {helper && <Typography sx={{ color: colors.textMuted, mt: 1, fontSize: '.86rem', lineHeight: 1.55 }}>{helper}</Typography>}
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
    <PageLayout maxWidth="1080px" spacing={3}>
      <PageHeader
        eyebrow="Área personal"
        title="Mi perfil"
        icon={ManageAccountsOutlinedIcon}
        description="Consulta tus datos de cuenta y actualiza tu nombre de usuario o contraseña cuando lo necesites."
        aside={
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Chip icon={<VerifiedUserOutlinedIcon />} label="Sesión activa" sx={{ justifyContent: 'flex-start', bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />
            <Typography sx={{ color: colors.textMuted, fontSize: '.9rem', lineHeight: 1.5 }}>
              Tus cambios se sincronizan con la API y se reflejan en la interfaz.
            </Typography>
          </Box>
        }
      />

      {loading && <LinearProgress sx={{ borderRadius: 999 }} />}
      {error && <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: 3 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" onClose={() => setSuccessMessage('')} sx={{ borderRadius: 3 }}>{successMessage}</Alert>}

      <SurfaceCard sx={{ p: { xs: 3, md: 4 }, background: gradients.hero, color: 'white' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) auto' },
            alignItems: 'center',
            gap: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, minWidth: 0 }}>
            <Avatar sx={{ width: { xs: 76, md: 88 }, height: { xs: 76, md: 88 }, bgcolor: 'white', color: colors.blue, fontSize: '2rem', fontWeight: 950 }}>
              {userInitial || <AccountCircleIcon />}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Chip label={userRole} size="small" sx={{ bgcolor: 'rgba(255,255,255,.16)', color: 'white', border: '1px solid rgba(255,255,255,.22)', fontWeight: 850, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 950, lineHeight: 1.1, overflowWrap: 'break-word' }}>
                {userName}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,.78)', mt: 0.75, overflowWrap: 'break-word' }}>{userEmail}</Typography>
            </Box>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }} spacing={1.5} sx={{ width: { xs: '100%', md: 220 } }}>
            <Button
              variant="contained"
              onClick={openUsernameModal}
              disabled={actionLoading}
              sx={{ bgcolor: 'white', color: colors.slate, textTransform: 'none', borderRadius: 2, fontWeight: 900, py: 1.15, '&:hover': { bgcolor: 'white', boxShadow: colors.shadowOverlay } }}
            >
              Cambiar usuario
            </Button>
            <Button
              variant="outlined"
              onClick={openPasswordModal}
              disabled={actionLoading}
              startIcon={<LockResetIcon />}
              sx={{ borderColor: 'rgba(255,255,255,.42)', color: 'white', textTransform: 'none', borderRadius: 2, fontWeight: 900, py: 1.15, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,.08)' } }}
            >
              Cambiar contraseña
            </Button>
          </Stack>
        </Box>
      </SurfaceCard>

      <SurfaceCard sx={{ p: { xs: 2.5, md: 3 } }}>
        <SectionTitle title="Datos de cuenta" description="Información principal asociada a tu usuario dentro de DBLearning." />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          <ProfileInfoCard icon={BadgeOutlinedIcon} label="Nombre" value={userName} helper="Nombre visible en la plataforma" />
          <ProfileInfoCard icon={EmailOutlinedIcon} label="Correo" value={userEmail} helper="Credencial de acceso principal" />
          <ProfileInfoCard icon={ShieldOutlinedIcon} label="Rol" value={userRole} helper="Permisos asociados a la cuenta" />
        </Box>
      </SurfaceCard>

      <Dialog open={usernameModalOpen} TransitionComponent={Transition} keepMounted onClose={closeUsernameModal} fullWidth maxWidth="sm">
        <DialogTitle color={colors.text} sx={{ fontWeight: 900 }}>Cambiar nombre de usuario</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2, color: colors.textMuted, lineHeight: 1.7 }}>
            El nuevo nombre se usará en la interfaz y se actualizará también en el token de sesión cuando el servidor devuelva uno nuevo.
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            id="username"
            label="Nuevo nombre de usuario"
            variant="outlined"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
          />
          {formError && (
            <Alert severity="error" icon={<ErrorOutlineIcon />} sx={{ mt: 2, borderRadius: 3 }}>
              {formError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeUsernameModal} disabled={actionLoading} sx={{ color: colors.text, textTransform: 'none', fontWeight: 850 }}>Cancelar</Button>
          <Button variant="contained" onClick={handleUsernameChange} disabled={actionLoading} sx={{ bgcolor: colors.slate, borderRadius: 2, textTransform: 'none', fontWeight: 850, '&:hover': { bgcolor: colors.slateSoft } }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={passwordModalOpen} TransitionComponent={Transition} keepMounted onClose={closePasswordModal} fullWidth maxWidth="sm">
        <DialogTitle color={colors.text} sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SecurityIcon sx={{ color: colors.blue }} />
          Cambiar contraseña
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2, color: colors.textMuted, lineHeight: 1.7 }}>
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
            <Alert severity="error" icon={<ErrorOutlineIcon />} sx={{ mt: 2, borderRadius: 3 }}>
              {formError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closePasswordModal} disabled={actionLoading} sx={{ color: colors.text, textTransform: 'none', fontWeight: 850 }}>Cancelar</Button>
          <Button variant="contained" onClick={handlePasswordChange} disabled={actionLoading} sx={{ bgcolor: colors.slate, borderRadius: 2, textTransform: 'none', fontWeight: 850, '&:hover': { bgcolor: colors.slateSoft } }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  )
}

export default MyProfile
