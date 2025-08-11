<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageStore } from '@/stores/page'
import DouSelectCustomTrigger from './base/DouSelectCustomTrigger.vue'

const { t } = useI18n()
const pageStore = usePageStore()

const { currentColorMode, systemColorMode } = storeToRefs(pageStore)

const options = computed(() => [
  {
    value: 'light',
    label: t('color_mode.light'),
  },
  {
    value: 'dark',
    label: t('color_mode.dark'),
  },
  {
    value: 'auto',
    label: t('color_mode.system'),
  },
])
</script>

<template>
  <DouSelectCustomTrigger v-model="currentColorMode" :options="options">
    <template #trigger="{ value }">
      <div class="icon">
        <template v-if="value === 'auto'">
          <div :class="systemColorMode === 'light' ? 'i-mingcute-sun-line' : 'i-mingcute-moon-line'" />
        </template>
        <div v-else-if="value === 'light'" class="i-mingcute-sun-line" />
        <div v-else class="i-mingcute-moon-line" />
      </div>
    </template>
  </DouSelectCustomTrigger>
</template>

<style scoped lang="scss"></style>
