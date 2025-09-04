import type { personalityPrompts } from '@/components/ChatBot/personality';
import type { Ref, Reactive } from 'vue';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatConfig {
  model: string;
  systemPrompt: string;
  maxTokens?: number;
}

export type UseChatResultT = {
    userInput:  Ref<string, string>,
    messages: Reactive<Message[]>,
    isLoading: Ref<boolean, boolean>,
    sendMessage: () => Promise<void>
  }
export type PersonalityKey = keyof typeof personalityPrompts;
