export const DATABASE_TOPICS = [
  'Introducción y Componentes de las Bases de Datos',
  'Representación de la Información, abstracción',
  'El Modelo de datos Entidad-Interrelación. Fundamentos EE-R',
  'El Modelo de datos Relacional',
  'El Álgebra Relacional',
  'Traducción del Modelo Conceptual al Relacional',
  'Integridad, Seguridad y Privacidad de las Bases de Datos',
  'Bases de Datos Activas',
  'Bases de Datos Distribuidas',
  'Bases de Datos Replicadas',
  'Consultas prácticas SQL y SQL/PL'
]

export const DIFFICULTIES = [
  { value: 'fácil', label: 'Fácil', description: 'Conceptos básicos y preguntas de reconocimiento.' },
  { value: 'media', label: 'Media', description: 'Aplicación práctica y razonamiento intermedio.' },
  { value: 'avanzada', label: 'Avanzada', description: 'Preguntas exigentes, relaciones y casos complejos.' }
]

export function buildTestPrompt({ topics, difficulty, questionCount = 11 }) {
  return [
    `Genera un test sobre bases de datos, sobre los siguientes temas: ${topics.join(', ')}.`,
    `Dificultad: ${difficulty}.`,
    `Debe constar de ${questionCount} preguntas.`,
    'Devuelve únicamente un array JSON válido.',
    'Cada pregunta debe incluir exactamente las propiedades "id_pregunta", "pregunta", "respuestas" e "id_respuesta_correcta".',
    '"respuestas" debe ser un array de 4 respuestas.',
    '"id_respuesta_correcta" debe ser un número del 1 al 4.',
    'No incluyas markdown, explicación ni texto adicional.'
  ].join(' ')
}

export function parseGeneratedTestResponse(response) {
  if (Array.isArray(response)) return response

  if (typeof response !== 'string') {
    throw new Error('La respuesta del generador de tests no tiene un formato válido.')
  }

  const startIndex = response.indexOf('[')
  const endIndex = response.lastIndexOf(']')

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('No se ha encontrado un array JSON válido en la respuesta.')
  }

  const parsedTest = JSON.parse(response.substring(startIndex, endIndex + 1))

  if (!Array.isArray(parsedTest)) {
    throw new Error('El test generado debe ser un array de preguntas.')
  }

  return parsedTest.map((question, index) => ({
    id_pregunta: Number(question.id_pregunta ?? index + 1),
    pregunta: String(question.pregunta ?? ''),
    respuestas: Array.isArray(question.respuestas) ? question.respuestas.map(String).slice(0, 4) : [],
    id_respuesta_correcta: Number(question.id_respuesta_correcta)
  })).filter((question) => (
    question.pregunta &&
    question.respuestas.length === 4 &&
    Number.isInteger(question.id_respuesta_correcta) &&
    question.id_respuesta_correcta >= 1 &&
    question.id_respuesta_correcta <= 4
  ))
}

export function calculateTestScore(questions, selectedAnswers) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return { correctAnswers: 0, score: 0 }
  }

  const correctAnswers = questions.reduce((total, question) => {
    const selectedAnswer = Number(selectedAnswers[question.id_pregunta])
    return selectedAnswer === Number(question.id_respuesta_correcta) ? total + 1 : total
  }, 0)

  return {
    correctAnswers,
    score: Number(((correctAnswers / questions.length) * 10).toFixed(2))
  }
}
