import React, { useMemo, useState } from 'react'
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  Slide,
  TextField,
  Typography
} from '@mui/material'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import GroupIcon from '@mui/icons-material/Group'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import UsersTable from '../components/UsersTable'
import { PageHeader, PageLayout, SectionTitle, StatCard, SurfaceCard } from '../components/layout/PageLayout'
import { useUsersManagement } from '../hooks/useUsersManagement'
import colors from '../config/config'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 'calc(100vw - 32px)', sm: 500 },
  maxHeight: 'calc(100dvh - 32px)',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: `1px solid ${colors.border}`,
  borderRadius: 4,
  boxShadow: colors.shadowOverlay,
  p: { xs: 3, sm: 4 }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const initialEditForm = {
  nombre: '',
  password: '',
  rol: ''
}

function UsersManagement() {
  const { users, loading, actionLoading, error, setError, editUser, removeUser } = useUsersManagement()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const [editForm, setEditForm] = useState(initialEditForm)

  const selectedUser = users.find((user) => user.id === selectedUserId)

  const userStats = useMemo(() => {
    const adminUsers = users.filter((user) => user.rol === 'Admin').length
    const studentUsers = users.length - adminUsers

    return { total: users.length, adminUsers, studentUsers }
  }, [users])

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setSelectedUserId(null)
  }

  const openDeleteModal = (id) => {
    setSelectedUserId(id)
    setDeleteModalOpen(true)
    setError('')
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
    setSelectedUserId(null)
    setEditForm(initialEditForm)
    setFormError('')
    setShowPassword(false)
  }

  const openEditModal = (id) => {
    const userToEdit = users.find((user) => user.id === id)

    setSelectedUserId(id)
    setEditForm({
      nombre: userToEdit?.nombre || '',
      password: '',
      rol: userToEdit?.rol || ''
    })
    setFormError('')
    setError('')
    setEditModalOpen(true)
  }

  const updateEditForm = (field) => (event) => {
    setEditForm((currentForm) => ({ ...currentForm, [field]: event.target.value }))
  }

  const closeEditedDialog = () => {
    setEdited(false)
  }

  const closeDeletedDialog = () => {
    setDeleted(false)
  }

  const validateEditForm = () => {
    if (!editForm.nombre.trim() || !editForm.password.trim() || !editForm.rol) {
      return 'Por favor, introduce un usuario y contraseña válidos y selecciona un rol.'
    }

    if (editForm.password.length < 8 || !/\d/.test(editForm.password)) {
      return 'La contraseña debe tener al menos 8 caracteres y un número.'
    }

    return ''
  }

  const handleEditUser = async () => {
    const validationError = validateEditForm()

    if (validationError) {
      setFormError(validationError)
      return
    }

    try {
      await editUser({
        usuarioId: selectedUserId,
        nuevoNombre: editForm.nombre.trim(),
        nuevaContrasena: editForm.password,
        rol: editForm.rol
      })
      closeEditModal()
      setEdited(true)
    } catch {
      setFormError('')
    }
  }

  const handleDeleteUser = async () => {
    try {
      await removeUser(selectedUserId)
      closeDeleteModal()
      setDeleted(true)
    } catch {
      // El mensaje de error ya queda gestionado por el hook.
    }
  }

  return (
    <PageLayout maxWidth="1240px" spacing={3}>
      <PageHeader
        eyebrow="Panel de administración"
        title="Usuarios"
        icon={GroupIcon}
        description="Gestiona los usuarios registrados en la plataforma, edita sus datos principales o elimina cuentas junto con su actividad asociada."
        aside={
          <Box sx={{ width: '100%', display: 'grid', gap: 1 }}>
            <Chip icon={<ShieldOutlinedIcon />} label="Acceso administrador" sx={{ justifyContent: 'flex-start', bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />
            <Typography sx={{ color: colors.textMuted, fontSize: '.9rem', lineHeight: 1.5 }}>
              Los usuarios administradores quedan protegidos frente a edición y borrado accidental.
            </Typography>
          </Box>
        }
      />

      {error && <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: 3 }}>{error}</Alert>}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
        <StatCard icon={GroupIcon} label="Usuarios totales" value={userStats.total} helper="Cuentas registradas en la plataforma" />
        <StatCard icon={PersonOutlineIcon} label="Estudiantes" value={userStats.studentUsers} helper="Usuarios genéricos con acceso a aprendizaje" tone="teal" />
        <StatCard icon={AdminPanelSettingsOutlinedIcon} label="Administradores" value={userStats.adminUsers} helper="Cuentas con permisos de gestión" tone="amber" />
      </Box>

      <SurfaceCard sx={{ p: { xs: 2, md: 3 } }}>
        <SectionTitle
          title="Listado de usuarios"
          description="Vista responsive optimizada para revisar cuentas, fechas de registro y acciones disponibles."
          actions={<Chip label={`${users.length} registros`} sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />}
        />
        {loading && <LinearProgress sx={{ mb: 2, borderRadius: 999 }} />}
        <UsersTable rows={users} abrirModalBorrar={openDeleteModal} abrirModalEditar={openEditModal} />
      </SurfaceCard>

      <Modal
        open={editModalOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={editModalOpen}>
          <Box sx={modalStyle}>
            <Box sx={{ width: 54, height: 54, display: 'grid', placeItems: 'center', borderRadius: 3, bgcolor: colors.surfaceContainer, color: colors.blue, mb: 2 }}>
              <PersonOutlineIcon />
            </Box>
            <Typography color={colors.text} variant="h5" sx={{ fontWeight: 900 }}>
              Editar datos de usuario
            </Typography>
            {selectedUser && (
              <Typography sx={{ color: colors.textMuted, mt: 1, mb: 1.5 }}>
                Usuario seleccionado: <strong>{selectedUser.nombre}</strong>
              </Typography>
            )}

            <TextField
              sx={{ mt: 1.5, mb: 1.5 }}
              required
              fullWidth
              id="username"
              label="Nuevo nombre de usuario"
              variant="outlined"
              value={editForm.nombre}
              onChange={updateEditForm('nombre')}
            />
            <FormControl fullWidth required variant="outlined" sx={{ mb: 1.5 }}>
              <InputLabel>Nueva contraseña</InputLabel>
              <Input
                id="password"
                value={editForm.password}
                onChange={updateEditForm('password')}
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

            <FormControl fullWidth variant="outlined">
              <InputLabel id="selectRolLabel">Rol</InputLabel>
              <Select
                labelId="selectRolLabel"
                id="selectRol"
                value={editForm.rol}
                label="Rol"
                onChange={updateEditForm('rol')}
              >
                <MenuItem value="Usuario Generico">Estudiante</MenuItem>
                <MenuItem value="Admin">Administrador</MenuItem>
              </Select>
            </FormControl>

            {formError && (
              <Alert severity="error" icon={<ErrorOutlineIcon />} sx={{ mt: 2, borderRadius: 3 }}>
                {formError}
              </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                onClick={handleEditUser}
                disabled={actionLoading}
                sx={{ flex: 1, background: colors.slate, borderRadius: 2, py: 1.15, textTransform: 'none', '&:hover': { background: colors.slateSoft, boxShadow: colors.shadowCard } }}
              >
                <Typography sx={{ fontWeight: 850 }}>Confirmar</Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={closeEditModal}
                disabled={actionLoading}
                sx={{ flex: 1, borderColor: colors.borderStrong, color: colors.text, borderRadius: 2, py: 1.15, textTransform: 'none' }}
              >
                <Typography sx={{ fontWeight: 850 }}>Cancelar</Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={deleteModalOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={deleteModalOpen}>
          <Box sx={modalStyle}>
            <Box sx={{ width: 54, height: 54, display: 'grid', placeItems: 'center', borderRadius: 3, bgcolor: 'rgba(239,68,68,.1)', color: colors.red, mb: 2 }}>
              <DeleteOutlineIcon />
            </Box>
            <Typography color={colors.text} variant="h5" sx={{ fontWeight: 900 }}>
              ¿Eliminar este usuario?
            </Typography>
            {selectedUser && (
              <Typography sx={{ color: colors.textMuted, mt: 1.5, lineHeight: 1.7 }}>
                Se eliminará la cuenta de <strong>{selectedUser.nombre}</strong>, sus consultas y sus test asociados. Esta acción no se puede deshacer desde la interfaz.
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                onClick={handleDeleteUser}
                disabled={actionLoading}
                sx={{ flex: 1, background: colors.red, borderRadius: 2, py: 1.15, textTransform: 'none', '&:hover': { background: colors.red, boxShadow: colors.shadowCard } }}
              >
                <Typography sx={{ fontWeight: 850 }}>Eliminar</Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={closeDeleteModal}
                disabled={actionLoading}
                sx={{ flex: 1, borderColor: colors.borderStrong, color: colors.text, borderRadius: 2, py: 1.15, textTransform: 'none' }}
              >
                <Typography sx={{ fontWeight: 850 }}>Cancelar</Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Dialog open={edited} TransitionComponent={Transition} keepMounted onClose={closeEditedDialog} fullWidth maxWidth="sm">
        <DialogTitle color={colors.text} sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleOutlineIcon sx={{ color: colors.green }} />
          Usuario actualizado
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: colors.textMuted, lineHeight: 1.7 }}>
            La información del usuario se ha editado con éxito.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="contained" onClick={closeEditedDialog} sx={{ background: colors.slate, textTransform: 'none', borderRadius: 2, '&:hover': { background: colors.slateSoft } }}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleted} TransitionComponent={Transition} keepMounted onClose={closeDeletedDialog} fullWidth maxWidth="sm">
        <DialogTitle color={colors.text} sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleOutlineIcon sx={{ color: colors.green }} />
          Usuario eliminado
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: colors.textMuted, lineHeight: 1.7 }}>
            El usuario se ha eliminado con éxito, así como sus consultas y test asociados.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="contained" onClick={closeDeletedDialog} sx={{ background: colors.slate, textTransform: 'none', borderRadius: 2, '&:hover': { background: colors.slateSoft } }}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  )
}

export default UsersManagement
