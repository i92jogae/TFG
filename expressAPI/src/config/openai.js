const OpenAI = require('openai')
const { env } = require('./env')

function createOpenAIClient() {
  if (!env.openaiApiKey) {
    return null
  }

  return new OpenAI({
    apiKey: env.openaiApiKey
  })
}

module.exports = { createOpenAIClient }
