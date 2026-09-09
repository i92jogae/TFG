const test = require('node:test')
const assert = require('node:assert/strict')
const { createAiService } = require('./ai.module')

test('sendPrompt rejects empty prompts', async () => {
  const aiService = createAiService({ openai: null })

  await assert.rejects(() => aiService.sendPrompt('   '), {
    statusCode: 400,
    code: 'EMPTY_AI_QUERY'
  })
})

test('sendPrompt explains when OpenAI is not configured', async () => {
  const aiService = createAiService({ openai: null })

  await assert.rejects(() => aiService.sendPrompt('Explain SQL indexes'), {
    statusCode: 503,
    code: 'OPENAI_NOT_CONFIGURED'
  })
})

test('sendPrompt delegates a trimmed prompt to the OpenAI client', async () => {
  let receivedPayload = null
  const aiService = createAiService({
    openai: {
      chat: {
        completions: {
          create: async (payload) => {
            receivedPayload = payload

            return {
              choices: [
                {
                  message: {
                    content: 'Mocked AI answer'
                  }
                }
              ]
            }
          }
        }
      }
    }
  })

  const answer = await aiService.sendPrompt('  Explain SQL joins  ')

  assert.equal(answer, 'Mocked AI answer')
  assert.equal(receivedPayload.messages[0].content, 'Explain SQL joins')
})
