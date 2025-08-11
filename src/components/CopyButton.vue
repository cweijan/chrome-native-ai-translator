<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import DouButton from './base/DouButton.vue'

const props = defineProps<{
  text: string
}>()

const { copy, copied, isSupported } = useClipboard({
  source: () => props.text,
})
</script>

<template>
  <DouButton :disabled="!isSupported || text.length === 0" @click="copy(text)">
    <div v-if="!copied" class="i-mingcute-copy-2-line" />
    <div v-else class="i-mingcute-check-line" />
  </DouButton>
</template>

<style scoped>

</style>
