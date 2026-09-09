import { Alert, Box, LinearProgress, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { useNavigate } from 'react-router-dom'
import MarksTable from '../components/MarksTable'
import { EmptyState, PageHeader, PageLayout, SurfaceCard } from '../components/layout/PageLayout'
import { useUserResults } from '../hooks/useUserResults'
import colors from '../config/config'

function MetricCard({ label, value, helper }) {
  return (
    <SurfaceCard sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography sx={{ color: colors.text, fontSize: '.9rem', fontWeight: 700, mb: 1 }}>
        {label}
      </Typography>
      <Typography sx={{ color: colors.blue, fontSize: { xs: '2rem', md: '2.4rem' }, fontWeight: 800, lineHeight: 1 }}>
        {value}
      </Typography>
      {helper && (
        <Typography sx={{ color: colors.text, mt: 1, fontSize: '.88rem' }}>
          {helper}
        </Typography>
      )}
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

      {error && <Alert severity="error">{error}</Alert>}

      {loading && results.length === 0 && (
        <SurfaceCard sx={{ p: { xs: 3, md: 4 } }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography sx={{ color: colors.text }}>Cargando tus resultados...</Typography>
        </SurfaceCard>
      )}

      {!loading && results.length === 0 ? (
        <EmptyState
          title="Todavía no has realizado ningún test"
          description="Cuando completes tu primer test, podrás ver aquí tus calificaciones, dificultad, temas practicados y evolución general."
          actionLabel="Haz click y realiza tu primer test"
          actionIcon={<ExitToAppIcon />}
          onAction={() => navigate('/testIA')}
        />
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2
            }}
          >
            <MetricCard label="Nota media" value={`${summary.average}%`} helper="Media de todos los test completados" />
            <MetricCard label="Aciertos" value={`${summary.hits}/${summary.total}`} helper="Total de respuestas acertadas" />
            <MetricCard label="Tests realizados" value={results.length} helper="Pruebas guardadas en tu historial" />
          </Box>

          <SurfaceCard sx={{ p: { xs: 1.5, md: 2 }, overflowX: 'auto' }}>
            <Typography variant="h6" sx={{ color: colors.blue, fontWeight: 700, px: { xs: 1, md: 2 }, pt: 1, pb: 2 }}>
              Historial de pruebas
            </Typography>
            <MarksTable rows={results} />
          </SurfaceCard>
        </>
      )}
    </PageLayout>
  )
}

export default MyResults
