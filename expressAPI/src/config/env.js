const dotenv = require('dotenv')

dotenv.config()

function readNumber(value, fallback) {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : fallback
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: readNumber(process.env.PORT, 3060),
  jwtSecret: process.env.SECRET_KEY || 'change-this-secret-in-production',
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: readNumber(process.env.DB_PORT, 3306)
  },
  openaiApiKey: process.env.OPENAI_API_KEY
}

module.exports = { env }
