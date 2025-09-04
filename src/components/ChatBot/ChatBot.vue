<template>
  <div class="chat-container">
    <h2>Personality chat-bot</h2>

    <div class="messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.role]"
      >
        <strong>{{ message.role === 'user' ? 'Вы' : currentPersonality }}:</strong>
        {{ message.content }}
      </div>

      <TypingIndicator v-if="isLoading" :person="currentPersonality"/>
    </div>

    <form @submit.prevent="sendMessage">
      <input
        v-model="userInput"
        type="text"
        :disabled="isLoading"
        placeholder="Введите сообщение..."
      />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Отправка...' : 'Отправить' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import TypingIndicator from '../TypingIndicator.vue'
import { useChat } from '@/composables/useChat';
const currentPersonality = 'Sherlock'
const { userInput, messages, isLoading, sendMessage } = useChat(currentPersonality);
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.messages {
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.message.user {
  background-color: #e3f2fd;
  text-align: right;
}

.message.assistant {
  background-color: #f3e5f5;
}

input {
  width: 70%;
  padding: 10px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>


