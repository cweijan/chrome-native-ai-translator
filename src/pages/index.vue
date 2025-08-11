<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DouProgress from '@/components/base/DouProgress.vue'
import CopyButton from '@/components/CopyButton.vue'
import SourceSelect from '@/components/SourceSelect.vue'
import SpeechButton from '@/components/SpeechButton.vue'
import TargetSelect from '@/components/TargetSelect.vue'
import { useDisplayName } from '@/composables/useDisplayName'
import { useTranslatorStore } from '@/stores/translator'

const displayName = useDisplayName()

const translatorStore = useTranslatorStore()

const {
  isTranslatorSupported,
  isLanguageDetectorSupported,
  languageDetectorStatus,
  translatorStatus,
  sourceText,
  sourceLanguage,
  realSourceLanguage,
  targetLanguage,
  isTranslating,
  translateResult,
  languageDetectionList,
} = storeToRefs(translatorStore)

const disabledTextarea = computed(() => {
  const _isTranslatorSupported = isTranslatorSupported.value

  return !_isTranslatorSupported
})

const { textarea } = useTextareaAutosize({ styleProp: 'height', input: sourceText })

const replacedTranslationResult = computed(() => {
  return (translateResult?.value?.result || '').replace(/<br>/g, '\n').trim()
})

const { t } = useI18n()
</script>

