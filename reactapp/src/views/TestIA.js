import React from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import QuizIcon from '@mui/icons-material/Quiz'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { PageHeader, PageLayout, SurfaceCard } from '../components/layout/PageLayout'
import { useGeneratedTest } from '../hooks/useGeneratedTest'
import { DATABASE_TOPICS, DIFFICULTIES } from '../utils/testGenerator'
import colors from '../config/config'

function OptionFeedback({ isCorrectAnswer, isSelectedAnswer }) {
  if (!isCorrectAnswer && !isSelectedAnswer) return null

  return isCorrectAnswer ? (
    <TaskAltRoundedIcon sx={{ fontSize: 24, color: '#43a047' }} />
  ) : (
    <CloseRoundedIcon sx={{ border: '1.9px solid #ef5350', borderRadius: '50%', fontSize: 18, color: '#ef5350' }} />
  )
}

function QuestionCard({ question, selectedAnswer, finished, onSelectAnswer }) {
  return (
    <SurfaceCard sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography variant="h6" sx={{ color: colors.blue, fontWeight: 800, lineHeight: 1.5 }}>
        {question.id_pregunta}. {question.pregunta}
      </Typography>

      <FormControl component="fieldset" sx={{ mt: 1.5, width: '100%' }}>
        <RadioGroup
          aria-label={`Pregunta ${question.id_pregunta}`}
          name={`pregunta${question.id_pregunta}`}
          value={selectedAnswer || ''}
          onChange={(event) => onSelectAnswer(question.id_pregunta, event.target.value)}
        >
          {question.respuestas.map((answer, index) => {
            const answerId = index + 1
            const isCorrectAnswer = finished && answerId === question.id_respuesta_correcta
            const isSelectedAnswer = finished && Number(selectedAnswer) === answerId && !isCorrectAnswer

            return (
              <Box
                key={`${question.id_pregunta}-${answerId}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: { xs: 0.5, sm: 1 },
                  py: 0.25,
                  borderRadius: 2,
                  background: isCorrectAnswer ? 'rgba(67, 160, 71, .08)' : isSelectedAnswer ? 'rgba(239, 83, 80, .08)' : 'transparent'
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
        </RadioGroup>
      </FormControl>
    </SurfaceCard>
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

  const progress = hasGeneratedTest ? (answeredQuestions / questions.length) * 100 : 0

  return (
    <PageLayout maxWidth="1180px" spacing={3}>
      <PageHeader
        eyebrow="Evaluación asistida"
        title="Realizar test"
        icon={QuizIcon}
        description="Selecciona temas y dificultad para generar un test personalizado. Al finalizar podrás revisar las respuestas correctas y guardar tu progreso."
      />

      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}

      {loading ? (
        <SurfaceCard sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <CircularProgress size={56} />
          <Typography sx={{ color: colors.text, mt: 3, lineHeight: 1.7 }}>
            Generación del test en curso. Este proceso puede requerir algo de tiempo si la API de OpenAI está configurada.
          </Typography>
        </SurfaceCard>
      ) : hasGeneratedTest ? (
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          <SurfaceCard sx={{ p: { xs: 2.5, md: 3 } }}>
            {finished ? (
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Typography variant="h5" sx={{ color: colors.blue, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
                  Test finalizado <CheckCircleRoundedIcon />
                </Typography>
                <Typography sx={{ color: colors.text, lineHeight: 1.7 }}>
                  Has obtenido {result?.correctAnswers || 0} aciertos de {questions.length}. Calificación: <strong>{Number(result?.score || 0).toFixed(2)}/10</strong>.
                </Typography>
                <Typography sx={{ color: colors.text }}>
                  A continuación puedes revisar la corrección de cada pregunta.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'grid', gap: 1.5 }}>
                <Typography sx={{ color: colors.text, lineHeight: 1.7 }}>
                  Ya puedes comenzar el test. Las preguntas están basadas en los temas y dificultad seleccionados.
                </Typography>
                <Box>
                  <Typography sx={{ color: colors.text, fontSize: '.9rem', mb: 0.75 }}>
                    Progreso: {answeredQuestions}/{questions.length} preguntas respondidas
                  </Typography>
                  <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 999 }} />
                </Box>
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
              py: 1.25,
              boxShadow: 0,
              background: colors.blueSecondary,
              textTransform: 'none',
              '&:hover': { background: colors.blue, boxShadow: 8 }
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>{finished ? 'Crear otro test' : 'Finalizar test'}</Typography>
          </Button>
        </Box>
      ) : (
        <SurfaceCard sx={{ p: { xs: 2.5, md: 4 } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 2fr) minmax(280px, 1fr)' }, gap: { xs: 4, md: 6 } }}>
            <Box>
              <Typography variant="h5" sx={{ color: colors.blue, fontWeight: 800, mb: 1 }}>
                Temas del test
              </Typography>
              <Typography sx={{ color: colors.text, mb: 2.5, lineHeight: 1.7 }}>
                Selecciona una o varias áreas de bases de datos sobre las que deseas ser evaluado.
              </Typography>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1 }}>
                  {DATABASE_TOPICS.map((topic) => (
                    <FormControlLabel
                      key={topic}
                      control={
                        <Checkbox
                          size="small"
                          checked={selectedTopics.includes(topic)}
                          onChange={() => toggleTopic(topic)}
                          sx={{ color: colors.blue, '&.Mui-checked': { color: colors.blue } }}
                        />
                      }
                      label={<Typography sx={{ color: colors.text, fontSize: '.9rem', lineHeight: 1.5 }}>{topic}</Typography>}
                    />
                  ))}
                </Box>
              </FormControl>
            </Box>

            <Box>
              <Typography variant="h5" sx={{ color: colors.blue, fontWeight: 800, mb: 1 }}>
                Dificultad
              </Typography>
              <Typography sx={{ color: colors.text, mb: 2.5, lineHeight: 1.7 }}>
                Ajusta el nivel del test según lo que quieras practicar.
              </Typography>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup value={difficulty} onChange={(event) => selectDifficulty(event.target.value)}>
                  {DIFFICULTIES.map((difficultyOption) => (
                    <Box key={difficultyOption.value} sx={{ border: '1px solid rgba(66,165,245,.18)', borderRadius: 3, p: 1.5, mb: 1.5 }}>
                      <FormControlLabel
                        value={difficultyOption.value}
                        control={<Radio size="small" sx={{ color: colors.blue, '&.Mui-checked': { color: colors.blue } }} />}
                        label={<Typography sx={{ color: '#37474f', fontWeight: 800 }}>{difficultyOption.label}</Typography>}
                      />
                      <Typography sx={{ color: colors.text, pl: 4, fontSize: '.85rem', lineHeight: 1.6 }}>
                        {difficultyOption.description}
                      </Typography>
                    </Box>
                  ))}
                </RadioGroup>
              </FormControl>
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
              py: 1.25,
              boxShadow: 0,
              background: colors.blueSecondary,
              textTransform: 'none',
              '&:hover': { background: colors.blue, boxShadow: 6 }
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>Comenzar test</Typography>
          </Button>
        </SurfaceCard>
      )}
    </PageLayout>
  )
}

export default TestIA
