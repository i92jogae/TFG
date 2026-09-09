import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, LinearProgress, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { useNavigate } from 'react-router-dom'
import { EmptyState, PageHeader, PageLayout, SurfaceCard } from '../components/layout/PageLayout'
import { useUserConsults } from '../hooks/useUserConsults'
import colors from '../config/config'

function formatConsultDate(value) {
  if (!value) return ''

  return new Date(value).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function MyConsults() {
  const navigate = useNavigate()
  const { consults, loading, error } = useUserConsults()

  return (
    <PageLayout maxWidth="1120px" spacing={3}>
      <PageHeader
        eyebrow="Historial de aprendizaje"
        title="Consultas realizadas"
        icon={QuestionAnswerIcon}
        description="Revisa las preguntas que has realizado al asistente y recupera las explicaciones para estudiar de forma organizada."
      />

      {error && <Alert severity="error">{error}</Alert>}

      {loading && consults.length === 0 && (
        <SurfaceCard sx={{ p: { xs: 3, md: 4 } }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography sx={{ color: colors.text }}>Cargando tus consultas...</Typography>
        </SurfaceCard>
      )}

      {!loading && consults.length === 0 ? (
        <EmptyState
          title="Todavía no has realizado ninguna consulta"
          description="Cuando hagas una pregunta al asistente, se guardará aquí junto con su respuesta para que puedas volver a consultarla."
          actionLabel="Haz click y realiza tu primera consulta"
          actionIcon={<ExitToAppIcon />}
          onAction={() => navigate('/consultIA')}
        />
      ) : (
        <SurfaceCard sx={{ p: { xs: 1.5, md: 2 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {consults.map((consult, index) => (
              <Accordion
                key={`${consult.fecha || 'consulta'}-${index}`}
                elevation={0}
                disableGutters
                sx={{
                  border: '1px solid rgba(66, 165, 245, 0.12)',
                  borderRadius: '14px !important',
                  overflow: 'hidden',
                  '&:before': { display: 'none' }
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colors.blue }} />}>
                  <Box sx={{ width: '100%', pr: 1 }}>
                    <Typography sx={{ color: colors.blue, fontWeight: 700, lineHeight: 1.5 }}>
                      {consult.consulta}
                    </Typography>
                    {consult.fecha && (
                      <Typography sx={{ color: colors.text, fontSize: '.82rem', mt: 0.5 }}>
                        {formatConsultDate(consult.fecha)}
                      </Typography>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#f8fbff', borderTop: '1px solid rgba(66, 165, 245, 0.1)' }}>
                  <Typography sx={{ color: '#37474f', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                    {consult.respuesta}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </SurfaceCard>
      )}
    </PageLayout>
  )
}

export default MyConsults
