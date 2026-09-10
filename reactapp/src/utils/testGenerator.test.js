import { buildTestPrompt, calculateTestScore, parseGeneratedTestResponse } from './testGenerator'

test('buildTestPrompt includes topics, difficulty and JSON instructions', () => {
  const prompt = buildTestPrompt({
    topics: ['SQL', 'Normalización'],
    difficulty: 'media',
    questionCount: 5
  })

  expect(prompt).toContain('SQL, Normalización')
  expect(prompt).toContain('Dificultad: media')
  expect(prompt).toContain('5 preguntas')
  expect(prompt).toContain('array JSON válido')
})

test('parseGeneratedTestResponse extracts a valid JSON array from text', () => {
  const response = `Texto previo [{"id_pregunta":1,"pregunta":"¿Qué es una clave primaria?","respuestas":["A","B","C","D"],"id_respuesta_correcta":2}] texto posterior`

  expect(parseGeneratedTestResponse(response)).toEqual([
    {
      id_pregunta: 1,
      pregunta: '¿Qué es una clave primaria?',
      respuestas: ['A', 'B', 'C', 'D'],
      id_respuesta_correcta: 2
    }
  ])
})

test('calculateTestScore returns score over ten', () => {
  const questions = [
    { id_pregunta: 1, id_respuesta_correcta: 2 },
    { id_pregunta: 2, id_respuesta_correcta: 4 }
  ]

  expect(calculateTestScore(questions, { 1: '2', 2: '1' })).toEqual({
    correctAnswers: 1,
    score: 5
  })
})
