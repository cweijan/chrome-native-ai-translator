<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import DouProgress from '@/components/base/DouProgress.vue'
import SourceSelect from '@/components/SourceSelect.vue'
import TargetSelect from '@/components/TargetSelect.vue'
import { getLangLabel } from '@/constants/lang'
import { useTranslatorStore } from '@/stores/translator'

const translatorStore = useTranslatorStore()

const {
  isTranslatorSupported,
  isLanguageDetectorSupported,
  languageDetectorStatus,
  translatorStatus,
  sourceText,
  isTranslating,
  translateResult,
} = storeToRefs(translatorStore)

const disabledTextarea = computed(() => {
  const _isTranslatorSupported = isTranslatorSupported.value

  return !_isTranslatorSupported
})
</script>

<template>
  <div class="mx-auto mt-2 flex flex-col gap-3 max-w-1280px">
    <div class="h-20px md:h-30px" />
    <div v-if="!isTranslatorSupported" class="error-container f-ring">
      不支持当前浏览器，请尝试使用 Google Chrome 138 及以上的版本
    </div>
    <template v-else>
      <div class="flex flex-col gap-3 items-start relative md:flex-row">
        <div class="f-ring p-6 flex flex-col gap-3 w-full md:w-1/2">
          <div class="toolbar flex gap-3 items-center">
            <SourceSelect />
            <div class="i-mingcute-arrow-right-line" />
            <TargetSelect />
          </div>
          <textarea
            v-model="sourceText" :disabled="disabledTextarea" name="input" placeholder="请输入需要翻译的文本"
            class="outline-none max-h-60dvh min-h-250px w-full"
          />
        </div>

        <div class="f-ring flex flex-col max-h-60dvh w-full md:w-1/2">
          <h1 class="text-2xl font-light p-6 flex select-none items-center justify-between">
            翻译结果
            <div v-if="isTranslating" class="i-mingcute-loading-3-line animate-spin" />
            <div v-else-if="translateResult?.duration" class="text-sm text-gray-400 dark:text-gray-500">
              {{ translateResult?.duration?.toFixed(2) }} ms
            </div>
          </h1>
          <div class="p-6 pt-0 overflow-y-auto">
            <div v-if="translateResult?.error" class="text-red-600 p-2 rounded-2xl bg-red-600/10 dark:text-red-400">
              {{ translateResult?.error?.message }}
            </div>
            <div v-else>
              {{ translateResult?.result || '...' }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!isLanguageDetectorSupported || languageDetectorStatus?.status === 'downloading' || languageDetectorStatus?.status === 'error'"
        class="f-ring lh-[normal] p-6 flex flex-col gap-2 select-none items-center justify-center"
      >
        <template v-if="!isLanguageDetectorSupported">
          你的浏览器不支持自动检测源语言
        </template>
        <template v-else-if="languageDetectorStatus?.status === 'downloading'">
          <div class="flex flex-col gap-4 items-center">
            <div class="flex gap-2 items-center">
              <div class="i-mingcute-loading-3-line animate-spin" />
              正在下载语言检测模型... ({{ ((languageDetectorStatus?.progress || 0) * 100).toFixed(2) }}%)
            </div>
            <DouProgress :progress="(languageDetectorStatus?.progress || 0) * 100" />
          </div>
        </template>
        <template v-else-if="languageDetectorStatus?.status === 'error'">
          <div class="flex flex-col gap-4 items-center">
            <div class="flex gap-2 items-center">
              <div class="i-mingcute-warning-line" />
              语言检测模型加载失败
            </div>
            {{ languageDetectorStatus?.error?.message }}
          </div>
        </template>
      </div>
      <div
        v-if="translatorStatus?.status === 'downloading' || translatorStatus?.status === 'error'"
        class="f-ring lh-[normal] p-6 flex flex-col gap-2 select-none items-center justify-center"
      >
        <template v-if="translatorStatus?.status === 'downloading'">
          <div class="flex flex-col gap-4 items-center">
            <div>
              {{ getLangLabel(translatorStatus?.sourceLanguage) }} -> {{ getLangLabel(translatorStatus?.targetLanguage)
              }}
            </div>
            <div class="flex gap-2 items-center">
              <div class="i-mingcute-loading-3-line animate-spin" />
              正在下载翻译模型... ({{ ((translatorStatus?.progress || 0) * 100).toFixed(2) }}%)
            </div>
            <DouProgress :progress="(translatorStatus?.progress || 0) * 100" />
          </div>
        </template>
        <template v-else-if="translatorStatus?.status === 'error'">
          <div class="flex flex-col gap-4 items-center">
            <div class="flex gap-2 items-center">
              <div class="i-mingcute-warning-line" />
              翻译模型加载失败
            </div>
            {{ translatorStatus?.error?.message }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.f-ring {
  --uno: ring-1.5 ring-orange-500/20 dark:ring-orange-300/20 bg-white/50 dark:bg-dark-700/80 rounded-3xl text-xl;
}

.error-container {
  --uno: flex items-center justify-center rounded-4xl text-md md:text-2xl py-4 px-6 mx-auto;
  --uno: bg-light-100 dark:bg-dark-400/80 select-none;
}
</style>
