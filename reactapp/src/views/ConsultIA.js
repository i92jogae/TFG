import { Alert, Avatar, Box, Divider, IconButton, LinearProgress, TextField, Tooltip, Typography } from '@mui/material'
import DvrIcon from '@mui/icons-material/Dvr'
import SendIcon from '@mui/icons-material/Send'
import { PageHeader, PageLayout, SurfaceCard } from '../components/layout/PageLayout'
import { useAiConversation } from '../hooks/useAiConversation'
import colors from '../config/config'
import dblearningchat from '../images/dblearningchat.png'

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
    <PageLayout maxWidth="1120px" spacing={3}>
      <PageHeader
        eyebrow="Asistente inteligente"
        title="Consulta IA"
        icon={DvrIcon}
        description="Pregunta dudas sobre bases de datos y recibe una explicación guiada. Las respuestas se pueden guardar automáticamente en tu historial de consultas."
      />

      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <SurfaceCard sx={{ display: 'flex', flexDirection: 'column', minHeight: { xs: '68vh', md: '72vh' } }}>
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
            backgroundImage: hasMessages ? 'none' : `linear-gradient(rgba(255,255,255,.84), rgba(255,255,255,.84)), url(${dblearningchat})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!hasMessages && (
            <Box sx={{ maxWidth: 620 }}>
              <Typography variant="h5" sx={{ color: colors.blue, fontWeight: 700, mb: 1 }}>
                Empieza escribiendo tu primera consulta
              </Typography>
              <Typography sx={{ color: colors.text, lineHeight: 1.7 }}>
                Puedes preguntar por SQL, normalización, relaciones, claves, consultas, modelos entidad-relación o cualquier concepto del temario.
              </Typography>
            </Box>
          )}

          {messages.map((message, index) => (
            <Box key={`${message.isUser ? 'user' : 'assistant'}-${index}`}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  maxWidth: 900,
                  ml: message.isUser ? 'auto' : 0,
                  flexDirection: message.isUser ? 'row-reverse' : 'row'
                }}
              >
                {message.isUser ? (
                  <Avatar variant="rounded" sx={{ bgcolor: colors.blue, flexShrink: 0 }}>{firstLetterUser}</Avatar>
                ) : (
                  <Avatar variant="rounded" sx={{ bgcolor: 'rgba(66, 165, 245, 0.12)', color: colors.blue, flexShrink: 0 }}>
                    <DvrIcon />
                  </Avatar>
                )}
                <Box
                  sx={{
                    bgcolor: message.isUser ? 'rgba(66, 165, 245, 0.1)' : 'white',
                    color: '#37474f',
                    border: '1px solid rgba(66, 165, 245, 0.12)',
                    borderRadius: 3,
                    px: 2.5,
                    py: 2,
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    boxShadow: message.isUser ? 'none' : '0 10px 30px rgba(25, 118, 210, 0.06)'
                  }}
                >
                  {message.text}
                </Box>
              </Box>
              {index < messages.length - 1 && <Divider sx={{ mt: 2.5 }} />}
            </Box>
          ))}
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, p: { xs: 2, md: 2.5 }, bgcolor: 'white' }}>
          <TextField
            id="textFielConsulta"
            label="Envía tu consulta"
            size="small"
            multiline
            fullWidth
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={handleInputKeyDown}
            maxRows={4}
          />
          <Tooltip title="Enviar consulta">
            <span>
              <IconButton
                aria-label="Enviar consulta"
                onClick={sendMessage}
                disabled={loading || inputText.trim() === ''}
                sx={{
                  bgcolor: colors.blue,
                  color: 'white',
                  width: 44,
                  height: 44,
                  '&:hover': { bgcolor: colors.blueSecondary },
                  '&.Mui-disabled': { bgcolor: 'rgba(96, 125, 139, 0.18)' }
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
