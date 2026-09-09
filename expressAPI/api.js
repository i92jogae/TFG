const { createApp } = require('./src/app')
const { env } = require('./src/config/env')
const { pool } = require('./src/config/database')
const { createOpenAIClient } = require('./src/config/openai')

const app = createApp({
  db: pool,
  openai: createOpenAIClient(),
  jwtSecret: env.jwtSecret
})

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`)
})
