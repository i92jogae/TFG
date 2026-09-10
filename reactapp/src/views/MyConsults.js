import { useMemo, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Chip, InputAdornment, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import SearchIcon from '@mui/icons-material/Search'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import { useNavigate } from 'react-router-dom'
import { EmptyState, PageHeader, PageLayout, SectionTitle, StatCard, SurfaceCard } from '../components/layout/PageLayout'
import { useUserConsults } from '../hooks/useUserConsults'
import colors from '../config/config'

function formatConsultDate(value) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function ConsultAccordion({ consult, index }) {
  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{
        border: `1px solid ${colors.border}`,
        borderRadius: '18px !important',
        overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,.78)',
        boxShadow: index === 0 ? colors.shadowSoft : 'none',
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: colors.blue }} />}
        sx={{
          px: { xs: 2, md: 2.5 },
          py: 0.75,
          '& .MuiAccordionSummary-content': { minWidth: 0 }
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', width: '100%', minWidth: 0, pr: 1 }}>
          <Box sx={{ width: 38, height: 38, flexShrink: 0, borderRadius: 2.5, bgcolor: colors.surfaceContainer, color: colors.blue, display: 'grid', placeItems: 'center' }}>
            <QuestionAnswerIcon sx={{ fontSize: 21 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: colors.text, fontWeight: 900, lineHeight: 1.45, overflowWrap: 'anywhere' }}>
              {consult.consulta}
            </Typography>
            {consult.fecha && (
              <Typography sx={{ color: colors.textMuted, fontSize: '.84rem', mt: 0.65 }}>
                {formatConsultDate(consult.fecha)}
              </Typography>
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: colors.surfaceDim, borderTop: `1px solid ${colors.border}`, px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
        <Typography sx={{ color: colors.text, lineHeight: 1.85, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {consult.respuesta}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

function MyConsults() {
  const navigate = useNavigate()
  const { consults, loading, error } = useUserConsults()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConsults = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) return consults

    return consults.filter((consult) => (
      `${consult.consulta || ''} ${consult.respuesta || ''}`.toLowerCase().includes(normalizedSearch)
    ))
  }, [consults, searchTerm])

  const latestConsultDate = useMemo(() => {
    if (consults.length === 0) return 'Sin actividad'

    const sortedDates = consults
      .map((consult) => new Date(consult.fecha))
      .filter((date) => !Number.isNaN(date.getTime()))
      .sort((a, b) => b.getTime() - a.getTime())

    return sortedDates[0] ? formatConsultDate(sortedDates[0]) : 'Sin fecha'
  }, [consults])

  return (
    <PageLayout maxWidth="1160px" spacing={3}>
      <PageHeader
        eyebrow="Historial de aprendizaje"
        title="Consultas realizadas"
        icon={QuestionAnswerIcon}
        description="Revisa las preguntas que has realizado al asistente y recupera las explicaciones para estudiar de forma organizada."
      />

      {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

      {loading && consults.length === 0 && (
        <SurfaceCard sx={{ p: { xs: 3, md: 4 } }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography sx={{ color: colors.text }}>Cargando tus consultas...</Typography>
        </SurfaceCard>
      )}

      {!loading && consults.length === 0 ? (
        <EmptyState
          icon={SmartToyOutlinedIcon}
          title="Todavía no has realizado ninguna consulta"
          description="Cuando hagas una pregunta al asistente, se guardará aquí junto con su respuesta para que puedas volver a consultarla."
          actionLabel="Realizar primera consulta"
          actionIcon={<ExitToAppIcon />}
          onAction={() => navigate('/consultIA')}
        />
      ) : (
        <>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
            <StatCard icon={QuestionAnswerIcon} label="Consultas guardadas" value={consults.length} helper="Preguntas y respuestas almacenadas" />
            <StatCard icon={ManageSearchIcon} label="Resultados visibles" value={filteredConsults.length} helper="Según tu búsqueda actual" tone="teal" />
            <StatCard icon={SmartToyOutlinedIcon} label="Última consulta" value={latestConsultDate} helper="Actividad más reciente" tone="green" />
          </Box>

          <SurfaceCard sx={{ p: { xs: 2, md: 3 } }}>
            <SectionTitle
              title="Biblioteca de consultas"
              description="Filtra por pregunta o por contenido de la respuesta para encontrar rápidamente una explicación anterior."
              actions={
                <Chip label={`${filteredConsults.length}/${consults.length}`} sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />
              }
            />

            <TextField
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar en tus consultas..."
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.textMuted }} />
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: colors.surfaceDim
                }
              }}
            />

            {filteredConsults.length === 0 ? (
              <Box sx={{ p: { xs: 2, md: 3 }, border: `1px dashed ${colors.borderStrong}`, borderRadius: 3, textAlign: 'center' }}>
                <Typography sx={{ color: colors.text, fontWeight: 800 }}>No hay consultas que coincidan con la búsqueda.</Typography>
                <Typography sx={{ color: colors.textMuted, mt: 0.75 }}>Prueba con otro término o borra el filtro.</Typography>
              </Box>
            ) : (
              <Stack spacing={1.5}>
                {filteredConsults.map((consult, index) => (
                  <ConsultAccordion key={`${consult.fecha || 'consulta'}-${index}`} consult={consult} index={index} />
                ))}
              </Stack>
            )}
          </SurfaceCard>
        </>
      )}
    </PageLayout>
  )
}

export default MyConsults
