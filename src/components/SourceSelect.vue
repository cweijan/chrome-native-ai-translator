<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { getLangLabel, LANGUAGES } from '@/constants/lang'
import { useTranslatorStore } from '@/stores/translator'
import DouSelect from './base/DouSelect.vue'

const translatorStore = useTranslatorStore()
const { realSourceLanguage, sourceLanguage, isLanguageDetectorSupported } = storeToRefs(translatorStore)

const options = computed(() => {
  const _isLanguageDetectorSupported = isLanguageDetectorSupported.value
  const _realSourceLanguage = realSourceLanguage.value
  const _sourceLanguage = sourceLanguage.value
  const finalOptions: {
    value: string
    label: string
    disabled?: boolean
  }[] = []

  finalOptions.push({
    label: _realSourceLanguage && _sourceLanguage === 'auto' ? `自动检测 (${getLangLabel(_realSourceLanguage)})` : '自动检测',
    value: 'auto',
    disabled: !_isLanguageDetectorSupported,
  })

  LANGUAGES.forEach((item) => {
    finalOptions.push({
      label: getLangLabel(item),
      value: item,
    })
  })

  return finalOptions
})
</script>

<template>
  <DouSelect v-model="sourceLanguage" :options="options" placeholder="源语言..." />
</template>

<style scoped lang="scss"></style>
