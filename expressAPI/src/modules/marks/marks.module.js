const express = require('express')
const { badRequest } = require('../../shared/errors')
const { asyncHandler } = require('../../shared/asyncHandler')
const { validateRequiredFields } = require('../../utils/validation')
const { parseUserId } = require('../users/users.module')

function createMarksRepository(db) {
  return {
    async saveMark({ usuarioId, calificacion, dificultad, temas }) {
      await db.execute(
        'INSERT INTO PRUEBA (usuario_id, calificacion, dificultad, temas) VALUES (?, ?, ?, ?)',
        [usuarioId, calificacion, dificultad, temas]
      )
    },

    async listByUserId(usuarioId) {
      const [rows] = await db.execute(
        'SELECT fecha, calificacion, dificultad, temas FROM PRUEBA WHERE usuario_id = ? ORDER BY fecha DESC',
        [usuarioId]
      )

      return rows
    }
  }
}

function createMarksService({ marksRepository }) {
  return {
    async saveMark(payload) {
      const missingFields = validateRequiredFields(payload, ['usuario_id', 'calificacion', 'dificultad', 'temas'])

      if (missingFields.length > 0) {
        throw badRequest(`Missing required fields: ${missingFields.join(', ')}`, 'MISSING_REQUIRED_FIELDS')
      }

      const calificacion = Number(payload.calificacion)

      if (!Number.isFinite(calificacion) || calificacion < 0) {
        throw badRequest('La calificación no tiene un formato válido', 'INVALID_MARK')
      }

      await marksRepository.saveMark({
        usuarioId: parseUserId(payload.usuario_id),
        calificacion,
        dificultad: payload.dificultad.trim(),
        temas: payload.temas.trim()
      })
    },

    async listUserMarks(usuarioId) {
      return marksRepository.listByUserId(parseUserId(usuarioId))
    }
  }
}

function createMarksRouter({ marksService, authenticateToken }) {
  const router = express.Router()

  router.post('/saveMark', authenticateToken, asyncHandler(async (req, res) => {
    await marksService.saveMark(req.body)
    res.status(201).json({ message: 'Mark saved successfully' })
  }))

  router.get('/userMarks', authenticateToken, asyncHandler(async (req, res) => {
    const marks = await marksService.listUserMarks(req.query.usuario_id)
    res.json(marks)
  }))

  return router
}

module.exports = {
  createMarksRepository,
  createMarksRouter,
  createMarksService
}
