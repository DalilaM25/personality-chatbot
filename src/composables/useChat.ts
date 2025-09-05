import type { Message, UseChatResultT } from '@/types/chatTypes'
import { getPrompt } from '@/components/ChatBot/personality'
import type { useChatStore } from '@/stores/chatStore'

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

export const useChat = (store: ReturnType<typeof useChatStore>): UseChatResultT => {
  const sendMessage = async () => {
    if (!store.userInput.trim() || store.isLoading) return

    const userMessage: Message = { role: 'user', content: store.userInput }
    store.addMessage(userMessage)
    store.setUserInput('')
    store.setLoading(true)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Sherlock Chat Bot',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3.1:free',
          messages: [
            { role: 'system', content: getPrompt(store.currentPersonality) },
            ...store.messages.filter((msg) => msg.role !== 'system'),
          ],
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      store.addMessage({ role: 'assistant', content: data.choices[0].message.content })
    } catch (error) {
      handleError(error)
    } finally {
      store.setLoading(false)
    }
  }

  const handleError = (error: unknown) => {
    let errorMessage = 'Произошла ошибка. Дедуктивный метод дал сбой.'

    if (error instanceof Error) {
      if (error.message.includes('429')) {
        errorMessage = 'Элементарно, Ватсон! Слишком много запросов. Подождите минуту.'
      } else if (error.message.includes('503')) {
        errorMessage = 'Модель загружается, подождите 10-20 секунд.'
      }
    }

    store.addMessage({ role: 'assistant', content: errorMessage })
  }

  return {
    sendMessage,
  }
}
