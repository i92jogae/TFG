import React, { useState } from 'react'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, Input, InputAdornment, InputLabel, Slide, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import { useRegisterForm } from '../hooks/useAuthForm'
import colors from '../config/config'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function Register() {
  const navigate = useNavigate()
  const [registered, setRegistered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { values, error, loading, updateField, submit } = useRegisterForm({
    onSuccess: () => setRegistered(true)
  })

  const closeSuccessDialog = () => {
    setRegistered(false)
    navigate('/login')
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Regístrate para guardar tus consultas, realizar tests y consultar tu evolución."
      icon={AccountCircleIcon}
      sideTitle="Construye tu progreso paso a paso"
      sideText="DBLearning combina consultas asistidas por IA, pruebas personalizadas e histórico de resultados para estudiar bases de datos de forma más organizada."
      sideActionLabel="Ya tengo cuenta"
      sideActionTo="/login"
      footerText="¿Ya tienes cuenta?"
      footerActionLabel="Inicia sesión aquí"
      footerActionTo="/login"
    >
      <Dialog
        open={registered}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeSuccessDialog}
        aria-describedby="register-success-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle color={colors.blue}>Se ha registrado con éxito</DialogTitle>
        <DialogContent>
          <DialogContentText id="register-success-description" sx={{ color: colors.text, fontSize: '1rem' }}>
            Tu cuenta se ha creado correctamente. Pulsa continuar para iniciar sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="contained"
            onClick={closeSuccessDialog}
            sx={{ background: colors.blue, textTransform: 'none', '&:hover': { background: colors.blue, boxShadow: 6 } }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="form" onSubmit={submit} noValidate sx={{ display: 'grid', gap: 2.25 }}>
        {error && (
          <Alert severity="error" icon={<ErrorOutlineIcon />}>
            {error}
          </Alert>
        )}

        <TextField
          required
          fullWidth
          id="username"
          label="Nombre de usuario"
          variant="standard"
          value={values.nombre}
          onChange={updateField('nombre')}
          autoComplete="name"
        />

        <TextField
          required
          fullWidth
          id="user"
          label="Email"
          type="email"
          variant="standard"
          value={values.correo}
          onChange={updateField('correo')}
          autoComplete="email"
        />

        <FormControl fullWidth required variant="standard">
          <InputLabel>Contraseña</InputLabel>
          <Input
            id="password"
            value={values.contrasena}
            onChange={updateField('contrasena')}
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword((currentValue) => !currentValue)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Typography sx={{ color: colors.text, fontSize: '.85rem', lineHeight: 1.6 }}>
          La contraseña debe tener al menos 8 caracteres e incluir un número.
        </Typography>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 1,
            py: 1.25,
            borderRadius: 999,
            background: colors.blue,
            textTransform: 'none',
            boxShadow: 0,
            '&:hover': { background: colors.blue, boxShadow: 6 }
          }}
        >
          <Typography sx={{ fontWeight: 800 }}>{loading ? 'Creando cuenta...' : 'Aceptar'}</Typography>
        </Button>
      </Box>
    </AuthLayout>
  )
}

export default Register
