import React, { useState } from 'react'
import {
  Alert,
  Backdrop,
  Box,
  Button,
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
import GroupIcon from '@mui/icons-material/Group'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import UsersTable from '../components/UsersTable'
import { PageHeader, PageLayout, SurfaceCard } from '../components/layout/PageLayout'
import { useUsersManagement } from '../hooks/useUsersManagement'
import colors from '../config/config'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 'calc(100vw - 32px)', sm: 440 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid rgba(66, 165, 245, 0.28)',
  borderRadius: 4,
  boxShadow: 24,
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
    <PageLayout maxWidth="1180px" spacing={3}>
      <PageHeader
        eyebrow="Panel de administración"
        title="Usuarios"
        icon={GroupIcon}
        description="Gestiona los usuarios registrados en la plataforma, edita sus datos principales o elimina cuentas junto con su actividad asociada."
      />

      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}

      <SurfaceCard sx={{ p: { xs: 1.5, md: 2 }, overflowX: 'auto' }}>
        {loading && <LinearProgress sx={{ mb: 2 }} />}
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
            <Typography color={colors.blue} variant="h5" sx={{ fontWeight: 700 }}>
              Editar datos de usuario
            </Typography>
            {selectedUser && (
              <Typography sx={{ color: colors.text, mt: 1, mb: 1.5 }}>
                Usuario seleccionado: {selectedUser.nombre}
              </Typography>
            )}

            <TextField
              sx={{ mt: 1.5, mb: 1.5 }}
              required
              fullWidth
              id="username"
              label="Nuevo nombre de usuario"
              variant="standard"
              value={editForm.nombre}
              onChange={updateEditForm('nombre')}
            />
            <FormControl fullWidth required variant="standard" sx={{ mb: 1.5 }}>
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

            <FormControl fullWidth variant="standard">
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
              <Typography sx={{ color: '#e57373', mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ErrorOutlineIcon />
                {formError}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                onClick={handleEditUser}
                disabled={actionLoading}
                sx={{ flex: 1, background: colors.blue, textTransform: 'none', '&:hover': { background: colors.blue, boxShadow: 9 } }}
              >
                <Typography sx={{ fontWeight: 600 }}>Confirmar</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={closeEditModal}
                disabled={actionLoading}
                sx={{ flex: 1, background: colors.red, textTransform: 'none', '&:hover': { background: colors.red, boxShadow: 9 } }}
              >
                <Typography sx={{ fontWeight: 600 }}>Cancelar</Typography>
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
            <Typography color={colors.blue} variant="h5" sx={{ fontWeight: 700 }}>
              ¿Está seguro de que quiere eliminar el usuario?
            </Typography>
            {selectedUser && (
              <Typography sx={{ color: colors.text, mt: 1.5 }}>
                Se eliminará la cuenta de {selectedUser.nombre}, sus consultas y sus test asociados.
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                onClick={handleDeleteUser}
                disabled={actionLoading}
                sx={{ flex: 1, background: colors.blue, textTransform: 'none', '&:hover': { background: colors.blue, boxShadow: 9 } }}
              >
                <Typography sx={{ fontWeight: 600 }}>Confirmar</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={closeDeleteModal}
                disabled={actionLoading}
                sx={{ flex: 1, background: colors.red, textTransform: 'none', '&:hover': { background: colors.red, boxShadow: 9 } }}
              >
                <Typography sx={{ fontWeight: 600 }}>Cancelar</Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Dialog open={edited} TransitionComponent={Transition} keepMounted onClose={closeEditedDialog} fullWidth maxWidth="sm">
        <DialogTitle color={colors.blue}>{'Se ha actualizado correctamente'}</DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight="Light" color={colors.blue} fontSize="large">
            La información del usuario se ha editado con éxito.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeEditedDialog} sx={{ background: colors.blue, opacity: '80%', textTransform: 'none', '&:hover': { background: colors.blue, boxShadow: 6 } }}>
            <Typography>Continuar</Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleted} TransitionComponent={Transition} keepMounted onClose={closeDeletedDialog} fullWidth maxWidth="sm">
        <DialogTitle color={colors.blue}>{'Se ha eliminado correctamente'}</DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight="Light" color={colors.blue} fontSize="large">
            El usuario se ha eliminado con éxito, así como sus consultas y test asociados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeDeletedDialog} sx={{ background: colors.blue, opacity: '80%', textTransform: 'none', '&:hover': { background: colors.blue, boxShadow: 6 } }}>
            <Typography>Continuar</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  )
}

export default UsersManagement
