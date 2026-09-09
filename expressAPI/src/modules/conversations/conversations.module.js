const express = require('express')
const { badRequest } = require('../../shared/errors')
const { asyncHandler } = require('../../shared/asyncHandler')
const { validateRequiredFields } = require('../../utils/validation')
const { parseUserId } = require('../users/users.module')

function createConversationsRepository(db) {
  return {
    async saveConversation({ usuarioId, consulta, respuesta }) {
      await db.execute(
        'INSERT INTO RETROALIMENTACION (usuario_id, consulta, respuesta) VALUES (?, ?, ?)',
        [usuarioId, consulta, respuesta]
      )
    },

    async listByUserId(usuarioId) {
      const [rows] = await db.execute(
        'SELECT consulta, respuesta, fecha FROM RETROALIMENTACION WHERE usuario_id = ? ORDER BY fecha DESC',
        [usuarioId]
      )

      return rows
    }
  }
}

function createConversationsService({ conversationsRepository }) {
  return {
    async saveConversation(payload) {
      const missingFields = validateRequiredFields(payload, ['usuario_id', 'consulta', 'respuesta'])

      if (missingFields.length > 0) {
        throw badRequest(`Missing required fields: ${missingFields.join(', ')}`, 'MISSING_REQUIRED_FIELDS')
      }

      await conversationsRepository.saveConversation({
        usuarioId: parseUserId(payload.usuario_id),
        consulta: payload.consulta.trim(),
        respuesta: payload.respuesta.trim()
      })
    },

    async listUserConsults(usuarioId) {
      return conversationsRepository.listByUserId(parseUserId(usuarioId))
    }
  }
}

function createConversationsRouter({ conversationsService, authenticateToken }) {
  const router = express.Router()

  router.post('/saveConversation', authenticateToken, asyncHandler(async (req, res) => {
    await conversationsService.saveConversation(req.body)
    res.status(201).json({ message: 'Conversation saved successfully' })
  }))

  router.get('/userConsults', authenticateToken, asyncHandler(async (req, res) => {
    const conversations = await conversationsService.listUserConsults(req.query.usuario_id)
    res.json(conversations)
  }))

  return router
}

module.exports = {
  createConversationsRepository,
  createConversationsRouter,
  createConversationsService
}
