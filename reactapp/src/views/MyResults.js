import { Alert, Box, Chip, LinearProgress, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import TimelineIcon from '@mui/icons-material/Timeline'
import { useNavigate } from 'react-router-dom'
import MarksTable from '../components/MarksTable'
import { EmptyState, PageHeader, PageLayout, SectionTitle, StatCard, SurfaceCard } from '../components/layout/PageLayout'
import { useUserResults } from '../hooks/useUserResults'
import colors, { gradients } from '../config/config'

function PerformanceSummary({ summary, totalTests }) {
  const averageScore = Number(summary.average || 0)
  const normalizedAverage = Math.min(100, Math.max(0, averageScore))

  return (
    <SurfaceCard sx={{ p: { xs: 2.5, md: 3.5 }, background: gradients.hero, color: 'white' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 240px' }, gap: 3, alignItems: 'center' }}>
        <Box>
          <Chip label="Progreso académico" size="small" sx={{ bgcolor: 'rgba(255,255,255,.16)', color: 'white', fontWeight: 900, border: '1px solid rgba(255,255,255,.24)' }} />
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 900, lineHeight: 1.1 }}>
            Tu rendimiento acumulado en tests generados por IA
          </Typography>
          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,.78)', lineHeight: 1.7 }}>
            Revisa la evolución de tus calificaciones, los temas practicados y el volumen total de pruebas completadas.
          </Typography>
        </Box>

        <Box sx={{ p: 2.5, borderRadius: 4, bgcolor: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)' }}>
          <Typography sx={{ fontSize: '.82rem', fontWeight: 800, color: 'rgba(255,255,255,.78)' }}>Nota media</Typography>
          <Typography sx={{ fontSize: '3rem', fontWeight: 950, lineHeight: 1 }}>{averageScore}%</Typography>
          <LinearProgress
            variant="determinate"
            value={normalizedAverage}
            sx={{ mt: 2, height: 8, borderRadius: 999, bgcolor: 'rgba(255,255,255,.18)', '& .MuiLinearProgress-bar': { bgcolor: 'white', borderRadius: 999 } }}
          />
          <Typography sx={{ mt: 1, color: 'rgba(255,255,255,.78)', fontSize: '.86rem' }}>{totalTests} tests completados</Typography>
        </Box>
      </Box>
    </SurfaceCard>
  )
}

function MyResults() {
  const navigate = useNavigate()
  const { results, summary, loading, error } = useUserResults()

  return (
    <PageLayout maxWidth="1180px" spacing={3}>
      <PageHeader
        eyebrow="Seguimiento de progreso"
        title="Mis resultados"
        icon={TaskAltIcon}
        description="Consulta el histórico de test realizados, tu nota media y el total de aciertos acumulados."
      />

      {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

      {loading && results.length === 0 && (
        <SurfaceCard sx={{ p: { xs: 3, md: 4 } }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography sx={{ color: colors.text }}>Cargando tus resultados...</Typography>
        </SurfaceCard>
      )}

      {!loading && results.length === 0 ? (
        <EmptyState
          icon={EmojiEventsOutlinedIcon}
          title="Todavía no has realizado ningún test"
          description="Cuando completes tu primer test, podrás ver aquí tus calificaciones, dificultad, temas practicados y evolución general."
          actionLabel="Realizar primer test"
          actionIcon={<ExitToAppIcon />}
          onAction={() => navigate('/testIA')}
        />
      ) : (
        <>
          <PerformanceSummary summary={summary} totalTests={results.length} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2
            }}
          >
            <StatCard icon={TimelineIcon} label="Nota media" value={`${summary.average}%`} helper="Media de todos los test completados" />
            <StatCard icon={FactCheckOutlinedIcon} label="Aciertos" value={`${summary.hits}/${summary.total}`} helper="Total de respuestas acertadas" tone="green" />
            <StatCard icon={TaskAltIcon} label="Tests realizados" value={results.length} helper="Pruebas guardadas en tu historial" tone="teal" />
          </Box>

          <SurfaceCard sx={{ p: { xs: 2, md: 3 } }}>
            <SectionTitle
              title="Historial de pruebas"
              description="Detalle de calificaciones, dificultad y temas practicados en cada evaluación."
              actions={<Chip icon={<QueryStatsIcon />} label="Seguimiento" sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />}
            />
            <MarksTable rows={results} />
          </SurfaceCard>
        </>
      )}
    </PageLayout>
  )
}

export default MyResults
