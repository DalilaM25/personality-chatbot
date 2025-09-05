<template>
  <div class="typing-indicator">
    <strong >{{ person }}: </strong>
    <span class="typing-text">печатает</span>
    <span class="typing-dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  </div>
</template>

<script lang="ts" setup>

import type { PersonalityKeyT } from '@/types/chatTypes';
interface Props {
  person: string | PersonalityKeyT;
}

const { person } = defineProps<Props>()
</script>

<style scoped>
.typing-indicator {
  opacity: 0.8;
  font-style: italic;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f3e5f5;
  border-radius: 5px;
}

.typing-text {
  margin-right: 5px;
}

.typing-dots {
  display: inline-block;
}

.typing-dots span {
  animation: typing 1.4s infinite;
  opacity: 0;
}

.typing-dots span:nth-child(1) { animation-delay: 0s; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { opacity: 0; }
  30% { opacity: 1; }
}
</style>
