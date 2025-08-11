<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
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
  sourceLanguage,
  isTranslating,
  translateResult,
  languageDetectionList,
} = storeToRefs(translatorStore)

const disabledTextarea = computed(() => {
  const _isTranslatorSupported = isTranslatorSupported.value

  return !_isTranslatorSupported
})

const { textarea } = useTextareaAutosize({ styleProp: 'height', input: sourceText })
</script>

<template>
  <div class="mx-auto mt-2 flex flex-col gap-4 max-w-1280px">
    <div class="h-20px md:h-30px" />
    <div v-if="!isTranslatorSupported" class="error-container f-ring">
      不支持当前浏览器，请尝试使用 Google Chrome 138 及以上的版本
    </div>
    <template v-else>
      <div class="flex flex-col gap-4 items-start relative md:flex-row">
        <div class="f-ring flex flex-col gap-4 w-full md:w-1/2 max-h-60dvh min-h-250px h-fit">
          <div class="toolbar flex gap-2 items-center px-4 pt-4">
            <SourceSelect />
            <div class="i-mingcute-arrow-right-line" />
            <TargetSelect />
          </div>
          <textarea
            ref="textarea" v-model="sourceText" :disabled="disabledTextarea" name="input"
            placeholder="请输入需要翻译的文本" class="outline-none w-full resize-none px-4 pb-4 text-xl"
          />
        </div>

        <div class="f-ring flex flex-col max-h-60dvh w-full md:w-1/2">
          <h1
            class="text-2xl font-light p-4 flex select-none items-center justify-between text-dark-500/50 dark:text-light-300/50"
          >
            翻译结果
            <div v-if="isTranslating" class="i-mingcute-loading-3-line animate-spin" />
            <div v-else-if="translateResult?.duration" class="text-sm text-gray-400 dark:text-gray-500">
              {{ translateResult?.duration?.toFixed(2) }} ms
            </div>
          </h1>
          <div class="p-4 pt-0 overflow-y-auto text-xl flex flex-col gap-3">
            <div v-if="languageDetectionList?.length && sourceLanguage === 'auto'" class="f-ring lh-[normal] text-sm p-3 flex flex-col gap-2 select-none items-start justify-center rounded-xl!">
              <h1>
                语言检测置信度
              </h1>
              <div class="flex overflow-y-auto gap-1 min-w-100% w-0 flex-grow">
                <div v-for="item in languageDetectionList" :key="item.detectedLanguage" class="f-ring lh-[normal] text-xs px-2 flex flex-col rounded-lg!">
                  <p class="whitespace-nowrap">
                    {{ getLangLabel(item.detectedLanguage) }}
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
                你的浏览器不支持自动检测源语言
              </template>
              <template v-else-if="languageDetectorStatus?.status === 'downloading'">
                <div class="flex flex-col gap-4 items-center">
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-loading-3-line animate-spin text-lg" />
                    正在下载语言检测模型... ({{ ((languageDetectorStatus?.progress || 0) * 100).toFixed(2) }}%)
                  </div>
                  <DouProgress :progress="(languageDetectorStatus?.progress || 0) * 100" />
                </div>
              </template>
              <template v-else-if="languageDetectorStatus?.status === 'error'">
                <div class="flex flex-col gap-4 items-center">
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-warning-line text-lg" />
                    语言检测模型加载失败
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
                    {{ getLangLabel(translatorStatus?.sourceLanguage) }} -> {{
                      getLangLabel(translatorStatus?.targetLanguage)
                    }}
                  </div>
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-loading-3-line animate-spin text-lg" />
                    正在{{ translatorStatus?.noNeedToDownload ? '加载' : '下载' }}翻译模型...
                    <template v-if="!translatorStatus?.noNeedToDownload">
                      ({{ ((translatorStatus?.progress || 0) * 100).toFixed(2) }}%)
                    </template>
                  </div>
                  <DouProgress v-if="!translatorStatus?.noNeedToDownload" :progress="(translatorStatus?.progress || 0) * 100" />
                </div>
              </template>
              <template v-else-if="translatorStatus?.status === 'error'">
                <div class="flex flex-col gap-4 items-center">
                  <div class="flex gap-2 items-center">
                    <div class="i-mingcute-warning-line text-lg" />
                    翻译模型加载失败
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
              <div v-else class="whitespace-pre-wrap">
                {{ (translateResult?.result || '...').replace(/<br>/g, '\n') }}
              </div>
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
