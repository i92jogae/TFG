import { useEffect, useMemo, useState } from 'react'
import { getUserMarks } from '../services/dbLearningApi'
import { getCurrentUser } from '../utils/auth'
import { useAsyncRequest } from './useAsyncRequest'

function buildResultsSummary(results) {
  if (results.length === 0) {
    return { average: 0, hits: 0, total: 0 }
  }

  const grades = results.map((test) => Number(test.calificacion) || 0)
  const totalGrades = grades.reduce((accumulator, grade) => accumulator + grade, 0)
  const average = Number(((totalGrades / grades.length) * 10).toFixed(1))
  const hits = grades.reduce((accumulator, grade) => accumulator + Math.round((grade * 11) / 10), 0)

  return {
    average,
    hits,
    total: results.length * 11
  }
}

export function useUserResults() {
  const user = getCurrentUser()
  const [results, setResults] = useState([])
  const { loading, error, run } = useAsyncRequest('Se ha producido un error al obtener sus resultados, inténtelo en otro momento.')
  const summary = useMemo(() => buildResultsSummary(results), [results])

  useEffect(() => {
    if (!user?.id) return

    run(() => getUserMarks(user.id))
      .then(setResults)
      .catch(() => {})
  }, [run, user?.id])

  return { results, summary, loading, error }
}
