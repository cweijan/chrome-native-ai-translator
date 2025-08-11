<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplayName } from '@/composables/useDisplayName'
import { LANGUAGES } from '@/constants/lang'
import { useTranslatorStore } from '@/stores/translator'
import DouSelect from './base/DouSelect.vue'

const { t } = useI18n()

const translatorStore = useTranslatorStore()
const { realSourceLanguage, sourceLanguage, isLanguageDetectorSupported } = storeToRefs(translatorStore)

const displayName = useDisplayName()

const options = computed(() => {
  const _displayName = displayName.value
  const _isLanguageDetectorSupported = isLanguageDetectorSupported.value
  const _realSourceLanguage = realSourceLanguage.value
  const _sourceLanguage = sourceLanguage.value
  const finalOptions: {
    value: string
    label: string
    disabled?: boolean
  }[] = []

  finalOptions.push({
    label: _realSourceLanguage && _sourceLanguage === 'auto'
      ? `${t('auto_detect_with_lang', {
        lang: _displayName.getLabel(_realSourceLanguage),
      })}`
      : t('auto_detect'),
    value: 'auto',
    disabled: !_isLanguageDetectorSupported,
  })

  LANGUAGES.forEach((item) => {
    finalOptions.push({
      label: _displayName.getLabel(item),
      value: item,
    })
  })

  return finalOptions
})
</script>

<template>
  <DouSelect v-model="sourceLanguage" :options="options" :placeholder="t('source_language')" />
</template>

<style scoped lang="scss"></style>
