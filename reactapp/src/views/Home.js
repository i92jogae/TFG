import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FunctionsIcon from '@mui/icons-material/Functions'
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import SchoolIcon from '@mui/icons-material/School'
import SecurityIcon from '@mui/icons-material/Security'
import StorageIcon from '@mui/icons-material/Storage'
import MenuDB from '../components/Menu'
import colors, { gradients } from '../config/config'
import { isAuthenticated } from '../utils/auth'
import '../styles/Home.css'

const features = [
  {
    icon: PsychologyAltIcon,
    title: 'Tutor IA especializado',
    description: 'Consultas conceptuales sobre bases de datos, SQL, normalización, claves, relaciones y modelos entidad-relación.'
  },
  {
    icon: CheckCircleOutlineIcon,
    title: 'Tests adaptativos',
    description: 'Genera ejercicios por tema y dificultad para practicar antes de exámenes o entregas académicas.'
  },
  {
    icon: QueryStatsIcon,
    title: 'Analítica de progreso',
    description: 'Revisa tu historial de consultas, resultados, aciertos y evolución para estudiar de forma ordenada.'
  }
]

const curriculum = [
  'Modelo Entidad-Interrelación',
  'Modelo Relacional',
  'Álgebra Relacional',
  'SQL y SQL/PL',
  'Normalización',
  'Bases de Datos Distribuidas'
]

