<script setup lang="ts">
import { getLocaleLabel } from '@/locales'
import { usePageStore } from '@/stores/page'
import { getAvailableLanguages } from '@/utils/lang.util'
import DouSelect from './base/DouSelect.vue'

const pageStore = usePageStore()

const availableLocales = getAvailableLanguages()
</script>

<template>
  <DouSelect
    v-model="pageStore.locale" :options="availableLocales.map((locale) => ({
      value: locale,
      label: getLocaleLabel(locale),
    }))"
    small
  />
</template>
