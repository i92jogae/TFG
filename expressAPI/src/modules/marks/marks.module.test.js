const test = require('node:test')
const assert = require('node:assert/strict')
const { createMarksService, normalizeTextValue } = require('./marks.module')

test('normalizeTextValue supports strings, numbers and arrays', () => {
  assert.equal(normalizeTextValue('  Fácil  '), 'Fácil')
  assert.equal(normalizeTextValue(8), '8')
  assert.equal(normalizeTextValue(['SQL', 'Normalización']), 'SQL, Normalización')
})

test('saveMark normalizes payload before saving it', async () => {
  let savedMark = null
  const marksService = createMarksService({
    marksRepository: {
      async saveMark(mark) {
        savedMark = mark
      }
    }
  })

  await marksService.saveMark({
    usuario_id: '3',
    calificacion: '9',
    dificultad: '  Media  ',
    temas: ['SQL', 'Índices']
  })

  assert.deepEqual(savedMark, {
    usuarioId: 3,
    calificacion: 9,
    dificultad: 'Media',
    temas: 'SQL, Índices'
  })
})

test('saveMark rejects invalid marks', async () => {
  const marksService = createMarksService({
    marksRepository: {
      async saveMark() {}
    }
  })

  await assert.rejects(
    () => marksService.saveMark({ usuario_id: 3, calificacion: -1, dificultad: 'Media', temas: 'SQL' }),
    {
      statusCode: 400,
      code: 'INVALID_MARK'
    }
  )
})
