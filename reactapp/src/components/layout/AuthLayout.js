import React from 'react'
import { AppBar, Box, Button, Container, Paper, Toolbar, Typography } from '@mui/material'
import StorageIcon from '@mui/icons-material/Storage'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useNavigate } from 'react-router-dom'
import colors from '../../config/config'

function BrandBar() {
  const navigate = useNavigate()

  return (
    <AppBar position="static" elevation={0} sx={{ background: colors.backgroundMenu }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <Box
            component="button"
            type="button"
            onClick={() => navigate('/')}
            sx={{
              border: 0,
              background: 'transparent',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              p: 0
            }}
          >
            <StorageIcon sx={{ fontSize: '1.55rem' }} />
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.35rem' },
                fontWeight: 800,
                fontFamily: 'monospace',
                letterSpacing: { xs: '.18rem', sm: '.32rem' }
              }}
            >
              DBLEARNING
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function AuthFeature({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, color: 'rgba(255,255,255,.88)' }}>
      <AutoAwesomeIcon sx={{ mt: 0.2, fontSize: '1.1rem' }} />
      <Typography sx={{ fontSize: '.95rem', lineHeight: 1.7 }}>{children}</Typography>
    </Box>
  )
}

function AuthLayout({
  title,
  subtitle,
  icon: Icon,
  children,
  sideTitle,
  sideText,
  sideActionLabel,
  sideActionTo,
  footerText,
  footerActionLabel,
  footerActionTo
}) {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eef7ff 0%, #f8fbff 52%, #e8f4ff 100%)' }}>
      <BrandBar />

      <Container
        maxWidth="lg"
        sx={{
          minHeight: 'calc(100vh - 72px)',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(360px, 430px)' },
          alignItems: 'center',
          gap: { xs: 3, md: 5 },
          py: { xs: 4, md: 7 }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: { xs: 'none', md: 'flex' },
            minHeight: 520,
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: 5,
            p: 5,
            color: 'white',
            background: 'linear-gradient(145deg, rgba(66,165,245,.96), rgba(55,98,255,.92))',
            boxShadow: '0 28px 90px rgba(66, 165, 245, .35)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.16)',
              right: -80,
              top: -80
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <Typography sx={{ textTransform: 'uppercase', fontSize: '.8rem', fontWeight: 800, letterSpacing: '.16rem', opacity: .85 }}>
              Plataforma de aprendizaje
            </Typography>
            <Typography variant="h3" sx={{ mt: 2, fontWeight: 800, lineHeight: 1.1 }}>
              {sideTitle}
            </Typography>
            <Typography sx={{ mt: 2, fontSize: '1.05rem', lineHeight: 1.8, opacity: .92 }}>
              {sideText}
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', display: 'grid', gap: 2.5 }}>
            <AuthFeature>Consultas inteligentes sobre bases de datos.</AuthFeature>
            <AuthFeature>Tests personalizados por dificultad y temario.</AuthFeature>
            <AuthFeature>Seguimiento de progreso y actividad de aprendizaje.</AuthFeature>
            {sideActionLabel && sideActionTo && (
              <Button
                variant="contained"
                onClick={() => navigate(sideActionTo)}
                sx={{
                  mt: 1,
                  bgcolor: 'white',
                  color: colors.blue,
                  borderRadius: 999,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 800,
                  '&:hover': { bgcolor: 'white', boxShadow: 6 }
                }}
              >
                {sideActionLabel}
              </Button>
            )}
          </Box>
        </Paper>

        <Paper
          elevation={0}
          component="section"
          sx={{
            borderRadius: 5,
            p: { xs: 3, sm: 4.5 },
            background: 'rgba(255,255,255,.92)',
            border: '1px solid rgba(66,165,245,.18)',
            boxShadow: '0 24px 80px rgba(66, 165, 245, .18)',
            backdropFilter: 'blur(14px)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3.5 }}>
            {Icon && <Icon sx={{ color: colors.blue, fontSize: { xs: 72, sm: 88 }, mb: 1 }} />}
            <Typography variant="h3" sx={{ color: colors.blue, fontWeight: 800, fontSize: { xs: '2rem', sm: '2.45rem' } }}>
              {title}
            </Typography>
            {subtitle && <Typography sx={{ color: colors.text, mt: 1.5, lineHeight: 1.7 }}>{subtitle}</Typography>}
          </Box>

          {children}

          {footerText && footerActionLabel && footerActionTo && (
            <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mt: 3 }}>
              <Typography sx={{ color: colors.text, mb: 1 }}>{footerText}</Typography>
              <Button onClick={() => navigate(footerActionTo)} sx={{ color: colors.blue, textTransform: 'none', fontWeight: 800 }}>
                {footerActionLabel}
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout
