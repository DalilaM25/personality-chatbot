import { ref, reactive } from 'vue';
import type { Message, UseChatResultT } from '@/types/chatTypes';
import { getPrompt } from '@/components/ChatBot/personality';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;



export const useChat = (person: string): UseChatResultT => {
  const userInput = ref('');
  const messages = reactive<Message[]>([]);
  const isLoading = ref(false);

  const sendMessage = async () => {
    if (!userInput.value.trim() || isLoading.value) return;

    const userMessage: Message = { role: 'user', content: userInput.value };
    messages.push(userMessage);
    userInput.value = '';
    isLoading.value = true;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Sherlock Chat Bot',
  },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3.1:free',
          messages: [
            { role: 'system', content: getPrompt(person) },
            ...messages.filter(msg => msg.role !== 'system')
          ]
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      messages.push({ role: 'assistant', content: data.choices[0].message.content });
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleError = (error: unknown) => {
    let errorMessage = 'Произошла ошибка. Дедуктивный метод дал сбой.';

    if (error instanceof Error) {
      if (error.message.includes('429')) {
        errorMessage = 'Элементарно, Ватсон! Слишком много запросов. Подождите минуту.';
      } else if (error.message.includes('503')) {
        errorMessage = 'Модель загружается, подождите 10-20 секунд.';
      }
    }

    messages.push({ role: 'assistant', content: errorMessage });
  };

  return {
    userInput,
    messages,
    isLoading,
    sendMessage
  };
};
