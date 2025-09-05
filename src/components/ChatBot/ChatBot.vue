<template>
  <div class="chat-container">
    <div class="chat-container__header">
      <h2 class="chat-container__title">Ваш собеседник: {{ store.currentPersonality }}</h2>
      <PersonalitySelect />
    </div>

    <div class="messages-container">
      <div class="messages">
        <div
          v-for="(message, index) in store.messages"
          :key="index"
          :class="['message', message.role]"
        >
          <strong>{{ message.role === 'user' ? 'Вы' : store.currentPersonality }}:</strong>
          <div class="message-content">{{ message.content }}</div>
        </div>

        <TypingIndicator v-if="store.isLoading" :person="store.currentPersonality"/>
      </div>
    </div>

    <form class="input-form" @submit.prevent="sendMessage">
      <div class="input-container">
        <textarea
          v-model="store.userInput"
          :disabled="store.isLoading"
          placeholder="Введите сообщение..."
          class="auto-resize-textarea"
          rows="1"
        ></textarea>
        <button type="submit" :disabled="store.isLoading">
          {{ store.isLoading ? 'Отправка...' : 'Отправить' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import TypingIndicator from '../TypingIndicator.vue'
import PersonalitySelect from '../PersonalitySelect.vue'
import { useChat } from '@/composables/useChat';
import { useChatStore } from '@/stores/chatStore';
const store = useChatStore();
const { sendMessage } = useChat(store);

</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: rgba(28, 27, 21, 0.666);
}

.chat-container__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.chat-container__title {
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

.messages-container {
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow: hidden;
}

.messages {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

/* Исправленные стили для сообщений */
.message {
  margin-bottom: 15px;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.message.user {
  background-color: #e3f2fd;
  text-align: right;
  margin-left: auto;
  max-width: 70%;
}

.message.assistant {
  background-color: #f3e5f5;
  text-align: left;
  margin-right: auto;
  max-width: 70%;
}

.message strong {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 0.9em;
}

.message-content {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}

/* Стили для скроллбара */
.messages::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.input-form {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.auto-resize-textarea {
  flex: 1;
  min-height: 44px;
  max-height: 120px;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-family: inherit;
  resize: none;
  overflow-y: auto;
  transition: all 0.2s ease;
  height: auto;
}

.auto-resize-textarea:focus {
  outline: none;
  border-color: #4CAF50;
  background: white;
}

button {
  flex-shrink: 0;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .chat-container__header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .chat-container__title {
    font-size: 1.2rem;
  }

  .messages {
    max-height: 50vh;
    padding: 15px;
  }

  .message.user,
  .message.assistant {
    max-width: 85%;
  }

  .input-container {
    flex-direction: column;
    align-items: stretch;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }

  .message {
    padding: 10px 12px;
    border-radius: 10px;
  }

  .message strong {
    font-size: 0.8em;
  }
}
</style>
