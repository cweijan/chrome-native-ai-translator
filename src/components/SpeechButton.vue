<script setup lang="ts">
import { useSpeechSynthesis } from '@vueuse/core'
import { watch } from 'vue'
import DouButton from './base/DouButton.vue'

declare global {
  interface Window {
    stopSpeech?: () => void
  }
}

const props = defineProps<{
  text: string
  lang: string
}>()

const {
  isSupported,
  isPlaying,
  stop,
  speak,
} = useSpeechSynthesis(() => props.text, {
  lang: () => props.lang,
  pitch: 1,
  rate: 1,
  volume: 1,
})

function handleClick() {
  if (isPlaying.value) {
    stop()
    window.stopSpeech?.()
    window.stopSpeech = undefined
  }
  else {
    window.stopSpeech?.()
    speak()
    window.stopSpeech = stop
  }
}

watch(() => props.text, () => {
  if (isPlaying.value) {
    stop()
  }
})
</script>

<template>
  <DouButton :disabled="!isSupported || (!isPlaying && text.length === 0)" @click="handleClick">
    <div v-if="!isPlaying" class="i-mingcute-volume-line" />
    <div v-else class="animated-icon" />
  </DouButton>
</template>

<style scoped lang="scss">
.animated-icon {
  background-color: currentColor;
  height: 16px;
  width: 16px;
  mask-image: url('@/assets/volumn.webp');
  mask-size: 100% 100%;
}
</style>
