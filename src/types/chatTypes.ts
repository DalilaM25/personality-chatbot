import type { personalityPrompts } from '@/components/ChatBot/personality'

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatConfig {
  model: string
  systemPrompt: string
  maxTokens?: number
}

export type UseChatResultT = {
  sendMessage: () => Promise<void>
}
export type PersonalityKeyT = keyof typeof personalityPrompts | string
