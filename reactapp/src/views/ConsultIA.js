import { Alert, Avatar, Box, Button, Chip, Divider, IconButton, LinearProgress, Stack, TextField, Tooltip, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DvrIcon from '@mui/icons-material/Dvr'
import SendIcon from '@mui/icons-material/Send'
import StorageIcon from '@mui/icons-material/Storage'
import { PageHeader, PageLayout, SurfaceCard } from '../components/layout/PageLayout'
import { useAiConversation } from '../hooks/useAiConversation'
import colors, { gradients } from '../config/config'
import dblearningchat from '../images/dblearningchat.png'

const suggestedPrompts = [
  'Explícame la diferencia entre una clave primaria y una clave foránea con un ejemplo sencillo.',
  '¿Cómo se aplica la tercera forma normal en una base de datos relacional?',
  'Dame un ejemplo de consulta SQL con JOIN entre dos tablas.',
  'Resume las diferencias entre modelo entidad-relación y modelo relacional.'
]

function AssistantEmptyState({ onSelectPrompt }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 340px' }, gap: 3, alignItems: 'stretch' }}>
      <Box sx={{ maxWidth: 720, minWidth: 0 }}>
        <Chip
          icon={<AutoAwesomeIcon />}
          label="Tutor IA especializado en bases de datos"
          sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, border: `1px solid ${colors.border}`, fontWeight: 850 }}
        />
        <Typography variant="h4" sx={{ mt: 2.5, color: colors.text, fontWeight: 900, lineHeight: 1.1, fontSize: { xs: '2rem', md: '2.55rem' } }}>
          Empieza escribiendo tu primera consulta
        </Typography>
        <Typography sx={{ color: colors.textMuted, mt: 1.5, lineHeight: 1.8, fontSize: '1.02rem' }}>
          Puedes preguntar por SQL, normalización, relaciones, claves, modelos entidad-relación o cualquier concepto del temario. La respuesta quedará integrada en tu historial para repasarla más adelante.
        </Typography>

        <Stack spacing={1.25} sx={{ mt: 3 }}>
          {suggestedPrompts.map((prompt) => (
            <Button
              key={prompt}
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              variant="outlined"
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                borderRadius: 3,
                px: 2,
                py: 1.25,
                color: colors.text,
                borderColor: colors.border,
                bgcolor: 'rgba(255,255,255,.72)',
                textTransform: 'none',
                lineHeight: 1.5,
                '&:hover': { borderColor: colors.blue, bgcolor: 'rgba(2,132,199,.06)' }
              }}
            >
              {prompt}
            </Button>
          ))}
        </Stack>
      </Box>

      <SurfaceCard sx={{ p: 3, background: gradients.hero, color: 'white', display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ width: 54, height: 54, borderRadius: 3, bgcolor: 'rgba(255,255,255,.16)', display: 'grid', placeItems: 'center' }}>
          <StorageIcon />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            DBLearning Chat
          </Typography>
          <Typography sx={{ lineHeight: 1.7, color: 'rgba(255,255,255,.84)' }}>
            Diseñado para transformar dudas sueltas en explicaciones accionables, ejemplos y material de estudio reutilizable.
          </Typography>
        </Box>
      </SurfaceCard>
    </Box>
  )
}

function MessageBubble({ message, firstLetterUser }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: { xs: 1.25, sm: 2 },
        maxWidth: 920,
        ml: message.isUser ? 'auto' : 0,
        flexDirection: message.isUser ? 'row-reverse' : 'row'
      }}
    >
      {message.isUser ? (
        <Avatar variant="rounded" sx={{ bgcolor: colors.slate, flexShrink: 0, fontWeight: 900 }}>{firstLetterUser}</Avatar>
      ) : (
        <Avatar variant="rounded" sx={{ bgcolor: colors.surfaceContainer, color: colors.blue, flexShrink: 0 }}>
          <DvrIcon />
        </Avatar>
      )}
      <Box
        sx={{
          bgcolor: message.isUser ? colors.slate : 'white',
          color: message.isUser ? 'white' : colors.text,
          border: `1px solid ${message.isUser ? 'rgba(15,23,42,.12)' : colors.border}`,
          borderRadius: message.isUser ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
          px: { xs: 2, sm: 2.5 },
          py: { xs: 1.75, sm: 2 },
          lineHeight: 1.75,
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
          boxShadow: message.isUser ? '0 12px 32px rgba(15,23,42,.16)' : colors.shadowSoft
        }}
      >
        {message.text}
      </Box>
    </Box>
  )
}

function ConsultIA() {
  const {
    messages,
    inputText,
    setInputText,
    loading,
    error,
    setError,
    firstLetterUser,
    sendMessage
  } = useAiConversation()
  const hasMessages = messages.length > 0

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <PageLayout maxWidth="1160px" spacing={3}>
      <PageHeader
        eyebrow="Asistente inteligente"
        title="Consulta IA"
        icon={DvrIcon}
        description="Pregunta dudas sobre bases de datos y recibe una explicación guiada. Las respuestas se pueden guardar automáticamente en tu historial de consultas."
      />

      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: 3 }}>
          {error}
        </Alert>
      )}

      <SurfaceCard sx={{ display: 'flex', flexDirection: 'column', minHeight: { xs: '70dvh', md: '72dvh' }, background: 'rgba(255,255,255,.96)' }}>
        {loading && <LinearProgress sx={{ width: '100%' }} />}

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            backgroundImage: hasMessages ? 'none' : `linear-gradient(rgba(248,249,255,.88), rgba(248,249,255,.88)), url(${dblearningchat})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!hasMessages && <AssistantEmptyState onSelectPrompt={setInputText} />}

          {messages.map((message, index) => (
            <Box key={`${message.isUser ? 'user' : 'assistant'}-${index}`} className="fade-up">
              <MessageBubble message={message} firstLetterUser={firstLetterUser} />
            </Box>
          ))}
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, p: { xs: 1.5, md: 2 }, bgcolor: 'white' }}>
          <TextField
            id="textFielConsulta"
            placeholder="Escribe tu consulta sobre bases de datos..."
            size="small"
            multiline
            fullWidth
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={handleInputKeyDown}
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: colors.surfaceDim
              }
            }}
          />
          <Tooltip title="Enviar consulta">
            <span>
              <IconButton
                aria-label="Enviar consulta"
                onClick={sendMessage}
                disabled={loading || inputText.trim() === ''}
                sx={{
                  bgcolor: colors.slate,
                  color: 'white',
                  width: 46,
                  height: 46,
                  boxShadow: colors.shadowSoft,
                  '&:hover': { bgcolor: colors.slateSoft, transform: 'translateY(-1px)' },
                  '&.Mui-disabled': { bgcolor: 'rgba(100,116,139,.18)' }
                }}
              >
                <SendIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </SurfaceCard>
    </PageLayout>
  )
}

export default ConsultIA
