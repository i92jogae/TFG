import { useMemo, useState } from 'react'
import { generateTest, saveMark } from '../services/dbLearningApi'
import { getApiErrorMessage } from '../services/apiClient'
import { getCurrentUser } from '../utils/auth'
import { buildTestPrompt, calculateTestScore, parseGeneratedTestResponse } from '../utils/testGenerator'

export function useGeneratedTest() {
  const [selectedTopics, setSelectedTopics] = useState([])
  const [difficulty, setDifficulty] = useState('fácil')
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState(null)

  const answeredQuestions = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers])
  const hasGeneratedTest = questions.length > 0

  const toggleTopic = (topic) => {
    setSelectedTopics((currentTopics) => (
      currentTopics.includes(topic)
        ? currentTopics.filter((currentTopic) => currentTopic !== topic)
        : [...currentTopics, topic]
    ))
    setError('')
  }

  const selectDifficulty = (value) => {
    setDifficulty(value)
    setError('')
  }

  const selectAnswer = (questionId, answerId) => {
    if (finished) return

    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: String(answerId)
    }))
  }

  const startTest = async () => {
    if (selectedTopics.length === 0) {
      setError('Debe seleccionar al menos un tema para poder comenzar el test.')
      return
    }

    setLoading(true)
    setError('')
    setFinished(false)
    setResult(null)
    setSelectedAnswers({})

    try {
      const prompt = buildTestPrompt({ topics: selectedTopics, difficulty })
      const generatedResponse = await generateTest(prompt)
      const parsedQuestions = parseGeneratedTestResponse(generatedResponse)

      if (parsedQuestions.length === 0) {
        throw new Error('El generador no ha devuelto preguntas válidas.')
      }

      setQuestions(parsedQuestions)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Se ha producido un error al cargar el test. Comprueba la configuración de OpenAI o inténtalo más tarde.'))
    } finally {
      setLoading(false)
    }
  }

  const finishTest = async () => {
    const testResult = calculateTestScore(questions, selectedAnswers)
    const currentUser = getCurrentUser()

    setResult(testResult)
    setFinished(true)

    if (!currentUser?.id) return

    try {
      await saveMark({
        usuarioId: currentUser.id,
        calificacion: testResult.score,
        dificultad: difficulty,
        temas: selectedTopics.join(', ')
      })
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'El test ha finalizado, pero no se ha podido guardar la calificación.'))
    }
  }

  const resetTest = () => {
    setQuestions([])
    setSelectedAnswers({})
    setFinished(false)
    setResult(null)
    setError('')
  }

  return {
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
  }
}
