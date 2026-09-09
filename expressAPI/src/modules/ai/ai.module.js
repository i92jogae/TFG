const express = require('express')
const { badRequest, serviceUnavailable } = require('../../shared/errors')
const { asyncHandler } = require('../../shared/asyncHandler')
const { isNonEmptyString } = require('../../utils/validation')

const DEFAULT_MODEL = 'gpt-3.5-turbo'

function createAiService({ openai, model = DEFAULT_MODEL }) {
  return {
    async sendPrompt(query) {
      if (!isNonEmptyString(query)) {
        throw badRequest('La consulta es obligatoria', 'EMPTY_AI_QUERY')
      }

      if (!openai) {
        throw serviceUnavailable('OpenAI API key is not configured', 'OPENAI_NOT_CONFIGURED')
      }

      const chatGptResponse = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: query.trim() }]
      })

      return chatGptResponse.choices?.[0]?.message?.content || ''
    }
  }
}

function createAiRouter({ aiService, authenticateToken }) {
  const router = express.Router()

  router.post('/sendqueryIA', authenticateToken, asyncHandler(async (req, res) => {
    const answer = await aiService.sendPrompt(req.body.query)
    res.json(answer)
  }))

  router.post('/generateTest', authenticateToken, asyncHandler(async (req, res) => {
    const test = await aiService.sendPrompt(req.body.query)
    res.json(test)
  }))

  return router
}

module.exports = {
  createAiRouter,
  createAiService
}
