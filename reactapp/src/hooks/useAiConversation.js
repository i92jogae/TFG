import { useState } from 'react'
import { saveConversation, sendAiQuery } from '../services/dbLearningApi'
import { getCurrentUser } from '../utils/auth'
import { useAsyncRequest } from './useAsyncRequest'

export function useAiConversation() {
  const user = getCurrentUser()
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const { loading, error, setError, run } = useAsyncRequest('Se ha producido un error al procesar la consulta, inténtelo de nuevo')

  const sendMessage = async () => {
    const query = inputText.trim()

    if (!query || loading) return

    const userMessage = { text: query, isUser: true }
    setMessages((previousMessages) => [...previousMessages, userMessage])
    setInputText('')

    try {
      const assistantReply = await run(() => sendAiQuery(query))
      setMessages((previousMessages) => [...previousMessages, { text: assistantReply, isUser: false }])

      await saveConversation({
        usuarioId: user?.id,
        consulta: query,
        respuesta: assistantReply
      })
    } catch {
      setMessages((previousMessages) => previousMessages.filter((message) => message !== userMessage))
    }
  }

  return {
    messages,
    inputText,
    setInputText,
    loading,
    error,
    setError,
    firstLetterUser: user?.nombre?.substring(0, 1).toUpperCase() || 'U',
    sendMessage
  }
}
