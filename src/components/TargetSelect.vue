<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { LANGUAGE_MAP, LANGUAGES } from '@/constants/lang'
import { useTranslatorStore } from '@/stores/translator'
import DouSelect from './base/DouSelect.vue'

const translatorStore = useTranslatorStore()

const { targetLanguage } = storeToRefs(translatorStore)

const options = computed(() => {
  const finalOptions: {
    value: string
    label: string
    disabled?: boolean
  }[] = []

  LANGUAGES.forEach((item) => {
    finalOptions.push({
      label: LANGUAGE_MAP[item] ?? item,
      value: item,
    })
  })

  return finalOptions
})
</script>

<template>
  <DouSelect v-model="targetLanguage" :options="options" placeholder="目标语言..." />
</template>

<style scoped lang="scss"></style>
