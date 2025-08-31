<script setup lang="ts" generic="T extends string | number, U">
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { ref } from 'vue'

defineProps<{
  options: {
    value: T
    label: string
    disabled?: boolean
    extra?: U
  }[]
  label?: string
  placeholder?: string
  disabled?: boolean
  small?: boolean
}>()

defineSlots<{
  default: (props: { index: number, value: T, label: string, disabled?: boolean, extra?: U }) => any
}>()

const modelValue = defineModel<T>({ required: true })

const open = ref(false)
</script>

<template>
  <SelectRoot v-model="modelValue" v-model:open="open" :disabled="disabled">
    <SelectTrigger v-bind="$attrs" class="select-wrapper" :class="{
      active: open,
      small,
    }" :aria-label="label">
      <SelectValue :placeholder="placeholder" class="label" :disabled="disabled">
        <template v-for="option, index of options" :key="option.value">
          <template v-if="modelValue === option.value">
            <template v-if="!$slots.default">
              <div class="flex items-center gap-2">
                <div class="i-mingcute-translate-2-line text-blue-500 dark:text-blue-400" />
                {{ option.label }}
              </div>
            </template>
            <slot v-else :value="option.value" :label="option.label" :disabled="option.disabled" :extra="option.extra"
              :index="index" />
          </template>
        </template>
      </SelectValue>
      <div class="i-mingcute-down-line text-gray-500 dark:text-gray-400" :class="{ 'rotate-180': open }" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent v-if="open" :body-lock="true" class="popup-wrapper" :side-offset="5" :class="{ small }">
        <SelectScrollUpButton class="scroll-button">
          <div class="i-mingcute-up-fill" />
        </SelectScrollUpButton>

        <SelectViewport class="popup-content">
          <template v-for="option, index of options" :key="option.value">
            <SelectItem :value="option.value" class="popup-label" :disabled="option.disabled">
              <SelectItemText>
                <template v-if="!$slots.default">
                  {{ option.label }}
                </template>
                <slot v-else :value="option.value" :label="option.label" :disabled="option.disabled"
                  :extra="option.extra" :index="index" />
              </SelectItemText>
            </SelectItem>
          </template>
        </SelectViewport>

        <SelectScrollDownButton class="scroll-button">
          <div class="i-mingcute-down-fill" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style lang="scss" scoped>
.select-wrapper {
  --uno: flex items-center gap-2 text-sm cursor-pointer select-none;
  --uno: px-3 py-2;
  --uno: rounded-xl;
  --uno: bg-white dark:bg-gray-800;
  --uno: border border-gray-200 dark:border-gray-700;
  --uno: shadow-sm;

  .label {
    --uno: flex-grow min-w-0 whitespace-nowrap text-ellipsis overflow-hidden;
    --uno: font-medium text-gray-700 dark:text-gray-200;
  }

  &.small {
    --uno: text-xs py-1.5 ps-3 pe-2;
  }

  &.active {
    --uno: bg-blue-50 dark:bg-blue-900/30;
    --uno: border-blue-400 dark:border-blue-500;
    --uno: shadow-md;
  }
}

:deep(.popup-wrapper) {
  --uno: z-10 select-none max-w-90vw;
  --uno: overflow-hidden;
  --uno: rounded-2xl;
  --uno: bg-white dark:bg-gray-900;
  --uno: border border-gray-200 dark:border-gray-700;
  --uno: shadow-lg;

  .popup-label {
    --uno: m-1.5 py-2 ps-3 pe-4 min-w-32 min-w-0 whitespace-nowrap;
    --uno: rounded-xl;
    --uno: cursor-pointer;
    --uno: font-medium;
    --uno: position relative;
    --uno: overflow-hidden;

    &[data-disabled] {
      --uno: opacity-40;
      --uno: cursor-not-allowed;
      --uno: text-gray-400 dark:text-gray-500;
    }

    &[data-highlighted] {
      --uno: bg-blue-50 dark:bg-blue-900/30;
      --uno: text-blue-700 dark:text-blue-300;
    }

    &.popup-label[data-state="checked"] {
      --uno: bg-blue-100 dark:bg-blue-800;
      --uno: border border-blue-300 dark:border-blue-600;
      --uno: text-blue-800 dark:text-blue-200;
      --uno: font-semibold;

      &::after {
        content: '✓';
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #3b82f6;
        font-weight: bold;
        font-size: 0.875rem;
      }
    }

    &:not([data-disabled]):hover {
      --uno: bg-gray-50 dark:bg-gray-800;
    }
  }

  .popup-content {
    --uno: text-base;
    --uno: py-1;
  }

  .scroll-button {
    --uno: h-8 flex cursor-default items-center justify-center;
    --uno: bg-gray-100 dark:bg-gray-800;
    --uno: text-gray-600 dark:text-gray-400;
  }

  &.small {
    --uno: text-xs;

    .popup-label {
      --uno: py-1.5 ps-2.5 pe-3 text-sm;
    }

    .scroll-button {
      --uno: h-6;
    }
  }
}
</style>