<template>
  <div class="mx-auto mt-2 flex flex-col gap-4 max-w-1280px">
    <div class="h-20px md:h-30px" />
    <div v-if="!isTranslatorSupported" class="error-container f-ring">
      {{ t('browser_not_support') }}
    </div>
    <template v-else>
      <div class="flex flex-col gap-4 items-start relative md:flex-row">
        <div class="f-ring flex flex-col gap-4 w-full md:w-1/2 max-h-60dvh min-h-250px h-fit min-w-0">
          <div class="toolbar flex gap-2 items-center px-4 pt-4 min-w-0">
            <SourceSelect class="flex-shrink min-w-0" />
            <div class="i-mingcute-arrow-right-line flex-shrink-0" />
            <TargetSelect class="flex-shrink min-w-0" />
          </div>
          <textarea
            ref="textarea" v-model="sourceText" :disabled="disabledTextarea" name="input"
            :placeholder="t('input_placeholder')" class="outline-none w-full resize-none px-4 text-xl flex-grow"
          />
          <div class="toolbar flex gap-2 items-center px-4 pb-4 justify-end">
            <SpeechButton :text="sourceText" :lang="realSourceLanguage" />
            <CopyButton :text="sourceText" />
          </div>
        </div>

        <div class="f-ring flex flex-col max-h-60dvh w-full md:w-1/2">
          <h1
            class="text-2xl font-light p-4 flex select-none items-center justify-between text-dark-500/50 dark:text-light-300/50"
          >
            {{ t('translate_result') }}
            <div v-if="isTranslating" class="i-mingcute-loading-3-line animate-spin" />
            <div v-else-if="translateResult?.duration" class="text-sm text-gray-400 dark:text-gray-500">
              {{ translateResult?.duration?.toFixed(2) }} ms
            </div>
          </h1>
          <div class="p-4 pt-0 overflow-y-auto text-xl flex flex-col gap-4">
            <div
              v-if="languageDetectionList?.length && sourceLanguage === 'auto'"
              class="f-ring lh-[normal] text-sm p-3 flex flex-col gap-2 select-none items-start justify-center rounded-xl!"
            >
              <h1>
                {{ t('language_detection_confidence') }}
              </h1>
              <div class="flex overflow-y-auto gap-1 min-w-100% w-0 flex-grow">
                <div
                  v-for="item in languageDetectionList" :key="item.detectedLanguage"
                  class="f-ring lh-[normal] text-xs px-2 flex flex-col rounded-lg!"
                >
                  <p class="whitespace-nowrap">
                    {{ displayName.getLabel(item.detectedLanguage) }}
                  </p>
                  <p class="whitespace-nowrap opacity-50">
                    {{ (item.confidence * 100).toPrecision(4) }}%
                  </p>
                </div>
              </div>
            </div>
            <div
              v-if="!isLanguageDetectorSupported || languageDetectorStatus?.status === 'downloading' || languageDetectorStatus?.status === 'error'"
              class="f-ring lh-[normal] text-sm p-3 flex flex-col gap-2 select-none items-center justify-center rounded-xl!"
            >
              <template v-if="!isLanguageDetectorSupported">
                {{ t('browser_not_support_language_detection') }}
              </template>
              <template v-else-if="languageDetectorStatus?.status === 'downloading'">
                <div class="flex flex-col gap-4 items-center">
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-loading-3-line animate-spin text-lg" />
                    {{ t('language_detection_model_downloading') }} ({{ ((languageDetectorStatus?.progress || 0) * 100).toFixed(2) }}%)
                  </div>
                  <DouProgress :progress="(languageDetectorStatus?.progress || 0) * 100" />
                </div>
              </template>
              <template v-else-if="languageDetectorStatus?.status === 'error'">
                <div class="flex flex-col gap-4 items-center">
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-warning-line text-lg" />
                    {{ t('language_detection_model_download_failed') }}
                  </div>
                  {{ languageDetectorStatus?.error?.message }}
                </div>
              </template>
            </div>
            <div
              v-if="translatorStatus?.status === 'downloading' || translatorStatus?.status === 'error'"
              class="f-ring lh-[normal] text-sm p-3 flex flex-col gap-2 select-none items-center justify-center rounded-xl!"
            >
              <template v-if="translatorStatus?.status === 'downloading'">
                <div class="flex flex-col gap-4 items-center">
                  <div>
                    {{ displayName.getLabel(translatorStatus?.sourceLanguage) }} -> {{
                      displayName.getLabel(translatorStatus?.targetLanguage)
                    }}
                  </div>
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-loading-3-line animate-spin text-lg" />
                    {{
                      translatorStatus?.noNeedToDownload ? t('translator_model_loading') : t('translator_model_downloading') }}
                    <template v-if="!translatorStatus?.noNeedToDownload">
                      ({{ ((translatorStatus?.progress || 0) * 100).toFixed(2) }}%)
                    </template>
                  </div>
                  <DouProgress
                    v-if="!translatorStatus?.noNeedToDownload"
                    :progress="(translatorStatus?.progress || 0) * 100"
                  />
                </div>
              </template>
              <template v-else-if="translatorStatus?.status === 'error'">
                <div class="flex flex-col gap-4 items-center">
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-warning-line text-lg" />
                    {{ t('translator_model_download_failed') }}
                  </div>
                  {{ translatorStatus?.error?.message }}
                </div>
              </template>
            </div>
            <template v-else>
              <div
                v-if="translateResult?.error"
                class="text-red-600 p-3 rounded-xl bg-red-600/10 dark:text-red-400 lh-[normal]"
              >
                {{ translateResult?.error?.message }}
              </div>
              <template v-else>
                <div class="whitespace-pre-wrap">
                  {{ replacedTranslationResult || '...' }}
                </div>
                <div class="toolbar flex gap-2 items-center justify-end pt-4 text-base">
                  <SpeechButton :text="replacedTranslationResult" :lang="targetLanguage" />
                  <CopyButton :text="replacedTranslationResult" />
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.f-ring {
  --uno: shadow-xl shadow-dark-500/3 dark:shadow-light-500/3 border-1 border-dark-500/20 dark:border-light-300/20 rounded-2xl;
  --uno: bg-white/30 dark:bg-dark-700/30;
  --uno: backdrop-blur-md;
}

.error-container {
  --uno: flex items-center justify-center rounded-xl text-sm md:text-lg py-4 px-6 mx-auto;
  --uno: select-none;
}
</style>
