// stores/chatStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Message } from '@/types/chatTypes'
import { Personalities } from '@/components/ChatBot/personality'
import { createThemeMap } from './helpers'

export const useChatStore = defineStore('chat', () => {
  // State
  const currentPersonality = ref<string>('')
  const messages = ref<Message[]>([])
  const isLoading = ref<boolean>(false)
  const userInput = ref<string>('')

  // Getters (вычисляемые свойства)
  const currentTheme = computed(() => createThemeMap(Personalities) || 'theme-default')

  // Actions
  const setPersonality = (newPersonality: string) => {
    currentPersonality.value = newPersonality

    messages.value = []
  }

  const addMessage = (message: Message) => {
    messages.value.push(message)
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setUserInput = (input: string) => {
    userInput.value = input
  }

  // Экспортируем всё, что нужно использовать в компонентах
  return {
    currentPersonality,
    messages,
    isLoading,
    userInput,
    currentTheme,
    setPersonality,
    addMessage,
    setLoading,
    setUserInput,
  }
})
