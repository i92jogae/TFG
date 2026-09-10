import { Box, Button, Chip, Container, Paper, Stack, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SchoolIcon from '@mui/icons-material/School'
import SecurityIcon from '@mui/icons-material/Security'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import { useNavigate } from 'react-router-dom'
import MenuDB from '../Menu'
import colors, { gradients } from '../../config/config'

function AuthFeature({ icon: Icon, title, children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 1.6, bgcolor: 'rgba(255,255,255,.65)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 3 }}>
      <Box sx={{ width: 36, height: 36, display: 'grid', placeItems: 'center', flexShrink: 0, borderRadius: 2, bgcolor: colors.surfaceDim, color: colors.blue }}>
        <Icon sx={{ fontSize: 20 }} />
      </Box>
      <Box>
        <Typography sx={{ color: colors.text, fontWeight: 900, fontSize: '.95rem' }}>{title}</Typography>
        <Typography sx={{ color: colors.textMuted, fontSize: '.86rem', lineHeight: 1.6 }}>{children}</Typography>
      </Box>
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
    <Box sx={{ minHeight: '100dvh', background: gradients.soft, overflowX: 'clip' }}>
      <MenuDB />

      <Container
        maxWidth="lg"
        sx={{
          minHeight: { xs: 'auto', md: 'calc(100dvh - 72px)' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(360px, 460px)' },
          alignItems: 'center',
          gap: { xs: 3, md: 5 },
          py: { xs: 4, md: 7 }
        }}
      >
        <Box className="fade-up" sx={{ minWidth: 0 }}>
          <Chip
            size="small"
            label="Plataforma inteligente de aprendizaje universitario"
            sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, border: `1px solid ${colors.border}`, fontWeight: 900, letterSpacing: '.03em', maxWidth: '100%' }}
          />
          <Typography variant="h1" sx={{ mt: 3, color: colors.text, fontWeight: 900, fontSize: { xs: '2.35rem', md: '3.6rem' }, lineHeight: 1.06 }}>
            {sideTitle || 'Aprende bases de datos con tutoría IA de alta precisión.'}
          </Typography>
          <Typography sx={{ mt: 2, color: colors.textMuted, fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.8, maxWidth: 680 }}>
            {sideText || 'Resuelve dudas sobre álgebra relacional, normalización y SQL transaccional con explicaciones guiadas y tests calibrados para grado universitario.'}
          </Typography>

          <Stack spacing={1.5} sx={{ mt: 4 }}>
            <AuthFeature icon={SchoolIcon} title="Consultas conceptuales y álgebra relacional">
              Ejercicios prácticos guiados con transformaciones canónicas paso a paso.
            </AuthFeature>
            <AuthFeature icon={AutoAwesomeIcon} title="Generador de tests adaptativos">
              Baterías de preguntas según nivel, dificultad y temas seleccionados.
            </AuthFeature>
            <AuthFeature icon={QueryStatsIcon} title="Diagnóstico analítico de progreso">
              Historial de consultas, calificaciones y resultados acumulados.
            </AuthFeature>
          </Stack>

          {sideActionLabel && sideActionTo && (
            <Button
              variant="contained"
              onClick={() => navigate(sideActionTo)}
              sx={{ mt: 3, bgcolor: colors.slate, borderRadius: 2, px: 3, py: 1.2, textTransform: 'none', fontWeight: 850, '&:hover': { bgcolor: colors.slateSoft } }}
            >
              {sideActionLabel}
            </Button>
          )}
        </Box>

        <Paper
          elevation={0}
          component="section"
          className="fade-up"
          sx={{
            borderRadius: 4,
            p: { xs: 2.5, sm: 4 },
            background: 'rgba(255,255,255,.95)',
            border: `1px solid ${colors.border}`,
            boxShadow: colors.shadowCard,
            backdropFilter: 'blur(14px)',
            minWidth: 0
          }}
        >
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            {Icon && (
              <Box sx={{ width: 54, height: 54, borderRadius: 2.5, display: 'grid', placeItems: 'center', bgcolor: colors.surfaceContainer, color: colors.blue, mb: 2 }}>
                <Icon sx={{ fontSize: 31 }} />
              </Box>
            )}
            <Typography variant="h3" sx={{ color: colors.text, fontWeight: 900, fontSize: { xs: '2rem', sm: '2.25rem' }, lineHeight: 1.05 }}>
              {title}
            </Typography>
            {subtitle && <Typography sx={{ color: colors.textMuted, mt: 1.25, lineHeight: 1.7 }}>{subtitle}</Typography>}
          </Box>

          {children}

          {footerText && footerActionLabel && footerActionTo && (
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="center" spacing={1} sx={{ textAlign: 'center', mt: 3 }}>
              <Typography sx={{ color: colors.textMuted, fontSize: '.92rem' }}>{footerText}</Typography>
              <Button onClick={() => navigate(footerActionTo)} startIcon={<SecurityIcon />} sx={{ color: colors.blue, textTransform: 'none', fontWeight: 850 }}>
                {footerActionLabel}
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout
