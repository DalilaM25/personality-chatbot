<template>
<div class="personality-selector">
  <select id="personality" v-model="selected" @change='onChange'>
  <option v-for="(value, key) in Personalities" :key="key" :value="value">{{ value }}</option>
  </select>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Personalities } from './ChatBot/personality';
import { useChatStore } from '@/stores/chatStore'

const store = useChatStore()

const selected = ref(store.currentPersonality)

const onChange = () => {
  store.setPersonality(selected.value)
}

</script>

<style scoped></style>
