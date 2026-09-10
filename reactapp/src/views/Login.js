import React, { useState } from 'react'
import { Alert, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import { useLoginForm } from '../hooks/useAuthForm'
import colors from '../config/config'

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { values, error, loading, updateField, submit } = useLoginForm({
    onSuccess: () => navigate('/')
  })

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Accede a tus consultas, tests y progreso dentro de DBLearning."
      icon={AccountCircleIcon}
      sideTitle="Aprende bases de datos con apoyo inteligente"
      sideText="Consulta dudas, genera tests personalizados y revisa tu historial desde una plataforma diseñada para acompañar tu aprendizaje."
      sideActionLabel="Crear una cuenta"
      sideActionTo="/register"
      footerText="¿Todavía no tienes cuenta?"
      footerActionLabel="Regístrate aquí"
      footerActionTo="/register"
    >
      <Box component="form" onSubmit={submit} noValidate sx={{ display: 'grid', gap: 2.5 }}>
        {error && (
          <Alert severity="error" icon={<ErrorOutlineIcon />}>
            {error}
          </Alert>
        )}

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
            autoComplete="current-password"
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

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 1.5,
            py: 1.25,
            borderRadius: 999,
            background: colors.blue,
            textTransform: 'none',
            boxShadow: 0,
            '&:hover': { background: colors.blue, boxShadow: 6 }
          }}
        >
          <Typography sx={{ fontWeight: 800 }}>{loading ? 'Accediendo...' : 'Aceptar'}</Typography>
        </Button>
      </Box>
    </AuthLayout>
  )
}

export default Login
