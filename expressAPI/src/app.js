const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { createAuthenticateToken, requireRole } = require('./middleware/auth')
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler')
const { createAuthRepository, createAuthRouter, createAuthService } = require('./modules/auth/auth.module')
const { createUsersRepository, createUsersRouter, createUsersService } = require('./modules/users/users.module')
const { createAiRouter, createAiService } = require('./modules/ai/ai.module')
const {
  createConversationsRepository,
  createConversationsRouter,
  createConversationsService
} = require('./modules/conversations/conversations.module')
const { createMarksRepository, createMarksRouter, createMarksService } = require('./modules/marks/marks.module')

function createApp({ db, openai, jwtSecret }) {
  const app = express()

  app.use(cors())
  app.use(express.json())

  const authenticateToken = createAuthenticateToken({ jwt, jwtSecret })
  const requireAdmin = requireRole('Admin')

  const authRepository = createAuthRepository(db)
  const usersRepository = createUsersRepository(db)
  const conversationsRepository = createConversationsRepository(db)
  const marksRepository = createMarksRepository(db)

  const authService = createAuthService({ authRepository, bcrypt, jwt, jwtSecret })
  const usersService = createUsersService({ usersRepository, bcrypt })
  const aiService = createAiService({ openai })
  const conversationsService = createConversationsService({ conversationsRepository })
  const marksService = createMarksService({ marksRepository })

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'dblearning-api' })
  })

  app.use(createAuthRouter({ authService }))
  app.use(createUsersRouter({ usersService, authenticateToken, requireAdmin }))
  app.use(createAiRouter({ aiService, authenticateToken }))
  app.use(createConversationsRouter({ conversationsService, authenticateToken }))
  app.use(createMarksRouter({ marksService, authenticateToken }))

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}

module.exports = { createApp }
