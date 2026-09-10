import React from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import QuizIcon from '@mui/icons-material/Quiz'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import TuneIcon from '@mui/icons-material/Tune'
import { PageHeader, PageLayout, SectionTitle, SurfaceCard } from '../components/layout/PageLayout'
import { useGeneratedTest } from '../hooks/useGeneratedTest'
import { DATABASE_TOPICS, DIFFICULTIES } from '../utils/testGenerator'
import colors, { gradients } from '../config/config'

function OptionFeedback({ isCorrectAnswer, isSelectedAnswer }) {
  if (!isCorrectAnswer && !isSelectedAnswer) return null

  return isCorrectAnswer ? (
    <TaskAltRoundedIcon sx={{ fontSize: 24, color: colors.green }} />
  ) : (
    <CloseRoundedIcon sx={{ border: `1.9px solid ${colors.red}`, borderRadius: '50%', fontSize: 18, color: colors.red }} />
  )
}

function QuestionCard({ question, selectedAnswer, finished, onSelectAnswer }) {
  return (
    <SurfaceCard sx={{ p: { xs: 2.25, md: 3 }, borderColor: finished ? colors.border : 'rgba(2,132,199,.24)' }}>
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: 2.5, bgcolor: colors.surfaceContainer, color: colors.blue, display: 'grid', placeItems: 'center', fontWeight: 950 }}>
          {question.id_pregunta}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h6" sx={{ color: colors.text, fontWeight: 900, lineHeight: 1.45 }}>
            {question.pregunta}
          </Typography>

          <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
            <RadioGroup
              aria-label={`Pregunta ${question.id_pregunta}`}
              name={`pregunta${question.id_pregunta}`}
              value={selectedAnswer || ''}
              onChange={(event) => onSelectAnswer(question.id_pregunta, event.target.value)}
            >
              <Stack spacing={1}>
                {question.respuestas.map((answer, index) => {
                  const answerId = index + 1
                  const isCorrectAnswer = finished && answerId === question.id_respuesta_correcta
                  const isSelectedAnswer = finished && Number(selectedAnswer) === answerId && !isCorrectAnswer
                  const isSelected = String(answerId) === String(selectedAnswer)

                  return (
                    <Box
                      key={`${question.id_pregunta}-${answerId}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: { xs: 1, sm: 1.5 },
                        py: 0.75,
                        borderRadius: 3,
                        border: `1px solid ${isCorrectAnswer ? 'rgba(16,185,129,.35)' : isSelectedAnswer ? 'rgba(239,68,68,.35)' : isSelected ? 'rgba(2,132,199,.35)' : colors.border}`,
                        background: isCorrectAnswer ? 'rgba(16,185,129,.08)' : isSelectedAnswer ? 'rgba(239,68,68,.08)' : isSelected ? 'rgba(2,132,199,.06)' : 'rgba(255,255,255,.72)'
                      }}
                    >
                      <FormControlLabel
                        value={String(answerId)}
                        control={<Radio size="small" disabled={finished} sx={{ color: colors.blue, '&.Mui-checked': { color: colors.blue } }} />}
                        label={<Typography sx={{ color: colors.text, lineHeight: 1.6 }}>{answer}</Typography>}
                        sx={{ flex: 1, mr: 0 }}
                      />
                      <OptionFeedback isCorrectAnswer={isCorrectAnswer} isSelectedAnswer={isSelectedAnswer} />
                    </Box>
                  )
                })}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </SurfaceCard>
  )
}

function TopicSelector({ selectedTopics, toggleTopic }) {
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25 }}>
        {DATABASE_TOPICS.map((topic) => {
          const selected = selectedTopics.includes(topic)

          return (
            <Box
              key={topic}
              sx={{
                border: `1px solid ${selected ? 'rgba(2,132,199,.45)' : colors.border}`,
                borderRadius: 3,
                bgcolor: selected ? 'rgba(2,132,199,.07)' : 'rgba(255,255,255,.78)',
                transition: 'border-color .16s ease, background .16s ease, transform .16s ease',
                '&:hover': { borderColor: colors.blue, transform: 'translateY(-1px)' }
              }}
            >
              <FormControlLabel
                sx={{ m: 0, width: '100%', alignItems: 'flex-start', p: 1.3 }}
                control={
                  <Checkbox
                    size="small"
                    checked={selected}
                    onChange={() => toggleTopic(topic)}
                    sx={{ color: colors.blue, '&.Mui-checked': { color: colors.blue } }}
                  />
                }
                label={<Typography sx={{ color: colors.text, fontSize: '.92rem', lineHeight: 1.5, pt: 0.25, fontWeight: selected ? 850 : 600 }}>{topic}</Typography>}
              />
            </Box>
          )
        })}
      </Box>
    </FormControl>
  )
}

function DifficultySelector({ difficulty, selectDifficulty }) {
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <RadioGroup value={difficulty} onChange={(event) => selectDifficulty(event.target.value)}>
        <Stack spacing={1.25}>
          {DIFFICULTIES.map((difficultyOption) => {
            const selected = difficulty === difficultyOption.value

            return (
              <Box
                key={difficultyOption.value}
                sx={{
                  border: `1px solid ${selected ? 'rgba(13,148,136,.48)' : colors.border}`,
                  borderRadius: 3,
                  p: 1.5,
                  bgcolor: selected ? 'rgba(13,148,136,.08)' : 'rgba(255,255,255,.78)'
                }}
              >
                <FormControlLabel
                  value={difficultyOption.value}
                  control={<Radio size="small" sx={{ color: colors.teal, '&.Mui-checked': { color: colors.teal } }} />}
                  label={<Typography sx={{ color: colors.text, fontWeight: 900 }}>{difficultyOption.label}</Typography>}
                />
                <Typography sx={{ color: colors.textMuted, pl: 4, fontSize: '.88rem', lineHeight: 1.6 }}>
                  {difficultyOption.description}
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}

function TestIA() {
  const {
    selectedTopics,
    difficulty,
    questions,
    selectedAnswers,
    answeredQuestions,
    hasGeneratedTest,
    loading,
    error,
    setError,
    finished,
    result,
    toggleTopic,
    selectDifficulty,
    selectAnswer,
    startTest,
    finishTest,
    resetTest
  } = useGeneratedTest()

  const progress = hasGeneratedTest && questions.length > 0 ? (answeredQuestions / questions.length) * 100 : 0

  return (
    <PageLayout maxWidth="1180px" spacing={3}>
      <PageHeader
        eyebrow="Evaluación asistida"
        title="Realizar test"
        icon={QuizIcon}
        description="Selecciona temas y dificultad para generar un test personalizado. Al finalizar podrás revisar las respuestas correctas y guardar tu progreso."
        aside={
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Chip icon={<AutoAwesomeIcon />} label="Generación asistida por IA" sx={{ justifyContent: 'flex-start', bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />
            <Typography sx={{ color: colors.textMuted, fontSize: '.9rem', lineHeight: 1.5 }}>
              El test se adapta a los temas seleccionados y muestra feedback al finalizar.
            </Typography>
          </Box>
        }
      />

      {error && <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: 3 }}>{error}</Alert>}

      {loading ? (
        <SurfaceCard sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <CircularProgress size={56} />
          <Typography variant="h5" sx={{ color: colors.text, mt: 3, fontWeight: 900 }}>
            Generando test personalizado
          </Typography>
          <Typography sx={{ color: colors.textMuted, mt: 1, lineHeight: 1.7 }}>
            Este proceso puede requerir algo de tiempo si la API de OpenAI está configurada.
          </Typography>
        </SurfaceCard>
      ) : hasGeneratedTest ? (
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          <SurfaceCard sx={{ p: { xs: 2.5, md: 3.5 }, background: finished ? 'linear-gradient(135deg, rgba(16,185,129,.12), rgba(255,255,255,.96))' : 'linear-gradient(135deg, rgba(2,132,199,.1), rgba(255,255,255,.96))' }}>
            {finished ? (
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Typography variant="h5" sx={{ color: colors.text, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
                  Test finalizado <CheckCircleRoundedIcon sx={{ color: colors.green }} />
                </Typography>
                <Typography sx={{ color: colors.textMuted, lineHeight: 1.7 }}>
                  Has obtenido <strong>{result?.correctAnswers || 0}</strong> aciertos de <strong>{questions.length}</strong>. Calificación: <strong>{Number(result?.score || 0).toFixed(2)}/10</strong>.
                </Typography>
                <Typography sx={{ color: colors.textMuted }}>
                  A continuación puedes revisar la corrección de cada pregunta.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'grid', gap: 1.5 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5}>
                  <Box>
                    <Typography variant="h5" sx={{ color: colors.text, fontWeight: 900 }}>
                      Test preparado
                    </Typography>
                    <Typography sx={{ color: colors.textMuted, lineHeight: 1.7 }}>
                      Responde las preguntas y finaliza para ver el feedback.
                    </Typography>
                  </Box>
                  <Chip label={`${answeredQuestions}/${questions.length} respondidas`} sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />
                </Stack>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 9, borderRadius: 999, bgcolor: colors.surfaceContainer, '& .MuiLinearProgress-bar': { borderRadius: 999, bgcolor: colors.blue } }} />
              </Box>
            )}
          </SurfaceCard>

          {questions.map((question) => (
            <QuestionCard
              key={question.id_pregunta}
              question={question}
              selectedAnswer={selectedAnswers[question.id_pregunta]}
              finished={finished}
              onSelectAnswer={selectAnswer}
            />
          ))}

          <Button
            endIcon={<ExitToAppIcon />}
            onClick={finished ? resetTest : finishTest}
            variant="contained"
            sx={{
              py: 1.3,
              boxShadow: colors.shadowSoft,
              background: colors.slate,
              borderRadius: 2.5,
              textTransform: 'none',
              '&:hover': { background: colors.slateSoft, boxShadow: colors.shadowCard }
            }}
          >
            <Typography sx={{ fontWeight: 900 }}>{finished ? 'Crear otro test' : 'Finalizar test'}</Typography>
          </Button>
        </Box>
      ) : (
        <SurfaceCard sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <SectionTitle
            title="Configura tu evaluación"
            description="Selecciona el temario y el nivel de dificultad antes de generar la batería de preguntas."
            actions={<Chip icon={<TuneIcon />} label={`${selectedTopics.length} temas seleccionados`} sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 2fr) minmax(280px, 1fr)' }, gap: { xs: 4, md: 5 } }}>
            <Box>
              <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center', mb: 2 }}>
                <SchoolOutlinedIcon sx={{ color: colors.blue }} />
                <Typography variant="h5" sx={{ color: colors.text, fontWeight: 900 }}>
                  Temas del test
                </Typography>
              </Box>
              <TopicSelector selectedTopics={selectedTopics} toggleTopic={toggleTopic} />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center', mb: 2 }}>
                <TuneIcon sx={{ color: colors.teal }} />
                <Typography variant="h5" sx={{ color: colors.text, fontWeight: 900 }}>
                  Dificultad
                </Typography>
              </Box>
              <DifficultySelector difficulty={difficulty} selectDifficulty={selectDifficulty} />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Button
            endIcon={<ExitToAppIcon />}
            variant="contained"
            onClick={startTest}
            disabled={loading}
            sx={{
              width: '100%',
              py: 1.3,
              boxShadow: colors.shadowSoft,
              background: colors.slate,
              borderRadius: 2.5,
              textTransform: 'none',
              '&:hover': { background: colors.slateSoft, boxShadow: colors.shadowCard }
            }}
          >
            <Typography sx={{ fontWeight: 900 }}>Comenzar test</Typography>
          </Button>
        </SurfaceCard>
      )}
    </PageLayout>
  )
}

export default TestIA