function Home() {
  const navigate = useNavigate()
  const authenticated = isAuthenticated()

  const goToAssistant = () => navigate(authenticated ? '/consultIA' : '/login')
  const goToTest = () => navigate(authenticated ? '/testIA' : '/register')

  return (
    <Box sx={{ minHeight: '100dvh', background: gradients.soft, overflowX: 'clip' }}>
      <MenuDB />
      <Box component="main">
        <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 6, md: 8 } }}>
          <Stack alignItems="center" spacing={3} className="fade-up" sx={{ textAlign: 'center' }}>
            <Chip
              size="small"
              icon={<AutoAwesomeIcon />}
              label="Plataforma inteligente de bases de datos · Nivel universitario"
              sx={{
                bgcolor: colors.surfaceContainer,
                color: colors.blueDark,
                border: `1px solid ${colors.border}`,
                fontWeight: 800,
                px: 1,
                maxWidth: '100%'
              }}
            />
            <Typography
              variant="h1"
              sx={{
                maxWidth: 900,
                color: colors.text,
                fontWeight: 900,
                fontSize: { xs: '2.45rem', sm: '3.2rem', md: '4.25rem' },
                lineHeight: 1.03
              }}
            >
              Amplía y consolida tus conocimientos en{' '}
              <Box component="span" sx={{ color: colors.blue }}>
                Bases de Datos
              </Box>{' '}
              con IA especializada.
            </Typography>
            <Typography sx={{ maxWidth: 780, color: colors.textMuted, fontSize: { xs: '1rem', md: '1.12rem' }, lineHeight: 1.8 }}>
              Resuelve dudas, genera tests personalizados y sigue tu progreso académico desde una interfaz fullstack con React, Express, MySQL y OpenAI.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={goToAssistant}
                sx={{ bgcolor: colors.blue, borderRadius: 2, px: 3, textTransform: 'none', fontWeight: 850, boxShadow: 0, '&:hover': { bgcolor: colors.blueDark, boxShadow: 4 } }}
              >
                Probar asistente IA
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={goToTest}
                sx={{ borderColor: colors.borderStrong, color: colors.text, bgcolor: 'white', borderRadius: 2, px: 3, textTransform: 'none', fontWeight: 800, '&:hover': { borderColor: colors.blue, bgcolor: colors.surfaceDim } }}
              >
                Realizar test de prueba
              </Button>
            </Stack>
          </Stack>

          <Box
            className="surface-card fade-up"
            sx={{
              mt: { xs: 5, md: 7 },
              p: { xs: 2, md: 2.5 },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
              gap: 2,
              alignItems: 'stretch'
            }}
          >
            <Box sx={{ bgcolor: colors.surfaceDim, borderRadius: 3, p: 2.5, border: `1px solid ${colors.border}` }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <StorageIcon sx={{ color: colors.blue }} />
                <Typography sx={{ fontWeight: 900, color: colors.text }}>Diagrama lógico relacional</Typography>
              </Stack>
              {['ESTUDIANTES', 'CONSULTAS', 'RESULTADOS_TEST'].map((item, index) => (
                <Box key={item} sx={{ mb: 1.5, p: 1.4, bgcolor: 'white', border: `1px solid ${colors.border}`, borderRadius: 2 }}>
                  <Typography className="mono" sx={{ color: colors.blueDark, fontSize: '.76rem', fontWeight: 800 }}>{item}</Typography>
                  <Typography className="mono" sx={{ mt: 0.75, color: colors.textMuted, fontSize: '.7rem' }}>
                    PK: id · FK: usuario_id {index === 0 ? '· UNIQUE correo' : '· INDEX fecha'}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ bgcolor: colors.slate, borderRadius: 3, overflow: 'hidden', color: 'white', border: '1px solid rgba(15,23,42,.18)' }}>
              <Stack direction="row" spacing={1} sx={{ px: 2, py: 1.2, bgcolor: '#1e293b', alignItems: 'center' }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                <Typography className="mono" sx={{ ml: 1, color: '#cbd5e1', fontSize: '.74rem' }}>query_optimization.sql</Typography>
              </Stack>
              <Box component="pre" className="mono" sx={{ m: 0, p: { xs: 2, md: 2.5 }, fontSize: { xs: '.72rem', sm: '.82rem' }, lineHeight: 1.7, overflowX: 'auto' }}>
{`SELECT e.nombre, r.calificacion_final
FROM estudiantes e
JOIN resultados_test r ON r.usuario_id = e.id
WHERE r.dificultad = 'media'
ORDER BY r.calificacion_final DESC;`}
              </Box>
              <Box sx={{ px: 2.5, pb: 2.5 }}>
                <Typography sx={{ color: '#bae6fd', fontSize: '.9rem', lineHeight: 1.7 }}>
                  El asistente explica consultas paso a paso, relaciona teoría y práctica, y guarda el aprendizaje para revisar más tarde.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: { xs: 4, md: 5 }, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 1.5 }}>
            {[
              ['+12.500', 'Queries analizadas'],
              ['98.4%', 'Precisión estimada'],
              ['3', 'Niveles de dificultad'],
              ['24/7', 'Tutor relacional activo']
            ].map(([value, label]) => (
              <Box key={label} sx={{ p: { xs: 2, md: 2.5 }, bgcolor: colors.surfaceDim, border: `1px solid ${colors.border}`, borderRadius: 3, textAlign: 'center' }}>
                <Typography sx={{ color: colors.blue, fontWeight: 950, fontSize: { xs: '1.45rem', md: '1.8rem' }, lineHeight: 1 }}>{value}</Typography>
                <Typography sx={{ color: colors.textMuted, mt: 0.75, fontSize: '.78rem', fontWeight: 650 }}>{label}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: { xs: 6, md: 8 } }}>
            <Typography variant="overline" sx={{ color: colors.blue, fontWeight: 900, letterSpacing: '.12em' }}>
              Arquitectura de aprendizaje
            </Typography>
            <Typography variant="h2" sx={{ maxWidth: 680, mt: 1, color: colors.text, fontWeight: 900, fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.1 }}>
              Tres pilares diseñados para estudiar con rigor académico.
            </Typography>
            <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {features.map(({ icon: Icon, title, description }) => (
                <Box key={title} className="surface-card" sx={{ p: { xs: 2.5, md: 3 }, transition: 'transform .2s ease, box-shadow .2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: colors.shadowOverlay } }}>
                  <Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: colors.surfaceContainer, color: colors.blue, mb: 2 }}>
                    <Icon />
                  </Box>
                  <Typography sx={{ color: colors.text, fontWeight: 900, fontSize: '1.1rem' }}>{title}</Typography>
                  <Typography sx={{ color: colors.textMuted, mt: 1, lineHeight: 1.7, fontSize: '.92rem' }}>{description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: { xs: 6, md: 8 } }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={2}>
              <Box>
                <Typography variant="overline" sx={{ color: colors.blue, fontWeight: 900, letterSpacing: '.12em' }}>
                  Plan universitario
                </Typography>
                <Typography variant="h2" sx={{ maxWidth: 640, mt: 1, color: colors.text, fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.35rem' }, lineHeight: 1.1 }}>
                  Contenidos curriculares de grado cubiertos.
                </Typography>
              </Box>
              <Button onClick={goToTest} endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none', color: colors.blue, fontWeight: 850 }}>
                Explorar módulos de test
              </Button>
            </Stack>
            <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {curriculum.map((item, index) => (
                <Box key={item} sx={{ p: 2.4, bgcolor: 'white', border: `1px solid ${colors.border}`, borderRadius: 3, boxShadow: colors.shadowSoft }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <FunctionsIcon sx={{ color: colors.blue, fontSize: 20 }} />
                    <Chip label={`Tema ${String(index + 1).padStart(2, '0')}`} size="small" sx={{ bgcolor: colors.surfaceDim, color: colors.textMuted, fontWeight: 800, height: 24 }} />
                  </Stack>
                  <Typography sx={{ mt: 1.7, color: colors.text, fontWeight: 850 }}>{item}</Typography>
                  <Typography sx={{ mt: 0.8, color: colors.textMuted, fontSize: '.86rem', lineHeight: 1.6 }}>
                    Teoría, preguntas guiadas y práctica evaluable conectada con la plataforma.
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: { xs: 6, md: 8 }, p: { xs: 3, md: 5 }, borderRadius: 4, background: gradients.hero, color: 'white', textAlign: 'center', boxShadow: colors.shadowOverlay }}>
            <SchoolIcon sx={{ fontSize: 34, opacity: 0.9 }} />
            <Typography variant="h2" sx={{ mt: 1.5, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.05 }}>
              Pon a prueba tus competencias antes de entrar al aula.
            </Typography>
            <Typography sx={{ maxWidth: 680, mx: 'auto', mt: 1.5, color: '#dbeafe', lineHeight: 1.8 }}>
              Genera un simulacro en minutos, identifica tus puntos débiles y vuelve a estudiar con datos reales de tu progreso.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
              <Button onClick={goToTest} variant="contained" startIcon={<SecurityIcon />} sx={{ bgcolor: colors.blue, borderRadius: 2, textTransform: 'none', fontWeight: 850, boxShadow: 0, '&:hover': { bgcolor: colors.blueDark } }}>
                Generar examen de prueba
              </Button>
              <Button onClick={goToAssistant} variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,.35)', borderRadius: 2, textTransform: 'none', fontWeight: 800, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,.08)' } }}>
                Consultar dudas con IA
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
